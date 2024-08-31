import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    const route = `${location.pathname}${location.search}`;
    const title = `${location.pathname}`;
    ReactGA.send({ hitType: "pageview", page: route, title: title });
  }, [location]);
  return (<></>);
};

export default Analytics;