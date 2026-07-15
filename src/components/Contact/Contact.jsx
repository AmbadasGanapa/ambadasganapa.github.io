import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiGithub, 
  FiLinkedin, 
  FiInstagram, 
  FiFacebook 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { 
  SiLeetcode, 
  SiHackerrank, 
  SiGeeksforgeeks, 
  SiMedium, 
  SiSnapchat, 
  SiTelegram, 
  SiX 
} from 'react-icons/si';
import { personalInfo } from '../../data/portfolioData';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDark = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') !== 'light';
  const ghTheme = isDark ? 'tokyonight&bg_color=1e1e1e' : 'default&bg_color=ffffff';
  const ghTitleColor = isDark ? '6c63ff' : '5b52e8';

  const socialLinks = [
    { href: personalInfo.socials.linkedin || "https://linkedin.com/in/ambadasganapa", icon: <FiLinkedin />, label: 'LinkedIn' },
    { href: personalInfo.socials.github || "https://github.com/AmbadasGanapa/", icon: <FiGithub />, label: 'GitHub' },
    { href: personalInfo.socials.leetcode || "https://leetcode.com/u/AmbadasGanapa/", icon: <SiLeetcode />, label: 'LeetCode' },
    { href: "https://www.geeksforgeeks.org/profile/ambadasganapa31?tab=activity", icon: <SiGeeksforgeeks />, label: 'GeeksforGeeks' },
    { href: personalInfo.socials.hackerrank || "https://www.hackerrank.com/profile/ambadasganapa31", icon: <SiHackerrank />, label: 'HackerRank' },
    { href: "https://x.com/AmbadasGanapa", icon: <SiX />, label: 'X' },
    { href: personalInfo.socials.instagram || "https://instagram.com/ambadas_ganapa/", icon: <FiInstagram />, label: 'Instagram' },
    { href: "https://facebook.com/ambadas.ganapa", icon: <FiFacebook />, label: 'Facebook' },
    { href: "https://snapchat.com/add/ambadas_ganapa", icon: <SiSnapchat />, label: 'Snapchat' },
    { href: personalInfo.socials.telegram || "https://t.me/ambadas_ganapa", icon: <SiTelegram />, label: 'Telegram' },
    { href: "https://medium.com/@ambadasganapa31", icon: <SiMedium />, label: 'Medium' },
    { href: personalInfo.socials.whatsapp || "https://wa.me/7757082080", icon: <FaWhatsapp />, label: 'WhatsApp' },
    { href: `mailto:${personalInfo.email || "ambadasganapa31@gmail.com"}`, icon: <FiMail />, label: 'Email' },
    { href: `tel:${personalInfo.phone || "+917757082080"}`, icon: <FiPhone />, label: 'Call' }
  ];

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in your name, email, and message before sending.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            to_name: personalInfo.name,
            to_email: personalInfo.email,
          },
          publicKey
        );

        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: personalInfo.name,
            from_email: personalInfo.email,
            message: `Hello ${form.name},\n\nThank you for reaching out. I have received your message and will get back to you soon.\n\nBest regards,\n${personalInfo.name}`,
            to_name: form.name,
            to_email: form.email,
          },
          publicKey
        );

        setStatus({ type: 'success', message: 'Thanks! Your message was sent successfully.' });
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Email service is not configured yet. Please contact me directly at ' + personalInfo.email + '.' });
      }
    } catch (error) {
      console.error('Contact form failed:', error);
      const message = error?.text || error?.message || 'Something went wrong while sending. Please try again or contact me directly at ' + personalInfo.email + '.';
      setStatus({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="eyebrow accent">Get in touch</p>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle">Open to internships, collaborations, and full-time roles</p>
        </motion.div>

        <div className={styles.grid}>
          {/* Info */}
          <motion.div className={styles.info} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className={styles.infoItem}><FiMail className={styles.infoIcon} /><div><p className={styles.infoLabel}>Email</p><a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a></div></div>
            <div className={styles.infoItem}><FiPhone className={styles.infoIcon} /><div><p className={styles.infoLabel}>Phone</p><a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a></div></div>
            <div className={styles.infoItem}><FiMapPin className={styles.infoIcon} /><div><p className={styles.infoLabel}>Location</p><p>{personalInfo.location}</p></div></div>

            <div className={styles.socials}>
              {socialLinks.map(link => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label={link.label}
                  className={styles.socialIcon}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* GitHub Stats */}
            
          </motion.div>

          {/* Form */}
          <motion.form className={styles.form} onSubmit={handleSubmit} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {status.message ? (
              <div className={`${styles.statusMsg} ${status.type === 'error' ? styles.errorMsg : styles.successMsg}`}>
                {status.type === 'error' ? '⚠️' : '✅'} {status.message}
              </div>
            ) : null}

            <div className={styles.formGroup}>
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." rows={5} required />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.sendBtn}`} disabled={isSubmitting}>
              <FiSend /> {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
