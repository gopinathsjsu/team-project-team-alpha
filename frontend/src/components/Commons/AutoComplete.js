import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import backendServer from '../../Config';


export default function AutoComplete(props) {
  const [places, setPlaces] = useState([]);
  useEffect(()=>{
    const response = axios.get( backendServer+"/v1/hotel/all-cities").then((response)=>{
        setPlaces(response.data);
    }).catch(()=>{
        alert("unable to load places");
    });
    setPlaces(response.data);
  },[]);
  return (
    <Autocomplete
      onInputChange={(e,newValue) => {
        console.log(newValue);
        props.setValue(newValue);
      }}
      inputValue={props.value}
      onChange={(e,newValue) => {
        console.log(newValue);
        props.setValue(newValue);
      }}
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={places}
      renderInput={(params) => (
        <TextField
          color="secondary"
          {...params}
          label="Where are you going?"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
}

// const places = [
//   { city: 'San Jose', state: 'California', country: 'United States' },
//   { city: 'Los Angeles', state: 'California', country: 'United States' }
// ];