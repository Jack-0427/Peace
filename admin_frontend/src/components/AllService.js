import { useState, useEffect } from "react";
import { fetchService } from "../hooks/api";
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
import { useNavigate } from 'react-router-dom';
import { finishAppointment, deleteAppointment } from "../hooks/api";
// import { useHistory } from 'react-router-dom';
import { useData } from "../hooks/SendData";
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

const AllService = () => {
    const [reservations, setReservations] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();
    const { handleOpen, setWarnMessage, setWarnState } = useData();

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

    const finished = async(_id) => {
        try{
            const msg = await finishAppointment(_id);
            handleOpen(true);
            setWarnMessage(msg);
            if (msg === "修改註冊狀態成功"){
                setWarnState(false);
            }
            else{
                setWarnState(true);
            }
        }catch(error){
            handleOpen(true);
            setWarnMessage("修改註冊狀態失敗");
            setWarnState(true);
        }
    }

    const Ifdeleted = async(_id, state) => {
        try{
            const getState = state === "預約中" ? "取消預約" : "預約中"
            const msg = await deleteAppointment(_id, getState);
            handleOpen(true);
            setWarnMessage(msg);
            if (msg === "修改註冊狀態成功"){
                setWarnState(false);
            }
            else{
                setWarnState(true);
            }
        }catch(error){
            handleOpen(true);
            setWarnMessage("修改註冊狀態失敗");
            setWarnState(true);
        }
    }

    useEffect(() => {
        const fetchAllService = async() => {
            const { data } = await fetchService();
            setReservations(data);
        }
        fetchAllService();
        setPage(0);
    }, [handleOpen])

    return(
        <>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <h2>申請資料</h2>
            </div>
            {/* <div style={{ width: '70%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 'auto' }}>
                    <SearchIcon />
                    <TextField
                        id="standard-search"
                        type="search"
                        variant="standard"
                        placeholder="搜尋..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div> */}
            <TableContainer component={Paper} sx={{ width: '70%' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center">姓名</StyledTableCell>
                            <StyledTableCell align="center">電話號碼</StyledTableCell>
                            <StyledTableCell align="center">電子信箱</StyledTableCell>
                            <StyledTableCell align="center">預約地點</StyledTableCell>
                            <StyledTableCell align="center">預約時間</StyledTableCell>
                            <StyledTableCell align="center">預約服務</StyledTableCell>
                            <StyledTableCell align="center">預約狀態</StyledTableCell>
                            <StyledTableCell align="center">按鈕</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {   
                            reservations && reservations.length > 0 ? 
                            reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                            <StyledTableRow
                                key={`row ${i}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.phone}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{row.location}</StyledTableCell>
                                <StyledTableCell align="center">{row.time}</StyledTableCell>
                                <StyledTableCell align="center">{row.service}</StyledTableCell>
                                <StyledTableCell align="center">{row.state}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="contained" color="primary" style={{ margin: 10 }} onClick={() => {navigate(`../email/${row._id}`, { state: { rowData: row } })}}>
                                        寄信說明
                                    </Button>
                                    <Button variant="contained" color="primary" style={{ margin: 10 }} onClick={() => { finished(row._id); }}>
                                        預約完成
                                    </Button>
                                    <Button variant="contained" disabled={row.state === "預約完成"} color="secondary" style={{ margin: 10, backgroundColor: 'red', color: 'white' }} onClick={() => { Ifdeleted(row._id, row.state); }}>
                                        {row.state === "預約中" ? "取消預約" : "恢復預約"}
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
            <StyledCSVLink data={reservations}>匯出 CSV</StyledCSVLink>
        </div>
        </>
    );
}

export default AllService;