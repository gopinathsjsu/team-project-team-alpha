/* eslint-disable no-shadow */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import IconButton from '@mui/material/IconButton';
// import ReceiptIcon from '@mui/icons-material/Receipt';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@material-ui/core/TablePagination';
// eslint-disable-next-line import/no-named-as-default
import { NavbarDashBoard } from '../Navigation/NavbarDashBoard';
import { setSelectedHotel, viewOrders } from '../../state/action-creators/hotelActions';
import { makeStyles } from '@material-ui/core';
import Review from './Review';
import UpdateHotelDialog from './UpdateHotelDialog';
import backendServer from '../../Config';

const theme = createTheme();

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

const statuses = [
  {
    key: 'all',
    value: 'All Orders',
  },
  {
    key: 'cancelled',
    value: 'Order Recieved',
  },
  {
    key: 'preparing',
    value: 'Preparing',
  }, {
    key: 'pickup-ready',
    value: 'Pick Up Ready',
  },
  {
    key: 'picked',
    value: 'Picked Up',
  },
  {
    key: 'ontheway',
    value: 'On The Way',
  },
  {
    key: 'delivery',
    value: 'Delivered',
  },
  {
    key: 'cancelled',
    value: 'Order Cancelled',
  }];

const CustomerOrder = () => {
  const [initialLoad, setInitialLoad] = useState([]);
  const [currentCard, setCurrentCard] = useState([]);
  const [openOrder, setOpenOrder] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const cards = useSelector((state) => state.hotels.bookings);
  const [status, setStatus] = useState('All Orders');
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const [order,setOrder] = useState({});
  const classes = useStyles()
  const [refresh, setRefresh] = useState(false);
  const [openAmenitiesDialog, setOpenAmenitiesDialog] = useState(false);



  const onStatusChange = (event) => {

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    if (userId === null) {
      navigate("/");
    }
    dispatch(viewOrders(userId));
    console.log(cards);
    setBookings(cards);
  }, []);

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    if (userId === null) {
      navigate("/");
    }
    dispatch(viewOrders(userId));
    console.log(cards);
    setBookings(cards);
  }, [refresh]);

 

  const onCancelBooking = async (currentCard) => {
    console.log(currentCard);
    await axios.post(backendServer + "/v1/reservation/cancel/" + currentCard.reservationId);
    setRefresh(!refresh);
  };

  const onUpdateBooking = async (currentCard) => {
    setOrder(currentCard);
    const response = await axios.get(backendServer + `/v1/hotel/${currentCard.hotelEntry.id}`);
    dispatch(setSelectedHotel(response.data));
    setOpenAmenitiesDialog(true);
  }

  const onView = (card) => {
    setCurrentCard(card);
    setOpenOrder(true);
  };

  const onCloseAmenitiesDialog = () => {
    const userId = sessionStorage.getItem("userId");
    setOpenAmenitiesDialog(false);
    dispatch(viewOrders(userId));
    setRefresh(!refresh);
    // let result = cards.filter(item=>item.reservationId===order.reservationId)
    // console.log(result);
    // setOrder(result[0]);
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
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Your Bookings!
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Here's what you have booked...
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                {/* <Button variant="outlined">View Orders</Button> */}
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 4 }} maxWidth="md">
            <TablePagination
              rowsPerPageOptions={[2, 5, 10]}
              component="div"
              count={cards.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Grid container spacing={1}>
              {(rowsPerPage > 0
                ? cards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : cards).map((card) => (
                  <Grid item key={card.roomEntry.id} xs={12}>
                    <Card>
                      <CardContent>
                        <Grid>
                          <Grid item xs={2}>
                            <img className={classes.img} alt="complex" src={card.hotelEntry.imageUrl} />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Typography gutterBottom variant="h5" component="h2">
                              {card.hotelEntry.name}
                            </Typography>
                            <Typography>
                              Booking from: {card.startTime}
                            </Typography>
                            <Typography>
                              Booking to: {card.endTime}
                            </Typography>
                            <Typography>
                              Status : {card.bookingState}
                            </Typography>
                            <Typography>
                              Duration of stay : {card.duration}
                            </Typography>
                            {/* <IconButton label="View Reciept" onClick={() => onView(card)} aria-label="view restaurant">
                              <ReceiptIcon />
                            </IconButton> */}
                          </Grid>
                          <Grid container>
                            <Grid item xs={12} sm={4}>
                              <Button variant="text" onClick={() => onView(card)}>View Reciept</Button>
                            </Grid>
                            {card.bookingState !== "CANCELLED" && (<Grid item xs={12} sm={4}>
                              <Button variant="text" onClick={() => onCancelBooking(card)}>Cancel Booking</Button>
                            </Grid>)}
                            {card.bookingState !== "CANCELLED" && (
                              <Grid item xs={12} sm={4}>
                                <Button variant="text" onClick={() => onUpdateBooking(card)}>Update Booking</Button>
                              </Grid>)}
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions />
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
          <UpdateHotelDialog order={order} open={openAmenitiesDialog} onClose={() => onCloseAmenitiesDialog()}></UpdateHotelDialog>
          <div>
            <Dialog open={openOrder} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Order Reciept</DialogTitle>
              <DialogContent>
                <Review order={currentCard} />
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={() => setOpenOrder(false)} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </main>
      </ThemeProvider>
    </>
  );
};

export default CustomerOrder;
