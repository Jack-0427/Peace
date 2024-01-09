import React from "react";
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import { Button } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { fetchAll } from '../hooks/api';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { styled } from '@mui/material/styles';

const StyledCSVLink = styled(CSVLink)`
  background-color: #1E90FF;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4169E1;
  }
`;


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    whiteSpace: 'nowrap',
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

const User = () => {
    // const { user_id, getReservers } = useInfo()
    const user_id = undefined;
    // const history = useHistory();

    const [reservations, setReservations] = useState([])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    };

    const tableData = reservations.map(row => ({
        _id: row._id,
        姓名: row.name ? row.name : '無',
        身分證字號: row.cardId,
        健保卡正面圖片網址: row.frontImgURL ? row.frontImgURL : "無",
        健保卡反面圖片網址: row.backImgURL ? row.backImgURL : "無",
        陳述影片網址: row.videoURL ? row.videoURL : "無",
        審核狀態: row.hasBeenReviewed ? "已審核" : "尚未審核",
        審核結果: row.comment ? row.comment : "無",
        放棄申請: row.deleted ? "是" : "否",
        同意捐贈器官: row.agreement ? row.agreement : "無",
        // 其他列...
    }));

    useEffect(() => {
        const fetchReservations = async() => {
            if (user_id){
                setReservations([])
            }
            else{
                let { data } = await fetchAll();
                console.log(data)
                setReservations(data)
            }
        }
        fetchReservations();
        setPage(0);
    }, [user_id])

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <h2>申請資料</h2>
                {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', right: '15%'}}>
                    <SearchIcon />
                    <TextField
                        id="standard-search"
                        // label="Search field"
                        type="search"
                        variant="standard"
                        placeholder="搜尋..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    />
                </div> */}
            </div>
            <div style={{ width: '70%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 'auto' }}>
                    <SearchIcon />
                    <TextField
                        id="standard-search"
                        type="search"
                        variant="standard"
                        placeholder="搜尋..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', right: '15%'}}>
                <SearchIcon />
                <TextField
                    id="standard-search"
                    // label="Search field"
                    type="search"
                    variant="standard"
                    placeholder="搜尋..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                />
            </div> */}
            <TableContainer component={Paper} sx={{ width: '70%' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center">姓名</StyledTableCell>
                            <StyledTableCell align="center">身分證字號</StyledTableCell>
                            <StyledTableCell align="center">健保卡正面</StyledTableCell>
                            <StyledTableCell align="center">健保卡反面</StyledTableCell>
                            <StyledTableCell align="center">陳述影片</StyledTableCell>
                            <StyledTableCell align="center">審核狀態</StyledTableCell>
                            <StyledTableCell align="center">審核結果</StyledTableCell>
                            <StyledTableCell align="center">放棄申請</StyledTableCell>
                            <StyledTableCell align="center">同意捐贈器官</StyledTableCell>
                            <StyledTableCell align="center">按鈕</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {   
                            tableData && tableData.length > 0 ? 
                            tableData.filter(row => (
                                row.姓名.includes(searchTerm) ||
                                row.身分證字號.includes(searchTerm) ||
                                (row.健保卡正面圖片網址 ? "有正面" : "無正面").includes(searchTerm) ||
                                (row.健保卡反面圖片網址 ? "有反面" : "無反面").includes(searchTerm) ||
                                (row.陳述影片網址 ? "有影片" : "無影片").includes(searchTerm) ||
                                row.審核狀態.includes(searchTerm) ||
                                row.審核結果.includes(searchTerm) ||
                                row.放棄申請.includes(searchTerm) ||
                                row.同意捐贈器官.includes(searchTerm)
                            )).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                            <StyledTableRow
                                key={`row ${i}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.姓名}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.身分證字號}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.健保卡正面圖片網址 ? "有正面" : "無正面"}</StyledTableCell>
                                <StyledTableCell align="center">{row.健保卡反面圖片網址 ? "有反面" : "無反面"}</StyledTableCell>
                                <StyledTableCell align="center">{row.陳述影片網址 ? "有影片" : "無影片"}</StyledTableCell>
                                <StyledTableCell align="center">{row.審核狀態}</StyledTableCell>
                                <StyledTableCell align="center">{row.審核結果}</StyledTableCell>
                                <StyledTableCell align="center">{row.放棄申請}</StyledTableCell>
                                <StyledTableCell align="center">{row.同意捐贈器官}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="contained" color="primary" style={{ margin: 20 }} onClick={() => {navigate(`../${row._id}`, { state: { rowData: row } })}}>
                                        審核
                                    </Button>
                                    <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: 'white' }}>
                                        刪除
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        )) : <></>}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={reservations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <StyledCSVLink data={tableData}>匯出 CSV</StyledCSVLink>
        </div>   
    );
}

export default User