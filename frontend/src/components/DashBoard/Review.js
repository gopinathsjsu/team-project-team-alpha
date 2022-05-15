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

    let price = 0.00;
    for (let i in props.order.roomEntry) {
      price = price + props.order.roomEntry[i].totalCost;
    }
    return price;  
  }

  

  const onInstructionChange = (event) => {
    
  };

  const getTotalPrice = () => {
      return 20.001
  };


const options = {
  CONTINENTAL_BREAKFAST: 'Daily Continental Breakfast',
  FITNESS_ROOM: 'Access to fitness room',
  SWIMMING_POOL: 'Access to Swimming Pool/Jacuzzi',
  DAILY_PARKING: 'Daily Parking',
  ALL_MEALS_INCLUDED: 'All meals included (Breakfast, Lunch, Dinner)'
};


  return (
    <>
      <List disablePadding>
        {props.order.roomEntry.map((item) => (
             <>
             <ListItem key={item.transactionId} sx={{ py: 0, px: 0 }}>
             <ListItemText primary={item.name} /><br />
             </ListItem>
            <ListItem key={item.transactionId} sx={{ py: 0, px: 0 }}>
              <ListItemText primary={item.type} /><br />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                $
                {item.cost ? item.cost : 0}
              </Typography>
            </ListItem>
            <ListItem key={item.id} sx={{ py: 0, px: 0 }}>
              <ListItemText secondary={"Booking from: "} />
              <ListItemText secondary={props.order.startTime} />
            </ListItem>
            <ListItem key={item.id} sx={{ py: 0, px: 0 }}>
              <ListItemText secondary={"Booking to: "} />
              <ListItemText secondary={item.endTime} />
            </ListItem>
            <ListItem key={item.id} sx={{ py: 0, px: 0 }}>
              <ListItemText secondary={"Total duration of stay: "} />
              <ListItemText secondary={item.duration + " days"} />
            </ListItem>
            {
              item.serviceEntryList.map(service => (
                <ListItem key={service.type} sx={{ py: 0, px: 0 }}>
                  <ListItemText secondary={options[service.type]} />
                  <ListItemText secondary={": $" + service.cost} />
                </ListItem>

              ))
            }
          </>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Sub Total" />
          <Typography variant="subtitle1">
            $
            {getFinalPrice().toFixed(2)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
