import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faDiagramProject, faPencil } from '@fortawesome/free-solid-svg-icons';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar" onClick={(e) => {if(window.screen.width < 1024) e.target.classList.toggle('wide')}}>
      <Link to="/" className="navbar-logo">
        <h1>
          <span className="letter first">W</span>
          <span className="letter-hidden">I</span>
          <span className="letter-hidden">L</span>
          <span className="letter-hidden">L</span>
          <span className="letter-hidden">I</span>
          <span className="letter-hidden">A</span>
          <span className="letter-hidden">M</span>
          <span className="letter second">A</span>
          <span className="letter-hidden">R</span>
          <span className="letter-hidden">N</span>
          <span className="letter-hidden">O</span>
          <span className="letter-hidden">L</span>
          <span className="letter-hidden">D</span>
        </h1>
      </Link>
      <ul className="navbar-links">
        <li>
          <a href="/assets/docs/resume.pdf" download>
            <button className="nav-button">
              <FontAwesomeIcon className="fas" icon={faDownload} />
              <span>Download Resume</span>
            </button>
          </a>
        </li>
        <li>
          <Link to="/projects" className="nav-button">
            <FontAwesomeIcon className="fas" icon={faDiagramProject} />
            <span>Projects</span>
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav-button">
            <FontAwesomeIcon className="fas" icon={faPencil} />
            <span>Contact</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;