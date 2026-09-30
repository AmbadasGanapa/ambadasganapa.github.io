import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../../data/portfolioData';
import styles from './Achievements.module.css';

const CARDS = [...achievements, ...achievements];

function AchievCard({ a }) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    >
      <div className={styles.imgWrap}>
        <img src={a.image} alt={a.title} className={styles.img} />
        <div className={styles.imgOverlay} />
      </div>
      <div className={styles.body}>
        <span className={styles.year}>{a.year}</span>
        <h3 className={styles.title}>{a.title}</h3>
        <p className={styles.org}>{a.org}</p>
        <p className={styles.desc}>{a.description}</p>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow accent">Recognition</p>
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">Competition wins &amp; professional recognitions</p>
        </motion.div>
      </div>

      {/* Marquee — full width, outside container */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {CARDS.map((a, i) => (
            <AchievCard key={i} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
