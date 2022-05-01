/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Navbar } from '../Navigation/Navbar';
import RoomAmenitiesDialog from './RoomAmenitiesDialog';

const theme = createTheme();

const roomTypes = [{
  key: 'all',
  value: 'All',
}, {
  key: 'single',
  value: 'Single Room',
}, {
  key: 'double',
  value: 'Double Room',
}, {
  key: 'Suit',
  value: 'Suite',
}];


export default function CustomerHotelRooms() {
  // const [cards, setCards] = useState([]);
  const [initialLoad, setInitialLoad] = useState([]);
  const [tempCart, setTempCart] = useState([]);
  const history = useNavigate();
  const [multipleOrderDialog, setMultipleOrderDialog] = useState(false);
  // const [currentHotelDetails, setcurrentHotelDetails] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [openAmenitiesDialog, setOpenAmenitiesDialog] = useState(false);


  const onNewOrder = () => {

  };

  const onAddToCart = (dish) => {
    setOpenAmenitiesDialog(true);
  };

  const onRemoveFromCart = (dish) => {

  };

  const onSearch = (type, searchTerm) => {

  };

  const onSearchDishType = (searchTerm) => {

  };

  const onSearchCategory = (searchTerm) => {

  };

  var currentHotelDetails = {
    city: "San Jose",
    contactNo: "6692927846",
    country: "United States",
    emailId: "marriot@gmail.com",
    id: 0,
    imageUrl: './images/trivago.jpg',
    description: "The best place to stay when you are in silicon valley",
    name: "Marriot",
    zipCode: "95125"
  };

  var cards = [{
    roomId: "12",
    hotelId: "2331",
    name: "Suit",
    type: "<Suit or double or single>",
    imageUrl: "<imageUrl>",
    price: 251,
    description: "The perfect room for a couple",
    maxNoOfOccupants: 4,
    noOfAdults: 2,
    noOfChildren: 2
  }, {
    roomId: "12",
    hotelId: "2331",
    name: "Suit",
    type: "<Suit or double or single>",
    imageUrl: "<imageUrl>",
    price: 251,
    description: "The perfect room for a couple",
    maxNoOfOccupants: 4,
    noOfAdults: 2,
    noOfChildren: 2
  }, {
    roomId: "12",
    hotelId: "2331",
    name: "Suit",
    type: "<Suit or double or single>",
    imageUrl: "<imageUrl>",
    price: 251,
    description: "The perfect room for a couple",
    maxNoOfOccupants: 4,
    noOfAdults: 2,
    noOfChildren: 2
  }, {
    roomId: "12",
    hotelId: "2331",
    name: "Suit",
    type: "<Suit or double or single>",
    imageUrl: "<imageUrl>",
    price: 251,
    description: "The perfect room for a couple",
    maxNoOfOccupants: 4,
    noOfAdults: 2,
    noOfChildren: 2
  }]

  const onCloseAmenitiesDialog = () => {
    setOpenAmenitiesDialog(false);
  }

  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="md">
              <Card
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={2}>
                      <img alt="complex" src="../images/grid/trivago.jpg" />
                    </Grid>
                    <Grid item xs={10} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="h5" component="h2">
                            {currentHotelDetails.name}
                          </Typography>
                          <Typography>
                            {currentHotelDetails.description}
                          </Typography>
                          <Typography>
                            Phone :
                            {' '}
                            {currentHotelDetails.contactNo}
                          </Typography>
                          <Typography>
                            Email :
                            {' '}
                            {currentHotelDetails.emailId}
                          </Typography>
                          <Typography>
                            Location :
                            {' '}
                            {currentHotelDetails.city}
                          </Typography>
                          <Typography>
                            Zip :
                            {' '}
                            {currentHotelDetails.zipCode}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card._id} xs={6} sm={3} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: '0.25%',
                      }}
                      image={card.ImageUrl}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>
                        {card.description}
                      </Typography>
                      <Typography>
                        $
                        {card.price}
                      </Typography>
                      <Typography>
                        Type:
                        {' '}
                        {card.type}
                      </Typography>
                      <Typography>
                        No of Adults allowed:
                        {' '}
                        {card.noOfAdults}
                      </Typography>
                      <Typography>
                        No of children allowed:
                        {' '}
                        {card.noOfChildren}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton onClick={() => { onAddToCart(card); }} aria-label="add to cart">
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton onClick={() => { onRemoveFromCart(card); }} aria-label="remove from cart">
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          <RoomAmenitiesDialog open={openAmenitiesDialog} onClose={()=> onCloseAmenitiesDialog()}></RoomAmenitiesDialog>
        </main>
        <div>
          <Dialog open={multipleOrderDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Start a new booking?</DialogTitle>
            <DialogContent>
              <Typography variant="body2">
                You are trying to add rooms from two different hotels
                Would you like discard the current booking and start a new one?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => onNewOrder()} variant="contained" color="primary">
                Confirm
              </Button>
              <Button onClick={() => setMultipleOrderDialog(false)} variant="contained" color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    </>
  );
}
