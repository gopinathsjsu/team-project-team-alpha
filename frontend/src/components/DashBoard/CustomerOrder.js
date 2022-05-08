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

const theme = createTheme();

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
  const dispatch = useDispatch();


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
    let userId = "4";
    dispatch(viewOrders(userId));
  }, []);

  const onCancelOrder = (currentCard) => {
    
  };

  const onView = (card) => {
   
  };

  return (
    <>
      <NavbarDashBoard/>
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
                  <Grid item key={card.OrderId} xs={12}>
                    <Card>
                      <CardContent>
                        <Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography gutterBottom variant="h5" component="h2">
                              {card.roomEntry.name}
                            </Typography>
                            <Typography>
                              Booking from :
                              {card.startTime}
                            </Typography>
                            <Typography>
                              Booking to :
                              {card.endTime}
                            </Typography>
                            <Typography>
                              Room Type :
                              {card.roomEntry.type}
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
                {/* <Receipt order={currentCard} /> */}
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
