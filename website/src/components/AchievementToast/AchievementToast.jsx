import React, { useState, useEffect } from 'react';
import styles from './AchievementToast.module.scss';

const AchievementToast = ({ achievement, isVisible, onClose, queueLength = 0 }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 50);
      
      const timer = setTimeout(() => {
        handleClose();
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 500); 
  };

  if (!shouldRender) return null;

  const {
    title = "Achievement Unlocked!",
    description = "You've completed a quest!",
    icon = "🏆",
    xp = 100,
    rarity = "common"
  } = achievement || {};

  // Ensure rarity is valid
  const validRarity = ['common', 'rare', 'epic', 'legendary'].includes(rarity) ? rarity : 'common';

  const toastClasses = [
    styles.achievementToast,
    isAnimating ? styles.visible : '',
    styles[validRarity]
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={toastClasses}
      onClick={handleClose}
    >
      <div className={styles.glow}></div>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <div className={styles.icon}>{icon}</div>
          <div className={styles.sparkles}>
            <span className={`${styles.sparkle} ${styles.sparkle1}`}>✨</span>
            <span className={`${styles.sparkle} ${styles.sparkle2}`}>⭐</span>
            <span className={`${styles.sparkle} ${styles.sparkle3}`}>✨</span>
          </div>
        </div>
        
        <div className={styles.text}>
          <div className={styles.header}>
            <span className={styles.label}>Achievement Unlocked!</span>
            <div className={styles.headerRight}>
              <span className={styles.xp}>+{xp} XP</span>
              {queueLength > 0 && (
                <span className={styles.queueIndicator}>+{queueLength} more</span>
              )}
            </div>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        
        <button 
          className={styles.close}
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          aria-label="Close achievement notification"
        >
          ×
        </button>
      </div>
      
      <div className={styles.progressBar}>
        <div className={styles.progressFill}></div>
      </div>
    </div>
  );
};

export default AchievementToast;
