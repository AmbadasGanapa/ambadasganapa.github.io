import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolioData';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>© {new Date().getFullYear()} Ambadas Ganapa. Built with React.</p>
        <div className={styles.socials}>
          <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub size={18} /></a>
          <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin size={18} /></a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email"><FiMail size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
