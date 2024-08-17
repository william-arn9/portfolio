import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faJava,
  faJs,
  faPython,
  faHtml5,
  faAngular,
  faSass,
  faReact,
  faBootstrap,
  faVuejs,
  faNodeJs,
  faMicrosoft,
  faGit,
  faNpm,
  faFigma,
  faJira,
  faConfluence
} from '@fortawesome/free-brands-svg-icons';
import { faCode, faDatabase, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import './Resume.scss';

const Resume = () => {
  const rowRef1 = useRef(null);
  const rowRef2 = useRef(null);
  const rowRef3 = useRef(null);
  const rowRef4 = useRef(null);
  const skills = [
    {
      name: 'Programming Languages',
      ref: rowRef1,
      stats: [
        { name: 'JavaScript', icon: faJs, emote: '😍' },
        { name: 'TypeScript', icon: faCode, emote: '😍' },
        { name: 'Java', icon: faJava, emote: '😊' },
        { name: 'C#', icon: faCode, emote: '😊' },
        { name: 'Python', icon: faPython, emote: '🙂' }
      ]
    },
    {
      name: 'Front-End',
      ref: rowRef2,
      stats: [
        { name: 'HTML', icon: faHtml5, emote: '😍' },
        { name: 'SCSS', icon: faSass, emote: '😍' },
        { name: 'Angular', icon: faAngular, emote: '😍' },
        { name: 'Tailwind', icon: faCode, emote: '😍' },
        { name: 'React', icon: faReact, emote: '😍' },
        { name: 'Bootstrap', icon: faBootstrap, emote: '😊' },
        { name: 'VueJS', icon: faVuejs, emote: '😊' },
        { name: 'NodeJS', icon: faNodeJs, emote: '😊' }
      ]
    },
    {
      name: 'Back-End & Cloud',
      ref: rowRef3,
      stats: [
        { name: 'ExpressJS', icon: faCode, emote: '😍' },
        { name: 'Spring Boot', icon: faCode, emote: '😊' },
        { name: 'MongoDB', icon: faDatabase, emote: '😊' },
        { name: 'Django', icon: faCode, emote: '🙂' },
        { name: 'Azure', icon: faMicrosoft, emote: '🙂' }
      ]
    },
    {
      name: 'Tools',
      ref: rowRef4,
      stats: [
        { name: 'GIT', icon: faGit, emote: '😍' },
        { name: 'VS Code', icon: faCode, emote: '😍' },
        { name: 'NPM', icon: faNpm, emote: '😍' },
        { name: 'Jira', icon: faJira, emote: '😍' },
        { name: 'Figma', icon: faFigma, emote: '😊' },
        { name: 'Confluence', icon: faConfluence, emote: '😊' },
        { name: 'Karma', icon: faMicroscope, emote: '😊' },
        { name: 'JUnit', icon: faMicroscope, emote: '🙂' },
        { name: 'Mocha', icon: faMicroscope, emote: '🙂' }
      ]
    }
  ];

  const transitionHandler = (ref) => {
    ref.current.classList.toggle('transition');
  }

  return (
    <div className="resume">
      <header className="contact-card">
        <div className="profile">
          <img className="profile-picture" src="/assets/images/profile.jpg" alt="My profile picture" />
        </div>
        <div className="contact-content">
          <h1>William Arnold<span>Phoenix, AZ, USA</span></h1>
          <a className="contact-email" href="mailto: williamarn99@gmail.com">williamarn99@gmail.com</a>
        </div>
        <div className="links">
          <a href="https://www.linkedin.com/in/william-arnold-b899a01b0/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/william-arn9" target="_blank" rel="noopener noreferrer">Github</a>
          <a href="https://leetcode.com/u/Williamarn99/" target="_blank" rel="noopener noreferrer">Leetcode</a>
        </div>
      </header>
      <section className="showcase">
        <h2>My Tools</h2>
        <div className="card-wrapper">
          <Link to="/json-viewer" className="tool-card json-formatter">
            <p className="caption">JSON Viewer</p>
          </Link>
          <Link to="/color-gen" className="tool-card color-gen">
            <p className="caption">Color Palette Generator</p>
          </Link>
          <Link to="/accessibility-viewer" className="tool-card accessibility-tool">
            <p className="caption">Accessibility Tool</p>
          </Link>
        </div>
      </section>
      <section className="resume-section">
        <h2>Skills</h2>
        {skills.map((skillset, index) => (
          <>
            <strong>{ skillset.name }</strong>
            <ul ref={ skillset.ref } onClick={(e) => {transitionHandler(skillset.ref)}}>
              {skillset.stats.map((skill, index) => (
                <li>
                  <div className="stat">
                    <FontAwesomeIcon className="fab" icon={skill.icon} />
                    { skill.name }
                  </div>
                  <div className="emote">
                    { skill.emote }
                  </div>
                </li>
              ))}
            </ul>
          </>
        ))}
      </section>
      <section className="education">
        <h2>Education</h2>
        <p><strong>B.S. Software Engineering</strong> | Arizona State University</p>
        <p>| August 2017 - May 2021</p>
        <h2>Experience</h2>
        <div>
          <h3>Senior Application Developer | Marsh McLennan</h3>
          <p>May 2021 – Present | Phoenix, AZ</p>
          <ul>
            <li>Led a remote team of 8 developers in the development of business-to-consumer insurance applications for top corporations.</li>
            <li>Maintained advanced knowledge of Angular 9 through Angular 14, Bootstrap, Tailwind, NodeJS, and Java Spring Boot.</li>
            <li>Collaborated on new integrations and improved reusability and modularity to the internal platform.</li>
            <li>Contributed to long-term strategy decision making for the platform including architecture and scalability.</li>
            <li>Demonstrated proficiency in full-stack development using Angular and Tailwind for the frontend, Java Spring Boot for the backend, and MongoDB databases.</li>
            <li>Enforced rigorous CICD pipelines and maintained high standards in application testing and vulnerability scanning.</li>
            <li>Instituted and maintained current technologies across all stacks, ensuring a modern tech ecosystem meeting WCAG accessibility guidelines and security best-practices.</li>
          </ul>
        </div>
        <h2>Awards & Certifications</h2>
        <ul>
          <li><strong>2023 MMC Tech CIO Award | Marsh McLennan</strong> - Awarded February 2024</li>
          <li><strong>Microsoft Certified: Azure Fundamentals | Microsoft Certified</strong> - February 2024</li>
        </ul>
      </section>
    </div>
  );
};

export default Resume;
