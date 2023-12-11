import { Link, useParams } from "react-router-dom";
import "../css/AdminPage.css";
import User from "./User";
import AddRoom from './AddRoom'

import AdminBooking from "./AdminBooking";
const AdminPage = () => {
  const parameters = useParams();
  const userDetails = JSON.parse(localStorage.getItem('user'))
  const admin = userDetails.user.admin


  if(!admin) {
    return <div className="author">
      <div>You are not Authorized to visit this Page.</div>
    <span><strong> <Link className="nav-link redirect" to={'/'}>Redirect to HomePage.</Link>  </strong></span>
    </div>
  }

  return (
    <>
      <div className='admin-page'>
        <nav>
         
          <ul>
            <li>
              <Link  className="links-admin" to='/admin/:users'>Users</Link>
            </li>
            <li>
              <Link  className="links-admin" to='/admin/:bookings'>Bookings</Link>
            </li>
            <li>
              <Link  className="links-admin"to='/admin/:add-rooms'>Add Room</Link>
            </li>
          </ul>

    
        </nav>

        {parameters.user == ":users" && <User />}
        {parameters.user == ":add-rooms" && <AddRoom/> }
        {parameters.user == ":bookings" && <AdminBooking />}
      </div>
    </>
  );
};

export default AdminPage;