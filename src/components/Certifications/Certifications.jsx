import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../../data/portfolioData';
import styles from './Certifications.module.css';

export default function Certifications() {
  const sortedCerts = useMemo(
    () => [...certifications].sort((a, b) => Number(b.year) - Number(a.year)),
    []
  );

  return (
    <section id="certifications" className={`section ${styles.certifications}`}>
      <div className={styles.fullWidthContainer}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow accent">Professional Growth</p>
          <h2 className="section-title">My Certifications</h2>
          <p className="section-subtitle">
            
          </p>
        </motion.div>

        <div className={styles.marqueeWrapper}>
          <marquee direction="right" scrollamount="6" scrolldelay="30" behavior="scroll">
            <div className={styles.marqueeTrack}>
              {sortedCerts.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.credentialUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.card}
                >
                  <div className={styles.imageWrapper}>
                    <img src={cert.image} alt={cert.title} />
                  </div>
                  <div className={styles.body}>
                    <h3>{cert.title}</h3>
                    <p className={styles.issuer}>{cert.issuer}</p>
                    <span className={styles.year}>{cert.year}</span>
                  </div>
                </a>
              ))}
            </div>
          </marquee>
        </div>
      </div>
    </section>
  );
}
