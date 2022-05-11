import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
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
import { Navbar } from '../Navbar';
import { NearMeTwoTone } from '@material-ui/icons';
import props from 'prop-types';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import CardHeader from '@mui/material/CardHeader';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import { blue } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';


import MoreVertIcon from '@mui/icons-material/MoreVert';

const theme = createTheme();

const styleimg = {
  display: 'block',
  margin: 'auto',
  height: '50',
  width: '25'
}

function HotelDashboard() {

  const history = useNavigate();
  // if(!localStorage.getItem("RestaurantId")){
  //   history.push("/RestaurantLogin")
  // }

  const [cards, setCards] = useState([]);
  //  const [description, getDescription] = useState('');
  //  const [imageURL, getImageUrl] = useState('');
  //  const [res1, setRes1] = useState([]);
  //  const [il,setIl] = useState([]);
  //const [res1, getRes1] = useState('');
  const [cardSearch, setCardSearch] = useState([]);
  const [searchValue, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const onSearch = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value);
    let searchTerm = event.target.value;
    // console.log(res1);
    if (searchTerm == '') {
      setCards(cardSearch);
      return;
    }
    if (cards.length != 0) {
      let filter_1 = cards.filter(cards => cards.DishName != null && cards.DishName.includes(searchTerm));
      setCards(filter_1);
    }
  };



  const HotelID = localStorage.getItem("HotelID");

  // useEffect(() => {
  //   setFilteredPosts(cards.filter((cards) => cards.DishName === searchValue));
  // }, [cards, searchValue]);

  // console.log("Hello filetered posts", filteredPosts);

  useEffect(() => {
    const restaurantId = localStorage.getItem('RestaurantId');
    console.log("use effect");

    axios.get(`${backendServer}/v1/room/hotel/${HotelID}`)
      .then((response) => {
        console.log(response)
        setCards(response.data);

      })
      .catch((err) => {
        alert(err);
        return false;
      })

    return () => {
      console.log("This will be logged on unmount");
    }

    //const response = await axios.get(`${backendServer}/v1/room/hotel/${HotelID}`);

    // setCards(response.data);
    // console.log("Hello cards", cards)

    //  setRes1(response.data);
    //setCardSearch(response.data);

    //getRes1({res1: response.data})
    //const data = await response.json();
    //console.log(res2.data);

    // console.log("isss ",res1);
    //  getName(response.data[2].RestaurantName);
    //    getDescription(response.data[2].RestaurantDesc);
    //  getImageUrl(response.data[2].Image)
  }, []);


  const onAddDishes = (event) => {
    sessionStorage.removeItem("RoomID");

    history("/AddRoom")

  }

  const EditDish = (EditDishId) => {

    sessionStorage.setItem("EditRoomID", EditDishId);

    console.log("Dish id is here", EditDishId)
    // if(EditDishId != ''){
    history("/AddRoom")
    // }

  };

  const ViewOrders = () => {
    history("/ViewBooking")
  }

  return (
    <div>
      <Navbar handleSearch={onSearch} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 0,
              pb: 3,
            }}
          >
            {<Container maxWidth="sm">
              {/* <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                    Welcome Uber-Eats
                  </Typography>
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Sell your dishes and maximise profits
                  </Typography>  */}
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" onClick={() => onAddDishes()}>Add Room</Button>
                <Button variant="outlined" onClick={ViewOrders}>View Bookings</Button>
              </Stack>
            </Container>}
          </Box>
          {/* <input
              type="text"
            
              value={searchValue}
              onChange={handleSearchChange}
            /> */}
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (

                <Grid item key={card.DishId} xs={6} sm={3} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'block', flexDirection: 'column' }}>

                    <CardHeader
                    
                      avatar={
                        
                        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe"  src={card.imageUrl}>
                          
                         
                        </Avatar>
                      }
                      fontWeight="fontWeightBold"
                      titleTypographyProps={{variant:'h5' }}
                      title={card.name}
                      
                    />

                    <CardMedia
                      component="img"
                      // sx={{
                      //   // 16:9
                      //   pt: '00.25%',
                      // }}
                      height="180"
                      image={card.imageUrl}
                      alt="random" style={styleimg}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography> */}
                      <Typography variant="h6">
                        {card.description}
                      </Typography>
                      <Typography>
                        {"Cost: $"}{card.cost}
                      </Typography>
                      <Typography>
                        {"Max Occupants: "}{card.maxOccupants}
                      </Typography>
                      <Typography>
                        {"No Of Adults: "}{card.adults}
                      </Typography>
                      <Typography>
                        {"No Of Children: "}{card.children}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => EditDish(card.id)}><EditIcon></EditIcon>Edit</Button>
                      {/* onClick={() => goToDetails(name)} */}
                      {/* <Button size="small">Edit</Button> */}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>

      </ThemeProvider>
    </div>
  )
}

export default HotelDashboard;