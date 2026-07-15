import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiCompass, FiX, FiExternalLink, FiChevronRight } from 'react-icons/fi';
import { FaTrain, FaCar, FaMotorcycle, FaBus, FaShip } from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { hobbies } from '../../data/portfolioData';
import styles from './Hobbies.module.css';

// Counter component for animating numbers when section is in view
function HobbyCounter({ target, suffix = '', active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let current = 0;
    const duration = 1500; // 1.5s
    const stepTime = 20;
    const steps = Math.round(duration / stepTime);
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span className={styles.statValCount}>
      {count}
      {suffix}
    </span>
  );
}

// India Map OSM component
function IndiaTravelMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const nodes = [
    { id: 'solapur', name: 'Solapur', latlng: [17.6599, 75.9064], isHome: true },
    { id: 'pune', name: 'Pune', latlng: [18.5204, 73.8567], isHome: false },
    { id: 'mumbai', name: 'Mumbai', latlng: [19.0760, 72.8777], isHome: false },
    { id: 'shirdi', name: 'Shirdi', latlng: [19.7663, 74.4762], isHome: false },
    { id: 'kolhapur', name: 'Kolhapur', latlng: [16.7050, 74.2433], isHome: false },
    { id: 'satara', name: 'Satara', latlng: [17.6805, 73.9912], isHome: false },
    { id: 'latur', name: 'Latur', latlng: [18.4088, 76.5604], isHome: false },
    { id: 'bangalore', name: 'Bangalore', latlng: [12.9716, 77.5946], isHome: false },
    { id: 'yadgir', name: 'Yadgir', latlng: [16.7600, 77.1300], isHome: false },
    { id: 'vijayapur', name: 'Vijayapur', latlng: [16.8302, 75.7100], isHome: false },
    { id: 'hyderabad', name: 'Hyderabad', latlng: [17.3850, 78.4867], isHome: false },
    { id: 'bhadrachalam', name: 'Bhadrachalam', latlng: [17.6698, 80.8872], isHome: false },
    { id: 'tirupati', name: 'Tirupati', latlng: [13.6288, 79.4192], isHome: false },
    { id: 'mantralayam', name: 'Mantralayam', latlng: [15.9405, 77.4258], isHome: false },
    { id: 'puttaparthi', name: 'Puttaparthi', latlng: [14.1649, 77.8105], isHome: false },
    { id: 'coimbatore', name: 'Coimbatore', latlng: [11.0168, 76.9558], isHome: false }
  ];

  const getBezierPoints = (latlng1, latlng2, numPoints = 30) => {
    const [lat1, lng1] = latlng1;
    const [lat2, lng2] = latlng2;

    const mlat = (lat1 + lat2) / 2;
    const mlng = (lng1 + lng2) / 2;

    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;

    const offset = 0.12;
    const plat = mlat - dLng * offset;
    const plng = mlng + dLat * offset;

    const points = [];
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * plat + t * t * lat2;
      const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * plng + t * t * lng2;
      points.push([lat, lng]);
    }
    return points;
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const isDark = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark';
    
    const tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    // India bounds to lock panning
    const indiaBounds = L.latLngBounds([6.0, 67.0], [36.0, 98.0]);

    // Center map to encompass full India map
    const map = L.map(mapContainerRef.current, {
      center: [20.5937, 78.9629],
      zoom: 4.5,
      minZoom: 4,
      maxBounds: indiaBounds,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);

    const generateDistrictPolygon = (latlng, isHome) => {
      const [lat, lng] = latlng;
      const numPoints = 8;
      const points = [];
      const seed = Math.sin(lat * 12.9898 + lng * 78.233) * 43758.5453;
      let r = seed - Math.floor(seed);
      const pseudoRandom = () => {
        r = Math.sin(r * 93.123) * 10000;
        return r - Math.floor(r);
      };
      const maxRadius = isHome ? 0.38 : 0.26;
      const minRadius = isHome ? 0.22 : 0.14;
      for (let i = 0; i < numPoints; i++) {
        const angle = (i * 2 * Math.PI) / numPoints;
        const radius = minRadius + (maxRadius - minRadius) * pseudoRandom();
        const latOffset = radius * Math.cos(angle);
        const lngOffset = radius * Math.sin(angle) * (1.0 + (pseudoRandom() - 0.5) * 0.4);
        points.push([lat + latOffset, lng + lngOffset]);
      }
      return points;
    };

    // Add solid color-filled organic district boundaries for each city region
    nodes.forEach((node) => {
      const polygonPoints = generateDistrictPolygon(node.latlng, node.isHome);
      const poly = L.polygon(polygonPoints, {
        fillColor: node.isHome ? '#10b981' : '#6c63ff', // Solapur emerald green, others royal purple
        fillOpacity: 0.85,                             // Solid color-filled region
        color: node.isHome ? '#10b981' : '#8b85ff',    // Border matches fill/accent color
        weight: 1.5,
        lineJoin: 'round',
        interactive: true                              // Enabled for hover events
      }).addTo(map);

      // Hover-only tooltip that follows mouse
      poly.bindTooltip(node.name, {
        permanent: false,
        sticky: true,
        direction: 'top',
        className: node.isHome ? styles.tooltipHome : styles.tooltipDest
      });
    });

    // Draw Bezier travel curves from Solapur
    const homeNode = nodes.find((n) => n.isHome);
    nodes
      .filter((n) => !n.isHome)
      .forEach((n) => {
        const routePoints = getBezierPoints(homeNode.latlng, n.latlng);

        // Draw shadow line
        L.polyline(routePoints, {
          color: 'rgba(79, 70, 229, 0.15)',
          weight: 3.5,
          interactive: false,
        }).addTo(map);

        // Draw animated overlay
        L.polyline(routePoints, {
          color: '#4f46e5',
          weight: 2,
          className: styles.leafletPulsePath,
          interactive: false,
        }).addTo(map);
      });

    // Handle Leaflet render size issues
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapHeader}>
        <h4>📍 Travel Network </h4>
        <p>Explore my travel routes connected directly from my birthplace in Solapur, Maharashtra</p>
      </div>

      <div className={styles.mapWrapper}>
        <div ref={mapContainerRef} className={styles.leafletMap} />
      </div>
    </div>
  );
}

// Hobby Details Modal Component
function HobbyDetailsModal({ hobbyType, onClose }) {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const handler = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    const checkTheme = () => {
      const themeAttr = document.documentElement.getAttribute('data-theme') || 'dark';
      setCurrentTheme(themeAttr);
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const renderContent = () => {
    switch (hobbyType) {
      case 'coding':
        return (
          <div className={styles.modalContentBody}>
            <div className={styles.modalHeaderIcon}>
              <FiCode size={48} className={styles.accent} />
            </div>
            <h4>Coding &amp; Development</h4>
            <p>
              Coding is my creative outlet. I start with simple concepts and build complex web solutions. 
              Solving problems algorithmically feeds my curiosity and keeps me sharp.
            </p>
            <h5 className={styles.modalSectionLabel}>Technical Statistics:</h5>
            <div className={styles.statsBoxInline}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Languages Learned:</span>
                <span className={styles.statVal}>8</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Projects Built:</span>
                <span className={styles.statVal}>10+</span>
              </div>
            </div>
            <h5 className={styles.modalSectionLabel}>Languages Profile:</h5>
            <ul className={styles.langListHorizontal}>
              <li>C</li>
              <li>Python</li>
              <li>JavaScript</li>
              <li>Java</li>
              <li>C#</li>
              <li>SQL</li>
              <li>HTML</li>
              <li>CSS</li>
            </ul>
            <h5 className={styles.modalSectionLabel}>Active Platforms:</h5>
            <div className={styles.platformsInlineGrid}>
              <a href="https://leetcode.com/u/AmbadasGanapa/" target="_blank" rel="noopener noreferrer" className={styles.platformBadge}>LeetCode <FiExternalLink size={12} /></a>
              <a href="https://www.geeksforgeeks.org/profile/ambadasganapa31?tab=activity" target="_blank" rel="noopener noreferrer" className={styles.platformBadge}>GeeksforGeeks <FiExternalLink size={12} /></a>
              <a href="https://www.hackerrank.com/profile/ambadasganapa" target="_blank" rel="noopener noreferrer" className={styles.platformBadge}>HackerRank <FiExternalLink size={12} /></a>
              <a href="https://github.com/AmbadasGanapa" target="_blank" rel="noopener noreferrer" className={styles.platformBadge}>GitHub <FiExternalLink size={12} /></a>
            </div>

            <h5 className={styles.modalSectionLabel}>LeetCode Activity Stats:</h5>
            <div className={styles.leetCodeCardWrapper}>
              <a href="https://leetcode.com/u/AmbadasGanapa/" target="_blank" rel="noopener noreferrer">
                <img 
                  src={`https://leetcard.jacoblin.cool/AmbadasGanapa?theme=${currentTheme === 'light' ? 'light' : 'dark'}&font=Inter`} 
                  alt="Ambadas Ganapa LeetCode Stats" 
                  className={styles.leetCodeCard}
                />
              </a>
            </div>

            <h5 className={styles.modalSectionLabel}>GeeksforGeeks Activity Stats:</h5>
            <div className={styles.leetCodeCardWrapper}>
              <a href="https://www.geeksforgeeks.org/profile/ambadasganapa31?tab=activity" target="_blank" rel="noopener noreferrer">
                <img 
                  src={`https://gfgstatscard.vercel.app/ambadasganapa31?theme=${currentTheme === 'light' ? 'light' : 'dark'}`} 
                  alt="Ambadas Ganapa GFG Stats" 
                  className={styles.leetCodeCard}
                />
              </a>
            </div>

            <h5 className={styles.modalSectionLabel}>HackerRank Badges &amp; Streaks:</h5>
            <div className={styles.hackerRankGrid}>
              <div className={styles.hrBadgeCard}>
                <span className={styles.hrBadgeIcon}>🏆</span>
                <div className={styles.hrBadgeInfo}>
                  <h6>Problem Solving</h6>
                  <div className={styles.hrStars}>⭐⭐⭐⭐⭐</div>
                  <span className={styles.hrBadgeLevel}>Gold Badge</span>
                </div>
              </div>
              <div className={styles.hrBadgeCard}>
                <span className={styles.hrBadgeIcon}>🏆</span>
                <div className={styles.hrBadgeInfo}>
                  <h6>SQL</h6>
                  <div className={styles.hrStars}>⭐⭐⭐⭐⭐</div>
                  <span className={styles.hrBadgeLevel}>Gold Badge</span>
                </div>
              </div>
              <div className={styles.hrBadgeCard}>
                <span className={styles.hrBadgeIcon}>🏆</span>
                <div className={styles.hrBadgeInfo}>
                  <h6>Java</h6>
                  <div className={styles.hrStars}>⭐⭐⭐⭐⭐</div>
                  <span className={styles.hrBadgeLevel}>Gold Badge</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cricket':
        return (
          <div className={styles.modalContentBody}>
            <div className={styles.modalHeaderIcon}>
              <GiCricketBat size={48} className={styles.accent} />
            </div>
            <h4>Playing Cricket</h4>
            <p>
              Cricket teaches me collaboration, focus, and strategy under pressure. I actively play as an all-rounder, 
              contributing with both the bat and ball.
            </p>
            
            <h5 className={styles.modalSectionLabel}>Player Cutouts:</h5>
            <div className={styles.cutoutWrapper}>
              <div className={styles.cutoutCard}>
                <img src="/images/batsman_cutout.png" alt="Right Hand Batsman Cutout" className={styles.cricketCutout} />
                <span className={styles.cutoutLabel}>Right Hand Batsman</span>
              </div>
              <div className={styles.cutoutCard}>
                <img src="/images/bowler_cutout.png" alt="Bowler Cutout" className={styles.cricketCutout} />
                <span className={styles.cutoutLabel}>Medium Pace Bowler</span>
              </div>
            </div>

            <h5 className={styles.modalSectionLabel}>Playing Profile:</h5>
            <div className={styles.cricketDetailsGrid}>
              <div className={styles.cricketStatCard}>
                <span className={styles.cricketLabel}>Role</span>
                <span className={styles.cricketValue}>All-rounder</span>
              </div>
              <div className={styles.cricketStatCard}>
                <span className={styles.cricketLabel}>Batting Style</span>
                <span className={styles.cricketValue}>Right Hand Bat</span>
              </div>
              <div className={styles.cricketStatCard}>
                <span className={styles.cricketLabel}>Bowling Style</span>
                <span className={styles.cricketValue}>Medium Pace Bowl</span>
              </div>
            </div>
            <div className={styles.playerFavBox}>
              <img 
                src="/images/HP.jpg" 
                alt="Hardik Pandya" 
                className={styles.favPlayerPhoto} 
              />
              <div className={styles.favPlayerInfo}>
                <span className={styles.favLabel}>Favorite Player</span>
                <span className={styles.favValue}>Hardik Pandya</span>
              </div>
            </div>
          </div>
        );

      case 'travelling':
        return (
          <div className={styles.modalContentBody}>
            <div className={styles.modalHeaderIcon}>
              <FiCompass size={48} className={styles.accent} />
            </div>
            <h4>Travelling &amp; Exploring</h4>
            <p>
              Travelling exposes me to different cultures and environments, inspiring fresh perspectives. 
              Every journey expands my worldview and sparks new ideas.
            </p>
            
            <h5 className={styles.modalSectionLabel}>Travel Route Network:</h5>
            <IndiaTravelMap />

            <h5 className={styles.modalSectionLabel}>Transit Preferences &amp; Modes:</h5>
            <div className={styles.travelModesRow}>
              <div className={styles.modeIcon}><FaMotorcycle title="Bike" /><span>Bike</span></div>
              <div className={styles.modeIcon}><FaCar title="Car" /><span>Car</span></div>
              <div className={styles.modeIcon}><FaBus title="Bus" /><span>Bus</span></div>
              <div className={styles.modeIcon}><FaTrain title="Train" /><span>Train</span></div>
              <div className={styles.modeIcon}><FaShip title="Ship" /><span>Ship</span></div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className={styles.modalBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ y: 50, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Close modal">
          <FiX size={20} />
        </button>
        <div className={styles.modalScrollArea}>
          {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Hobbies Component
export default function Hobbies() {
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getHobbyIcon = (id) => {
    switch (id) {
      case 'coding':
        return <FiCode className={styles.hobbyIcon} />;
      case 'cricket':
        return <GiCricketBat className={styles.hobbyIcon} />;
      case 'travelling':
        return <FiCompass className={styles.hobbyIcon} />;
      default:
        return null;
    }
  };

  return (
    <section id="hobbies" className={`section ${styles.hobbies}`} ref={sectionRef}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow accent">Beyond Work</p>
          <h2 className="section-title">Hobbies &amp; Interests</h2>
          <p className="section-subtitle">
            A glimpse into the things that keep me balanced, curious, and creative.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {hobbies.map((item, index) => (
            <motion.article
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
            >
              <div className={styles.cardGlow} />
              <div className={styles.headerRow}>
                <div className={styles.iconContainer}>{getHobbyIcon(item.id)}</div>
                <h3>{item.title}</h3>
              </div>
              <p className={styles.desc}>{item.description}</p>

              {/* Stats Box */}
              <div className={styles.statsBox}>
                {item.stats &&
                  item.stats.map(s => (
                    <div key={s.label} className={styles.statRow}>
                      <span className={styles.statLabel}>{s.label}:</span>
                      {s.isText ? (
                        <span className={styles.statValText}>{s.value}</span>
                      ) : (
                        <HobbyCounter target={s.value} suffix={s.suffix} active={inView} />
                      )}
                    </div>
                  ))}
              </div>

              <button className={styles.learnMoreBtn} onClick={() => setSelectedHobby(item.id)}>
                Learn More <FiChevronRight size={16} />
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedHobby && (
          <HobbyDetailsModal hobbyType={selectedHobby} onClose={() => setSelectedHobby(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
