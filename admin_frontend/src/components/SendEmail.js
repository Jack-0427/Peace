import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material"
import { useData } from '../hooks/SendData';
import { sendEmail } from '../hooks/api';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

const SendEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const rowData = location.state && location.state.rowData;

    const [text, setText] = useState("")
    const [open, setOpen] = useState(false);

    const { Review, handleOpen, setWarnMessage, setWarnState } = useData();

    const DialogOpen = () => {
        setOpen(true);
    };

    const DialogClose = () => {
        setOpen(false);
    };
    

    const onClick = async() => {
        try{
            DialogOpen();
            const msg = await sendEmail(rowData.email, "預立安寧預約服務", text);
            DialogClose();
            handleOpen(true);
            setWarnMessage(msg);
            if (msg === "郵件已成功發送"){
                navigate('/allServices');
                setWarnState(false);
            }
            else{
                setWarnState(true);
            }
        }catch(err){
            DialogClose();
            handleOpen(true);
            setWarnMessage(`有一些錯誤發生 ${err}`);
            setWarnState(true);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div>
                <div style={{ color: "#4682B4", fontSize: "28px", fontWeight: "bold" }}>
                    特殊要求
                </div>
                <div style={{ borderBottom: '1px solid black' }}></div>
                <div style={{ margin: 20 }}></div>
            </div>
            <TextField 
                sx={{ width: '70%' }} 
                id="special-basic" 
                label="特殊要求" 
                variant="outlined" 
                multiline
                rows={8}
                InputProps={{
                    readOnly: true,
                    value: rowData.special,
                }}
            />
            <div>
                <div style={{ color: "#4682B4", fontSize: "28px", fontWeight: "bold" }}>
                    寄信
                </div>
                <div style={{ borderBottom: '1px solid black' }}></div>
                <div style={{ margin: 20 }}></div>
            </div>
            <TextField 
                sx={{ width: '70%' }} 
                id="special-basic" 
                label="郵件內容" 
                variant="outlined" 
                multiline
                rows={8}
                onChange={(e) => { setText(e.target.value) }} 
            />
            <div style={{ margin: 20 }}></div>
            <Button variant="outlined" onClick={onClick}>確定送出</Button>
            <Dialog open={open} onClose={DialogClose} disableBackdropClick>
                <DialogTitle>等待郵件上傳</DialogTitle>
                <DialogContent>
                    <div>郵件資料上傳中...</div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SendEmail;