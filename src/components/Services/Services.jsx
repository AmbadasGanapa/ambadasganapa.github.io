import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../../data/portfolioData';
import styles from './Services.module.css';

const wrap = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow accent">Services</p>
          <h2 className="section-title">What I Offer</h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {services.map((s) => (
            <motion.div key={s.id} className={styles.cardWrap} variants={wrap}>
              <div className={styles.flipCard}>
                {/* FRONT */}
                <div className={styles.front}>
                  <div className={styles.iconWrap}>
                    <span className={styles.icon}>{s.icon}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <span className={styles.hintText} style={{ color: 'orange' }}>
                    Explore →
                  </span>
                </div>

                {/* BACK */}
                <div className={styles.back}>
                  <span className={styles.backIcon}>{s.icon}</span>
                  <h3 className={styles.backTitle}>{s.title}</h3>
                  <p className={styles.backDesc}>{s.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
