import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.scss';

const Portfolio = () => {
  const projects = [
    {
      title: "Chess Bots",
      description: "A chess UI and computer opponent written in ReactJS using Chess.js and Chessboard.jsx packages. I designed and implemented a prioritized rule-set in JavaScript that allows a computer player to make moves based on the state of the chess game. I built a Python Django REST api to store the game logs in an SQL database.",
      liveDemo: "",
      github: "https://github.com/your-github-repo",
      hidden: true
    },
    {
      title: "Bombparty Game",
      description: "A word game where the users are given a two or three letter prompt and have a set amount of time to type a word that contains the prompt. A socket connection is leveraged to create an elimation-style competition. The game has various settings to allow for very easy or very challenging difficulties.",
      liveDemo: "",
      github: "https://github.com/william-arn9/better-bp",
      hidden: false
    },
    {
      title: "Project Manager Interface",
      description: "A React-Electron app that searches the device's storage for common software project structures and returns an organized visualization of all projects on the device. This prevents the scenario of creating a new local project and losing it in your file directory. The tool allows for various actions such as perminently deleting projects or opening in VSCode.",
      liveDemo: "",
      github: "https://github.com/william-arn9/electron-project-manager",
      hidden: false
    },
  ];

  const finalProjects = projects.filter(project => !project.hidden);

  return (
    <div className="portfolio">
      <h2>My Projects</h2>
      <div className="projects">
        {finalProjects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-links">
              {project.liveDemo ? (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              ) : (
                <Link to="/unavailable" className="na">Live Demo</Link>
              )}
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;