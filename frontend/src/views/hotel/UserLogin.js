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






const UserLogin = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  // const dispatch = useDispatch();

  const login = () => {
    axios.post(`${backendServer}/LandingPage`,
      { useremail: email, userpassword: password }
    ).then((response) => {
      localStorage.setItem("CustomerID", response.data[0].CustomerId)
      console.log(response)
      sessionStorage.setItem('country',response.data.Country);
      sessionStorage.setItem('city',response.data.City);

      // dispatch(logged(response.data[0].CustomerName, response.data[0].EmailId ));
      history.push('/RestaurantView')
    })
      .catch((error) => {
        setAlert("Invalid User Name or Password")
      })

    //    return email.length > 0 && password.length > 0;
  }

  console.log(email)

  useEffect(async () => {
    sessionStorage.setItem('currentUser', email);
  }, [email]);

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

  return (
    <>
      <Login />
      <div className="Login" style={stylebutton}>
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
      </div>
    </>
  )
}

export default UserLogin;