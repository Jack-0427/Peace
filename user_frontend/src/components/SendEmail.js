import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import { useUser } from '../hooks/useUser';
// import { useData } from '../hooks/SendData';
import { sendEmail } from '../hooks/api';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

const SendEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const rowData = location.state && location.state.rowData;

    const [text, setText] = useState("")
    const [open, setOpen] = useState(false);

    const { handleOpen, setWarn, setWarnState } = useUser();

    const DialogOpen = () => {
        setOpen(true);
    };

    const DialogClose = () => {
        setOpen(false);
    };
    

    const onClick = async(name) => {
        try{
            DialogOpen();
            const msg = await sendEmail("A31576608@gmail.com", `${name}客戶寄信詢問`, text);
            DialogClose();
            handleOpen(true);
            setWarn(msg);
            if (msg === "郵件已成功發送"){
                navigate('/申請服務/查看申請資料');
                setWarnState(true);
            }
            else{
                setWarnState(false);
            }
        }catch(err){
            DialogClose();
            handleOpen(true);
            setWarn(`有一些錯誤發生 ${err}`);
            setWarnState(false);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div>
                <div style={{ color: "#4682B4", fontSize: "28px", fontWeight: "bold" }}>
                    我的特殊要求
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
            <Button variant="outlined" onClick={() => { onClick(rowData.name) }}>確定送出</Button>
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