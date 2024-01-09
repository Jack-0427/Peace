import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material"
import { useData } from '../hooks/SendData';

const ShowEdit = () => {
    const { id } = useParams();

    const location = useLocation();
    const rowData = location.state && location.state.rowData;

    const navigate = useNavigate();

    const { Review, handleOpen, setWarnMessage, setWarnState } = useData();

    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [message, setMessage] = useState("健保卡正面與健保卡反面均未通過審核");

    const handleCheckboxChange1 = (event) => {
        setIsChecked1(event.target.checked);
    };

    const handleCheckboxChange2 = (event) => {
        setIsChecked2(event.target.checked);
    };

    const onClick = async() => {
        try{
            console.log("test");
            const msg = await Review(rowData._id, message);
            handleOpen(true);
            setWarnMessage(msg);
            // console.log(message);
            // console.log(msg);
            if (msg === "審核資料成功"){
                navigate('/allRecords');
                setWarnState(false);
            }
            else{
                setWarnState(true);
            }
        }catch(err){
            console.log(err)
            handleOpen(true);
            setWarnMessage(`有一些錯誤發生 ${err}`);
            setWarnState(true);
        }
    }

    useEffect(() => {
        if (isChecked1 && isChecked2){
            setMessage("審核通過")
        }
        else if (isChecked1 && !isChecked2){
            setMessage("健保卡反面未通過審核")
        }
        else if (!isChecked1 && isChecked2){
            setMessage("健保卡正面未通過審核")
        }
        else if (!isChecked1 && !isChecked2){
            setMessage("健保卡正面與健保卡反面均未通過審核")
        }
    }, [isChecked1, isChecked2])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div>
                <div style={{ color: "#4682B4", fontSize: "28px", fontWeight: "bold" }}>
                    申請者基本資料
                </div>
                <div style={{ borderBottom: '1px solid black' }}></div>
                <div style={{ margin: 20 }}></div>
            </div>
            <table border="1">
                <thead>
                    <tr>
                        <th style={{ width: 200, textAlign: 'center' }}>姓名：</th>
                        <th style={{ width: 200, textAlign: 'center' }}>身分證字號：</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'center' }}>{rowData.姓名}</td>
                        <td style={{ textAlign: 'center' }}>{rowData.身分證字號}</td>
                    </tr>
                </tbody>
            </table>
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
                        <th style={{ width: 600 }}>影像資料</th>
                        <th style={{ width: 80 }}>是否通過</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 300 }}>健保卡正面</td>
                        <td style={{ height: 300 }}>
                            {/* John */}
                            <div style={{ width: 400, height: 300, borderRadius: 10, marginLeft: 100, backgroundColor: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={rowData.健保卡正面圖片網址} style={{ width: 390, height: 290, borderRadius: 10 }}/>
                            </div>
                        </td>
                        <td>
                            {/* 99 */}
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isChecked1}
                                    onChange={handleCheckboxChange1}
                                    style={{ width: 20, height: 20, marginLeft: 30 }}
                                />
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 300 }}>健保卡反面</td>
                        <td style={{ height: 300 }}>
                            {/* John */}
                            <div style={{ width: 400, height: 300, borderRadius: 10, marginLeft: 100, backgroundColor: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={rowData.健保卡反面圖片網址} style={{ width: 390, height: 290, borderRadius: 10 }}/>
                            </div>
                        </td>
                        <td>
                            {/* 99 */}
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isChecked2}
                                    onChange={handleCheckboxChange2}
                                    style={{ width: 20, height: 20, marginLeft: 30 }}
                                />
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 300 }}>陳述影片</td>
                        <td style={{ height: 300 }}>
                            {rowData.陳述影片網址 ? 
                                <video controls style={{ width: 400, height: 270, marginLeft: 100 }} key={rowData.videoURL}> 
                                    <source src={rowData.陳述影片網址} type="video/mp4" style={{ height: '90%' }} />
                                </video> : <div style={{ marginLeft: 250 }}>無影片紀錄</div>
                            }
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
            <table border="1">
                <thead>
                    <tr>
                        <th style={{ width: 600 }}>同意捐贈器官</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'center' }}>{rowData.同意捐贈器官}</td>
                    </tr>
                </tbody>
            </table>
            <div style={{ margin: 20 }}></div>
            <Button variant="outlined" onClick={onClick}>確定送出</Button>
            <div style={{ margin: 30 }}></div>
        </div>
    )
}

export default ShowEdit;