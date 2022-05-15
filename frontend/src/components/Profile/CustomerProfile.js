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
import { Input } from '@mui/material';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import backendServer from '../../Config';
import { SettingsSystemDaydreamOutlined } from '@material-ui/icons';
import { NavbarDashBoard } from '../Navigation/NavbarDashBoard';

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
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameHelper, setNameHelper] = useState('');
  const [rewards, setRewards] = useState('0');

  const navigate = useNavigate();

  const isValid = (payload) => {
    const nameRegex = new RegExp('^[a-zA-Z ]{1,256}$');
    if (!nameRegex.test(payload.CustomerName)) {
      setNameError(true);
      setNameHelper('Name should contain only characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let url = "";
    let userId = sessionStorage.getItem("userId");
    const data = new FormData(event.currentTarget);
    if (image) {
      let imageData = new FormData()
      imageData.append('file', image)
      let response = await axios.post(`${backendServer}/v1/user/${userId}/upload-image`, imageData);
      url = response.data.imageUrl
      setImageUrl(url);
    }
    let payload = {
      emailId: email,
      id: userId,
      imageUrl: imageUrl,
      name: name,
      rewardPoints: rewards
    };
    axios.put(`${backendServer}/v1/user/${userId}/update`, payload)
      .then(response => {
        navigate("/landingPage")
      })
      .catch(err => {
        console.log("Error");
      });

  };

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    const url = `${backendServer}/v1/user/${userId}`;
    axios
      .get(url)
      .then((response) => {
        setEmail(response.data.emailId);
        setImageUrl(response.data.imageUrl);
        setRewards(response.data.rewardPoints);
        setName(response.data.name);
      })
      .catch(() => {
      });
  }, []);

  const onPhotoChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const fileStyle = {
    display: 'none',
  };

  const imageStyle = {
    'margin-left': '45%',
  };

  return (
    <>
      <NavbarDashBoard />
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
                      margin="normal"
                      fullWidth
                      value={email}
                      data-testid="email"
                      id="email"
                      label="Email Address"
                      name="email"
                      disabled
                      autoComplete="email"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      margin="none"
                      required
                      fullWidth
                      type="number"
                      id="reward"
                      label="Reward Points"
                      name="rewards"
                      disabled
                      value={rewards}
                      autoComplete="rewards"
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
