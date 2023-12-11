import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1 className="title">Welcome to Our Hotel Booking Site</h1>
      <div className="buttons-container">
        <Link to="/container">
          <button className="view-button">View Hotel List</button>
        </Link>
        {/* <Link to="/rooms">
          <button className="view-button">View Rooms List</button>
        </Link> */}
      </div>
    </div>
  );
};

export default LandingPage;
