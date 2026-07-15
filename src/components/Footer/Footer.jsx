import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <b>
        <div className={`container ${styles.inner}`}>
          <p className={styles.copy}>© {new Date().getFullYear()} Ambadas Ganapa.</p>
          <div>
            <p className={styles.copy}>Thank you for visiting my portfolio ..! </p>
          </div>
        </div>
      </b>
    </footer>
  );
}
