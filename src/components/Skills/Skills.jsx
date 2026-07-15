import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/portfolioData';
import styles from './Skills.module.css';

const categories = [
  { key: 'languages',     label: 'Programming Languages', icon: '💻', color: '#6c63ff' },
  { key: 'dataAnalytics', label: 'Data & Analytics',      icon: '📊', color: '#06b6d4' },
  { key: 'webBackend',    label: 'Web & Backend',          icon: '🌐', color: '#10b981' },
  { key: 'aiCloud',       label: 'AI & Cloud',             icon: '🤖', color: '#f59e0b' },
];

const LEVEL_PCT = { Expert: 90, Proficient: 72, Learning: 45 };

/* ── Real SVG / img logos for tools ── */
const TOOLS = [
  { name: 'VS Code',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'GitHub',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg' },
  { name: 'Postman',        logo: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
  { name: 'Power BI',       logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
  { name: 'Google Colab',   logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg' },
  { name: 'WordPress',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
  { name: 'MySQL',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MS Office',      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg' },
  { name: 'Tableau',        logo: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg' },
  { name: 'LeetCode',       logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' },
  { name: 'HackerRank',     logo: 'https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png' },
  { name: 'GFG',            logo: 'https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg' },
  { name: 'Git',            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Docker',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
];

/* duplicate for seamless loop */
const MARQUEE_ITEMS = [...TOOLS, ...TOOLS];

function SkillBlock({ name, level, index, color }) {
  const pct = LEVEL_PCT[level] || 45;
  return (
    <motion.div
      className={styles.skillBlock}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: `0 8px 24px ${color}30` }}
    >
      <div className={styles.skillTop}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillPct} style={{ color }}>{pct}%</span>
      </div>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('languages');

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow accent">What I know</p>
          <h2 className="section-title">Skills &amp; Proficiencies</h2>
        </motion.div>

        {/* Category Tabs — centered */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`${styles.tab} ${activeTab === cat.key ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(cat.key)}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.skillsGrid}>
              {skills[activeTab].map((skill, i) => (
                <SkillBlock
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={i}
                  color={categories.find(c => c.key === activeTab).color}
                />
              ))}
            </div>

            {/* Resume buttons conditionally based on active tab */}
            {activeTab === 'dataAnalytics' && (
              <div className={styles.resumeActions}>
                <a
                  href="/resumes/Ambadas%20Ganapa%20DataAnalyst%20Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resumeBtn}
                >
                  📊 View Resume (Data Analyst)
                </a>
              </div>
            )}

            {activeTab === 'webBackend' && (
              <div className={styles.resumeActions}>
                <a
                  href="/resumes/Ambadas%20Ganapa%20Software%20Developer%20Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resumeBtn}
                >
                  🌐 View Resume (Software Developer)
                </a>
              </div>
            )}

            {activeTab === 'aiCloud' && (
              <div className={styles.resumeActions}>
                <a
                  href="/resumes/Ambads%20Ganapa%20AI%20Engineer%20.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resumeBtn}
                >
                  🤖 View Resume (AI)
                </a>
                <a
                  href="/resumes/Ambadas%20Ganapa%20Cloud%20Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resumeBtn}
                >
                  ☁️ View Resume (Cloud)
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tools & Platforms — Marquee */}
        <div className={styles.toolsSection}>
          <p className={styles.toolsLabel}>🛠️ Tools &amp; Platforms</p>
          <div className={styles.marqueeWrapper}>
            <div className={styles.marqueeTrack}>
              {MARQUEE_ITEMS.map((tool, i) => (
                <motion.div
                  key={i}
                  className={styles.toolBlock}
                  whileHover={{ y: -6, scale: 1.06, borderColor: 'var(--accent)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className={styles.toolLogo}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  <span className={styles.toolName}>{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
