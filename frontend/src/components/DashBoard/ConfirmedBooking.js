import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { NavbarDashBoard } from '../Navigation/NavbarDashBoard';

const theme = createTheme();



export default function ConfirmedBooking() {
    const navigate = useNavigate();

    const onViewStatus = () => {
      navigate('/customer/bookings');
    };
  
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavbarDashBoard/>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                  <>
                    <Typography variant="h5" gutterBottom>
                      Life is a choice. You took the right one!
                      <br/>Thank you for choosing us.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your booking is confirmed. You can check more details in the bookings page.
                    </Typography>
                    <Button onClick={onViewStatus} variant="outlined">Check Status</Button>
                  </>
            </Paper>
          </Container>
        </ThemeProvider>
      </>
    );
  }
  