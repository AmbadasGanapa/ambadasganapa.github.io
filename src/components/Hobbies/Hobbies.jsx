import React from 'react';
import { motion } from 'framer-motion';
import { hobbies } from '../../data/portfolioData';
import styles from './Hobbies.module.css';

export default function Hobbies() {
  return (
    <section id="hobbies" className={`section ${styles.hobbies}`}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow accent">Beyond work</p>
          <h2 className="section-title">Hobbies & Interests</h2>
          <p className="section-subtitle">
            A glimpse into the things that keep me curious, calm, and creatively driven.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {hobbies.map((item, index) => (
            <motion.article
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <div className={styles.icon} aria-hidden="true">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
