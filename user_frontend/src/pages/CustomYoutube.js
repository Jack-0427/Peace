import YouTube from 'react-youtube';
import './css/Youtube.css';
import { useState, useEffect } from "react";

const MyYoutube = () => {
    const opts = {
        height: '380',
        width: '630',
    };

    const VideoDict = {
        "關於我們": "",
        "器官捐贈移植": "G4PgmbjPlpM",
        "病人自主及安寧緩和": "lgJTJ0cM0Oc",
    };

    const [label, setLabel] = useState("器官捐贈移植");
    const [chooseId, setChooseId] = useState("G4PgmbjPlpM");

    const selectLabel = (myLabel) => {
        setLabel(myLabel);
        setChooseId(VideoDict[myLabel]);
    }

    // id: lgJTJ0cM0Oc // 預立安寧

    return(
        <>
            <div style={{ width: '100%', height: 80, backgroundColor: '#FFF0F5', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <h1 style={{ marginLeft: 30, color: '#A0522D' }}>影片介紹</h1>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ width: '45%', height: 500, borderRadius: 30, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white' }}>
                    <div style={{ width: '80%', height: '25%', borderRadius: 30, backgroundColor: '#FFFAF0', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10%', cursor: 'pointer' }}
                         className="hoverable"
                         onClick={() => { selectLabel("關於我們") }}
                    >
                        <div style={{ fontSize: 25, fontWeight: 'bold', color: label === "關於我們" ? '#6A5ACD' : 'black', userSelect: 'none' }}>關於我們</div>
                        <div style={{ marginTop: 10, fontWeight: 'bold', color: label === "關於我們" ? '#6A5ACD' : 'black', userSelect: 'none' }}>仔細安排您的後事，讓您能夠安心地離去</div>
                    </div>
                    <div style={{ width: '80%', height: '25%', borderRadius: 30, backgroundColor: '#FFFAF0', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10%', cursor: 'pointer' }}
                         className="hoverable"
                         onClick={() => { selectLabel("器官捐贈移植") }}
                    >
                        <div style={{ fontSize: 25, fontWeight: 'bold', color: label === "器官捐贈移植" ? '#6A5ACD' : 'black', userSelect: 'none' }}>器官捐贈移植</div>
                        <div style={{ marginTop: 10, fontWeight: 'bold', color: label === "器官捐贈移植" ? '#6A5ACD' : 'black', userSelect: 'none' }}>生命連結，一份無私的禮物</div>
                    </div>
                    <div style={{ width: '80%', height: '25%', borderRadius: 30, backgroundColor: '#FFFAF0', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10%', cursor: 'pointer' }}
                         className="hoverable"
                         onClick={() => { selectLabel("病人自主及安寧緩和") }}
                    >
                        <div style={{ fontSize: 25, fontWeight: 'bold', color: label === "病人自主及安寧緩和" ? '#6A5ACD' : 'black', userSelect: 'none' }}>病人自主及安寧緩和</div>
                        <div style={{ marginTop: 10, fontWeight: 'bold', color: label === "病人自主及安寧緩和" ? '#6A5ACD' : 'black', userSelect: 'none' }}>與您一同設計尊嚴告別的旅程，讓生命留下尊榮的痕跡</div>
                    </div>
                </div>
                <div 
                    style={{ width: '45%', height: 500, backgroundColor: '#F0F8FF', borderRadius: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                >
                    <div style={{ width: '100%', backgroundColor: 'white', color: '#4169E1', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontSize: 30, fontWeight: 'bold' }}>{label}</div>
                    <div className="custom-youtube">
                        <YouTube
                            opts={opts}
                            videoId={chooseId}
                            id={chooseId}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyYoutube;