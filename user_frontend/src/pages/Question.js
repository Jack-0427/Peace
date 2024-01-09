import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';

const Question = () => {
    const location = useLocation();
    const firstURL = decodeURIComponent((location.pathname + location.search).split("/")[1]);

    const questionDict = {
        "器官捐贈移植": [
            [`器官捐贈是否需自付費用？`, `1. 器官捐贈產生的費用由健保全額給付，不需自行負擔。`],
            [`器官捐贈有年齡限制嗎？`, `1. 年齡並非器官捐贈最重要的考量，重視的是捐贈者的器官功能而非實際年齡，實務上仍有80歲的器官捐贈者，肝腎捐贈後，受贈者仍可因此恢復正常生活`],
            [`我表達了器官捐贈意願，有醫療需求送醫治療，會不會被放棄救治？`, `1. 若生病或受傷送醫之病人，醫療團隊絕對會盡全力搶救，只有在所有挽救生命方式都失敗，且病人家屬也同意的前提下，才可能進行器官捐贈。因此，表達器官捐贈的意願，並不會影響醫療人員對您的照顧品質。`],
            [`簽署器官捐贈同意書，是否會和大體捐贈意願衝突？`, `1. 器官捐贈及大體捐贈之意願可同時表達簽署不相衝突，待無常來臨時再視身體狀況由醫護人員判斷適合進行哪一種捐贈。`],
            [`什麼是心臟停止死亡後器官捐贈(DCD)？`, `1. 當疾病已不可治癒，經醫師評估為末期病人者，如果撤除維生系統經醫師判定死亡後，有機會進行DCD。`],
            [`如果我未來過世捐出器官，家人可獲優先移植或是可以指定捐贈對象嗎？`, `1. 一般來說，每個捐贈出來的器官，皆會經由衛生福利部委託「財團法人器官捐贈移植登錄及病人自主推廣中心」，以公平、公正的平台進行分配，不能任意指定。\n2. 不過，為了尊重及感謝捐贈者及家屬，法令規定器官捐贈者同意捐贈的器官若超過兩個，且至少一個器官須協助其他人，則其他器官可指定捐贈給配偶、五親等內之血親或姻親；完成器官捐贈後，日後捐贈者的配偶或三等親內血親若有器官移植之需要，就有優先獲得其他捐贈者大愛捐贈器官的機會。`],
            [`器官捐贈後政府如何感念捐贈者及家屬的付出？`, `1. 有感於器官捐贈者無私大愛的精神，本中心及醫院會舉辦感恩追思會或相關活動，邀請其他器官捐贈者家屬一同參與。衛生福利部也會協同醫院提供喪葬補助費，並委由醫院社工人員協助處理。`],
            [`植物人可以捐贈器官嗎？`, `1. 植物人是指腦部因為受傷、疾病或其他系統的疾病合併腦病變，導致大腦功能喪失，此類病人雖然無法思考、記憶、認知、行為或喪失語言能力，但仍會有臉部表情動作，且腦幹功能正常，可以維持自發性的呼吸、心跳，所以於植物人狀態不能捐贈器官，但是植物人如果過世之後，一樣可以像一般人一樣捐贈器官。`],
            [`施行器官捐贈會痛嗎？我的外觀會受影響嗎？`, `1. 器官摘取時是採以嚴謹的外科手術標準進行，手術過程中，全程都有麻醉科醫師參與，所以麻醉藥物都是照正常手術一樣的施予，手術後對於捐贈者也有嚴謹的處理規定，所以請您不用擔心；另外，縫合方式也會符合外科手術的標準，醫院必須將消毒液擦乾淨，並穿好衣服，整理儀容，捐贈眼角膜時兩眼的縫合線需要對稱，且會使用肉色的內縫線，並使用義眼片以恢復原本外觀。`],
            [`哪些器官、組織可以捐贈？`, `1. 依據人體器官移植條例施行細則規定，移植的器官淚目包括：心臟、肝臟、腎臟、肺臟、胰臟、小腸、骨骼、眼角膜及其他經中央衛生主管機關指定之類目。`],
            [`哪些人可以器官捐贈？`, `1. 絕大多數的人即使有生病或是年紀較大，在過世時還是有部分器官可以進行捐贈，除非有庫賈氏病(狂牛症)或其他不能控制的感染。有B、C型肝炎的捐贈者，只要器官功能良好，也可以捐贈器官給有B、C型肝炎的待移植者。`],
            [`簽署器官捐贈同意書，將來過世時一定可以完成助人的心願？`, `1. 根據《人體器官移植條例》法規第6條內容，器官捐贈意願，只要有捐贈者本身生前的同意即可；若本人沒有明示，則由最近親屬書面同意也可以。但是臨床實務上，儘管本人健保卡已有註記器捐意願，醫院還是徵詢家屬意見，並另外給家屬簽署一張器捐同意書。\n2. 因此，建議可及早與家人溝通您器官捐贈的意願，若能讓家人了解自己的想法與心願，可減少一旦面臨生命終了，進行器官捐贈時對家人的衝擊，也有助家人能配合完成自己的心願。`],
        ],
        "病人自主及安寧緩和": [
            [`器官捐贈是否需自付費用？`, `1. 器官捐贈產生的費用由健保全額給付，不需自行負擔。`],
            [`器官捐贈有年齡限制嗎？`, `1. 年齡並非器官捐贈最重要的考量，重視的是捐贈者的器官功能而非實際年齡，實務上仍有80歲的器官捐贈者，肝腎捐贈後，受贈者仍可因此恢復正常生活`],
            [`我表達了器官捐贈意願，有醫療需求送醫治療，會不會被放棄救治？`, `1. 若生病或受傷送醫之病人，醫療團隊絕對會盡全力搶救，只有在所有挽救生命方式都失敗，且病人家屬也同意的前提下，才可能進行器官捐贈。因此，表達器官捐贈的意願，並不會影響醫療人員對您的照顧品質。`],
            [`簽署器官捐贈同意書，是否會和大體捐贈意願衝突？`, `1. 器官捐贈及大體捐贈之意願可同時表達簽署不相衝突，待無常來臨時再視身體狀況由醫護人員判斷適合進行哪一種捐贈。`],
            [`什麼是心臟停止死亡後器官捐贈(DCD)？`, `1. 當疾病已不可治癒，經醫師評估為末期病人者，如果撤除維生系統經醫師判定死亡後，有機會進行DCD。`],
            [`如果我未來過世捐出器官，家人可獲優先移植或是可以指定捐贈對象嗎？`, `1. 一般來說，每個捐贈出來的器官，皆會經由衛生福利部委託「財團法人器官捐贈移植登錄及病人自主推廣中心」，以公平、公正的平台進行分配，不能任意指定。\n2. 不過，為了尊重及感謝捐贈者及家屬，法令規定器官捐贈者同意捐贈的器官若超過兩個，且至少一個器官須協助其他人，則其他器官可指定捐贈給配偶、五親等內之血親或姻親；完成器官捐贈後，日後捐贈者的配偶或三等親內血親若有器官移植之需要，就有優先獲得其他捐贈者大愛捐贈器官的機會。`],
            [`器官捐贈後政府如何感念捐贈者及家屬的付出？`, `1. 有感於器官捐贈者無私大愛的精神，本中心及醫院會舉辦感恩追思會或相關活動，邀請其他器官捐贈者家屬一同參與。衛生福利部也會協同醫院提供喪葬補助費，並委由醫院社工人員協助處理。`],
            [`植物人可以捐贈器官嗎？`, `1. 植物人是指腦部因為受傷、疾病或其他系統的疾病合併腦病變，導致大腦功能喪失，此類病人雖然無法思考、記憶、認知、行為或喪失語言能力，但仍會有臉部表情動作，且腦幹功能正常，可以維持自發性的呼吸、心跳，所以於植物人狀態不能捐贈器官，但是植物人如果過世之後，一樣可以像一般人一樣捐贈器官。`],
        ],
    };

    const defaultQuestions = questionDict[firstURL] || [];
    const [hideArray, setHideArray] = useState(new Array(5).fill(false))

    // 定義頁面切換的狀態
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setHideArray(hideArray => {
            let newArray = new Array(rowsPerPage).fill(false);
            return newArray; // 更新狀態
        });
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        setHideArray(hideArray => {
            let newArray = new Array(+event.target.value).fill(false);
            return newArray; // 更新狀態
        });
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    };

    const ShowAnswer = (i) => {
        setHideArray(hideArray => {
            let newArray = [...hideArray];
            newArray[i] = !newArray[i];
            return newArray;
        });
    }

    return (
        <>
            <div style={{ color: "#4682B4", fontSize: "28px", fontWeight: "bold" }}>
                常見問題
            </div>
            <div style={{ borderBottom: '1px solid black' }}></div>
            <div>
                {defaultQuestions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ele, i) => (
                    <div key={i} >
                        <div style={{ height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 20, backgroundColor: '#FFB6C1', borderRadius: 5, cursor: 'pointer', userSelect: 'none' }} onClick={() => {ShowAnswer(i)}}>
                            <div style={{ width: 25, height: 25, marginLeft: '1%', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', color: 'white', fontWeight: "bold" }}>Q</div>
                            <div style={{ marginLeft: '1%', fontWeight: "bold" }}>{ele[0]}</div>
                            <div style={{ marginLeft: 'auto', marginRight: 20 }}>
                                { hideArray[i] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
                            </div>
                        </div>
                        {
                            hideArray[i] ? (
                                <div style={{ marginLeft: 50, marginRight: 50, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div style={{ width: 25, height: 25, marginLeft: '1%', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', color: 'white', fontWeight: "bold" }}>A</div>
                                    <div style={{ width: '90%', marginLeft: '1%' }}>
                                        <div style={{ height: 15 }}></div>
                                        {ele[1].split("\n").map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                                <div style={{ height: 10 }}></div>
                                            </React.Fragment>
                                        ))}
                                        <div style={{ height: 5 }}></div>
                                    </div>
                                </div>
                            )
                             : <></>
                        }
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={defaultQuestions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </>
    )
}

export default Question;