import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoComplete(props) {
  return (
    <Autocomplete
      onInputChange={(e,newValue) => {
        console.log(newValue);
        props.setValue(newValue);
      }}
      onChange={(e,newValue) => {
        console.log(newValue);
        props.setValue(newValue);
      }}
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={places.map((option) => option.city)}
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

const places = [
  { city: 'San Jose', state: 'California', country: 'United States' },
  { city: 'Los Angeles', state: 'California', country: 'United States' }
];