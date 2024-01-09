import React from 'react';
import { useState } from 'react';
import logo from '../logo.jpg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const Option = styled.div`
    border-radius: 10px;
    color: ${props => props?.clicked !== "false" ? "blue" : "black"};
    margin: 10px;
    display: flex;
    user-select: none;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    &:hover {
        color: blue;
        cursor: pointer;
    }
`;

const Text = styled.div`
  margin: 10px;
  font-family: Arial;
  font-size: 16px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  user-select: none;
`;

const Navbar = () => {
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [anchorEl3, setAnchorEl3] = useState(null);

    const navigate = useNavigate();

    const { isLoggedIn, UserLogOut } = useUser();

    const handleMenuClick = (event, anchorEl) => {
        switch (anchorEl) {
          case 'anchorEl1':
            setAnchorEl1(event.currentTarget);
            break;
          case 'anchorEl2':
            setAnchorEl2(event.currentTarget);
            break;
          case 'anchorEl3':
            setAnchorEl3(event.currentTarget);
            break;
          default:
            break;
        }
    };

    const handleMenuClose = (anchorEl) => {
        switch (anchorEl) {
          case 'anchorEl1':
            setAnchorEl1(null);
            break;
          case 'anchorEl2':
            setAnchorEl2(null);
            break;
          case 'anchorEl3':
            setAnchorEl3(null);
            break;
          default:
            break;
        }
    };

    return (
        <div style={{ 
            width: `100vw`, 
            height: `10vh`,
            display: 'flex', 
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <div style={{
                marginLeft: '2%',
                width: '15%',
                height: '100%',
                display: 'flex', 
                flexDirection: 'row',
                alignItems: 'center',
                cursor: 'pointer',
            }}
                onClick={() => { navigate('/') }}
            >
                {/* <img src={love} style={{ height: '80%', objectFit: 'contain' }} alt='love' /> */}
                <img src={logo} style={{ height: '80%', objectFit: 'contain' }} alt='love' />
                <div style={{
                    color: 'gray',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    }}>
                    預立安寧
                </div>
            </div>
            <Option onClick={(event) => handleMenuClick(event, 'anchorEl1')} clicked={Boolean(anchorEl1).toString()}>
                <Text>器官捐贈移植</Text>
                {Boolean(anchorEl1) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Option>
            <Menu
                anchorEl={anchorEl1}
                open={Boolean(anchorEl1)}
                onClose={() => handleMenuClose('anchorEl1')}
            >
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl1'); 
                    window.open('https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=L0020024', '_blank');
                }}>法令規章</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl1'); 
                    navigate('/器官捐贈移植/相關文件'); 
                }}>相關文件</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl1');
                    navigate('/器官捐贈移植/常見問答'); 
                }}>常見問答</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl1');
                    navigate('/器官捐贈移植/線上申請'); 
                }}>線上申請</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl1');
                    navigate('/器官捐贈移植/申請紀錄'); 
                }}>申請紀錄</MenuItem>
            </Menu>

            <Option onClick={(event) => handleMenuClick(event, 'anchorEl2')} clicked={Boolean(anchorEl2).toString()}>
                <Text>病人自主及安寧緩和</Text>
                {Boolean(anchorEl2) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Option>
            <Menu
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                onClose={() => handleMenuClose('anchorEl2')}
            >
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl2');
                    window.open('https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=L0020024', '_blank');
                    // navigate('/病人自主及安寧緩和/法令規章'); 
                }}>法令規章</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl2'); 
                    navigate('/病人自主及安寧緩和/相關文件'); 
                }}>相關文件</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl2');
                    navigate('/病人自主及安寧緩和/常見問答'); 
                }}>常見問答</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl2');
                    navigate('/病人自主及安寧緩和/線上申請'); 
                }}>線上申請</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl2');
                    navigate('/病人自主及安寧緩和/申請紀錄'); 
                }}>申請紀錄</MenuItem>
            </Menu>

            {/* <Option onClick={(event) => handleMenuClick(event, 'anchorEl3')} clicked={Boolean(anchorEl3).toString()}>
                <Text>安樂死</Text>
                {Boolean(anchorEl3) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Option>
            <Menu
                anchorEl={anchorEl3}
                open={Boolean(anchorEl3)}
                onClose={() => handleMenuClose('anchorEl3')}
            >
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl3'); 
                    navigate('/安樂死/法令規章'); 
                }}>法令規章</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl3'); 
                    navigate('/安樂死/相關文件'); 
                }}>相關文件</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl3');
                    navigate('/安樂死/常見問答'); 
                }}>常見問答</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose('anchorEl3');
                    navigate('/安樂死/線上申請'); 
                }}>線上申請</MenuItem>
            </Menu> */}
            <div style={{
                width: '18%',
                height: '60%',
                marginLeft: 'auto',
                display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}>
                {/* <Text style={{ cursor: 'pointer' }} onClick={() => { navigate('/器官捐贈移植/申請服務') }}>申請服務</Text> */}
                <Option onClick={(event) => handleMenuClick(event, 'anchorEl3')} clicked={Boolean(anchorEl3).toString()}>
                    <Text>申請服務</Text>
                    {Boolean(anchorEl3) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Option>
                <Menu
                    anchorEl={anchorEl3}
                    open={Boolean(anchorEl3)}
                    onClose={() => handleMenuClose('anchorEl3')}
                >
                    <MenuItem onClick={() => {
                        handleMenuClose('anchorEl3');
                        navigate('/申請服務/填寫申請資料');
                    }}>填寫申請資料</MenuItem>
                    <MenuItem onClick={() => {
                        handleMenuClose('anchorEl3');
                        navigate('/申請服務/查看申請資料');
                    }}>查看申請資料</MenuItem>
                </Menu>
                <Text style={{ cursor: 'pointer' }}>註冊</Text>
                <Text style={{ cursor: 'pointer' }} 
                      onClick={() => { 
                        !isLoggedIn ? navigate('/登入') : UserLogOut()
                      }}
                >
                    { !isLoggedIn ? "登入" : "登出" }
                </Text>
            </div>
        </div>
    )
}



export default Navbar