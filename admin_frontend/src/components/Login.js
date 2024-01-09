import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import manage from '../manage.jpg';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useData } from '../hooks/SendData';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Login = () => {

  const navigate = useNavigate();
  const instance = axios.create({ baseURL: `http://localhost:4000` });

  const { handleOpen, setWarnMessage, setWarnState } = useData();

  const HandleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let Info = {
            name: data.get('name'),
            password: data.get('password'),
        }
        try{
            const { data: { message: mes }} = await instance.post('/admin/login', { ...Info });
            handleOpen(true);
            setWarnMessage(mes);
            if (mes === "登入成功"){
                setWarnState(false);
                navigate('/success');
                // navigate('/allRecords');
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
        
    //   setWarn(mes);
    //   setWarnState(mes === "成功登入");
    //   handleOpen();
    //   if (mes === "成功登入"){
    //       navigate('/');
    //   }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '90vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: `url(${manage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <Typography
                variant="h4"
                sx={{
                    color: '#2F4F4F',
                    marginTop: '5%',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    fontWeight: 'bold',
                    fontSize: '32px',
                }}
                >
                {/* 你有想過你生命的最後是什麼樣子嗎？ */}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={HandleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="使用者名稱"
                name="name"
                autoComplete="current-cardId"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;