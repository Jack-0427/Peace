import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from "@material-ui/core/Button";
import { useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { fetchApplyData } from '../hooks/api';
import { sendResendData } from '../hooks/api';
import { sendDeleteData } from '../hooks/api';
import { styled } from '@mui/material/styles';
import front from "../健保卡正面.jpg"
import back from "../健保卡反面.jpg"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableRow from '@mui/material/TableRow';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Record = () => {
    const location = useLocation();
    const firstURL = decodeURIComponent((location.pathname + location.search).split("/")[1]);

    const buttons = ["全部捐贈", "肺臟", "胰臟", "小腸", "皮膚", "心瓣膜", "心臟", "肝臟", "腎臟", "眼角膜", "骨骼", "血管"];

    const { token, topRef, setWarn, setWarnState, handleOpen } = useUser();

    const [selectedFrontImage, setselectedFrontImage] = useState(null);
    const [FrontImageUrl, setFrontImageUrl] = useState(null);
    const [selectedBackImage, setselectedBackImage] = useState(null);
    const [BackImageUrl, setBackImageUrl] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [VideoUrl, setVideoUrl] = useState(null);
    const [applyData, setApplyData] = useState([]);
    const [open, setOpen] = useState(false);
    const [warnOpen, setWarnOpen] = useState(false);
    const [selected, setSelected] = useState(Array(buttons.length).fill(false));
    const [fixed, setFixed] = useState(Array(buttons.length).fill(false));

    const navigate = useNavigate();

    const DialogOpen = () => {
        setOpen(true);
    };

    const DialogClose = () => {
        topRef.current.scrollIntoView();
        setOpen(false);
    };

    const DialogWarnClose = async() => {
        topRef.current.scrollIntoView();
        setWarnOpen(false);
        try{
            const mes = await sendDeleteData(token, !applyData[0]?.deleted, applyData[0]._id);
            handleOpen();
            setWarn(mes);
            setWarnState(true);
            DialogClose();
        }catch(err){
            console.log(err);
            handleOpen();
            setWarn(`註銷申請失敗`);
            setWarnState(false);
            DialogClose();
        }
    };

    const getText = () => {
        let text = ""
        for(let i = 1; i < buttons.length; i++){
            if (selected[i] === true){
                if (text !== ""){
                    text += `, ${buttons[i]}`;
                }
                else{
                    text += `${buttons[i]}`;
                }
            }
        }
        return text
    }

    const handleCheckboxChange = (index) => {
        if (index === 0){
            const updatedSelected = selected.map((value, i) => (!selected[0]));
            setSelected(updatedSelected);
        }
        else{
            const updatedSelected = selected.map((value, i) => ((i === index || (i === 0 && selected[0] && selected[index]) ) ? !value : value));
            setSelected(updatedSelected);
        }
    };

    const uploadFile = async(formData) => {
        const response = await fetch('https://api.imgur.com/3/upload', {
            method: 'POST',
            headers: {
                Authorization: `Client-ID ${process.env.CLIENT_ID}`,
            },
                body: formData,
            });
        const data = await response.json();
        return data;
    }

    const uploadFront = async() => {
        try{
            if (!selectedFrontImage){
                return undefined;
            }
            const formData = new FormData();
            formData.append('image', selectedFrontImage);
            const { data } = await uploadFile(formData);
            const { link, deletehash } = data;
            console.log(link, deletehash, "front");
            return { front: { link, deletehash }};
        }catch(err){
            throw new Error('Upload failed!');
        }
    }

    const uploadBack = async() => {
        try{
            if (!selectedBackImage){
                return undefined;
            }
            const formData = new FormData();
            formData.append('image', selectedBackImage);
            const { data } = await uploadFile(formData);
            const { link, deletehash } = data;
            console.log(link, deletehash, "back");
            return { back: { link, deletehash }};
        }catch(err){
            throw new Error('Upload failed!');
        }
    }
    
    const uploadVideo = async() => {
        try{
            if (!selectedVideo){
                return undefined;
            }
            const formData = new FormData();
            formData.append('video', selectedVideo);
            const { data } = await uploadFile(formData);
            const { link, deletehash } = data;
            console.log(link, deletehash, "video");
            return { video: { link, deletehash }};
        }catch(err){
            throw new Error('Upload failed!');
        }
    }

    const uploadData = async () => {
        try{
            DialogOpen();
            const text = getText();
            const front = await uploadFront();
            const back = await uploadBack();
            const video = await uploadVideo();

            const mes = await sendResendData(token, front, back, video, text, applyData[0]._id);
            navigate('/器官捐贈移植/使用者紀錄');
            handleOpen();
            setWarn(mes);
            setWarnState(mes === "重新上傳影像資料成功");
            DialogClose();
        }catch(err){
            console.log(err);
            handleOpen();
            setWarn(`影像資料上傳失敗`);
            setWarnState(false);
            DialogClose();
        }
    };

    const deleteData = async () => {
        setWarnOpen(true);
    }

    useEffect(() => {
        const fetchReservations = async() => {
            if (token){
                const { data, message: mes } = await fetchApplyData(token);
                setApplyData([data]);
                setSelected(buttons.map((ele, i) => (data.agreement.includes(ele))))
                setFixed(buttons.map((ele, i) => (data.agreement.includes(ele))));
                // handleOpen();
                // setWarn("獲取申請資料成功");
                // setWarnState(mes === "獲取申請資料成功");
                // DialogClose();
            }
        }
        fetchReservations();
    }, [token])

    useEffect(() => {
        if (selectedFrontImage) {
            setFrontImageUrl(URL.createObjectURL(selectedFrontImage));
            console.log(FrontImageUrl);
        }
    }, [selectedFrontImage]);

    useEffect(() => {
        if (selectedBackImage) {
            setBackImageUrl(URL.createObjectURL(selectedBackImage));
        }
    }, [selectedBackImage]);

    useEffect(() => {
        if (selectedVideo) {
            setVideoUrl(URL.createObjectURL(selectedVideo));
        }
    }, [selectedVideo]);

    useEffect(() => {
        const allOthersAreTrue = selected.slice(1).every((value) => value);
        if (allOthersAreTrue){
            setSelected(selected.map((value, i) => (i === 0 ? true : selected[i])));
        }
    }, [selected])

    useEffect(() => {
        const allOthersAreTrue = fixed.slice(1).every((value) => value);
        if (allOthersAreTrue){
            setFixed(fixed.map((value, i) => (i === 0 ? true : fixed[i])));
        }
    }, [selected])

    return (
        <>
            <div style={{ color: "#4682B4", fontSize: "28px", fontWeight: "bold" }}>
                申請資料
            </div>
            <div style={{ borderBottom: '1px solid black' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2>你的申請資料</h2>
                <TableContainer component={Paper} sx={{width: '70%'}}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>姓名</StyledTableCell>
                                <StyledTableCell>身分證字號</StyledTableCell>
                                <StyledTableCell align="center">健保卡正面</StyledTableCell>
                                <StyledTableCell align="center">健保卡反面</StyledTableCell>
                                <StyledTableCell align="center">陳述影片</StyledTableCell>
                                <StyledTableCell align="center">審核狀態</StyledTableCell>
                                <StyledTableCell align="center">審核結果</StyledTableCell>
                                <StyledTableCell align="center">放棄申請</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {   
                                applyData && applyData.length > 0 ?
                                applyData.map((row, i) => (
                                <StyledTableRow
                                key={`row ${i}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.name ? row.name : "無"}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.cardId}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.frontImgURL ? "有" : "無"}</StyledTableCell>
                                    <StyledTableCell align="center">{row.backImgURL ? "有" : "無"}</StyledTableCell>
                                    <StyledTableCell align="center">{row.videoURL ? "有" : "無"}</StyledTableCell>
                                    <StyledTableCell align="center">{row.hasBeenReviewed ? "已審核" : "尚未審核"}</StyledTableCell>
                                    <StyledTableCell align="center">{row.comment ? row.comment : "無"}</StyledTableCell>
                                    <StyledTableCell align="center">{row.deleted ? "是" : "否"}</StyledTableCell>
                                </StyledTableRow>
                            )) : <></>}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div style={{ margin: 20 }}></div>
                <div>
                    <div style={{ color: "#4682B4", fontSize: "28px", fontWeight: "bold" }}>
                        申請者影像資料
                    </div>
                    <div style={{ borderBottom: '1px solid black' }}></div>
                    <div style={{ margin: 20 }}></div>
                </div>
                <table border="1">
                    <thead>
                        <tr>
                            <th style={{ width: 200 }}></th>
                            <th style={{ width: 400 }}>原始影像資料</th>
                            <th style={{ width: 400 }}>重新上傳資料</th>
                            <th style={{ width: 100 }}>選擇照片按鈕</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 300 }}>健保卡正面</td>
                            <td style={{ height: 300 }}>
                                <div style={{ width: 400, height: 300, borderRadius: 10, backgroundColor: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    { applyData && applyData.length > 0 ? <img src={applyData[0].frontImgURL} style={{ width: 390, height: 290, borderRadius: 10 }}/> : <div style={{ width: '100%', height: '100%', backgroundColor: 'white' }}></div> }
                                </div>
                            </td>
                            <td>
                                {
                                    selectedFrontImage && FrontImageUrl ? (
                                        <div style={{ width: 400, height: 300 }}>
                                            {/* <div style={{ height: '10%', fontWeight: 'bold', fontSize: 20 }}>照片預覽：</div> */}
                                            <img src={FrontImageUrl} alt={selectedFrontImage.name} style={{ width: 400, height: '100%' }}/>
                                        </div>
                                    ) : <img src={front} alt="example" style={{ width: 400, height: 300 }}/>
                                }
                            </td>
                            <td>
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-front-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => { setselectedFrontImage(e.target.files[0]);}}
                                    key={selectedFrontImage} // Add a key prop to force re-rendering of input element
                                />
                                <label htmlFor="select-front-image">
                                    <Button variant="outlined" color='primary' component="span" style={{ color: '#4169E1', width: 125, height: 50, margin: 10, fontSize: 18 }}>
                                        上傳圖片
                                    </Button>
                                </label>
                                <Button variant="outlined" color='primary' component="span" style={{ color: '#4169E1', width: 125, height: 50, margin: 10, fontSize: 18 }} onClick={() => { setselectedFrontImage(null); setFrontImageUrl(null); }}>
                                    刪除圖片
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 300 }}>健保卡反面</td>
                            <td style={{ height: 300 }}>
                                {/* John */}
                                <div style={{ width: 400, height: 300, borderRadius: 10, backgroundColor: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    { applyData && applyData.length > 0 ? <img src={applyData[0].backImgURL} style={{ width: 390, height: 290, borderRadius: 10 }}/> : <div style={{ width: '100%', height: '100%', backgroundColor: 'white' }}></div>}
                                </div>
                            </td>
                            <td>
                                {
                                    selectedBackImage && BackImageUrl ? (
                                        <div style={{ width: 400, height: 300 }}>
                                            {/* <div style={{ height: '10%', fontWeight: 'bold', fontSize: 20 }}>照片預覽：</div> */}
                                            <img src={BackImageUrl} alt={selectedBackImage.name} style={{ width: 400, height: '100%' }}/>
                                        </div>
                                    ) : <img src={back} alt="example" style={{ width: 400, height: 300 }}/>
                                }
                            </td>
                            <td>
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-back-image"
                                    style={{ display: "none" }}
                                    onChange={(e) => { setselectedBackImage(e.target.files[0]);}}
                                    key={selectedBackImage} // Add a key prop to force re-rendering of input element
                                />
                                <label htmlFor="select-back-image">
                                    <Button variant="outlined" color='primary' component="span" style={{ color: '#4169E1', width: 125, height: 50, margin: 10, fontSize: 18 }}>
                                        上傳圖片
                                    </Button>
                                </label>
                                <Button variant="outlined" color='primary' component="span" style={{ color: '#4169E1', width: 125, height: 50, margin: 10, fontSize: 18 }} onClick={() => { setselectedBackImage(null); setBackImageUrl(null); }}>
                                    刪除圖片
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 300 }}>陳述影片</td>
                            <td style={{ height: 300 }}>
                                {applyData && applyData.length > 0 ?
                                (applyData[0].videoURL ?
                                    <video controls style={{ width: 400, height: 270 }} key={applyData[0].videoURL}>
                                    <source src={applyData[0].videoURL} type="video/mp4" style={{ height: '90%' }} />
                                    </video>
                                    :
                                    <div style={{ marginLeft: 250 }}>無影片紀錄</div>
                                )
                                : <></>}
                            </td>
                            <td>
                                {selectedVideo ? (
                                    <div style={{ width: 400, height: 300 }}>
                                        {/* <div style={{ height: '10%', fontWeight: 'bold', fontSize: 20 }}>影片預覽：</div> */}
                                        <video controls style={{ width: 400, height: '100%' }} key={VideoUrl}> 
                                            <source src={VideoUrl} type="video/mp4" style={{ height: '90%' }} />
                                        </video>
                                    </div>
                                ) : <div style={{ width: 400, height: 300 }}>
                                        <></>
                                    </div> }
                            </td>
                            <td>
                                <input
                                    accept="video/*"
                                    type="file"
                                    id="select-video"
                                    style={{ display: "none" }}
                                    onChange={(e) => { setSelectedVideo(e.target.files[0]); }}
                                />
                                <label htmlFor="select-video">
                                    <Button variant="outlined" color='primary' component="span" style={{ color: '#4169E1', width: 125, height: 50, margin: 10, fontSize: 18 }}>
                                        上傳影片
                                    </Button>
                                </label>
                                <Button variant="outlined" color='primary' component="span" style={{ color: '#4169E1', width: 125, height: 50, margin: 10, fontSize: 18 }} onClick={() => { setSelectedVideo(null); }}>
                                    刪除影片
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ margin: 20 }}></div>

                <div>
                    <div style={{ color: "#4682B4", fontSize: "28px", fontWeight: "bold" }}>
                        申請者同意捐贈器官
                    </div>
                    <div style={{ borderBottom: '1px solid black' }}></div>
                    <div style={{ margin: 20 }}></div>
                </div>
                <div style={{ margin: 20 }}></div>
                <table border="1">
                    <thead>
                        <tr>
                            <th style={{ width: 200 }}></th>
                            <th style={{ width: 450 }}>原始勾選同意器官</th>
                            <th style={{ width: 450 }}>重新勾選同意器官</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 300 }}>同意器官</td>
                            <td style={{ width: 450 }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {buttons.map((ele, i) => (
                                        <FormControlLabel key={i} control={<Checkbox disabled checked={fixed[i]} onChange={() => handleCheckboxChange(i)} />} label={ele} style={{ width: '25%' }}/>
                                    ))}
                                </div>
                            </td>
                            <td style={{ width: 450, textAlign: 'center' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {buttons.map((ele, i) => (
                                        <FormControlLabel key={i} control={<Checkbox checked={selected[i]} onChange={() => handleCheckboxChange(i)} />} label={ele} style={{ width: '25%' }}/>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="outlined" color='primary' component="span" onClick={async() => { await uploadData(); }} style={{ margin: 20 }}>確定送出</Button>
                    <Button variant="outlined" color='secondary' component="span" onClick={async() => { await deleteData(); }} style={{ margin: 20 }}>{applyData[0]?.deleted ? "恢復申請" : "撤銷申請"}</Button>
                </div>
                <div style={{ margin: 30 }}></div>
            </div>

            <Dialog open={open} onClose={DialogClose} disableBackdropClick>
                <DialogTitle>等待上傳結果</DialogTitle>
                <DialogContent>
                    <div>影像資料上傳中</div>
                    <div>請等待上傳結果...</div>
                </DialogContent>
                {/* If you want to allow closing the dialog, uncomment the following lines */}
                {/* <DialogActions>
                <Button onClick={DialogClose} color="primary">
                    Close
                </Button>
                </DialogActions> */}
            </Dialog>
            <Dialog open={warnOpen} onClose={() => { setWarnOpen(false); }}>
                <DialogTitle>{applyData[0]?.deleted ? "確定要恢復申請嗎？" : "確定要撤銷申請嗎？"}</DialogTitle>
                <DialogContent>
                    {
                        applyData[0]?.deleted ? 
                            <>
                                <div>若之後要撤銷申請狀態</div>
                                <div>請進入申請紀錄頁面點選撤銷申請</div>
                            </> : 
                            <>
                                <div>若之後要恢復申請狀態</div>
                                <div>請進入申請紀錄頁面點選恢復申請</div>
                            </>
                    }
                </DialogContent>
                {/* If you want to allow closing the dialog, uncomment the following lines */}
                <DialogActions>
                <Button onClick={() => { setWarnOpen(false); }} color="primary">
                    關閉視窗
                </Button>
                <Button onClick={DialogWarnClose} color="primary">
                    確定
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Record;

// onClick