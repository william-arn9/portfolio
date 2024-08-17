// src/Navbar.js

import React, { useState } from 'react';
import './ActionBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons';
import LighthouseReport from './LighthouseReport';

const ActionBar = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const closeModal = () => {
    setResults(null);
    setLoading(false);
    setErrorMessage(null);
  }

  const handleLighthouseTest = async (category) => {
    setLoading(true);
    setErrorMessage(null);
    const response = await fetch(`/api/lighthouse?category=${category}`);
    if(response.status === 200) {
      const data = await response.json();
      setResults(data);
      setLoading(false);
    }
    else {
      setLoading(false);
      setErrorMessage('Something went wrong when attempting to run the audit');
    }
  };
  return (
    <div className='action-bar'>
      <button className="button-1" onClick={() => handleLighthouseTest('accessibility')} disabled={loading}>
      <FontAwesomeIcon icon={faAccessibleIcon} />
        <span className="btn-text">Audit Accessibility</span>
      </button>
      <button className="button-2" onClick={() => handleLighthouseTest('performance')} disabled={loading}>
        <FontAwesomeIcon icon={faChartSimple} />
        <span className="btn-text">Audit Performance</span>
      </button>
      <button className="button-3" onClick={() => handleLighthouseTest('seo')} disabled={loading}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span className="btn-text">Audit SEO</span>
      </button>
      
      {(results || loading || errorMessage) && <LighthouseReport data={results} end={() => {closeModal()}} error={errorMessage} />}
    </div>
  );
};

export default ActionBar;