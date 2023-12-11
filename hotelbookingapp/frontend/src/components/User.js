import '../css/User.css';
import {useEffect,  useState }  from 'react'
import axios from 'axios'


const User = () => {
  const [userData , setUserData]= useState()
  useEffect(() => {
    try {
      const axiosInstance = axios.create({
        withCredentials: true,
      });
      axiosInstance
        .get("https://hotelbookingbackend-4asp.onrender.com/api/user/getusers")
        .then((res) => {
          setUserData(res.data);
        });
    } catch (error) {
      console.log("Error Occured", error.name);
    }
  }, []);
  return (
    <div className="user-info">
      {/* <h3>User Information</h3> */}
      <table>
        <tbody>
          <tr>
            <td><strong>User ID</strong></td>
            <td><strong>Email</strong></td>
            <td><strong>Username</strong></td>
            
            
          </tr>
          {userData  && userData.map((user , index)=>{
            return  <tr key={index}>
            <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
            </tr>
          })}
         
          
        </tbody>
      </table>
    </div>
  );
};

export default User;