import React, { useState, UseEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
  ListItemIcon,
  ListItem,
  ListItemText,
  Divider,
  List,
  Box,

} from '@material-ui/core';
import {
  Home
} from '@material-ui/icons';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Link, useNavigate } from 'react-router-dom';
import MobileeRightMenuSlider from '@material-ui/core/Drawer';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FaceIcon from '@mui/icons-material/Face';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Grid } from '@mui/material';
import MenuItem from '@material-ui/core/MenuItem';
import bg from "../../images/trivago.svg"
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Button from '@material-ui/core/Button';
import { confirmCart, logout } from '../../state/action-creators/hotelActions';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  FormControl: {
    minWidth: 130,
    alignText: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuSliderContainer: {
    width: '100%',
    minWidth: '250px',
    paddingTop: '64px',
    background: '#7ac356',
    height: '100%'
  },
  avatar: {
    display: 'block',
    margin: '0.5rem auto',
    marginBottom: '4rem',
    width: theme.spacing(13),
    height: theme.spacing(13)
  },
  listItem: {
    color: '#222'
  }
}));


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  right: '5',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',

  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const routepage = [
  {
    // listIcon: <LandingPage />,
    listText: 'Dashboard',
    listPath: '/LandingPage'
  }
]


const menuItems = [
  {
    listIcon: <FaceIcon />,
    listText: 'Profile',
    listPath: '/customerProfile'
  },
  {
    listIcon: <Home />,
    listText: 'Dashboard',
    listPath: '/customerDashBoard'
  },
  {
    listIcon: <ListAltIcon />,
    listText: 'Bookings',
    listPath: '/customer/bookings'
  }
]

const styleimg = {
  display: 'block',
  margin: 'auto'
}

const stylebg = {
  background: '#6f42c1'
}


const options = {
  CONTINENTAL_BREAKFAST: 'Daily Continental Breakfast',
  FITNESS_ROOM: 'Access to fitness room',
  SWIMMING_POOL: 'Access to Swimming Pool/Jacuzzi',
  DAILY_PARKING: 'Daily Parking',
  ALL_MEALS_INCLUDED: 'All meals included (Breakfast, Lunch, Dinner)'
};

export const NavbarDashBoard = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    left: false
  })
  const [openCart, setOpenCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const cart = useSelector((state) => state.hotels.cart);


  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

  const sideList = slider => (
    <Box component='div' style={stylebg}
      className={classes.menuSliderContainer}
      onClick={toggleSlider(slider, false)}>

      {/* <Avatar className={classes.avatar} src={avatar} alt='' /> */}
      <img src={bg} width={'120'} height={'80'} style={styleimg} alt='' />

      <Divider />
      <List>
        {menuItems.map((listItem, key) => (
          <ListItem button key={key} component={Link} to={listItem.listPath}>
            <ListItemIcon className={classes.listItem}>{listItem.listIcon}</ListItemIcon>
            <ListItemText className={classes.listItem} primary={listItem.listText} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const onViewCart = () => {
    if (cart.length) {
      setOpenCart(true);
    } else {
      alert('Please add items to your cart');
    }
  };
  const getNumberOfItemsInCart = () => {
    return cart.length;
  };

  const getTotalPrice = () => {
    let price = 0.00;
    for (let i in cart) {
      price = price + cart[i].totalCost;
    }
    return price;
  };

  const onLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userId");
  }


  const onCheckOut = () => {
    let userId = sessionStorage.getItem("userId");
    dispatch(confirmCart(userId));
    navigate('/customer/booking-confirmed');
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <MobileeRightMenuSlider open={state.left}
              onClose={toggleSlider('left', false)}
              anchor='left' > {sideList('left')} </MobileeRightMenuSlider> <
                IconButton onClick={toggleSlider('left', true)} >
              <DehazeIcon style={
                { color: 'white' }} />
            </IconButton>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h2" className={classes.title}>
              <a href="/"><img src={bg} width={'160'} height={'80'} alt='' /> </a>
            </Typography>
            <IconButton aria-label="view cart" onClick={onViewCart}>
              <Badge badgeContent={getNumberOfItemsInCart()} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <a href="/"> <AccountCircle onClick={() => onLogout()}></AccountCircle></a>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Dialog open={openCart} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Order Summary</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Here's what your cart looks like
            </DialogContentText>
            <List disablePadding>
              {cart.map((item) => (
                <>
                   <ListItem key={item.transactionId} sx={{ py: 0, px: 0 }}>
                   <ListItemText primary={item.roomEntry.name} /><br />
                   </ListItem>
                  <ListItem key={item.transactionId} sx={{ py: 0, px: 0 }}>
                    <ListItemText primary={item.roomEntry.type} /><br />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      $
                      {item.roomEntry.cost ? item.roomEntry.cost : 0}
                    </Typography>
                  </ListItem>
                  <ListItem key={item.transactionId} sx={{ py: 0, px: 0 }}>
                    <ListItemText secondary={"Booking from: "} />
                    <ListItemText secondary={item.startTime} />
                  </ListItem>
                  <ListItem key={item.transactionId} sx={{ py: 0, px: 0 }}>
                    <ListItemText secondary={"Booking to: "} />
                    <ListItemText secondary={item.endTime} />
                  </ListItem>
                  <ListItem key={item.transactionId} sx={{ py: 0, px: 0 }}>
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
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  $
                  {getTotalPrice().toFixed(2)}
                </Typography>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onCheckOut()} variant="contained" color="primary">
              Confirm Booking
            </Button>
            <Button onClick={() => setOpenCart(false)} variant="contained" color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

