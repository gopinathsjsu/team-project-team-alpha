import './App.css';
import LandPage from "./views/Dashboard"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HotelLogin from "./views/hotel/HotelLogin"
import HotelRegister from "./views/hotel/HotelRegister";
import HotelProfile from "./views/hotel/HotelProfile"
import HotelDashboard from './views/hotel/HotelDashboard';
import AddRoom from './views/hotel/AddRoom';
import CustomerDashBoard from './components/DashBoard/CustomerDashBoard';
import CustomerHotelRooms from './components/DashBoard/CustomerHotelRooms';
import LandingPage from './components/DashBoard/LandingPage';
import CustomerProfile from './components/Profile/CustomerProfile';
import ViewBooking from "./views/hotel/ViewBooking"

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandPage />}></Route>
          <Route path="/HotelLogin" exact element={<HotelLogin />}></Route>
          <Route path="/HotelRegister" exact element={<HotelRegister />}></Route>
          <Route path="/HotelProfile" exact element={<HotelProfile />}></Route>
          <Route path="/HotelDashboard" exact element={<HotelDashboard />}></Route>
          <Route path="/AddRoom" exact element={<AddRoom />}></Route>
          <Route path="/landingPage" exact element={<LandingPage></LandingPage>}></Route>
          <Route path="/customerDashboard" exact element={<CustomerDashBoard />}></Route>
          <Route path="/customerHotelRooms" exact element={<CustomerHotelRooms />}></Route>
          <Route path="/customerProfile" exact element={<CustomerProfile />}></Route>
          <Route path="/ViewBooking" exact element={<ViewBooking />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
