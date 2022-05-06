import Login from '../Login';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import '.././../images//style.css';
import axios from 'axios';
// import logo from '../images/uberlogo.svg';
import wavebg from '.././../images//hotel.svg';
import backendServer from '../../Config'
import { useNavigate } from 'react-router-dom';
import tlogo from ".././../images/trivago.svg"

import { Row, Col, Alert } from 'react-bootstrap';



const HotelRegister = () => {
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
            localStorage.setItem("HotelID",  response.data.id)
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
        <>
            <Login />
            <div className="Login" style={stylebutton}>
                <Form onSubmit={handleSubmit}>
                    <img src={tlogo} width={'200'} height={'150'} style={styleimg} alt='' />
                    <h4 style={textstyle}>Do you own a Hotel?</h4>
                    <br></br>
                    <h5 style={textstyle}>Register and start Booking</h5>
                    <br></br>

                    <Form.Group size="lg" controlId="username">
                        <Form.Label>Hotel Name</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={RestaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                        />
                    </Form.Group>
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
                    <Button block size="lg" type="submit" onClick={() => Register()} style={styleimg} disabled={!validateForm()}>
                        Submit
                    </Button>
                    <br>
                    </br>
                    {alert.length > 0 && < Alert variant="danger" >{alert}</Alert>}

                </Form>
            </div>
        </>
    )
}

export default HotelRegister;