import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { certifications } from '../../data/portfolioData';
import styles from './Certifications.module.css';

const CARD_WIDTH = 290;
const CARD_GAP = 28;

export default function Certifications() {
  const sortedCerts = useMemo(
    () => [...certifications].sort((a, b) => Number(b.year) - Number(a.year)),
    []
  );

  const initialIndex = useMemo(() => {
    const idx = sortedCerts.findIndex(c => c.title.toLowerCase().includes('generative ai'));
    return idx !== -1 ? idx : 0;
  }, [sortedCerts]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + sortedCerts.length) % sortedCerts.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % sortedCerts.length);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section id="certifications" className={`section ${styles.certifications}`}>
      <div className={styles.sliderSectionContainer}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow accent">Professional Growth</p>
          <h2 className="section-title">My Certifications</h2>
         
        </motion.div>

        {/* Carousel Container */}
        <div className={styles.carouselContainer}>
          {/* Arrow Buttons */}
          <button
            className={`${styles.arrowBtn} ${styles.arrowLeft}`}
            onClick={handlePrev}
            aria-label="Previous Certification"
          >
            <FiChevronLeft size={22} />
          </button>

          <button
            className={`${styles.arrowBtn} ${styles.arrowRight}`}
            onClick={handleNext}
            aria-label="Next Certification"
          >
            <FiChevronRight size={22} />
          </button>

          {/* Slider Window with Touch Events */}
          <div
            className={styles.sliderWindow}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className={styles.sliderTrack}
              style={{
                transform: `translateX(calc(50% - ${activeIndex * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2}px))`,
              }}
            >
              {sortedCerts.map((cert, index) => {
                const isActive = index === activeIndex;
                const isAdjacent =
                  Math.abs(index - activeIndex) === 1 ||
                  (activeIndex === 0 && index === sortedCerts.length - 1) ||
                  (activeIndex === sortedCerts.length - 1 && index === 0);

                let cardClass = styles.card;
                if (isActive) {
                  cardClass += ` ${styles.cardActive}`;
                } else if (isAdjacent) {
                  cardClass += ` ${styles.cardAdjacent}`;
                } else {
                  cardClass += ` ${styles.cardFar}`;
                }

                return (
                  <a
                    key={cert.title}
                    href={cert.credentialUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className={cardClass}
                    style={{
                      width: `${CARD_WIDTH}px`,
                      minWidth: `${CARD_WIDTH}px`,
                    }}
                  >
                    <div className={styles.imageWrapper}>
                      <img src={cert.image} alt={cert.title} />
                      <div className={styles.cardOverlay} />
                      {isActive && cert.credentialUrl && (
                        <div className={styles.viewBadge}>
                          <FiExternalLink size={16} /> View Credential
                        </div>
                      )}
                    </div>
                    <div className={styles.body}>
                      <span className={styles.year}>{cert.year}</span>
                      <h3>{cert.title}</h3>
                      <p className={styles.issuer}>{cert.issuer}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
