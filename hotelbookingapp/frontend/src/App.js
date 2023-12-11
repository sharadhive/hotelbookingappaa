
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./components/Container";
import Login from "./components/Login";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Booking from "./components/Booking";
import { DataProvider } from "./Context/DataContext";
import Reservation from "./components/Reservation";
import AdminPage from "./components/AdminPage";
import User from "./components/User";
import AddRoom from "./components/AddRoom";
import LandingPage from './components/LandingPage';

function App() {
  return (
    <>
    <DataProvider>

  
      <ToastContainer />
      <Header />
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path='/container' element={<Container />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path="/book/:bookingid" element={<Booking/>}/>
        <Route path="/reservation" element={<Reservation/>}/>
       <Route path="/admin" element={<AdminPage/>}>
        <Route path="/admin/:user" element={<User/>}/>
        <Route path="/admin/:add-room" element={<AddRoom/>}/>
        </Route>
      </Routes>
      </DataProvider>
    </>
  );
}

export default App;