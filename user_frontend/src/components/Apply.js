import { useLocation } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser'

const Apply = () => {
    const location = useLocation();
    const firstURL = decodeURIComponent((location.pathname + location.search).split("/")[1]);
    const navigate = useNavigate();

    const { isChecked, isLoggedIn, token, setChecked, setWarn, setWarnState, handleOpen } = useUser();

    const checkboxChange = (event) => {
        setChecked(event);
    };

    const sendApplyOut = () => {
        if(!isChecked){
            setWarn("請先勾選同意按鈕");
            setWarnState(false);
            handleOpen();
        }
        else if(!isLoggedIn || token === ""){
            setWarn("請先完成登入");
            setWarnState(false);
            handleOpen();
        }
        else{
            setWarn("進入申請頁面");
            setWarnState(true);
            handleOpen();
            navigate('./填寫申請資料')
        }
    }
    
    const PrecautionsDict = {
        "器官捐贈移植": `一、依人體器官移植條例之規定，器官捐贈必須為無償之行為，且器官之摘取，應於病人之診治醫師判定死亡後為之(含腦死判定)。如病人為非病死或疑似為非病死者，必須於依法相驗完畢後，且經檢察官認無繼續勘驗之必要後，才能施行。\n二、另依人體器官移植條例第六條之規定，醫師自往生者遺體摘取器官以供移植，須符合下列規定之一： (1) 往生者生前以書面(如本同意書)或遺囑同意。 (2) 往生者最近親屬以書面同意。\n三、您簽署的器官捐贈同意書，將依人體器官移植條例第六條規定，加註於健保卡並掃描存檔於衛生福利部預立醫療決定、安寧緩和醫療及器官捐贈意願資訊系統：如醫院、醫師遇有病人經診斷其病情於近期內進行死亡已不可避免，且該病人無法清楚表達意識之情況下，將以此作為決定器官捐贈之依循，並可讓家屬充分了解病人生前之意願。醫院、醫師絕不會因知悉此捐贈意願而不施予必要治療。\n四、捐贈者如患無法控制的感染性疾病，如庫賈氏病(Creutzfeldt-Jacob Disease，CJD) ...等等，為避免因器官移植而傳染給受贈者，醫院、醫師得不接受病人之器官捐贈。\n五、您所表達之器官捐贈意願，可隨時查詢或撤回。如欲查詢或撤回該意願，可聯絡下列單位協助處理：衛生福利部預立醫療決定、安寧緩和醫療及器官捐贈意願資訊系統資料處理小組，電話：02-23933298\n六、本資料僅供器官捐贈意願表達使用，將依個人資料保護法，善盡保密之責任。`,
        "病人自主及安寧緩和": ``
    };

    const defaultPrecautions = PrecautionsDict[firstURL] || [];

    return (
        <>
            <div style={{ color: '#4682B4', fontSize: '28px', fontWeight: 'bold' }}>
                線上申請
            </div>
            <div style={{ borderBottom: '1px solid black', margin: '10px 0' }}></div>
            {defaultPrecautions.length > 0 && <div style={{ backgroundColor: '#f2f2f2', padding: '20px', marginLeft: '10%', marginRight: '10%', }}>
                <div style={{ backgroundColor: '#ffffff', padding: '10px', maxHeight: '450px', overflow: 'auto' }}>
                    
                    <div style={{ margin: '10px' }}>
                        {defaultPrecautions.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                            <div style={{ height: '10px' }}></div>
                        </React.Fragment>
                        ))}
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <input type="checkbox" id="confirmationCheckbox" checked={isChecked} onChange={(event) => {checkboxChange(event)}} />
                    <label htmlFor="confirmationCheckbox">我已閱讀並同意以上注意事項</label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <button style={{ alignSelf: 'center' }} onClick={() => { sendApplyOut() }}>確認送出</button>
                </div>
            </div>}
        </>
    )
}

export default Apply;