// ===== ABOUT =====
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import styles from './About.module.css';

// Motion variants for smoother, flowing animations
const tagContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const tagItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 20, mass: 0.6 } },
};

const locationVar = {
  hidden: { opacity: 0, x: 18 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 160, damping: 18 } },
};

const cardVar = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 16 } },
};

function Counter({ target, suffix, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let current = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = Math.max(Math.round(duration / stepTime), 1);
    const increment = Math.ceil(target / steps);
    let frame = null;

    const tick = () => {
      current += increment;
      if (current >= target) {
        setCount(target);
        return;
      }
      setCount(current);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return (
    <span className={styles.statVal}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const [countersActive, setCountersActive] = useState(false);

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow accent">Who I am</p>
          <h2 className="section-title">About Me</h2>
        </motion.div>
        <div className={styles.grid}>
          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ textAlign: 'justify' }}>
              I'm <strong>Ambadas Ganapa</strong>, a software developer passionate about cloud computing, data analytics, and Agentic AI. I enjoy building intelligent, data-driven solutions that solve real-world problems and create meaningful impact.
            </p>
            <p>
              Driven by curiosity and continuous learning, I explore emerging technologies to develop scalable applications, automate workflows, and transform data into actionable insights with a focus on creating innovative solutions in <strong>Cloud, Data, and AI.</strong>
            </p>
          </motion.div>
          <motion.div
            className={styles.statsRow}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onViewportEnter={() => setCountersActive(true)}
          >
            {personalInfo.stats.map(s => (
              <div key={s.label} className={styles.statCard}>
                <Counter target={s.value} suffix={s.suffix} active={countersActive} />
                <span className={styles.statLbl}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className={styles.extraSection}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles.languagesRow}>
            <div className={styles.languagesBlock}>
              <h3>Languages I can speak</h3>
              <motion.div className={styles.languageTags} variants={tagContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {personalInfo.languagesSpoken && personalInfo.languagesSpoken.map((lang) => (
                  <motion.span
                    key={lang}
                    className={styles.languageTag}
                    variants={tagItem}
                    whileHover={{ scale: 1.04, y: -2 }}
                  >
                    {lang}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            <motion.div className={styles.locationBadge} variants={locationVar} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ scale: 1.02 }}>
              <span className={styles.locationIcon}>📍</span>
              <span>{personalInfo.location}</span>
            </motion.div>
          </div>

          <div className={styles.infoCards}>
            <motion.div className={styles.infoCard} variants={cardVar} initial="hidden" whileInView="visible" viewport={{ once: true }} whileTap={{ scale: 0.995 }}>
              <h3><u>Vision</u></h3>
              <p>{personalInfo.vision}</p>
            </motion.div>

            <motion.div className={styles.infoCard} variants={cardVar} initial="hidden" whileInView="visible" viewport={{ once: true }} whileTap={{ scale: 0.995 }}>
              <h3><u>Mission</u></h3>
              <p>{personalInfo.mission}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
