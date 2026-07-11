import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import styles from './ChatBot.module.css';

// Quick replies about Ambadas — the bot answers from a knowledge base
// For a real AI bot, replace the getReply function with a Gemini API call
const KB = {
  skills: "I work with Python, Java, C#, SQL, Power BI, Excel, Flask, ASP.NET Core MVC, and I'm currently learning React, Machine Learning, and AWS Cloud.",
  projects: "Some of my key projects include AGCareerSathi, WorkWatch, AlgoVizLab, EduQuery, and several Power BI dashboards for data analysis.",
  education: "I completed my BCA with a 9.5 CGPA from PAHSU Solapur and I'm currently pursuing my MCA at Savitribai Phule Pune University, Pune.",
  experience: "I interned as a Software Developer at Lemonade Software Developers for 8 months, building real-world solutions and gaining hands-on industry experience.",
  achievements: "I have won TechMaster 2K25, Soni Inter College 2K25, and received the Impressive Intern Award from Lemonade SD.",
  contact: "You can reach me at ambadasganapa31@gmail.com or call me on +91 7757082080. I’m also active on LinkedIn and GitHub.",
  hobbies: "I enjoy reading, writing, learning new things, and listening to music while I work and reflect.",
  about: "I’m a software developer who loves building practical solutions in cloud, data, and AI. I enjoy turning ideas into real products.",
  hire: "I’m actively looking for opportunities in Data Analytics, Data Engineering, and AI/ML, and I’d love to connect through the contact section.",
  default: "I can tell you about my skills, projects, education, experience, hobbies, or how to contact me. What would you like to know?",
};

function getReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes('skill') || m.includes('tech') || m.includes('know')) return KB.skills;
  if (m.includes('project') || m.includes('built') || m.includes('work')) return KB.projects;
  if (m.includes('edu') || m.includes('college') || m.includes('degree') || m.includes('cgpa')) return KB.education;
  if (m.includes('intern') || m.includes('experience') || m.includes('job')) return KB.experience;
  if (m.includes('achiev') || m.includes('award') || m.includes('win') || m.includes('compet')) return KB.achievements;
  if (m.includes('contact') || m.includes('email') || m.includes('phone') || m.includes('reach')) return KB.contact;
  if (m.includes('hobby') || m.includes('music') || m.includes('read') || m.includes('write')) return KB.hobbies;
  if (m.includes('about') || m.includes('who')) return KB.about;
  if (m.includes('hire') || m.includes('opportunit') || m.includes('available')) return KB.hire;
  return KB.default;
}

const INITIAL = [{ from: 'bot', text: "👋 Hi! I'm Ambadas, and I’d love to help you explore my portfolio. Ask me about my skills, projects, experience, or how to reach me." }];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (message = input) => {
    const text = message?.trim();
    if (!text) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getReply(text) }]);
    }, 900);
  };

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      {/* Floating Button */}
      <button className={styles.fab} onClick={() => setOpen(!open)} aria-label="Open chat">
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><FiX size={22} /></motion.span>
            : <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><FiMessageSquare size={22} /></motion.span>
          }
        </AnimatePresence>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.window}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.botAvatar}>AG</div>
              <div>
                <p className={styles.botName}>Portfolio Assistant</p>
                <p className={styles.botStatus}><span className={styles.onlineDot} />Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
              {messages.map((m, i) => (
                <div key={i} className={`${styles.msg} ${m.from === 'user' ? styles.user : styles.bot}`}>
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className={`${styles.msg} ${styles.bot} ${styles.typing}`}>
                  <span /><span /><span />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className={styles.quickReplies}>
              {[
                { label: 'My Skills', value: 'skills' },
                { label: 'My Projects', value: 'projects' },
                { label: 'My Experience', value: 'experience' },
                { label: 'Contact Me', value: 'contact' },
                { label: 'My Hobbies', value: 'hobbies' },
              ].map(q => (
                <button key={q.value} className={styles.quickBtn} onClick={() => send(q.value)}>
                  {q.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className={styles.inputRow}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me about my work, skills, or interests..."
                className={styles.input}
              />
              <button className={styles.sendBtn} onClick={send} aria-label="Send">
                <FiSend size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
