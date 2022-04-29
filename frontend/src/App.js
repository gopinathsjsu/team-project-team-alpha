import logo from './logo.svg';
import './App.css';
import LandPage from "./views/Dashboard"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLogin from "./views/hotel/UserLogin"
import HotelRegister from "./views/hotel/HotelRegister";
import HotelProfile from "./views/hotel/HotelProfile"
import HotelDashboard from './views/hotel/HotelDashboard';
import AddRoom from './views/hotel/AddRoom';
const App = () =>{
  return (
    <div >
      <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<LandPage/>}></Route>
      <Route path="/UserLogin" exact element={<UserLogin/>}></Route>
      <Route path="/HotelRegister" exact element={<HotelRegister/>}></Route>
      <Route path="/HotelProfile" exact element={<HotelProfile/>}></Route>
      <Route path="/HotelDashboard" exact element={<HotelDashboard/>}></Route>
      <Route path="/AddRoom" exact element={<AddRoom/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
