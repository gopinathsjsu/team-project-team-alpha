/* eslint-disable import/named */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-shadow */
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  createTheme, ThemeProvider,
} from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import { Navbar } from '../../views/Navbar';
import { ColorButton4 } from '../Commons';
import landingPage from '../../images/landingPage.jpeg';
import { NavbarDashBoard } from '../Navigation/NavbaDashBoard';
import SearchHotels from './SearchHotels';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelDetails } from '../../state/action-creators/hotelActions';



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

export default function CustomerDashBoard() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const searchData = useSelector((state) => state.hotels.searchParams);
  const hotelDetails = useSelector((state) => state.hotels.hotelDetails);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    console.log("in",searchData);
    dispatch(getHotelDetails(searchData));
  },[searchData]);


  useEffect(() => {
     console.log("yes",hotelDetails);
     setCards(hotelDetails);
  },[hotelDetails]);

  // var cards = [{
  //   city: "San Jose",
  //   contactNo: "6692927846",
  //   country: "United States",
  //   emailId: "marriot@gmail.com",
  //   id: 0,
  //   imageUrl: './images/trivago.jpg',
  //   description: "The best place to stay when you are in silicon valley",
  //   name: "Marriot",
  //   zipCode: "95125"
  // }, {
  //   city: "San Jose",
  //   contactNo: "6692927846",
  //   country: "United States",
  //   emailId: "marriot@gmail.com",
  //   id: 0,
  //   imageUrl: './images/trivago.jpg',
  //   description: "The best place to stay when you are in silicon valley",
  //   name: "Marriot",
  //   zipCode: "95125"
  // }, {
  //   city: "San Jose",
  //   contactNo: "6692927846",
  //   country: "United States",
  //   emailId: "marriot@gmail.com",
  //   id: 0,
  //   imageUrl: './images/trivago.jpg',
  //   description: "The best place to stay when you are in silicon valley",
  //   name: "Marriot",
  //   zipCode: "95125"
  // }]

  const onViewHotel = (card) => {
    navigate("/customerHotelRooms");
  }

  return (
    <>
      <div style={{
        // backgroundImage: `url(${landingPage})`, height: "100vh",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover"
      }}>
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
                  Welcome back!
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  Find your perfect place to stay
                </Typography>
              </Container>
            </Box>
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <SearchHotels />
            </div>

            <Container sx={{ py: 8 }} maxWidth="md">
              <Grid container spacing={4}>
                <TablePagination
                  rowsPerPageOptions={[2, 5, 10]}
                  component="div"
                  count={cards.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                {(rowsPerPage > 0
                  ? cards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : cards).map((card) => (
                    <Grid item key={card.RestaurantId} xs={12}>
                      <Card
                        sx={{ display: 'flex', flexDirection: 'column' }}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Grid container spacing={1}>
                            <Grid item xs={2}>
                              <img className={classes.img} alt="complex" src="../images/grid/trivago.jpg" />
                            </Grid>
                            <Grid item xs={10} sm container>
                              <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                  <Typography gutterBottom variant="h5" component="h2">
                                    {card.name}
                                  </Typography>
                                  <Typography>
                                    {card.description}
                                  </Typography>
                                  <Typography>
                                    Phone :
                                    {' '}
                                    {card.contactNo}
                                  </Typography>
                                  <Typography>
                                    Email :
                                    {' '}
                                    {card.emailId}
                                  </Typography>
                                  <Typography>
                                    Location :
                                    {' '}
                                    {card.city}
                                  </Typography>
                                  <Typography>
                                    Zip :
                                    {' '}
                                    {card.zipCode}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item>
                                {/* <Typography variant="subtitle1">$19.00</Typography> */}
                                <CardActions>
                                  <Button variant="contained" color="success" onClick={() => onViewHotel(card)}>
                                    View Hotel
                                  </Button>
                                </CardActions>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>

                  ))}
              </Grid>
            </Container>
          </main>
        </ThemeProvider>
      </div>
    </>
  );
}
