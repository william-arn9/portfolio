import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import './Home.scss';

const Home = () => {
  const [index, setIndex] = useState(0);

  const TEXTS = [ 'fullstack', 'frontend ' ];

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4500,
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="home">
      <h1>
        Are you looking for a quality <span className="emphasis">
        <span className="transition-text">
          {TEXTS[index % TEXTS.length].split('').map((l, i) => (
            <TextTransition key={i} delay={i * 50} springConfig={presets.gentle} translateValue='50%' inline>{l}</TextTransition>
          ))}</span> developer?
        </span>
      </h1>
      <h2>Well, look no further...</h2>
    </div>
  );
};

export default Home;
