/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { useEffect } from 'react';

export default function Review(props) {
  
  const dispatch = useDispatch();
  const instruction = useState('');

  useEffect(() => {
    console.log(props.order);
  }, []);


  const getFinalPrice = () => {
    return 20.001
  };

  const onInstructionChange = (event) => {
    
  };

  const getTotalPrice = () => {
      return 20.001
  };


  return (
    <>
      <List disablePadding>
        {props.order.roomEntry.map((item) => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <Grid container>
              <ListItemText primary={item.name} secondary={item.description} />
              <Grid item xs={12} sm={6}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      Type :
                      {item.type}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      Price :
                      {item.cost}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Sub Total" />
          <Typography variant="subtitle1">
            $
            {getTotalPrice().toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      { props.placeorder && (
      <TextField
        TextField
        id="standard-basic"
        variant="standard"
        margin="none"
        fullWidth
        label="Any special instructions?"
        name="name"
        autoComplete="name"
        value={instruction}
        onChange={(event) => onInstructionChange(event)}
      />
      )}
      <Grid container spacing={2}>
        {/* <Grid visibility={getAddressVisibility()} item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment Due: $
            {getFinalPrice().toFixed(2)}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Hotel Details
          </Typography>
          <Typography gutterBottom>{deliveryAddress.AddressLine1}</Typography>
          <Typography gutterBottom>{deliveryAddress.AddressLine2}</Typography>
          <Typography gutterBottom>
            {deliveryAddress.City}
            ,
            {deliveryAddress.State}
            ,
            {deliveryAddress.Pincode}
          </Typography>
        </Grid> */}
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Price Details
          </Typography>
          <Grid container>
            <>
              <Grid item xs={6}>
                <Typography gutterBottom>Sub Total</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  $
                  {getTotalPrice().toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Delivery fee</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  $
                  {(getTotalPrice() * 0.01).toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Service fee</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  $
                  {(getTotalPrice() * 0.02).toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Tax</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  $
                  {(getTotalPrice() * 0.09).toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Total</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  $
                  {getFinalPrice().toFixed(2)}
                </Typography>
              </Grid>
            </>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
