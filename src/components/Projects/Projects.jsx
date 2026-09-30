import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';
import { projects } from '../../data/portfolioData';
import styles from './Projects.module.css';

const FILTERS = ['All', 'Web Development', 'Software Development', 'Data Analysis', 'AI-Driven'];

// ── Confetti ────────────────────────────────────────────────────
const COLORS = ['#6c63ff', '#f59e0b', '#ec4899', '#22c55e', '#06b6d4', '#f97316', '#a78bfa'];
const SHAPES = ['circle', 'rect', 'ribbon'];

function ConfettiPiece({ x, color, shape }) {
  const duration = 1.2 + Math.random() * 0.8;
  return (
    <motion.div
      className={styles.confetti}
      style={{
        left: x,
        background: color,
        borderRadius: shape === 'circle' ? '50%' : shape === 'ribbon' ? '2px' : '0',
        width: shape === 'ribbon' ? 14 : 8,
        height: shape === 'ribbon' ? 5 : 8,
      }}
      initial={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ y: 260, opacity: 0, rotate: Math.random() * 720 - 360, scale: 0.4 }}
      transition={{ duration, ease: 'easeIn' }}
    />
  );
}

function makeConfetti(count = 28) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: `${5 + Math.random() * 90}%`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
  }));
}

// ── Project Card ────────────────────────────────────────────────
function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [broken, setBroken] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [cardKey, setCardKey] = useState(0);

  function handleClick() {
    if (broken) return;
    setBroken(true);
    setConfetti(makeConfetti());
    setTimeout(() => {
      onClick(project);
      setTimeout(() => {
        setBroken(false);
        setConfetti([]);
        setCardKey(k => k + 1);
      }, 100);
    }, 850);
  }

  return (
    <motion.div
      key={cardKey}
      className={`${styles.card} ${broken ? styles.broken : ''}`}
      onHoverStart={() => !broken && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={
        broken
          ? { scale: [1, 1.1, 0.88, 0.95], rotate: [0, -4, 4, -2], opacity: [1, 1, 0.7, 0] }
          : { opacity: 1, y: 0 }
      }
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={!broken ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: broken ? 0.85 : 0.3 }}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      <AnimatePresence>
        {confetti.map(c => <ConfettiPiece key={c.id} {...c} />)}
      </AnimatePresence>

      {hovered && <div className={styles.cardGlow} />}

      <div className={styles.imageWrap}>
        <img
          src={project.image}
          alt={project.title}
          className={styles.image}
          onError={e => { e.target.style.display = 'none'; }}
        />
        {project.comingSoon && (
          <div className={styles.comingSoonBadge}>Coming Soon</div>
        )}
        {hovered && (
          <motion.div
            className={styles.clickHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Click to explore 🎉
          </motion.div>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.tagRow}>
          {project.tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.techRow}>
          {project.tech.slice(0, 3).map(t => (
            <span key={t} className={styles.techBadge}>{t}</span>
          ))}
          {project.tech.length > 3 && (
            <span className={styles.techBadge}>+{project.tech.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Modal ───────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}><FiX size={20} /></button>

        <div className={styles.modalImage}>
          <img src={project.image} alt={project.title}
            onError={e => { e.target.style.display = 'none'; }} />
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalTags}>
            {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <h2 className={styles.modalTitle}>{project.title}</h2>

          <div className={styles.modalDescBlock}>
            <h4 className={styles.modalSectionLabel}>📌 About this project</h4>
            <p className={styles.modalDesc}>{project.description}</p>
          </div>

          <div className={styles.modalDescBlock}>
            <h4 className={styles.modalSectionLabel}>🛠 Tech Stack</h4>
            <div className={styles.modalTech}>
              {project.tech.map(t => (
                <span key={t} className={styles.techBadge}>{t}</span>
              ))}
            </div>
          </div>

          {project.points && project.points.length > 0 && (
            <div className={styles.modalDescBlock}>
              <h4 className={styles.modalSectionLabel}>✅ Key Highlights</h4>
              <ul className={styles.modalPoints}>
                {project.points.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
          )}

          <div className={styles.modalLinks}>
            {project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                <FiGithub /> GitHub
              </a>
            ) : (
              <span className={styles.linkDisabled}><FiGithub /> Private</span>
            )}
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                <FiExternalLink /> Live Demo
              </a>
            ) : (
              <span className={styles.linkDisabled}><FiExternalLink /> No Demo</span>
            )}
            {project.certificateUrl && (
              <a href={project.certificateUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                <FiExternalLink /> View Certificate
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main ────────────────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = projects.filter(p =>
    activeFilter === 'All' || p.tags.includes(activeFilter)
  );

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow accent">My Work</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Things I've built</p>
        </motion.div>

        {/* Filters — centered */}
        <div className={styles.filters}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <ProjectCard key={p.id} project={p} onClick={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
