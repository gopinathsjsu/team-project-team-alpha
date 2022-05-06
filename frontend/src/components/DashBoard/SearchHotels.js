import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BasicDateRangePicker from '../Commons/BasicDateRangePicker';
import { ColorButton4 } from '../Commons/index';
import AutoComplete from '../Commons/AutoComplete';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import backendServer from '../../Config';
import { storeSearchParams } from '../../state/action-creators/hotelActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';



const useStyles = makeStyles((theme) => ({
  fields: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
  },
  picker: {
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '77%'
    },
  },
  title: {
    fontSize: '50px',
    margin: 0,
    [theme.breakpoints.down('md')]: {
      fontSize: '35px',
    },
  },
  button: {
    height: '50px',
    alignSelf: 'center',
    width: '20%',
    [theme.breakpoints.down('md')]: {
      width: '95%'
    },
  }
}));



const SearchHotels = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [value, setValue] = useState([null,null]);
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const search = useSelector((state) => state.hotels.searchParams);

  useEffect(() => {
    if(search.value){
      setValue(search.value);
    }
    if(search.city){
      setCity(search.city);
    }
  });

  const onGo = () => {
    const searchData = {
      city: city,
      value: value
    }
    dispatch(storeSearchParams(searchData));
  }
  return (
    <div>
      <>
        <div className={classes.fields}>
          <Box >
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <AutoComplete value={city} setValue={setCity} />
              </Grid>
              <Grid item xs={6}>
                <BasicDateRangePicker value={value} setValue={setValue} />
              </Grid>
              <Grid item xs={1}>
                <ColorButton4
                  variant='contained'
                  onClick={async () => {
                    onGo();
                    // dispatch(storeSearchParams({source: from, destination: to, dateTime: value}));
                    // await dispatch(getFlightDetails());
                    console.log(city);
                    navigate('/customerDashBoard')
                  }}
                  className={classes.button}
                >
                  Go
                </ColorButton4>
              </Grid>
            </Grid>
          </Box>
        </div>
      </>
    </div>
  );
};

export default SearchHotels;