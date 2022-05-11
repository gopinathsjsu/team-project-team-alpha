
import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import backendServer from '../../Config'
import SearchIcon from '@mui/icons-material/Search';
import {Navbar} from '../Navbar';
import { NearMeTwoTone } from '@material-ui/icons';
import props from 'prop-types';

import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MenuItem } from '@mui/material';





const theme = createTheme();


const dishTypes = [{
    key: "SUITE",
    value: "SUITE"
}, {
    key: "DOUBLE",
    value: "DOUBLE"
}, {
    key: "SINGLE",
    value: "SINGLE"
}];

const dishcategory = [{
    key: "veg",
    value: "Veg"
}, {
    key: "nonveg",
    value: "Non-Veg"
}, {
    key: "vegan",
    value: "Vegan"
}];

const AddRoom = () => {

    const history = useNavigate();
//   if(!localStorage.getItem("RestaurantId")){
//     history.push("/RestaurantLogin")
//   }

    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [maxOccupants, setMaxOccupants] = useState('');
    
    const [noOfAdults, setnoOfAdults] = useState('');
    const [noOfChildren, setnoOfChildren] = useState('');

    const [image1, getImage1] = useState('');
    const [imageUrl1, getImageUrl1] = useState('');
     const [name1, setName1] = useState('');
    const [desc1, getDesc1] = useState('');
    const [category1, getCategory1] = useState('');
    const [price1, getPrice1] = useState('');
    const [type1, getType1] = useState('');
    const [maxOccupants1, getMaxOccupants] = useState('');
    const [minOccupants1, getMinOccupants] = useState('');
    const [noOfAdults1, getnoOfAdults] = useState('');
    const [noOfChildren1, getnoOfChildren] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event.currentTarget);
        const data = new FormData(event.currentTarget);
        

        const EditRoomID = sessionStorage.getItem("EditRoomID")
        const HotelID = localStorage.getItem('HotelID');
        //const dishid = localStorage.getItem('editDish');
        const RoomID = sessionStorage.getItem('RoomID');
           

        
        let payload = {
          
            hotelId: HotelID,
            description: data.get('desc'),
            //category: data.get('category'),
            cost: data.get('price'),
            name: data.get('name'),
            type: data.get('type'),
            maxOccupants: data.get('maxOccupants'),
            adults: data.get('noOfAdults'),
            children: data.get('noOfChildren')

           
        }
        if(EditRoomID != null ){
            console.log("edit room payload", payload)

            axios.put(`${backendServer}/v1/room/${EditRoomID}`, payload)
                .then(response => {
                    console.log(response)
                    let url;
       if (image) {
            console.log("Dishes response hello" ,image)
            let imageData = new FormData()
            imageData.append('file', image)
            axios.post(`${backendServer}/v1/room/${response.data.id}/upload-image`, imageData)
            .then((response) =>{
                url = response.data.imageUrl
                console.log("Dishes response hello")
                // setImageUrl(url);
            })
            .catch((err) =>{
                return false;
            })
        }
        sessionStorage.removeItem("EditRoomID");
                    history("/HotelDashboard")
                })
                .catch(err => {
                    console.log(err);
                });
        }

        else{
        console.log("room payload", payload)

        axios.post(`${backendServer}/v1/room`, payload)
            .then(response => {
                console.log(response)
                let url;

                if (image) {
                    console.log("Dishes response hello" ,image)
                    let imageData = new FormData()
                    imageData.append('file', image)
                    axios.post(`${backendServer}/v1/room/${response.data.id}/upload-image`, imageData)
                    .then((response) =>{
                        url = response.data.imageUrl
                        console.log("Dishes response hello")
                        // setImageUrl(url);
                    })
                    .catch((err) =>{
                        return false;
                    })
                }
                sessionStorage.removeItem("RoomID");
                history("/HotelDashboard")
            })
            .catch(err => {
                console.log(err);
            });
        }
        

    };

    useEffect( () => {
        const RoomID = sessionStorage.getItem('EditRoomID');

        
            
       // }

        if (RoomID) {
            axios.get(`${backendServer}/v1/room/${RoomID}`)
            .then((response) =>{
            console.log("Dishes response", response)
            const dish = response.data;
            setName(dish.name);
             setDesc(dish.description);
             
             setType(dish.type);
             setPrice(dish.cost);
             setMaxOccupants(dish.maxOccupants);
             setnoOfAdults(dish.adults);
             setnoOfChildren(dish.children)
             setImageUrl(dish.imageUrl);
         })
         .catch((err) =>{
             return false;
         })
        }

        
    }, [])

    const onPhotoChange = (event) => {
        if (event.target.files.length === 0)
            return;
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


    // useEffect(async () => {

    //     const DishId = localStorage.getItem("editDish");
    //     console.log("Add Dish Page", DishId)
    //     if (DishId != '') {
    //          const response = await axios.get(`${backendServer}/dishes/${DishId}`);
    //         console.log("Dishes response", name)
    //           const dish = response.data;
    //         setName(dish.DishName);

    //     }
    // }, [])
    

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
                                        id="name"
                                        label="Name of the Room"
                                        name="name"
                                        autoComplete="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        id="desc"
                                        label="Description of the Room"
                                        name="desc"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        autoComplete="desc"
                                        autoFocus
                                        multiline
                                        minRows="2"
                                    />

                                </Grid>
                                {/* <Grid item xs={12}>
                                        <TextField
                                            margin="none"
                                            required
                                            fullWidth
                                            id="type"
                                            label="Type of the Dish"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            name="type"
                                            autoComplete="type"
                                            autoFocus
                                        />
    
                                    </Grid> */}
                                    <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        id="type"
                                        label="Type of the Room"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        name="type"
                                       // disabled={disabled}
                                        autoComplete="type"
                                        select
                                        autoFocus
                                    >
                                        {dishTypes.map((option) => (
                                            <MenuItem key={option.key} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </Grid>

                                {/* <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        type="text"
                                        id="category"
                                        label="Category"
                                        name="category"
                                      
                                        autoComplete="category"
                                        autoFocus
                                        select
                                    >
                                        {dishcategory.map((option) => (
                                            <MenuItem key={option.key} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> */}

                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="number"
                                        id="price"
                                        label="Price"
                                        name="price"
                                        autoComplete="price"
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        id="maxOccupants"
                                        label="Max Occupants"
                                        name="maxOccupants"
                                        autoComplete="name"
                                        type="number"
                                        value={maxOccupants}
                                        onChange={(e) => setMaxOccupants(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        id="noOfAdults"
                                        label="Number Of Adults"
                                        name="noOfAdults"
                                        autoComplete="name"
                                        type="number"
                                        value={noOfAdults}
                                        onChange={(e) => setnoOfAdults(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        margin="none"
                                        required
                                        fullWidth
                                        id="noOfChildren"
                                        label="Number Of Children"
                                        name="noOfChildren"
                                        autoComplete="name"
                                        type="number"
                                        value={noOfChildren}
                                        onChange={(e) => setnoOfChildren(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>


                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Save
                                    </Button>
                                </Grid>

                            </Grid>
                        </Box>
                    </Paper>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default AddRoom;