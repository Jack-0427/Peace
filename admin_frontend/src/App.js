import logo from './logo.svg';
import './App.css';
import { Routes, Route, Outlet } from "react-router-dom";
import AllData from './components/AllData';
import ShowEdit from './components/ShowEdit';
import ShowData from './components/ShowData';
import Select from './components/Select';
import SendEmail from './components/SendEmail';
import AllService from './components/AllService';
import Login from './components/Login';
import { useNavigate } from 'react-router-dom';
import { useData } from './hooks/SendData';
import { Alert } from '@mui/material';
import { Snackbar } from '@material-ui/core';
// import { Snackbar } from '@mui/material';
// import Alert from '@mui/material';

function App() {
  const navigate = useNavigate();

  const { open, msg, warn, handleClose} = useData();

  return (
    // <div className="App">
    <>
      <div style={{ width: '100vw', height: '10vh', display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E90FF'}}>
        <div style={{ marginLeft: '3%', color: "white", fontSize: 30, cursor: 'pointer', fontWeight: 'bold' }} onClick={() => {navigate('/')}}>
            後台管理系統
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} 
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
          }}>
          
          <Alert severity = {warn ? "error" : "success"}>
              {msg}
          </Alert>
      </Snackbar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Select />} />
        <Route path="/:id" element={<ShowEdit />} />
        <Route path="/email/:id" element={<SendEmail />} />
        <Route path="/allRecords" element={<AllData />} />
        <Route path="/test" element={<ShowData />} />
        <Route path="/allServices" element={<AllService />} />
      </Routes>
    </>
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
