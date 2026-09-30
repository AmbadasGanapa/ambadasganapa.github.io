import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Achievements', to: 'achievements' },
  { label: 'Services', to: 'services' },
  { label: 'Experience', to: 'experience' },
  { label: 'Education', to: 'education' },
  { label: 'Certifications', to: 'certifications' },
  { label: 'Hobbies', to: 'hobbies' },
  { label: 'Contact', to: 'contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add background when user scrolls down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled || menuOpen ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        {/* Logo */}
        <Link to="hero" smooth duration={500} className={styles.logo}>
          AG<span className={styles.dot}>.</span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth
                duration={500}
                offset={-70}
                spy
                activeClass={styles.active}
                className={styles.navLink}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className={styles.navRight}>
          <button
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Mobile menu button */}
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={500}
              offset={-70}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
