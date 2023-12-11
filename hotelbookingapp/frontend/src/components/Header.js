import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary '>
      <div className='navbar-left'>
        <span className='logo'>My Room's</span>
      </div>
      <div className='navbar-right '>
        <Link to={"/"} className='link nav-link'>
          Home
        </Link>
 {!user ? (null):(<Link to={"/reservation"} className='link nav-link'>
          Bookings
        </Link>)}
        
        {user && user.user.admin && (
          <Link to={"/admin"} className='link nav-link'>
            Admin Panel
          </Link>
        )}
        {!user ? (
          <Link to={"/login"} className='link nav-link'>
            Login/Register
          </Link>
        ) : (
          <span className='userName'>
            Welcome {user.user.username}{" "}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-box-arrow-right'
              viewBox='0 0 16 16'
              onClick={() => {
                const confirm = window.confirm("Are you sure want to logout?");
                if (confirm) {
                  localStorage.removeItem("user");

                  navigate("/");

                  // window.location.reload();
                }
              }}
            >
              <path
                fillRule='evenodd'
                d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z'
              />
              <path
                fillRule='evenodd'
                d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
              />
            </svg>
          </span>
        )}
       
      </div>
    </nav>
  );
};
export default Header;