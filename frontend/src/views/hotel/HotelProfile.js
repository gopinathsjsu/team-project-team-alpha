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
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

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
    const [imageUrl1, setImageUrl1] = useState('');
    const [name, setName] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [fromHrs, setFrmHrs] = useState('');
    const [toHrs, setToHrs] = useState('');
    const [phone, setPhone] = useState('');
    const [desc, setDesc] = useState('');
    const [pincode, setPincode] = useState('');
    const [restaurantId, setRestaurantId] = useState('');
    const [mode, setMode] = useState('');

    let [continentalPrice, setcontinentalPrice] = useState('');
    let [fitnessPrice, setfitnessPrice] = useState('');
    let [parkingPrice, setparkingPrice] = useState('');
    let [poolPrice, setpoolPrice] = useState('');
    let [mealsPrice, setmealsPrice] = useState('');

    const HotelID = localStorage.getItem('HotelID');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event.currentTarget);
        const data = new FormData(event.currentTarget);
        var url;
        if (image) {
            let imageData = new FormData()
            imageData.append('file', image)
            // var header = imageData.header.get('Content-Length')
            console.log(imageData);
            let response = await axios.post(`${backendServer}/v1/hotel/${HotelID}/upload-image`, imageData);
      console.log("imageResponse",response.data.imageUrl)
      url = response.data.imageUrl
      setImageUrl1(url);
        }

        console.log(imageUrl1)
        console.log(ContinentalBreakfast)
        if(ContinentalBreakfast == false){
            continentalPrice = 0;
        }
        else{
            continentalPrice = continentalPrice
        }

        if(FitnessRoom == false){
            fitnessPrice = 0;
        }
        else{
            fitnessPrice = fitnessPrice
        }
        
        if(Parking == false){
            parkingPrice = 0;
        }
        else{
            parkingPrice = parkingPrice
        }
        

        if(PoolJaccuzi == false){
            poolPrice = 0;
        }
        else{
            poolPrice = poolPrice
        }
        

        if(Meals == false){
            mealsPrice = 0;
        }
        else{
            mealsPrice = mealsPrice
        }
        

        let amenities  = [
            {
            "cost": continentalPrice,
            "type" : "CONTINENTAL_BREAKFAST"
            },
            {
                "cost": fitnessPrice,
                "type" : "FITNESS_ROOM"
                },
                {
                    "cost": parkingPrice,
                    "type" : "DAILY_PARKING"
                    },
                    {
                        "cost": poolPrice,
                        "type" : "SWIMMING_POOL"
                        },
                        {
                            "cost": mealsPrice,
                            "type" : "ALL_MEALS_INCLUDED"
                            },
        ]

        console.log(amenities)
        let payload = {
            id: HotelID,
            name: data.get('name'),
            // desc: data.get('desc'),
            country: data.get('country'),
            // state: data.get('state'),
            zipCode: data.get('pincode'),
            city: data.get('city'),
            // fromHrs: data.get('fromHrs'),
            // toHrs: data.get('toHrs'),
            contactNo: data.get('phone'),
            // mode:data.get('mode'),
            imageUrl: url,
            serviceList: amenities
        }
        console.log(payload)
        axios.put(`${backendServer}/v1/hotel/${HotelID}/update`, payload)
            .then(response => {
                history("/HotelDashboard")
            })
            .catch(err => {
                console.log("Error");
            });

    };
    useEffect(  () => {
        const restaurantId = localStorage.getItem('HotelID');
        // const response = await axios.get(`${backendServer}/v1/hotel/1`);

        axios.get(`${backendServer}/v1/hotel/${restaurantId}`)
        .then((response) => {
            console.log(response)
            const restaurant = response.data;
        setName(restaurant.name);
        setPhone(restaurant.contactNo);
        setPincode(restaurant.zipCode);
        
        setCity(restaurant.city);
       
        setCountry(restaurant.country);
       
        setRestaurantId(restaurant.id);
        setImageUrl1(restaurant.imageUrl);
        })
        .catch((err) => {
          alert(err);
          return false;
        });

        //console.log(response)
        
        
    }, [])

    const onPhotoChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setImageUrl1(URL.createObjectURL(file));
    }

    const fileStyle = {
        display: 'none'
    }

    const imageStyle = {
        "margin-left": '45%'
    }

    let [state1, setState1] = React.useState({
        ContinentalBreakfast: false,
        FitnessRoom: false,
        PoolJaccuzi: false,
        Parking: false,
        Meals: false,
      });
    
      let handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState1({
          ...state1,
          [event.target.name]: event.target.checked,
        });
      };

      let { ContinentalBreakfast, FitnessRoom, PoolJaccuzi, Parking, Meals  } = state1;

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
                                        src={imageUrl1}
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

                                {/* <Grid item xs={12}>
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
                                </Grid> */}
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


                                {/* <Grid item xs={12} sm={4}>
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
                                </Grid> */}

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

                            <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Amenities Options</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={ContinentalBreakfast} onChange={handleChange} name="ContinentalBreakfast" />
            }
            label="Continental Breakfast"
          />
          {ContinentalBreakfast ?(
          <TextField id="outlined-basic" label="Price" variant="outlined"  onChange={(e) => setcontinentalPrice(e.target.value)} />
        ) : (<></>)}

          <FormControlLabel
            control={
              <Checkbox checked={FitnessRoom} onChange={handleChange} name="FitnessRoom"   />
            }
            label="FitnessRoom"
          />
          {FitnessRoom ?(
          <TextField id="outlined-basic" label="Price" variant="outlined" onChange={(e) => setfitnessPrice(e.target.value)} />
        ) : (<></>)}


          <FormControlLabel
            control={
              <Checkbox checked={Parking} onChange={handleChange} name="Parking" />
            }
            label="Daily Parking"
          />
          {Parking ?(
          <TextField id="outlined-basic" label="Price" variant="outlined" onChange={(e) => setparkingPrice(e.target.value)}/>
        ) : (<></>)}


          <FormControlLabel
            control={
              <Checkbox checked={PoolJaccuzi} onChange={handleChange} name="PoolJaccuzi" />
            }
            label="Pool & Jaccuzi"
          />
          {PoolJaccuzi ?(
          <TextField id="outlined-basic" label="Price" variant="outlined" onChange={(e) => setpoolPrice(e.target.value)}/>
        ) : (<></>)}


          <FormControlLabel
            control={
              <Checkbox checked={Meals} onChange={handleChange} name="Meals" />
            }
            label="Meals Included"
          />
          {Meals ?(
          <TextField id="outlined-basic" label="Price" variant="outlined" onChange={(e) => setmealsPrice(e.target.value)} />
        ) : (<></>)}


        </FormGroup>
        
      </FormControl>
      </Box>
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