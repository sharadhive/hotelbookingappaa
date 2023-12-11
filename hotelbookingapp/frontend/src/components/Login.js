import { useState } from "react";
import "../css/Login.css";
import { Link} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const axiosInstance = axios.create({
        withCredentials: true,
      });

      const res = await axiosInstance.post(
        "https://hotelbookingbackend-4asp.onrender.com/api/user/login",
        { email: email, password: password }
      );

      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
        localStorage.setItem('user' , JSON.stringify(res.data))
      setTimeout(() => {
        navigate('/');
      
      }, 3000);
      
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (e) {
      console.log("Internal Error Occured", e.name);
    }
  };
  return (
    <>
      <div className='custom-container'>
        <form className='custom-login-form'>
          <h2>Login</h2>
          <label htmlFor='custom-username'>Email:</label>
          <input
            type='text'
            id='custom-username'
            name={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='custom-password'>Password:</label>
          <input
            type='password'
            id='custom-password'
            name={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit' className='loginbtn' onClick={handleLogin}>
            Login
          </button>
        </form>
        <p className='registerhere'>
          Do not have an account?{" "}
          <Link to={"/register"} className='text-success  text-decoration-none'>
            Register Here
          </Link>{" "}
        </p>
      </div>
    </>
  );
};
export default Login;