import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiExternalLink, FiMic, FiMicOff, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import styles from './ChatBot.module.css';

const INTENTS = [
  {
    id: 'about',
    keywords: ['about', 'who are you', 'profile', 'name', 'who is', 'ambadas', 'ganapa', 'introduce', 'introduction', 'bio', 'summary', 'vision', 'mission'],
    response: "👋 Hi! I'm Ambadas Ganapa, a Software Developer and Data & Cloud Enthusiast. I hold a BCA with 9.5 CGPA and am currently pursuing MCA at SPPU, Pune. My career focus is backend and full-stack development, with expert hands-on experience in Python (Django) and React. Ask me about my skills, projects, or work experience!",
    type: null
  },
  {
    id: 'skills',
    keywords: ['skill', 'tech', 'language', 'database', 'frontend', 'backend', 'know', 'expert', 'proficient'],
    response: "📊 Here is a quick breakdown of my skills grouped by categories. My primary expertise for software development is in Python (Django), React JS, C# .NET, and AWS Cloud. You can see the full list of skills below:",
    type: 'skills'
  },
  {
    id: 'django_python',
    keywords: ['django', 'python', 'flask', 'pythong'],
    response: "🐍 Python & Django Expertise:\n\nPython (Django) is my most hands-on backend technology for software development! I've used it to build:\n- AGCareerSathi: AI recommendation system (Django, MongoDB, React.js)\n- AlgoVizLab: Algorithm visualization platform (Django, MySQL, React.js)\n- EduQuery: RAG-based search system (Python, LangChain, Gemini API)\n- Ganitwala: Deployed resource-sharing web application\n\nI am extremely comfortable building REST APIs, managing databases, and integrating AI models using Python and Django.",
    type: 'skills'
  },
  {
    id: 'react_frontend',
    keywords: ['react', 'frontend', 'javascript', 'html', 'css', 'js', 'ui', 'design', 'bootstrap'],
    response: "🌐 Frontend Development:\n\nI build interactive and responsive user interfaces using React JS, JavaScript, HTML5, CSS3, and Bootstrap. I design modern layouts with smooth transitions, focus on user experience, and connect frontends seamlessly to Django and ASP.NET backends.",
    type: 'skills'
  },
  {
    id: 'csharp_dotnet',
    keywords: ['c#', 'csharp', 'asp.net', 'mvc', 'sql server', 'windows form', 'dotnet', 'net core'],
    response: "⚙️ C# & ASP.NET:\n\nI have strong hands-on experience with C# and ASP.NET. During my internship at Lemonade SD, I developed WorkWatch (a complete office automation suite using C# Windows Forms & SQL Server) and coaching management databases using ASP.NET Core.",
    type: 'skills'
  },
  {
    id: 'aws_cloud',
    keywords: ['aws', 'cloud', 'amazon web', 'solution architect', 'gcp', 'azure', 'docker'],
    response: "☁️ Cloud & DevOps:\n\nI am a Cloud Enthusiast and have completed training/certification for AWS Solutions Architect Associate through GeeksforGeeks. I work with EC2, S3, RDS, Lambda, AWS operations, and have basic knowledge of Docker, GCP, and Azure.",
    type: 'skills'
  },
  {
    id: 'ai_agentic',
    keywords: ['ai', 'rag', 'langchain', 'gemini', 'generative', 'agentic', 'mcp', 'prompt engineering'],
    response: "🤖 AI & Generative AI:\n\nI am certified in Agentic AI and Generative AI (GeeksforGeeks). I have practical experience building AI applications, including:\n- AGCareerSathi: Google Gemini API powered recommendation system\n- EduQuery: Retrieval-Augmented Generation (RAG) system with LangChain, Gemini, and MongoDB",
    type: 'skills'
  },
  {
    id: 'projects',
    keywords: ['project', 'portfolio', 'built', 'develop', 'app'],
    response: "🚀 I love building practical applications in web development, software suites, and data analytics. Here are some of my highlighted projects (details below):",
    type: 'projects'
  },
  {
    id: 'experience',
    keywords: ['experience', 'work', 'job', 'intern', 'history', 'company', 'companies', 'vision', 'tutor', 'teaching', 'associate', 'ltm', 'ltimindtree'],
    response: "💼 Here is a summary of my professional developer experience and internships, which includes 8 months at Lemonade Software Developers and 6 months at Ganitwala:",
    type: 'experience'
  },
  {
    id: 'education',
    keywords: ['education', 'college', 'school', 'degree', 'study', 'studies', 'mca', 'bca', 'sppu', 'pune', 'solapur', 'university', 'academic', 'cgpa', 'marks', 'percentage', 'kuchan', 'marks'],
    response: "🎓 Education Details:\n\n- MCA (Master of Computer Applications)\n  Savitribai Phule Pune University, Pune\n  2025 – Ongoing (Pursuing)\n\n- BCA (Bachelor of Computer Applications)\n  Punyashlok Ahilyadevi Holkar Solapur University\n  Completed with a 9.5 CGPA (83.51%)\n\n- HSC & SSC\n  Kuchan Junior College & Kuchan High School, Solapur",
    type: null
  },
  {
    id: 'achievements',
    keywords: ['achieve', 'award', 'won', 'competition', 'prize', 'winner', 'runner', 'consolation', 'dexter', 'san pratibha', 'kalpak', 'codebate', 'techmaster', 'youth karandak'],
    response: "🏆 Key Achievements & Awards:\n\n- Winner: Youth Karandak 2K26 (Pune Cambridge)\n- Winner: TechMaster 2K25 & Soni Inter College 2K25\n- Runner-Up: KALPAK 2K24 Code Craft\n- Consolation Prize: Dexter 2K24 & San Pratibha Shodh 2K24\n- Impressive Intern Award from Lemonade Software Developers",
    type: null
  },
  {
    id: 'certifications',
    keywords: ['cert', 'credential', 'saa', 'soft skill'],
    response: "📜 My Technical Certifications:\n\n- AWS Solutions Architect Associate (GeeksforGeeks)\n- Agentic AI (Nation Skillup)\n- Generative AI (GeeksforGeeks)\n- Soft Skills & Professional Dev (GeeksforGeeks)\n- 30-Days Power BI Micro Course (SkillCourse)\n- SQL Basics (HackerRank)\n- Introduction to WordPress (Simplilearn)",
    type: null
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach', 'email', 'phone', 'call', 'whatsapp', 'linkedin', 'github', 'social', 'address', 'location', 'pune', 'solapur', 'hire', 'message', 'resume', 'cv'],
    response: "📧 I am actively seeking software developer roles. You can contact me directly or check my professional profiles below:",
    type: 'contact'
  },
  {
    id: 'hobbies',
    keywords: ['hobby', 'hobbies', 'interest', 'free time', 'sport', 'cricket', 'travel', 'explore', 'hardik pandya'],
    response: "🏏 Hobbies & Interests:\n\nCoding & Development: Solving problems on LeetCode, HackerRank, and GFG.\nPlaying Cricket: All-rounder, fan of Hardik Pandya.\nTravelling & Exploring: Exploring cities like Solapur, Pune, Mumbai, and Bangalore.",
    type: null
  },
  {
    id: 'greetings',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'whatsapp', 'howdy', 'sup'],
    response: "👋 Hello! I'm AG.io, Ambadas' AI Assistant. I can tell you about his skills (especially Python/Django), projects, experience, or education. What would you like to know?",
    type: null
  },
  {
    id: 'bot_info',
    keywords: ['what are you', 'who created', 'who made', 'your name', 'are you human', 'chatbot', 'bot', 'system', 'robi', 'ag.io'],
    response: "🤖 I am AG.io, an interactive AI assistant created to help visitors learn about Ambadas Ganapa's projects, skills, education, and career. I support voice commands and text inquiries!",
    type: null
  },
  {
    id: 'capabilities',
    keywords: ['what can you do', 'help', 'features', 'how to use', 'commands', 'options'],
    response: "I can search Ambadas' portfolio for skills (especially Python/Django), projects, experience, or education. You can also use the microphone 🎤 to speak to me, or toggle the speaker 🔊 to hear me talk!",
    type: null
  }
];

function getReply(msg) {
  const query = msg.toLowerCase().trim();
  
  if (query === 'how are you' || query.includes('how are you')) {
    return { text: "I'm doing great, thank you! Ready to help you explore Ambadas' accomplishments. What would you like to know?", type: null };
  }
  if (query === 'thank you' || query === 'thanks' || query.includes('thank you') || query.includes('thanks')) {
    return { text: "You're very welcome! Let me know if you want to know about anything else.", type: null };
  }

  let bestIntent = null;
  let maxScore = 0;

  INTENTS.forEach(intent => {
    let score = 0;
    intent.keywords.forEach(keyword => {
      if (query.includes(keyword)) {
        score += 2;
        const words = query.split(/\s+/);
        if (words.includes(keyword)) {
          score += 2;
        }
      }
    });
    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent;
    }
  });

  if (maxScore > 0 && bestIntent) {
    return { text: bestIntent.response, type: bestIntent.type };
  }

  return { 
    text: "I am unable to understand this query. I would like to help you with other queries such as skills, projects, experience, education, achievements, certifications, or hobbies. What would you like to know?", 
    type: null 
  };
}

const INITIAL = [
  { from: 'bot', text: "👋 Hi! I'm Ambadas, and I’d love to help you explore my portfolio. Ask me about my skills, projects, experience, or how to reach me.", type: null }
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakEnabled, setSpeakEnabled] = useState(false);
  
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  // Refs to store the latest states to prevent stale closures
  const speakEnabledRef = useRef(speakEnabled);
  const isListeningRef = useRef(isListening);

  useEffect(() => {
    speakEnabledRef.current = speakEnabled;
  }, [speakEnabled]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      recognitionRef.current = rec;
    }
  }, []);

  useEffect(() => {
    if (!speakEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [speakEnabled]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/•/g, '')
        .replace(/#/g, '')
        .replace(/⚙️/g, '')
        .replace(/📊/g, '')
        .replace(/🌐/g, '')
        .replace(/🤖/g, '')
        .replace(/🎓/g, '')
        .replace(/🏆/g, '')
        .replace(/👋/g, '')
        .replace(/🚀/g, '')
        .replace(/📧/g, '')
        .replace(/📞/g, '')
        .replace(/💼/g, '')
        .replace(/💻/g, '')
        .replace(/🏏/g, '')
        .replace(/✈️/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/-\s+/g, '')
        .replace(/\n/g, ' ')
        .trim();
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please try Google Chrome or Edge.");
      return;
    }

    const rec = recognitionRef.current;

    if (isListening) {
      try {
        rec.stop();
      } catch (err) {}
      setIsListening(false);
    } else {
      let finalSpeechText = '';

      // Dynamic binding to avoid stale closures
      rec.onstart = () => {
        setIsListening(true);
      };
      
      rec.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        finalSpeechText = transcript;
        setInput(transcript);
      };
      
      rec.onerror = (err) => {
        console.error("Speech recognition error:", err);
        setIsListening(false);
      };
      
      rec.onend = () => {
        setIsListening(false);
        if (finalSpeechText.trim()) {
          send(finalSpeechText, true);
          finalSpeechText = '';
        }
      };

      try {
        rec.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const send = (message = input, isSpeechFinal = false) => {
    const text = message?.trim();
    if (!text) return;
    setMessages(prev => [...prev, { from: 'user', text, type: null }]);
    setInput('');
    setTyping(true);

    if (!isSpeechFinal && isListeningRef.current && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {}
      setIsListening(false);
    }

    setTimeout(() => {
      setTyping(false);
      const reply = getReply(text);
      setMessages(prev => [...prev, { from: 'bot', text: reply.text, type: reply.type }]);
      if (speakEnabledRef.current) {
        speakText(reply.text);
      }
    }, 850);
  };

  const handleKey = e => { 
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      send(); 
    } 
  };

  const renderProjectsCard = () => (
    <div className={styles.richCard}>
      <div className={styles.projectItem}>
        <h6>🚀 AGCareerSathi</h6>
        <p>Tuition/batch management system for coaching institutes. Handles students, batches, fees, and receipts.</p>
        <div className={styles.badgeRow}>
          <span>React</span><span>ASP.NET Core</span><span>SQL</span>
        </div>
      </div>
      <div className={styles.projectItem}>
        <h6>📊 WorkWatch</h6>
        <p>Productivity and task logging tool. Log hours, compile tasks, and output excel reports.</p>
        <div className={styles.badgeRow}>
          <span>C#</span><span>ASP.NET MVC</span><span>SQL</span>
        </div>
      </div>
      <div className={styles.projectItem}>
        <h6>⚙️ Ganitwala</h6>
        <p>Deployed educational resource sharing and tutorial web application for math learners.</p>
        <div className={styles.badgeRow}>
          <span>Python</span><span>MySQL</span><span>HTML/CSS</span>
        </div>
      </div>
    </div>
  );

  const renderSkillsCard = () => (
    <div className={styles.richCard}>
      <div className={styles.skillGroup}>
        <h6>🌐 Web &amp; Backend</h6>
        <div className={styles.miniSkillGrid}>
          <span>Python (Django)</span><span>React JS</span><span>ASP.NET Core</span><span>Java</span><span>MySQL</span>
        </div>
      </div>
      <div className={styles.skillGroup}>
        <h6>📊 Data &amp; Analytics</h6>
        <div className={styles.miniSkillGrid}>
          <span>Python</span><span>Power BI</span><span>SQL</span><span>Excel</span>
        </div>
      </div>
      <div className={styles.skillGroup}>
        <h6>🤖 AI &amp; Cloud</h6>
        <div className={styles.miniSkillGrid}>
          <span>RAG</span><span>LangChain</span><span>AWS Cloud</span><span>Docker</span>
        </div>
      </div>
    </div>
  );

  const renderContactCard = () => (
    <div className={styles.richCardGrid}>
      <a href="mailto:ambadasganapa31@gmail.com" className={styles.richCardBtn}>📧 Email Me</a>
      <a href="tel:+917757082080" className={styles.richCardBtn}>📞 Call Me</a>
      <a href="https://linkedin.com/in/ambadasganapa" target="_blank" rel="noreferrer" className={styles.richCardBtn}>💼 LinkedIn</a>
      <a href="https://github.com/AmbadasGanapa" target="_blank" rel="noreferrer" className={styles.richCardBtn}>💻 GitHub</a>
    </div>
  );

  const renderExperienceCard = () => (
    <div className={styles.richCard}>
      <div className={styles.expItem}>
        <h6>💻 Python Developer Intern @ Ganitwala</h6>
        <span className={styles.expPeriod}>Dec 2025 – May 2026 (6 Months)</span>
        <p>Developed and deployed educational web application features.</p>
      </div>
      <div className={styles.expItem}>
        <h6>⚙️ Software Developer Intern @ Lemonade SD</h6>
        <span className={styles.expPeriod}>Jul 2024 – Feb 2025 (8 Months)</span>
        <p>Built complete tuition management systems and handled real-world UI design.</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Button */}
      <button className={styles.fab} onClick={() => setOpen(!open)} aria-label="Open chat">
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><FiX size={22} /></motion.span>
            : <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><FaRobot size={22} /></motion.span>
          }
        </AnimatePresence>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.window}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.botAvatar}><FaRobot size={18} /></div>
              <div>
                <p className={styles.botName}>AG.io</p>
                <p className={styles.botStatus}><span className={styles.onlineDot} />Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
              {messages.map((m, i) => (
                <div key={i} className={`${styles.msg} ${m.from === 'user' ? styles.user : styles.bot}`}>
                  {m.text && <p className={styles.msgText}>{m.text}</p>}
                  {m.type === 'projects' && renderProjectsCard()}
                  {m.type === 'skills' && renderSkillsCard()}
                  {m.type === 'contact' && renderContactCard()}
                  {m.type === 'experience' && renderExperienceCard()}
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
                { label: '🚀 My Projects', value: 'projects' },
                { label: '📊 My Skills', value: 'skills' },
                { label: '💼 Experience', value: 'experience' },
                { label: '📧 Contact Me', value: 'contact' },
                { label: '🏏 My Hobbies', value: 'hobbies' },
              ].map(q => (
                <button key={q.value} className={styles.quickBtn} onClick={() => send(q.value)}>
                  {q.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className={styles.inputRow}>
              <button 
                className={`${styles.iconBtn} ${speakEnabled ? styles.speakActive : ''}`} 
                onClick={() => setSpeakEnabled(!speakEnabled)}
                title={speakEnabled ? "Mute Voice Response" : "Read Response Aloud"}
                type="button"
              >
                {speakEnabled ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
              </button>
              <button 
                className={`${styles.iconBtn} ${isListening ? styles.listening : ''}`} 
                onClick={toggleListening}
                title={isListening ? "Listening... Click to stop" : "Speak to AG.io"}
                type="button"
              >
                {isListening ? <FiMic size={18} className={styles.pulseMic} /> : <FiMicOff size={18} />}
              </button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={isListening ? "Listening..." : "Ask AG.io a question..."}
                className={styles.input}
                disabled={isListening}
              />
              <button 
                className={styles.sendBtn} 
                onClick={() => send()} 
                aria-label="Send" 
                type="button"
                disabled={isListening}
              >
                <FiSend size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
