import Login from '../Login';
import Form from "react-bootstrap/Form";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import '.././../images//style.css';
import axios from 'axios';
// import logo from '../images/uberlogo.svg';
import wavebg from '.././../images//layered-waves.svg';
import backendServer from '../../Config'
import { useNavigate } from 'react-router-dom';
import tlogo from ".././../images/trivago.svg"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Row, Col, Alert } from 'react-bootstrap';
import Container from '@mui/material/Container';
import bg from ".././../images/trivago.svg"
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

const HotelRegister = () => {
    const theme = createTheme();
    const history = useNavigate();
    const [RestaurantName, setRestaurantName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [alert, setAlert] = useState('');


    const Register = () => {
        axios.post(`${backendServer}/v1/hotel/register`,
            { name: RestaurantName, emailId: email, password: password }
        ).then((response) => {
            console.log(response)
            // dispatch(signed(RestaurantName, email));
            localStorage.setItem("HotelID", response.data.id)
            history('/HotelDashboard')
        })
            .catch((error) => {
                console.log(error)
                setAlert("Email Already Exists")
            })
    }

    console.log("alerting", alert)
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
    const stylebutton = {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${wavebg})`
    }
    const textstyle = {
        fontsize: '30px',
        lineheight: '36px',
        fontfamily: 'UberMoveText-Medium,Helvetica,sans-serif',
        marginbottom: '36px',
        textalign: 'center',
        margin: '0px auto',
        display: 'block'
    }
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
                                id="name"
                                value={RestaurantName}
                                onChange={(e) => { setRestaurantName(e.target.value); }}
                                label="Hotel Name"
                                name="RestaurantName"
                                autoComplete="RestaurantName"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); }}
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
                            <Button block size="lg" type="submit" onClick={() => Register()} style={styleimg} >
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
                                    <Link href="/HotelLogin" variant="body2">
                                        {"Have an account? Sign In"}
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

export default HotelRegister;