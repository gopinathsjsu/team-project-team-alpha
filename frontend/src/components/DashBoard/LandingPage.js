import React from 'react';
import SearchHotels from './SearchHotels';
import '../styles.css';
import { LicenseInfo } from '@mui/x-license-pro';
import { Navbar } from '../Navigation/Navbar';
import landingPage from '../../images/landingPage9.jpeg';


LicenseInfo.setLicenseKey(
  'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',
);

const Home = () => {
  return (
    <div style={{
      backgroundImage: `url(${landingPage})`, height: "100vh",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <Navbar />
      <div className='landingpage'>
        <SearchHotels />
      </div>
    </div>
  );
};

export default Home;