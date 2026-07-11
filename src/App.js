import React from 'react';
import './styles/global.css';
import { useTheme } from './hooks/useTheme';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Achievements from './components/Achievements/Achievements';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import ChatBot from './components/ChatBot/ChatBot';
import Footer from './components/Footer/Footer';

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="App">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Experience />
        <Education />
        <Contact />
      </main>
      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;
