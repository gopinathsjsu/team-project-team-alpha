/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-shadow */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import bgimage from '../../images/customer-login.webp';
import backendServer from '../../Config';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../state/action-creators/hotelActions';

const theme = createTheme();

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailHelper, setEmailHelper] = useState('');
  const [passwordhelper, setPasswordHelper] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const email = data.get('email');
    const password = data.get('password');

    const params = {
      emailId:email,
      password
    };

    const url = `${backendServer}/v1/user/login`;

    axios
      .post(url, params)
      .then((response) => {
        sessionStorage.setItem('userId', response.data.id);
        sessionStorage.setItem('user',JSON.stringify(response.data));
        navigate("/landingPage");
      })
      .catch(() => {
        setEmailError(true);
        setPasswordError(true);
        setPasswordHelper('Invald username or password');
      });
  };


  React.useEffect(()=>{
      dispatch(logout());
  },[])

  const clearErrors = () => {
    setEmailError(false);
    setEmailHelper('');
    setPasswordError(false);
    setPasswordHelper('');
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${bgimage})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                Sign In!
              </Typography>
              <Box component="form" data-testid="form" onSubmit={(event) => onLogin(event)} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  error={emailError}
                  helperText={emailHelper}
                  value={email}
                  onChange={(e) => { clearErrors(); setEmail(e.target.value); }}
                  required
                  fullWidth
                  data-testid="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  error={passwordError}
                  helperText={passwordhelper}
                  value={password}
                  onChange={(e) => { clearErrors(); setPassword(e.target.value); }}
                  data-testid="password"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  data-testid="login"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 1 }}

                >
                  Login to account
                </Button>

                <Grid container>
                  <Grid item>
                    <Link href="/customerRegistration" variant="body2">
                      Dont have an account yet? Sign Up!
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
