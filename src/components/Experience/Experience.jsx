import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiX } from 'react-icons/fi';
import { experience } from '../../data/portfolioData';
import styles from './Experience.module.css';

/* ── Smoke puff ── */
function SmokePuff({ delay }) {
  return (
    <motion.div
      className={styles.smoke}
      initial={{ opacity: 0.8, y: 0, scale: 0.4 }}
      animate={{ opacity: 0, y: -50, scale: 2.2 }}
      transition={{ duration: 1.8, delay, repeat: Infinity, repeatDelay: 0.4, ease: 'easeOut' }}
    />
  );
}

/* ── SVG Wheel ── */
function Wheel({ size = 30 }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 40 40"
      className={styles.wheelSvg}
      animate={{ rotate: -360 }}
      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
    >
      <circle cx="20" cy="20" r="18" fill="#1f2937" stroke="#6c63ff" strokeWidth="3" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="#4b5563" strokeWidth="1.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line
          key={angle}
          x1="20" y1="20"
          x2={20 + 16 * Math.cos((angle * Math.PI) / 180)}
          y2={20 + 16 * Math.sin((angle * Math.PI) / 180)}
          stroke="#6c63ff" strokeWidth="1.8" strokeLinecap="round"
        />
      ))}
      <circle cx="20" cy="20" r="4" fill="#6c63ff" />
      <circle cx="20" cy="20" r="2" fill="#1f2937" />
    </motion.svg>
  );
}

/* ── Engine ── */
function Engine() {
  return (
    <div className={styles.engine}>
      <div className={styles.chimneyWrap}>
        <SmokePuff delay={0} />
        <SmokePuff delay={0.6} />
        <SmokePuff delay={1.2} />
        <div className={styles.chimney} />
      </div>
      <div className={styles.engineBody}>
        {/* Cabin with loco pilot face */}
        <div className={styles.engineCabin}>
          <div className={styles.engineWindow}>
            <span className={styles.locoPilot}>👨‍✈️</span>
          </div>
        </div>
        {/* Boiler with train name */}
        <div className={styles.engineBoiler}>
          <span className={styles.trainName} style={{ backgroundColor: 'brown' }}>
            <b>AG's Express</b>
          </span>
        </div>
        <div className={styles.engineNose} />
      </div>
      <div className={styles.engineWheels}>
        <Wheel size={36} />
        <Wheel size={28} />
        <Wheel size={28} />
      </div>
    </div>
  );
}

/* ── Bogie ── */
function Bogie({ exp, onOpen }) {
  return (
    <div className={styles.bogieWrap}>
      {/* Coupling rod connecting to previous unit */}
      <div className={styles.coupling}>
        <div className={styles.couplingBar} />
        <div className={styles.couplingHead} />
      </div>

      <div className={styles.bogie}>
        <motion.div
          className={`${styles.bogieBody} ${exp.future ? styles.bogieFuture : ''}`}
          style={{ '--bogie-color': exp.color }}
          whileHover={!exp.future ? { y: -5 } : {}}
          onClick={() => !exp.future && onOpen(exp)}
        >
          <div className={styles.bogieInner}>
            {exp.future ? (
              <>
                <span className={styles.bogieCompany}>{exp.short}</span>
                <span className={styles.bogieDots}>· · ·</span>
                <span className={styles.bogieFutureLabel}>Coming Soon</span>
              </>
            ) : (
              <>
                <span className={styles.bogieType}>{exp.type}</span>
                <span className={styles.bogieCompany}>{exp.short}</span>
                <span className={styles.bogieDuration}>{exp.duration_label}</span>
                <span className={styles.bogieHint} style={{ color: exp.color }}>
                  Click Me
                </span>
              </>
            )}
          </div>
          <div className={styles.bogieWindows}>
            <div className={styles.bogieWindow} />
            <div className={styles.bogieWindow} />
          </div>
        </motion.div>
        <div className={styles.bogieWheels}>
          <Wheel size={26} />
          <Wheel size={26} />
        </div>
      </div>
    </div>
  );
}

/* ── Track (static, full width) ── */
function Track() {
  return (
    <div className={styles.trackWrap}>
      <div className={styles.rail} />
      <div className={styles.rail} style={{ top: 14 }} />
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className={styles.sleeper} style={{ left: `${(i / 29) * 100}%` }} />
      ))}
    </div>
  );
}

/* ── Detail Modal ── */
function DetailModal({ exp, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          onClick={e => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <div>
              <span className={styles.modalType} style={{ background: `${exp.color}22`, color: exp.color }}>
                {exp.type}
              </span>
              <h3 className={styles.modalRole}>{exp.role}</h3>
              <p className={styles.modalCompany} style={{ color: exp.color }}>{exp.company}</p>
              <p className={styles.modalDuration}>{exp.duration} · {exp.duration_label}</p>
            </div>
            <button className={styles.closeBtn} onClick={onClose}><FiX size={18} /></button>
          </div>

          {exp.points.length > 0 && (
            <ul className={styles.modalPoints}>
              {exp.points.map((pt, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                  <span className={styles.bullet} style={{ color: exp.color }}>▹</span>
                  {exp.liveUrl && pt.includes('ganitwala.com') ? (
                    <span>
                      {pt.replace('ganitwala.com', '')}
                      <a href={exp.liveUrl} target="_blank" rel="noreferrer"
                        style={{ color: exp.color, fontWeight: 600, textDecoration: 'underline' }}>
                        ganitwala.com
                      </a>
                    </span>
                  ) : pt}
                </motion.li>
              ))}
            </ul>
          )}

          <div className={styles.modalLinks}>
            {exp.liveUrl && (
              <a href={exp.liveUrl} target="_blank" rel="noreferrer"
                className={styles.certLink} style={{ borderColor: `${exp.color}55`, color: exp.color }}>
                <FiExternalLink size={13} /> Visit Live Site
              </a>
            )}
            {exp.certificateUrl && (
              <a href={exp.certificateUrl} target="_blank" rel="noreferrer"
                className={styles.certLink} style={{ borderColor: `${exp.color}55`, color: exp.color }}>
                <FiExternalLink size={13} /> View Certificate
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Main ── */
export default function Experience() {
  const [selected, setSelected] = useState(null);

  // Duplicate train for seamless loop
  const trainUnits = [...experience, ...experience];

  return (
    <section id="experience" className={`section ${styles.exp}`}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow accent">My Journey</p>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle"> <b>Click any bogie to see what I did there</b> </p>
        </motion.div>
      </div>

      {/* Train scene — infinite marquee */}
      <div className={styles.scene}>
        <div className={styles.trainSet}>
          <Engine />
          {experience.map((exp, i) => (
            <Bogie key={i} exp={exp} onOpen={setSelected} />
          ))}
        </div>

        <Track />
      </div>

      {selected && <DetailModal exp={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
