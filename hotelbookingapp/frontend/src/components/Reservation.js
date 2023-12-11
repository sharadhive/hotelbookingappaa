import axios from 'axios';
import '../css/User.css';
import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

const Reservation = () => {
  const [reservationData, setReservationData] = useState([]);
  const [hasBooking, setHasBooking] = useState(true);
  const userDet = JSON.parse(localStorage.getItem('user'));
  const userDetails = userDet.user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosInstance = axios.create({
          withCredentials: true,
        });

        const response = await axiosInstance.post("https://hotelbookingbackend-4asp.onrender.com/api/booking/reserve" , { user: userDetails.toString() });
        setReservationData([...reservationData , response.data]);
        if (reservationData.length === 0) {
          setHasBooking(false); 
        }

        
      } catch (error) {
        // console.log('Error Occurred Fetching Reservation Data', error);
        
      }
    };
    fetchData();
  }, [userDetails]);

  

  return (
    <div className="user-info">
      { !hasBooking ? (
        <table>
          <tbody>
            <tr>
              <td><strong>Room</strong></td>
              <td><strong>From</strong></td>
              <td><strong>To</strong></td>
              <td><strong>Amount</strong></td>
            </tr>
            {reservationData && reservationData.map((booking, index) => (
              <tr key={index}>
                <td>{booking.name}</td>
                <td>{booking.from}</td>
                <td>{booking.to}</td>
                <td>Rs.{booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='noBooking'>
          <p>Currently You do not have any bookings yet.</p>
          <Link to="/" className='nav-link'>Go to Homepage</Link>
        </div>
      )}
    </div>
  );
};

export default Reservation;