import { useState } from "react";
import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const axiosInstance = axios.create({
        withCredentials: true,
      });
      const data = {
        username: userName,
        email: email,
        password: password,
      };

      const res = await axiosInstance.post(
        "https://hotelbookingbackend-4asp.onrender.com/api/user/sign",
        data
      );

      if (res.data.status) {
        // alert(res.data.message)
        toast.success(res.data.message, {
          position: "top-right", // Position of the notification
          autoClose: 3000, // Auto close the notification after 3 seconds
        });

  
       setTimeout(()=>{
    navigate("/login")} , 2000)
      } else {
        // alert(res.data.message)
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 3000,
        });

   setTimeout(()=>{
    navigate("/login")} , 1000)

       
      }
    } catch (e) {
      console.log("Error Occured during Signup", e.name);
    }
  };
  return (
    <div className='signup-container'>
      <form className='signup-form'>
        <h2>Sign Up</h2>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          name={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type='submit' className='registertbn' onClick={handleSignup}>
          Sign Up
        </button>
      </form>
      <p className='login-here'>
        Already have an account?{" "}
        <Link to={"/login"} className='text-success text-decoration-none'>
          Login Here
        </Link>
      </p>
    </div>
  );
};
export default Signup;