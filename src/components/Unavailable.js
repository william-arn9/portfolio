import React from 'react';
import { Link } from 'react-router-dom';
import './Unavailable.scss';

const Unavailable = () => {
  return (
    <div className="unavailable-page">
      <div className="emote">😔</div>
      <h1>Project Demo Unavailable</h1>
      <p>Sorry, this live demo is still in progress. Feel free to review the Github or check back later.</p>
      <Link to="/projects" className="back-home">
        Back to Projects
      </Link>
    </div>
  );
};

export default Unavailable;
