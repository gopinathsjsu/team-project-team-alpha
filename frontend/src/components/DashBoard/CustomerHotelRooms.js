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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getHotelRoomDetails, removeFromCart, setSelectedRoom } from '../../state/action-creators/hotelActions';
import { NavbarDashBoard } from '../Navigation/NavbarDashBoard';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function CustomerHotelRooms() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [multipleOrderDialog, setMultipleOrderDialog] = useState(false);
  // const [currentHotelDetails, setcurrentHotelDetails] = useState([]);
  const [openAmenitiesDialog, setOpenAmenitiesDialog] = useState(false);
  const selectedHotel = useSelector((state)=> state.hotels.selectedHotel);
  const cards = useSelector((state)=>state.hotels.hotelRooms);
  const searchData = useSelector((state) => state.hotels.searchParams);
  const cart = useSelector((state)=>state.hotels.cart);
  let endDate =  searchData.value[1]?new Date(searchData.value[1]).toISOString().split('T')[0]: '';
  let startDate = searchData.value[0]?new Date(searchData.value[0]).toISOString().split('T')[0]: '';
  const onNewOrder = () => {

  };

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    if(userId===null){
      navigate("/");
    }
    dispatch(getHotelRoomDetails(selectedHotel.id, startDate, endDate));
 },[]);



  const onAddToCart = (card) => {
    dispatch(setSelectedRoom(card));
    setOpenAmenitiesDialog(true);
  };

  const onRemoveFromCart = (card) => {
    dispatch(removeFromCart(card.id,cart));
    console.log(cart);
  };

  const onCloseAmenitiesDialog = () => {
    setOpenAmenitiesDialog(false);
  }

  return (
    <>
      <NavbarDashBoard />
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
                      <img className={classes.img} alt="complex" src={selectedHotel.imageUrl} />
                    </Grid>
                    <Grid item xs={10} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="h5" component="h2">
                            {selectedHotel.name}
                          </Typography>
                          <Typography>
                            {selectedHotel.description}
                          </Typography>
                          <Typography>
                            Phone :
                            {' '}
                            {selectedHotel.contactNo}
                          </Typography>
                          <Typography>
                            Email :
                            {' '}
                            {selectedHotel.emailId}
                          </Typography>
                          <Typography>
                            Location :
                            {' '}
                            {selectedHotel.city}
                          </Typography>
                          <Typography>
                            Zip :
                            {' '}
                            {selectedHotel.zipCode}
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
                <Grid item key={card.id} xs={6} sm={3} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: '0.25%',
                      }}
                      image={card.imageUrl}
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
                        Price: ${card.cost}
                      </Typography>
                      <Typography>
                        Type:
                        {' '}
                        {card.type}
                      </Typography>
                      <Typography>
                        No of Adults allowed:
                        {' '}
                        {card.adults}
                      </Typography>
                      <Typography>
                        No of children allowed:
                        {' '}
                        {card.children}
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
