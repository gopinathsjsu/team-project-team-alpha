import React, { useState, UseEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../images/uber-eats.svg';
import newlogo from '../images/UberEATS.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
import LandingPage from "../views/hotel/UserLogin"

import { DropdownMenu } from 'react-bootstrap-dropdown-menu';

import {
  ListItemIcon,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  List,
  Box,
  InputLabel
} from '@material-ui/core';
import {
  ArrowBack,
  HistorySharp,
  Home
} from '@material-ui/icons';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import avatar from '../images/avatar.svg';
import { Link } from 'react-router-dom';
import MobileeRightMenuSlider from '@material-ui/core/Drawer';
import uberlogo from '../images/uberlogo.svg';
import SearchBar from "material-ui-search-bar";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import props from 'prop-types';
import PropTypes from 'prop-types';
import FaceIcon from '@mui/icons-material/Face';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Select, FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from "@material-ui/core/Grid";
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';

import LogoutIcon from '@mui/icons-material/Logout';
// import { logout } from '../actions';
// import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bg from "../images/trivago.svg"


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

//   search bar styles



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

// search bar style ends


//const dispatch = useDispatch();


const routepage = [
  {
    listIcon: <LandingPage />,
    listText: 'Dashboard',
    listPath: '/LandingPage'
  }
]

// function logout1()  {
//   console.log("clicked logout")

//   useDispatch.dispatch(logout('', ''));


// }

const menuItems = [
  {
    listIcon: <FaceIcon />,
    listText: 'Profile',
    listPath: '/HotelProfile'
  },
  {
    listIcon: <Home />,
    listText: 'Bookings',
    listPath: '/HotelBooking'
  },
  {
    listIcon: <ShoppingCartIcon />,
    listText: 'Rooms',
    listPath: '/HotelDashboard'
  },
  // {
  //   listIcon: <FavoriteIcon />,
  //   listText: 'Favourites',
  //   listPath: '/Favourites'
  // },
  // {
  //   listIcon: <LogoutIcon onClick={logout1} />,
  //   listText: 'Logout',
  //   listPath: '/'
  // }
]




const styleimg = {
  display: 'block',
  margin: 'auto'
}

const stylebg = {
  background: '#6f42c1'
}

export const Navbar = (props) => {
  const classes = useStyles();

  const history = useNavigate();



  const [state, setState] = useState({
    left: false
  })

  const [value, setValue] = useState('');

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


  // dropdown 
  // const [value, setValue] = useState('')

  // const handleBtnChange = e => setValue(e.target.value)

  //console.log("filter Value", value)



  const [state1, setState1] = React.useState({

    checkedB: true


  });

  const handleChange = name => event => {
    setState1({ ...state1, [name]: event.target.checked });

    console.log("statevalue", state1.checkedB)
  };

  console.log(state1)


  const [age, setAge] = React.useState('');

  const handleProfileChange = (event) => {
    setAge(event.target.value);
    console.log(age)
  }

  return (
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
          {/* {flag ?<>  */}

          {/* <FormGroup row style={{
            display: "flex",
            paddingRight: "650px",
            justifyContent: "center"
          }}  >
            <FormControlLabel
              control={
                <>
                </>
              }

              label="Pick-Up"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange('checkedB')}
                  value="checkedB"
                  color="Black"
                />
              }
              label="Delivery"
            />
          </FormGroup> */}

          {!state1.checkedB ?

            <FormControl className={classes.FormControl} style={{
              display: "flex",
              paddingRight: "20px",
              justifyContent: "center",
            }}>
              <InputLabel>Hotel Filter</InputLabel>
              <Select value={value} onChange={(event) => props.handleBtnChange(event)}>
                <MenuItem value="All Orders">All Orders</MenuItem>
                <MenuItem value="Order Received">Order Received</MenuItem>
                <MenuItem value="Preparing">Preparing</MenuItem>
                <MenuItem value="Pick Up Ready">Pick Up Ready</MenuItem>
                <MenuItem value="Picked Up">Picked Up</MenuItem>
                <MenuItem value="Cancel Order">Cancel Order</MenuItem>
              </Select>
            </FormControl>

            : (<FormControl className={classes.FormControl} style={{
              display: "flex",
              paddingRight: "20px",
              justifyContent: "center",
            }}>
              <InputLabel>Hotel Filter</InputLabel>
              <Select value={value} onChange={(event) => props.handleBtnChange(event)}>
                <MenuItem value="All Orders">All Orders</MenuItem>
                <MenuItem value="Order Received">Order Received</MenuItem>
                <MenuItem value="Preparing">Preparing</MenuItem>
                <MenuItem value="On The Way">On The Way</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Cancel Order">Cancel Order</MenuItem>

              </Select>
            </FormControl>)}

          <Search
            onChange={(event) => props.handleSearch(event)}
          >
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {/* <Button color="inherit" component={RouterLink} to="/LandingPage">Login</Button> */}
          {/* <a href="/UserProfile"> */}
          {/* <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleProfileChange}
          >
            <MenuItem value={10}>Profile</MenuItem>
            <MenuItem value={20}>Logout</MenuItem>

          </Select> */}
        <a href="/UserProfile"> <AccountCircle ></AccountCircle></a>
          {/* </a> */}
          {/* </> : <></>} */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

// Navbar.propTypes = {
//   onChange: PropTypes.func,
//   onSelect: PropTypes.func
// }

