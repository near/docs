import { useState, useCallback } from 'react';
import { ACHIEVEMENTS } from './achievements';
import styles from './AchievementToast.module.scss';

// Dynamic import for react-hot-toast
const useToast = () => {
  try {
    // Try to dynamically import react-hot-toast
    const toast = require('react-hot-toast');
    return toast.default;
  } catch (error) {
    console.warn('react-hot-toast not available, using fallback');
    return {
      custom: (content, options) => {
        console.log('🏆 Achievement Toast:', { content, options });
        // Create a simple browser notification as fallback
        if (typeof content === 'function') {
          console.log('Achievement content:', content({}));
        } else if (content && content.props) {
          const achievement = content.props.achievement;
          console.log(`🎉 ${achievement.title}: ${achievement.description} (+${achievement.xp} XP)`);
        }
      },
      dismiss: () => console.log('Toast dismissed')
    };
  }
};

// Custom achievement toast component
const AchievementToastContent = ({ achievement }) => {
  const getRarityColor = (rarity) => {
    const colors = {
      common: '#6b7280', // gray
      rare: '#3b82f6', // blue
      epic: '#8b5cf6', // purple
      legendary: '#f59e0b' // amber
    };
    return colors[rarity] || colors.common;
  };

  const getRarityGradient = (rarity) => {
    const gradients = {
      common: 'linear-gradient(135deg, rgba(107, 114, 128, 0.9), rgba(107, 114, 128, 0.7))',
      rare: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(59, 130, 246, 0.7))',
      epic: 'linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(139, 92, 246, 0.7))',
      legendary: 'linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(245, 158, 11, 0.7))'
    };
    return gradients[rarity] || gradients.common;
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        background: getRarityGradient(achievement.rarity),
        borderRadius: '12px',
        border: `2px solid ${getRarityColor(achievement.rarity)}`,
        color: 'white',
        minWidth: '300px',
        boxShadow: `0 8px 25px rgba(${getRarityColor(achievement.rarity).replace('#', '').match(/.{1,2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.3)`,
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Sparkle effect for legendary achievements */}
      {achievement.rarity === 'legendary' && (
        <div
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            fontSize: '20px',
            animation: 'sparkle-rotation 2s linear infinite'
          }}
        >
          ✨
        </div>
      )}
      
      <div
        style={{
          fontSize: '32px',
          minWidth: '40px',
          textAlign: 'center'
        }}
      >
        {achievement.icon}
      </div>
      
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '4px'
          }}
        >
          {achievement.title}
        </div>
        <div
          style={{
            fontSize: '14px',
            opacity: 0.9,
            marginBottom: '6px'
          }}
        >
          {achievement.description}
        </div>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#10b981',
            background: 'rgba(16, 185, 129, 0.2)',
            padding: '2px 8px',
            borderRadius: '12px',
            display: 'inline-block'
          }}
        >
          +{achievement.xp} XP
        </div>
      </div>
    </div>
  );
};

export const useAchievements = () => {
  const [totalXP, setTotalXP] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [achievementQueue, setAchievementQueue] = useState([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);

  const getDuration = (rarity) => {
    const durations = {
      common: 4000,
      rare: 5000,
      epic: 6000,
      legendary: 8000
    };
    return durations[rarity] || 4000;
  };

  const showAchievement = useCallback((achievementId, customAchievement = null) => {
    const toast = useToast();
    let achievement;
    
    if (customAchievement) {
      achievement = customAchievement;
    } else if (achievementId && ACHIEVEMENTS[achievementId]) {
      achievement = ACHIEVEMENTS[achievementId];
    } else {
      console.warn('Achievement not found:', achievementId);
      return;
    }

    // Add to unlocked achievements if not already unlocked
    if (!customAchievement && !unlockedAchievements.includes(achievementId)) {
      setUnlockedAchievements(prev => [...prev, achievementId]);
      setTotalXP(prev => prev + achievement.xp);
    } else if (customAchievement) {
      setTotalXP(prev => prev + achievement.xp);
    }

    // Show the toast with custom styling based on rarity
    toast.custom(
      <AchievementToastContent achievement={achievement} />,
      {
        duration: getDuration(achievement.rarity),
        position: 'top-right',
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0
        }
      }
    );
  }, [unlockedAchievements]);

  const createCustomAchievement = useCallback((title, description, icon, xp, rarity = 'common') => {
    return {
      id: `custom_${Date.now()}`,
      title,
      description,
      icon,
      xp,
      rarity
    };
  }, []);

  const getProgress = useCallback(() => {
    const total = Object.keys(ACHIEVEMENTS).length;
    const unlocked = unlockedAchievements.length;
    const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;
    
    return {
      total,
      unlocked,
      percentage
    };
  }, [unlockedAchievements]);

  // Mock implementations for compatibility
  const hideAchievement = useCallback(() => {
    toast.dismiss();
  }, []);

  return {
    currentAchievement: null,
    isVisible: false,
    totalXP,
    unlockedAchievements,
    queueLength: achievementQueue.length,
    isProcessingQueue,
    showAchievement,
    hideAchievement,
    createCustomAchievement,
    getProgress
  };
};
