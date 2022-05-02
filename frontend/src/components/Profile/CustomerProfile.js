/* eslint-disable import/named */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input, MenuItem } from '@mui/material';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Navbar } from '../Navigation/Navbar';

const theme = createTheme();

const locations = [
  {
    value: 'United States',
    key: 'USA',
    cities: [{
      key: 'SJC',
      value: 'San Jose',
    },
    {
      key: 'MPS',
      value: 'Milpitas',
    },
    {
      key: 'SVA',
      value: 'Sunny Vale',
    },
    {
      key: 'SFO',
      value: 'San Francisco',
    },
    {
      key: 'SCA',
      value: 'Santa Clara',
    }],
  },
  {
    value: 'India',
    key: 'IN',
    cities: [{
      key: 'DEL',
      value: 'Delhi',
    }, {
      key: 'BLR',
      value: 'Bangalore',
    }],
  },
];

export default function CustomerProfile() {
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [nickname, setNickName] = useState('');
  const [dob, setDOB] = useState('00-00-0000');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [cities, setCities] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [nameHelper, setNameHelper] = useState('');
  const [dobError, setDobError] = useState(false);
  const [dobHelper, setDobHelper] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberHelper, setPhoneNumberHelper] = useState('');
  const [zipError, setZipError] = useState(false);
  const [zipHelper, setZipHelper] = useState('');

  const navigate = useNavigate();

  const isValid = (payload) => {
    const nameRegex = new RegExp('^[a-zA-Z ]{1,256}$');
    if (!nameRegex.test(payload.CustomerName)) {
      setNameError(true);
      setNameHelper('Name should contain only characters');
      return false;
    }
    const phoneRegex = new RegExp('^[0-9]{10}$');
    if (!phoneRegex.test(payload.PhoneNumber)) {
      setPhoneNumberError(true);
      setPhoneNumberHelper('Phone number should only contain 10 digits');
      return false;
    }
    const zipRegex = new RegExp('^[0-9]{5}$');
    if (!zipRegex.test(payload.Pincode)) {
      setZipError(true);
      setZipHelper('Pincode must only contain 5 digits');
      return false;
    }
    const now = new Date();
    now.setDate(now.getDate() - 1);
    const selectedDoB = new Date(payload.DateOfBirth);
    if (selectedDoB >= now) {
      setDobError(true);
      setDobHelper('Date of Birth cant be a future date');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
   
  };

  const filterCities = (country) => {
    const records = locations.filter((loc) => loc.value === country);
    if (records.length) { setCities(records[0].cities); } else { setCities([]); }
  };

  const onPhotoChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const onCountryChange = (event) => {
    setCountry(event.target.value);
    const records = locations.filter((loc) => loc.value === event.target.value);
    setCities(records[0].cities || []);
  };

  const fileStyle = {
    display: 'none',
  };

  const imageStyle = {
    'margin-left': '45%',
  };

  return (
    <>
      <Navbar/>
      <ThemeProvider theme={theme}>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 1,
              pb: 1,
            }}
          >
            <Container maxWidth="xs">
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Your Profile!
              </Typography>
              <Typography variant="h6" align="center" color="text.secondary" paragraph>
                Tell us more about yourself...
              </Typography>
            </Container>
          </Box>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <CssBaseline />
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid style={imageStyle} item xs={12} sm={6} alignItems="center">
                    <Avatar
                      src={imageUrl}
                      sx={{ width: 50, height: 50 }}
                    />
                    <label htmlFor="image">
                      <Input accept="image/*" style={fileStyle} id="image" name="image" type="file" onChange={onPhotoChange} />
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      margin="none"
                      required
                      fullWidth
                      type="text"
                      id="name"
                      label="Name"
                      name="name"
                      error={nameError}
                      helperText={nameHelper}
                      onChange={(e) => { setName(e.target.value); setNameHelper(''); setNameError(false); }}
                      autoComplete="name"
                      value={name}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      margin="none"
                      required
                      fullWidth
                      type="text"
                      id="nickname"
                      label="Nick Name"
                      name="nickname"
                      onChange={(e) => setNickName(e.target.value)}
                      autoComplete="nick name"
                      value={nickname}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      margin="none"
                      required
                      fullWidth
                      id="dob"
                      type="date"
                      value={dob}
                      error={dobError}
                      helperText={dobHelper}
                      label="Date of Birth"
                      name="dob"
                      onChange={(e) => { setDOB(e.target.value); setDobHelper(''); setDobError(false); }}
                      autoComplete="dob"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      margin="none"
                      required
                      fullWidth
                      select
                      name="country"
                      label="Country"
                      type="text"
                      id="country"
                      value={country}
                      onChange={(event) => { onCountryChange(event); }}
                      autoComplete="country"
                    >
                      {locations.map((option) => (
                        <MenuItem key={option.key} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      margin="none"
                      required
                      fullWidth
                      type="text"
                      id="state"
                      label="State"
                      value={state}
                      name="state"
                      onChange={(e) => setState(e.target.value)}
                      autoComplete="state"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      margin="none"
                      required
                      fullWidth
                      select
                      name="city"
                      label="City"
                      type="text"
                      id="city"
                      // helperText={cityHelper}
                      value={city}
                      // error={cityError}
                      defaultValue=""
                      onChange={(e) => setCity(e.target.value)}
                      autoComplete="city"
                    >
                      {cities.map((option) => (
                        <MenuItem key={option.key} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="none"
                      required
                      fullWidth
                      type="text"
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      error={phoneNumberError}
                      helperText={phoneNumberHelper}
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setPhoneNumberHelper(''); setPhoneNumberError(false); }}
                      autoComplete="phone"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="none"
                      required
                      fullWidth
                      type="text"
                      id="pin"
                      label="Pin Code"
                      name="pincode"
                      error={zipError}
                      helperText={zipHelper}
                      value={pincode}
                      onChange={(e) => { setPincode(e.target.value); setZipError(false); setZipHelper(''); }}
                      autoComplete="pincode"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Update Profile
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Container>
        </main>
      </ThemeProvider>
    </>
  );
}