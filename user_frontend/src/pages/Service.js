import React from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { sendServiceData } from '../hooks/api';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useUser } from "../hooks/useUser";

const Service = () => {

    const options = [
        '心理諮詢服務',
        '拍攝影片服務',
        '法律諮詢服務',
    ];

    const navigate = useNavigate();
    const { topRef, setWarn, setWarnState, handleOpen } = useUser();

    const getService = () => {
        let text = "";
        for(let i = 0; i < options.length; i++){
            text += selectedService[i] ? `${options[i]} ` : "";
        }
        return text.slice(0, text.length);
    }

    const sendOut = async() => {
        const service = getService();
        if( service === "" || name === "" || phone === "" || email === "" || location === "請選擇服務地點" ){
            handleOpen();
            setWarn(`請完整填寫資料再上傳`);
            setWarnState(false);
            topRef.current.scrollIntoView();
            return;
        }
        const datetime = new Date(time.$d);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
        const dateTimeString = datetime.toLocaleString('en-US', options);
        const [datePart, timePart] = dateTimeString.split(', ');
        const [month, day, year] = datePart.split('/');
        const formattedDateTimeString = `${year}-${month}-${day}, ${timePart}`;

        let sendData = {
            service: service,
            location: location,
            state: "預約中",
            time: formattedDateTimeString,
            name: name,
            phone: phone,
            email: email,
            special: special !== "" ? special : "無",
        }
        const msg = await sendServiceData(sendData);

        handleOpen();
        setWarn(msg);
        setWarnState(true);
        navigate('/');
        topRef.current.scrollIntoView();
    }

    const [location, setLocation] = useState('請選擇服務地點');
    const [selectedService, setSelectedService] = useState(Array(options.length).fill(false));
    const [time, setTime] = useState(dayjs());
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [special, setSpecial] = useState("");

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleServiceClick = (index) => {
        setSelectedService(selectedService.map((ele, i) => (i === index ? !ele: ele)))
    };
  
    return (
        <>
            <div style={{ color: "#4682B4", fontSize: "28px", fontWeight: "bold" }}>
                申請服務
            </div>
            <div style={{ borderBottom: '1px solid black' }}></div>
            <div style={{ height: 20 }}></div>
            <Paper variant="outlined">
                <h2 style={{ margin: '2%' }}>請選擇服務地點：</h2>
                <Box sx={{ margin: '2%' }}>
                    <FormControl required fullWidth>
                        <InputLabel 
                            id="demo-simple-select-label" 
                            sx={{ fontWeight: 'bold' }}
                        >服務地點</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={location}
                            label="服務地點"
                            onChange={handleLocationChange}
                        >
                            <MenuItem value={"請選擇服務地點"}>請選擇服務地點</MenuItem>
                            <MenuItem value={"新北市三重區文化南路12號"}>新北市三重區文化南路12號</MenuItem>
                            <MenuItem value={"新北市三重區力行路二段63巷7號"}>新北市三重區力行路二段63巷7號</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Paper>
            <Paper variant="outlined">
                <h2 style={{ margin: '2%' }}>請選擇服務內容：</h2>
                <Box style={{ margin: '2%' }}>
                    {
                        options.map((ele, i) => (
                            <FormControlLabel 
                                key={i} 
                                control={
                                    <Checkbox 
                                        checked={selectedService[i]} 
                                        onClick={() => {handleServiceClick(i)}}/>} 
                                        label={ele}
                                    >
                            </FormControlLabel>
                        ))
                    }
                </Box>
            </Paper>
            <Paper variant="outlined">
                <h2 style={{ margin: '2%' }}>請選擇服務時間：</h2>
                <Box sx={{ margin: '2%' }}>             
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                                sx={{ width: '50%' }}
                                label="Controlled picker"
                                value={time}
                                onChange={(newValue) => setTime(newValue)}

                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
            </Paper>
            <Paper variant="outlined">
                <h2 style={{ margin: '2%'}}>請填寫聯絡事項：</h2>
                <Box 
                    component="form"
                    sx={{
                        margin: '2%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                        required
                        sx={{ width: '95%' }} 
                        id="name-basic" 
                        label="姓名" 
                        variant="outlined" 
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </Box>
                <Box
                    component="form"
                    sx={{
                        margin: '2%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                        required 
                        sx={{ width: '45%' }} 
                        id="phone-basic" 
                        label="電話號碼" 
                        variant="outlined"
                        onChange={(e) => { setPhone(e.target.value) }}
                    />
                    <TextField 
                        required
                        sx={{ width: '45%' }} 
                        id="email-basic" 
                        label="電子信箱" 
                        variant="outlined"
                        onChange={(e) => { setEmail(e.target.value) }} 
                    />
                </Box>
                <Box
                    component="form"
                    sx={{
                        margin: '2%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                        sx={{ width: '95%' }} 
                        id="special-basic" 
                        label="特殊需求" 
                        variant="outlined" 
                        multiline
                        rows={8}
                        onChange={(e) => { setSpecial(e.target.value) }} 
                    />
                </Box>
            </Paper>
            <div style={{ height: 20 }}></div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Button 
                    variant="contained" 
                    sx={{ width: '200px', height: '50px', fontSize: 24, fontWeight: 'bold', fontFamily: '標楷體' }}
                    onClick={() => { sendOut(); }}
                >
                    確認預約
                </Button>
            </div>
            <div style={{ height: 40 }}></div>
        </>
    )
}

export default Service;