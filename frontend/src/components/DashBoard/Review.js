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

        <>
          {/* <ListItem key={props.order.transactionId} sx={{ py: 0, px: 0 }}>
            <ListItemText primary={props.order.roomEntry.name} /><br />
          </ListItem> */}
          <ListItem key={props.order.transactionId} sx={{ py: 0, px: 0 }}>
            <ListItemText primary={props.order.roomEntry.type} /><br />
          </ListItem>
          <ListItem key={props.order.transactionId} sx={{ py: 0, px: 0 }}>
            <ListItemText secondary={"Room Base Price after taxes"} />
            <ListItemText secondary={": $" + props.order.roomBasePrice} />
          </ListItem>
          <ListItem key={props.order.transactionId} sx={{ py: 0, px: 0 }}>
            <ListItemText secondary={"Booking from: "} />
            <ListItemText secondary={props.order.startTime} />
          </ListItem>
          <ListItem key={props.order.transactionId} sx={{ py: 0, px: 0 }}>
            <ListItemText secondary={"Booking to: "} />
            <ListItemText secondary={props.order.endTime} />
          </ListItem>
          <ListItem key={props.order.transactionId} sx={{ py: 0, px: 0 }}>
            <ListItemText secondary={"Total duration of stay: "} />
            <ListItemText secondary={props.order.duration + " days"} />
          </ListItem>
          {
            props.order.serviceEntryList.map(service => (
              <ListItem key={service.type} sx={{ py: 0, px: 0 }}>
                <ListItemText secondary={options[service.type]} />
                <ListItemText secondary={": $" + service.cost} />
              </ListItem>

            ))
          }
          <ListItem key={props.order.transactionId} sx={{ py: 0, px: 0 }}>
            <ListItemText secondary={"Actual cost after tax + services"} />
            <ListItemText secondary={": $" + props.order.actualCost} />
          </ListItem>
          <ListItem key={props.order.transactionId} sx={{ py: 0, px: 0 }}>
            <ListItemText secondary={"Reward points used"} />
            <ListItemText secondary={": $" + props.order.rewardPoints} />
          </ListItem>
          <ListItem key={props.order.transactionId} sx={{ py: 0, px: 0 }}>
            <ListItemText secondary={"Cost after discount"} />
            <ListItemText secondary={": $" + props.order.totalCost} />
          </ListItem>
        </>
      </List>
    </>
  );
}
