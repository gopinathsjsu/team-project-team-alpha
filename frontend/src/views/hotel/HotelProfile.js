import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input } from '@mui/material';
import axios from 'axios';
import backendServer from '../../Config';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import dishlogo from '../../images/dishlogo.png'
import { useNavigate } from 'react-router-dom';
import {Navbar} from "../Navbar"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
//import { store } from '../../state/store/store';
import { useEffect } from 'react';
import { useState } from 'react';

import { Image } from 'react-bootstrap/esm';
import {  createMuiTheme } from '@material-ui/core/styles';
import { MenuItem } from '@mui/material';


const theme = createTheme();
const deliveryModes = [{
    key: "pickup",
    value: "Pick-Up"
}, {
    key: "delivery",
    value: "Delivery"
},
{
    key: "both",
    value: "Pick-Up/Delivery"
}];

export default function HotelProfile() {

    

    const history = useNavigate();
//   if(!localStorage.getItem("RestaurantId")){
//     history.push("/RestaurantLogin")
//   }

    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [fromHrs, setFrmHrs] = useState('');
    const [toHrs, setToHrs] = useState('');
    const [phone, setPhone] = useState('');
    const [desc, setDesc] = useState('');
    const [pincode, setPincode] = useState('');
    const [restaurantId, setRestaurantId] = useState('');
    const [mode, setMode] = useState('');

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event.currentTarget);
        const data = new FormData(event.currentTarget);
        var url;
        if (image) {
            let imageData = new FormData()
            imageData.append('image', image)
            let response = await axios.post(`${backendServer}/image/dish`, imageData);
      console.log("imageResponse",response.data.imageUrl)
      url = response.data.imageUrl
      setImageUrl(url);
        }

        console.log(imageUrl)

        let payload = {
            restaurantId: restaurantId,
            name: data.get('name'),
            desc: data.get('desc'),
            country: data.get('country'),
            state: data.get('state'),
            pincode: data.get('pincode'),
            city: data.get('city'),
            fromHrs: data.get('fromHrs'),
            toHrs: data.get('toHrs'),
            phone: data.get('phone'),
            mode:data.get('mode'),
            imageUrl: url
        }
        console.log(payload)
        axios.post(`${backendServer}/restaurant/${restaurantId}`, payload)
            .then(response => {
                history.push("/RestaurantDashBoard")
            })
            .catch(err => {
                console.log("Error");
            });

    };
    useEffect(async () => {
        const restaurantId = localStorage.getItem('RestaurantId');
        const response = await axios.get(`${backendServer}/restaurant/${restaurantId}`);

        console.log(response)
        const restaurant = response.data;
        setName(restaurant.RestaurantName);
        setPhone(restaurant.PhoneNumber);
        setPincode(restaurant.PinCode);
        setFrmHrs(restaurant.WorkHrsFrom);
        setToHrs(restaurant.WorkHrsTo);
        setCity(restaurant.City);
        setDesc(restaurant.RestaurantDesc);
        setCountry(restaurant.Country);
        setState(restaurant.State);
        setRestaurantId(restaurant.RestaurantId);
        setImageUrl(restaurant.Image);
        setMode(restaurant.DeliveryMode)
    }, [])

    const onPhotoChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
    }

    const fileStyle = {
        display: 'none'
    }

    const imageStyle = {
        "margin-left": '45%'
    }

    

    return (
        <>
            <Navbar />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <CssBaseline />
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2} >
                                <Grid style={imageStyle} item xs={12} sm={6} alignItems="center">
                                    <Avatar
                                        src={imageUrl}
                                        sx={{ width: 50, height: 50 }}
                                    />
                                    <label htmlFor="image">
                                        <Input accept="image/*" style={fileStyle} id="image" name="image" required autoFocus type="file" onChange={onPhotoChange} />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        type="text"
                                        id="name"
                                        label="Name of the Hotel"
                                        name="name"
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="name"
                                        value={name}
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        id="desc"
                                        type="text"
                                        value={desc}
                                        label="Description of your Hotel"
                                        name="desc"
                                        onChange={(e) => setDesc(e.target.value)}
                                        autoComplete="desc"
                                        autoFocus
                                        multiline
                                        minRows="2"
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        type="time"
                                        id="from"
                                        label="Work Hrs from"
                                        name="fromHrs"
                                        defaultValue="07:30"
                                        autoComplete="type"
                                        onChange={(e) => setFrmHrs(e.target.value)}
                                        autoFocus
                                        value={fromHrs}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        type="time"
                                        id="to"
                                        label="Work Hrs to"
                                        name="toHrs"
                                        value={toHrs}
                                        autoComplete="to"
                                        onChange={(e) => setToHrs(e.target.value)}
                                        defaultValue="07:30 PM"
                                        autoFocus

                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid> */}

                                

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        type="text"
                                        id="country"
                                        label="Country"
                                        name="country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        autoComplete="country"
                                        autoFocus
                                    />

                                </Grid>


                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        type="text"
                                        id="state"
                                        label="State"
                                        value={state}
                                        name="state"
                                        onChange={(e) => setState(e.target.value)}
                                        autoComplete="state"
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        type="text"
                                        id="city"
                                        label="City"
                                        name="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        autoComplete="city"
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        type="text"
                                        id="phone"
                                        label="Phone Number"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        autoComplete="phone"
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        type="text"
                                        id="pin"
                                        label="Pin Code"
                                        name="pincode"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        autoComplete="pincode"
                                        autoFocus
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        select
                                        name="mode"
                                        label="Mode"
                                        type="text"
                                        id="mode"
                                        value={mode}
                                        onChange={(event) => { setMode(event.target.value) }}
                                        autoComplete="mode"
                                    >
                                        {deliveryModes.map((option) => (
                                            <MenuItem key={option.key} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> */}
                            </Grid>
                            <br />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update Profile
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </ThemeProvider>
        </>
    );
}