import React from 'react';
import Navbar from './pages/Navbar';
import Home from './components/Home'
import Question from './pages/Question'
import Apply from './components/Apply'
import Document from './components/Document'
import SendApply from './pages/SendApply';
import Login from './pages/Login';
import Menu from './components/Menu';
import Record from './pages/Record';
import Service from './pages/Service';
import FetchService from './pages/fetchService';
import SendEmail from './components/SendEmail';
import { useUser } from './hooks/useUser';
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Alert } from '@mui/material';
import { Snackbar } from '@material-ui/core';

function App() {
  const Root = () => {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 2 }}>
          <Menu />
        </div>
        <div style={{ flex: 8 }}>
          {/* 右侧内容，占据 80% 的宽度 */}
          <Outlet />
        </div>
      </div>
    );
  }
  
  const { open, message, topRef, success, handleClose } = useUser(); 
  return (
    <>
      <div ref={topRef}></div>
      <Navbar />
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} 
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
          }}>
          
          <Alert severity = {success ? "success" : "error"}>
              {message}
          </Alert>
      </Snackbar>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/器官捐贈移植" element={<Root />} >
          <Route index element={<></>} />
          <Route path="法令規章" element={<></>}></Route>
          <Route path="相關文件" element={<Document />}></Route>
          <Route path="常見問答" element={<Question />}></Route>
          <Route path="線上申請" element={<Apply />}></Route>
          <Route path="線上申請/填寫申請資料" element={<SendApply />}></Route>
          <Route path="申請紀錄" element={<Record />}></Route>
          
        </Route>
        <Route path="/病人自主及安寧緩和" element={<Root />} >
          <Route index element={<></>} />
          <Route path="法令規章" element={<></>}></Route>
          <Route path="相關文件" element={<Document />}></Route>
          <Route path="常見問答" element={<Question />}></Route>
          {/* <Route path="線上申請" element={<Apply />}></Route>
          <Route path="線上申請/填寫申請資料" element={<SendApply />}></Route>
          <Route path="使用者紀錄" element={<Record />}></Route> */}
        </Route>
        <Route path="/申請服務" element={<Root />} >
          <Route path="填寫申請資料" element={<Service />}></Route>
          <Route path="查看申請資料" element={<FetchService />}></Route>
        </Route>
        <Route path="/email" element={<Root />} >
          <Route path=":id" element={<SendEmail />}></Route>
        </Route>
        <Route path="/登入" element={<Login />}></Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;

