import React from 'react';
import { motion } from 'framer-motion';
import { education } from '../../data/portfolioData';
import styles from './Education.module.css';

const ICONS = ['🏫', '🏫', '📚', '🎓', '🎓'];

export default function Education() {
  // Already ordered: Primary → SSC → HSC → BCA → MCA
  const ordered = education;
  return (
    <section id="education" className={`section ${styles.edu}`}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow accent">Academic Journey</p>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">My path from school to university</p>
        </motion.div>

        <div className={styles.timeline}>
          {/* Vertical center line */}
          <div className={styles.centerLine} />

          {ordered.map((e, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className={`${styles.row} ${isLeft ? styles.rowLeft : styles.rowRight}`}>

                {/* Card */}
                <motion.div
                  className={styles.card}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(108,99,255,0.18)' }}
                >
                  {/* Top row */}
                  <div className={styles.cardTop}>
                    <span className={`${styles.status} ${e.status === 'In Progress' ? styles.active : ''}`}>
                      {e.status}
                    </span>
                    <span className={styles.duration}>{e.duration}</span>
                  </div>

                  {/* Icon + degree */}
                  <div className={styles.degreeRow}>
                    <span className={styles.icon}>{ICONS[i]}</span>
                    <h3 className={styles.degree}>{e.degree}</h3>
                  </div>

                  <p className={styles.inst}>{e.institution}</p>

                  {/* Description */}
                  <p className={styles.desc}>{e.desc}</p>

                  {/* Highlight badge */}
                  <div className={styles.highlight}>
                    <span className={styles.highlightDot} />
                    {e.highlight}
                  </div>

                  {/* Subjects */}
                  <div className={styles.subjects}>
                    {e.subjects.map(s => (
                      <span key={s} className={styles.subject}>{s}</span>
                    ))}
                  </div>
                </motion.div>

                {/* Center dot */}
                <motion.div
                  className={styles.dot}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                >
                  <div className={styles.dotInner} />
                </motion.div>

                {/* Empty spacer on the other side */}
                <div className={styles.spacer} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
