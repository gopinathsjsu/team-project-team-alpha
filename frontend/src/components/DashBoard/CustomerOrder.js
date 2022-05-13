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
import { viewOrders } from '../../state/action-creators/hotelActions';
import { makeStyles } from '@material-ui/core';
import Review from './Review';

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
  const classes = useStyles()


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
    let userId = "1";
    dispatch(viewOrders(userId));
    let bookingsByPeriod = {};
    cards.forEach((booking) => {
      const period = booking.startTime + "#" + booking.endTime;
      if (bookingsByPeriod[period]) {
        bookingsByPeriod[period].push(booking);
      } else {
        bookingsByPeriod[period] = [booking];
      }
    })
    // console.log(bookingsByPeriod);
  }, []);

  useEffect(() => {
    let bookingsByPeriod = {};
    cards.forEach((booking) => {
      const period = booking.startTime + "#" + booking.endTime;
      const hotelId = booking.hotelEntry.id;
      if (!bookingsByPeriod[period]) {
        bookingsByPeriod[period] = [];
      }
      if (!bookingsByPeriod[period][hotelId]) {
        bookingsByPeriod[period][hotelId] = [];
      }
      bookingsByPeriod[period][hotelId].push(booking);
    })
    let bookings = [];
    for (let i in bookingsByPeriod) {
      bookings = [...bookings, ...bookingsByPeriod[i]];
    }
    bookings = bookings.filter(e => e)
    let order = [];
    for (let i = 0; i < bookings.length; i++) {
      let newOrder = {};
      newOrder.hotelEntry = bookings[i][0].hotelEntry;
      let start = new Date(bookings[i][0].startTime);
      let end = new Date(bookings[i][0].startTime);
      newOrder.startTime = start.toString();
      newOrder.endTime = end.toString();
      newOrder.userEntry = bookings[i][0].userEntry;
      newOrder.roomEntry = [];
      for (let j = 0; j < bookings[i].length; j++) {
        newOrder.roomEntry.push(bookings[i][j].roomEntry);
      }
      order.push(newOrder);
    }
    console.log(order);
    setBookings(order);
  }, [cards]);

  const onCancelOrder = (currentCard) => {
    setOpenOrder(false);
  };

  const onView = (card) => {
    setCurrentCard(card);
    setOpenOrder(true);
  };



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

              <TextField
                margin="normal"
                required
                fullWidth
                select
                value={status}
                onChange={onStatusChange}
                name="status"
                label="Order Status"
                type="text"
                id="status"
                autoComplete="status"
              >
                {statuses.map((option) => (
                  <MenuItem key={option.key} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>

            </Container>
          </Box>
          <Container sx={{ py: 4 }} maxWidth="md">
            <TablePagination
              rowsPerPageOptions={[2, 5, 10]}
              component="div"
              count={bookings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Grid container spacing={1}>
              {(rowsPerPage > 0
                ? bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : bookings).map((card) => (
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
                            {/* <IconButton label="View Reciept" onClick={() => onView(card)} aria-label="view restaurant">
                              <ReceiptIcon />
                            </IconButton> */}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Button variant="text" onClick={() => onView(card)}>View Reciept</Button>
                            {card.OrderStatus === 'Order Recieved' && (
                              <Button variant="text" onClick={() => onCancelOrder(card)}>Cancel Order</Button>
                            )}
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions />
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
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
