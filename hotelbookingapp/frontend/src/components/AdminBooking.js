import '../css/User.css';
import {useEffect,  useState }  from 'react'
import axios from 'axios'


const AdminBooking = () => {
  const [data , setData]= useState()
  useEffect(() => {
    try {
      const axiosInstance = axios.create({
        withCredentials: true,
      });
      axiosInstance
        .get("https://hotelbookingbackend-4asp.onrender.com/api/booking/admin-Bookings")
        .then((res) => {
          setData(res.data);
        });
    } catch (error) {
      console.log("Error Occured", error.name);
    }
  }, []);
  return (
    <div className="user-info">
      {/* <h3>Bookings</h3> */}
      <table>
        <tbody>
          <tr>
            <td><strong>User ID</strong></td>
            <td><strong>Room</strong></td>
            <td><strong>From</strong></td>
            <td><strong>To</strong></td>
            <td><strong>Amount</strong></td>
            
            
          </tr>
          {data  && data.map((booking , index)=>{
            return  <tr key={index}>
            <td>{booking.user}</td>
              <td>{booking.name}</td>
              <td>{booking.from}</td>
              <td>{booking.to}</td>
              <td> Rs.{booking.amount}</td>
            </tr>
          })}
         
          
        </tbody>
      </table>
    </div>
  );
};

export default AdminBooking;