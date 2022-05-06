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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendServer from '../../Config'
import SearchIcon from '@mui/icons-material/Search';
import {Navbar} from '../Navbar';
import { NearMeTwoTone } from '@material-ui/icons';
import props from 'prop-types';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { styled } from '@mui/material/styles';

import  { tableCellClasses } from '@mui/material/TableCell';


const theme = createTheme();

const ViewBooking = () => {

    const history = useNavigate();

  if(!localStorage.getItem("RestaurantId")){
    history.push("/RestaurantLogin")
  }
    const [OrderResponse, setOrderResponse] = useState([]);

    const [searchValue, setSearch] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    const [value, setValue] = useState([])
    //const [value2, setValue2] = useState([])

    const [OrderIdValue, setOrderIdValue] = useState('')

    const onChange1 = (event) => {
        setSearch(event.target.value)

        console.log("filter", event.target.value)
        if (event.target.value == "All Orders") {

            console.log("else", event.target.value)
            setOrderResponse(value)
            console.log(value)
        }
        else if (event.target.value != '') {
            console.log(OrderResponse.OrderStatus, typeof(value.OrderStatus), typeof(event.target.value))
            let filter_1 = value.filter(res => res.OrderStatus != null && res.OrderStatus == event.target.value);
            console.log("orderFil", filter_1)
            setOrderResponse(filter_1);

        }
        else{
            <h1>No Pending Orders</h1>
        }

    }

    useEffect( () => {
        console.log("in customer order")

        const RestaurantId = localStorage.getItem("HotelID")

        console.log("rest Id", RestaurantId)

       axios.get(`${backendServer}/v1/reservation/hotel/${RestaurantId}`)
       .then((response) =>{
        console.log("restaurant orders", response.data)

        setOrderResponse(response.data)
        setValue(response.data)
       })
       .catch((err) =>{
           return false;
       })

       
        
        //const data1 = OrderResponse[0].DeliveryType; 
    }, [])


    // pop up code

    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');

    // const handleChange = ( parameter1) =>  (event) => {
    //     setAge(event.target.value || '');
    //    // setOrderId(parameter1)
    //     console.log("event value", event.target.value)

    //    // console.log("ORder id", OrderIdValue)
      
        
    // };


    // const handleClickOpen = (param1) => () => {
    //     setOpen(true);
    //     setOrderIdValue(param1)
    //     console.log("OrderIdValue", param1)
      
    // };

    // const handleClose = (event, reason) => {
    //     if (reason !== 'backdropClick') {
    //         setOpen(false);
    //     }

    //     const RestaurantId = localStorage.getItem("RestaurantId")
    //     console.log("index response", OrderResponse)
    //     const idx = OrderResponse.findIndex(item=>item.OrderId==OrderIdValue);
    //     console.log("idx value", idx)
    //     OrderResponse[idx].OrderStatus = age;
    //     axios.post(`${backendServer}/restaurant/orders/${OrderIdValue}/${age}`
    //     ).then((response) =>{
    //         console.log(response)
    //     })
    //     .catch((err) =>{
    //         console.log(err)
    //     })
       

    // };

    //pop up code

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    const viewCustomer = (ID) =>{
        
        sessionStorage.setItem("TempCustomerId", ID)
        history.push("/RestaurantCustomerView")
    }

    return (
        <>
            <Navbar />
            <h2 style={{
                display: "flex",
                paddingTop: "20px",
                justifyContent: "center",
                alignItems: "center"
            }}>Your Customer Bookings</h2>
            <div style={{
                display: "flex",
                paddingTop: "80px",
                justifyContent: "center",
                alignItems: "center"
            }}>

<TableContainer component={Paper} style={{ width: 1000 }}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer ID</StyledTableCell>
            <StyledTableCell align="center">Room No.</StyledTableCell>
            <StyledTableCell align="center">Start Time</StyledTableCell>
            <StyledTableCell align="center">End Amount</StyledTableCell>
            <StyledTableCell align="center">Booking Status</StyledTableCell>
            <StyledTableCell align="center">Edit Order Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {OrderResponse.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Avatar align="center" alt="Remy Sharp"  >{row.room_id}</Avatar>
              </TableCell>
              <TableCell align="center"><Button onClick={() => viewCustomer(row.CustomerId)}>View</Button></TableCell>
              <TableCell align="center">{row.start_time}</TableCell>
              <TableCell align="center">{row.end}</TableCell>
              <TableCell align="center">{row.booking_state}</TableCell>
              {/* <TableCell align="center"> 
              <Button onClick={handleClickOpen(row.OrderId)}>Edit Order</Button>
                            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                <DialogTitle>Update Order Status</DialogTitle>
                                <DialogContent>
                                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <FormControl sx={{ m: 1, minWidth: 420 }}>
                                            <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
                                            <Select
                                                native
                                                value={age}
                                                onChange={handleChange( row.OrderId)}
                                                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                                            >

                                                <option aria-label="None" value="" />
                                                <option value="Order Received">Order Received</option>
                                                <option value="Preparing">Preparing</option>
                                                <option value="On The Way">On The Way</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Pick Up Ready">Pick Up Ready</option>
                                                <option value="Picked Up">Picked Up</option>

                                            </Select>
                                        </FormControl>

                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleClose}>Ok</Button>
                                </DialogActions>
                            </Dialog>
              </TableCell> */}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            </div>
        </>

    );

}

export default ViewBooking;