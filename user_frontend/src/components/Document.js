import { useLocation } from 'react-router-dom';
import pdfLabel from '../pdfLabel.jpg'

const Document = () => {
    const location = useLocation();
    const firstURL = decodeURIComponent((location.pathname + location.search).split("/")[1]);

    const fileDict = {
        "器官捐贈移植": [
            ['../器官捐贈/器官捐贈同意書.pdf', require('../器官捐贈/器官捐贈同意書.pdf')],
            ['../器官捐贈/器官捐贈撤回聲明書.pdf', require('../器官捐贈/器官捐贈撤回聲明書.pdf')]
        ],
        "病人自主及安寧緩和": [
            ['../安寧療護/安寧療護意願書.pdf', require('../安寧療護/安寧療護意願書.pdf')],
            ['../安寧療護/預立安寧緩和醫療暨維生醫療抉擇撤回聲明書(衛福部公告版).pdf', require('../安寧療護/預立安寧緩和醫療暨維生醫療抉擇撤回聲明書(衛福部公告版).pdf')],
            ['../安寧療護/醫療委任代理人委任書.pdf', require('../安寧療護/醫療委任代理人委任書.pdf')],
            ['../安寧療護/不施行心肺復甦術同意書.pdf', require('../安寧療護/不施行心肺復甦術同意書.pdf')],
            ['../安寧療護/不施行維生醫療同意書.pdf', require('../安寧療護/不施行維生醫療同意書.pdf')],
        ]
    };

    const defaultFiles = fileDict[firstURL] || [];

    return (
        <>
            <div style={{ color: "#4682B4", fontSize: "28px", fontWeight: "bold" }}>
                {firstURL}申請文件
            </div>
            <div style={{ borderBottom: '1px solid black' }}></div>
            <div>
                {
                    defaultFiles.map((ele, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '5%', backgroundColor: '#98FB98', margin: 20, boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.3)' }}>
                            <div style={{ marginLeft: '2%', backgroundColor: 'blue', width: 10, height: 10, borderRadius: '50%' }}></div>
                            <div style={{ flex: 1, marginLeft: '1%', color: '#2F4F4F', fontWeight: "bold" }}>
                                {ele[0].split("/")[2].split(".")[0]}
                            </div>
                            <a href={ele[1]} style={{ height: '50px', width: '50px', display: 'inline-block', marginRight: '2%' }} download={ele[0].split("/")[2].split(".")[0]}>
                                <img src={pdfLabel} alt="pdf" style={{ width: '90%', height: '90%' }} />
                            </a>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Document;