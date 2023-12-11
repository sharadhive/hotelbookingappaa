import "../css/Booking.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams , Link} from "react-router-dom";
import { toast } from "react-toastify";
import { DataContext } from "../Context/DataContext";

const Booking = () => {
  const [bookingdata, setBookingData] = useState("");
  const id = useParams();
  const { bookingid } = id;
  const navigate = useNavigate();
  const { fromDate, toDate , setFromDate , setToDate} = useContext(DataContext);

  // Calculating Days
  const fromDateStr = `${fromDate}`;
  const toDateStr = `${toDate}`;

  // Split the date strings and create Date objects
  const [day1, month1, year1] = fromDateStr.split("/").map(Number);
  const [day2, month2, year2] = toDateStr.split("/").map(Number);

  // Note: Months are zero-indexed in JavaScript Dates, so subtract 1 from the month
  const from = new Date(year1, month1 - 1, day1);
  const to = new Date(year2, month2 - 1, day2);

  // Calculate the difference in milliseconds
  const differenceInMs = to - from;

  // Convert milliseconds to days
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const differenceInDays = Math.floor(differenceInMs / millisecondsInDay);
// Days Calculation finished here

  useEffect(() => {
    try {
      const axiosInstance = axios.create({
        withCredentials: true,
      });
      axiosInstance
        .post("https://hotelbookingbackend-4asp.onrender.com/api/room/get-rooms", {
          _id: `${bookingid}`,
        })
        .then((res) => {
          setBookingData(res.data);
        });
    } catch (error) {
      console.log("Error Occured", error.name);
    }
  }, [bookingid]);

  // Booking Room
  const handleBooking = async () => {
    const userDetail = JSON.parse(localStorage.getItem("user"));
    const userDetails = userDetail.user;

    const bookingObj = {
      user: userDetails.id,
      name: bookingdata.name,
      price: bookingdata.price,
      from: fromDate,
      to: toDate,
      days: differenceInDays,
      amount : differenceInDays * bookingdata.price
    };

    try {
      const axiosInstance = axios.create({
        withCredentials: true,
      });
      const response = await axiosInstance.post(
        "https://hotelbookingbackend-4asp.onrender.com/api/booking",
        bookingObj
      );
      toast.success("Successfully Room Booked", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);

      
    } catch (error) {
      console.log("Error Occurred", error.name);
    }
  };

if(!fromDate && !toDate) {
  return <div className="nodate"><p>Please Select Booking Date</p>
  <span><Link className='nav-link' to={'/'}>Redirect to HomePage</Link>  </span></div>
}

  return (
    <div className='booking-page'>
      <div className='booking-image'>
        <img src={bookingdata.img} alt='Room Image' width='400' height='300' />
      </div>
      <div className='booking-details'>
        <h2>Booking Details</h2>
        <p>
          <strong>Name:</strong> {bookingdata.name}
        </p>
        <p>
          <strong>From:</strong> {fromDate}
        </p>
        <p>
          <strong>To:</strong> {toDate}
        </p>
        <p>
          <strong>Days:</strong>
          {differenceInDays + 1}
        </p>
        <p>
          <strong>Price:</strong> Rs.
          
          {bookingdata.price}
        </p>
        <p>
          <strong>Amount:</strong> Rs.
          {bookingdata.price * (differenceInDays + 1)}
        </p>
        <button className=' btn-book' onClick={() => handleBooking()}>
          Book Now
        </button>
        {/* {console.log(bookingdata)}
        {console.log(userDetails)} */}
      </div>
    </div>
  );
};

export default Booking;