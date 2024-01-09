import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import front from "../健保卡正面.jpg"
import back from "../健保卡反面.jpg"
import { useUser } from "../hooks/useUser";
import BackupIcon from '@mui/icons-material/Backup';
import { sendApplyData } from '../hooks/api'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";

const SendApply = () => {

    const buttons = ["全部捐贈", "肺臟", "胰臟", "小腸", "皮膚", "心瓣膜", "心臟", "肝臟", "腎臟", "眼角膜", "骨骼", "血管"];

    const [selectedFrontImage, setselectedFrontImage] = useState(null);
    const [FrontImageUrl, setFrontImageUrl] = useState(null);
    const [selectedBackImage, setselectedBackImage] = useState(null);
    const [BackImageUrl, setBackImageUrl] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [VideoUrl, setVideoUrl] = useState(null);
    const [selected, setSelected] = useState(Array(buttons.length).fill(false));
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const DialogOpen = () => {
        setOpen(true);
    };

    const DialogClose = () => {
        topRef.current.scrollIntoView();
        setOpen(false);
    };

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
        console.log(text);
        return text
    }

    const { token, topRef, setWarn, setWarnState, handleOpen } = useUser();

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
            if(!selectedFrontImage || !selectedBackImage){
                handleOpen();
                setWarn(`健保卡正面與健保卡反面都要上傳`);
                setWarnState(false);
                DialogClose();
                return;
            }
            const text = getText();
            const front = await uploadFront();
            const back = await uploadBack();
            const video = await uploadVideo();

            const mes = await sendApplyData(token, front, back, video, text);
            navigate('/器官捐贈移植/使用者紀錄');
            handleOpen();
            setWarn(mes);
            setWarnState(true);
            DialogClose();
        }catch(err){
            console.log(err);
            handleOpen();
            setWarn(`影像資料上傳失敗`);
            setWarnState(false);
            DialogClose();
        }
    };

    useEffect(() => {
        if (selectedFrontImage) {
            setFrontImageUrl(URL.createObjectURL(selectedFrontImage));
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
        // Update local storage when the state values change
        localStorage.setItem('selectedFrontImage', selectedFrontImage);
        localStorage.setItem('FrontImageUrl', FrontImageUrl);
        localStorage.setItem('selectedBackImage', selectedBackImage);
        localStorage.setItem('BackImageUrl', BackImageUrl);
        localStorage.setItem('selectedVideo', selectedVideo);
        localStorage.setItem('VideoUrl', VideoUrl);
    }, [selectedFrontImage, FrontImageUrl, selectedBackImage, BackImageUrl, selectedVideo, VideoUrl]);

    return(
        <>
            <div style={{ color: "#4682B4", fontSize: "28px", fontWeight: "bold" }}>
                填寫申請資料
            </div>
            <div style={{ borderBottom: '1px solid black' }}></div>
            <div style={{ backgroundColor: '#87CEFA', color: '#006400', marginTop: 20, marginLeft: '5%', width: '90%', height: 50, borderRadius: 30, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontSize: 28, fontWeight: 'bold' }}>
                健保卡正面上傳(必須)
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#AFEEEE', marginLeft: '5%', width: '90%', height: 400, borderRadius: 50, }}>
                <div style={{ backgroundColor: '#FFFFF0', width: '45%', height: '80%', borderRadius: 20, marginLeft: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                    <BackupIcon sx={{ width: 100, height: 100, color: '#FA8072', }}/>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <input
                            accept="image/*"
                            type="file"
                            id="select-front-image"
                            style={{ display: "none" }}
                            onChange={(e) => { setselectedFrontImage(e.target.files[0]); }}
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
                    </div>
                </div>
                {
                    selectedFrontImage && FrontImageUrl ? (
                        <div style={{ width: '45%', height: '80%' }}>
                            <div style={{ height: '10%', fontWeight: 'bold', fontSize: 20 }}>照片預覽：</div>
                            <img src={FrontImageUrl} alt={selectedFrontImage.name} style={{ height: '90%' }}/>
                        </div>
                    ) : <img src={front} alt="example" style={{ width: '45%', height: '80%' }}/>
                }
            </div>
            <div style={{ backgroundColor: '#87CEFA', color: '#006400', marginTop: 20, marginLeft: '5%', width: '90%', height: 50, borderRadius: 30, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontSize: 28, fontWeight: 'bold' }}>
                健保卡反面上傳(必須)
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#AFEEEE', marginLeft: '5%', width: '90%', height: 400, borderRadius: 50, }}>
                <div style={{ backgroundColor: '#FFFFF0', width: '45%', height: '80%', borderRadius: 20, marginLeft: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                    <BackupIcon sx={{ width: 100, height: 100, color: '#FA8072', }}/>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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
                    </div>
                </div>
                {
                    selectedBackImage && BackImageUrl ? (
                        <div style={{ width: '45%', height: '80%' }}>
                            <div style={{ height: '10%', fontWeight: 'bold', fontSize: 20 }}>照片預覽：</div>
                            <img src={BackImageUrl} alt={selectedBackImage.name} style={{ height: '90%' }}/>
                        </div>
                    ) : <img src={back} alt="example" style={{ width: '45%', height: '80%' }}/>
                }
            </div>
            <div style={{ backgroundColor: '#87CEFA', color: '#006400', marginTop: 20, marginLeft: '5%', width: '90%', height: 50, borderRadius: 30, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontSize: 28, fontWeight: 'bold' }}>
                影片上傳(非必須)
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#AFEEEE', marginLeft: '5%', width: '90%', height: 400, borderRadius: 50 }}>
                <div style={{ backgroundColor: '#FFFFF0', width: '45%', height: '80%', borderRadius: 20, marginLeft: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <BackupIcon sx={{ width: 100, height: 100, color: '#FA8072' }} />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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
                    </div>
                </div>
                {selectedVideo ? (
                    <div style={{ width: '45%', height: '80%' }}>
                        <div style={{ height: '10%', fontWeight: 'bold', fontSize: 20 }}>影片預覽：</div>
                        <video controls style={{ height: '90%' }} key={VideoUrl}> 
                            <source src={VideoUrl} type="video/mp4" style={{ height: '90%' }} />
                        </video>
                    </div>
                ) : <div style={{ width: '45%', height: '80%' }}>
                        <div style={{ height: '10%', fontWeight: 'bold', fontSize: 20 }}>影片預覽：</div>
                    </div> }
            </div>
            <div style={{ backgroundColor: '#87CEFA', color: '#006400', marginTop: 20, marginLeft: '5%', width: '90%', height: 50, borderRadius: 30, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontSize: 28, fontWeight: 'bold' }}>
                願意捐贈器官(可複選)
            </div>
            <div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ width: '80%' }}>
                    {buttons.map((ele, i) => (
                        <FormControlLabel key={i} control={<Checkbox checked={selected[i]} onChange={() => handleCheckboxChange(i)} />} label={ele} style={{ width: '15%', margin: '0.5rem' }} />
                    ))}
                </div>
            </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Button variant="outlined" color='primary' component="span" onClick={async() => { await uploadData(); }} style={{ margin: 20 }}>確定上傳</Button>
            </div>
            

            {/* 等待框 */}
            <Dialog open={open} onClose={DialogClose} disableBackdropClick>
                <DialogTitle>等待上傳結果</DialogTitle>
                <DialogContent>
                    <div>影像資料上傳中</div>
                    <div>請等待上傳結果...</div>
                {/* Additional content or loading indicator */}
                </DialogContent>
                {/* If you want to allow closing the dialog, uncomment the following lines */}
                {/* <DialogActions>
                <Button onClick={DialogClose} color="primary">
                    Close
                </Button>
                </DialogActions> */}
            </Dialog>
            
            <div style={{ height: 50 }}></div>
            
        </>
    )
}

export default SendApply;