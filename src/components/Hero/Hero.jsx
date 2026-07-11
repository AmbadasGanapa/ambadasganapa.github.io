import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';
import { FaWhatsapp } from 'react-icons/fa';
import { personalInfo } from '../../data/portfolioData';
import styles from './Hero.module.css';

function getGreeting() {
  // IST = UTC + 5:30
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 5.5 * 3600000);
  const h = ist.getHours();
  if (h < 12) return 'Good Morning!';
  if (h < 17) return 'Good Afternoon!';
  if (h < 21) return 'Good Evening!';
  return 'Good Evening!';
}

export default function Hero() {
  const [greeting, setGreeting] = useState(getGreeting);

  useEffect(() => {
    const id = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroContainer}>

        {/* Left: Text Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.p
            className={styles.greeting}
            key={greeting}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {greeting} <span className={styles.iam}>I'm</span>
          </motion.p>
          <h1 className={styles.name}>{personalInfo.name}</h1>
          <h3 className={styles.subtitle}>
            <em>Software Developer | Data & Cloud Enthusiast</em>
          </h3>
          <p className={styles.bio}>{personalInfo.bio}</p>

          <div className={styles.ctas}>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className={`btn btn-primary ${styles.ctaBtn}`}
            >
              <FiDownload /> Download Resume
            </a>
            <Link
              to="about"
              smooth
              duration={500}
              offset={-70}
              className={`btn btn-outline ${styles.ctaBtn}`}
            >
              Explore More
            </Link>
          </div>

          <div className={styles.socials}>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin size={22} /></a>
            <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub size={22} /></a>
            <a href={personalInfo.socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><SiLeetcode size={20} /></a>
            <a href={personalInfo.socials.hackerrank} target="_blank" rel="noreferrer" aria-label="HackerRank"><SiHackerrank size={22} /></a>
            <a href={personalInfo.socials.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp size={22} /></a>
          </div>
        </motion.div>

        {/* Right: Avatar */}
        <motion.div
          className={styles.avatarWrapper}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className={styles.avatarRing}>
            <img src="/images/boy.png" alt="Profile" className={styles.avatarImg} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
