import Login from '../Login';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import react, { useState, useEffect } from "react";
import '.././../images//style.css';
import axios from 'axios';
// import logo from '././../images//uberlogo.svg';
import wavebg from '.././../images/layered-waves.svg';
import { Row, Col, Alert } from 'react-bootstrap';
import backendServer from '../../Config'
import { useNavigate } from 'react-router-dom';
import bg from ".././../images/trivago.svg"



import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';



const HotelLogin = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  // const dispatch = useDispatch();

  const login = () => {
    axios.post(`${backendServer}/v1/hotel/login`,
      { emailId: email, password: password }
    ).then((response) => {
      localStorage.setItem("HotelID", response.data.id)
      console.log(response)
      //sessionStorage.setItem('country',response.data.Country);
      //sessionStorage.setItem('city',response.data.City);

      // dispatch(logged(response.data[0].CustomerName, response.data[0].EmailId ));
      history.go('/HotelDashboard')
    })
      .catch((error) => {
        setAlert("Invalid User Name or Password")
      })

    //    return email.length > 0 && password.length > 0;
  }

  console.log(email)

  // useEffect(async () => {
  //   sessionStorage.setItem('currentUser', email);
  // }, [email]);

  const value = useState(async () => {
    localStorage.getItem('currentUser')
  });
  console.log("curr user", value)

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

  }
  const styleimg = {
    display: 'block',
    margin: 'auto'
  }
  const textstyle = {
    fontsize: '45px',
    lineheight: '36px',
    fontfamily: 'UberMoveText-Medium,Helvetica,sans-serif',
    marginbottom: '36px',
    textalign: 'left'
  }
  const stylebutton = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${wavebg})`
  }
  const theme = createTheme();

 
  return (
    <div style={stylebutton}>
      <Login />
      {/* <div className="Login" style={stylebutton}>
        <Form onSubmit={handleSubmit}>
          <img src={bg} width={'200'} height={'150'} style={styleimg} alt='' />

          <h2 style={textstyle}>Welcome Back</h2>
          <br></br>
          <h4 style={textstyle}>Please Sign In with your E-mail</h4>
          <br></br>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Button block size="lg" type="submit" onClick={() => login()} style={styleimg} disabled={!validateForm()}>
            Login
          </Button>
          <br></br>
          {alert.length > 0 && < Alert variant="danger" > {alert} </Alert>}

        </Form>
      </div> */}

<ThemeProvider theme={theme}>
      <Container  >
      <img src={bg} width={'200'} height={'150'} style={styleimg} alt='' />
      
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={(e) => {setEmail(e.target.value); }}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
              autoComplete="current-password"
            />
           <Button block size="lg" type="submit" onClick={() => login()} style={styleimg} > 
           {/* disabled={!validateForm()} */}
            Login
          </Button>

          <br></br>
          {alert.length > 0 && < Alert variant="danger" > {alert} </Alert>}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
    </div>
  )
}

export default HotelLogin;