import React, { useState, useCallback } from 'react';

// Achievement definitions with different rarities and XP values
export const ACHIEVEMENTS = {
  FIRST_QUEST: {
    id: 'first_quest',
    title: 'Getting Started',
    description: 'Completed your first NEAR Quest!',
    icon: '🚀',
    xp: 50,
    rarity: 'common'
  },
  ACCOUNT_CREATED: {
    id: 'account_created',
    title: 'Welcome to NEAR',
    description: 'Successfully created your NEAR account',
    icon: '👤',
    xp: 75,
    rarity: 'common'
  },
  FIRST_CONTRACT: {
    id: 'first_contract',
    title: 'Smart Contract Pioneer',
    description: 'Deployed your first smart contract',
    icon: '📜',
    xp: 150,
    rarity: 'rare'
  },
  FRONTEND_MASTER: {
    id: 'frontend_master',
    title: 'Frontend Wizard',
    description: 'Connected contract to web interface',
    icon: '🎨',
    xp: 200,
    rarity: 'rare'
  },
  TOKEN_EXPLORER: {
    id: 'token_explorer',
    title: 'Token Explorer',
    description: 'Mastered FT and NFT development',
    icon: '🪙',
    xp: 250,
    rarity: 'epic'
  },
  DEFI_DEVELOPER: {
    id: 'defi_developer',
    title: 'DeFi Architect',
    description: 'Built a complete DeFi protocol',
    icon: '🏦',
    xp: 500,
    rarity: 'legendary'
  },
  DAO_CREATOR: {
    id: 'dao_creator',
    title: 'Governance Guru',
    description: 'Created a decentralized organization',
    icon: '🏛️',
    xp: 400,
    rarity: 'epic'
  },
  GAME_DEVELOPER: {
    id: 'game_developer',
    title: 'Blockchain Gamer',
    description: 'Developed a Web3 gaming application',
    icon: '🎮',
    xp: 350,
    rarity: 'epic'
  },
  SECURITY_EXPERT: {
    id: 'security_expert',
    title: 'Security Guardian',
    description: 'Implemented advanced security patterns',
    icon: '🛡️',
    xp: 300,
    rarity: 'rare'
  },
  PERFORMANCE_OPTIMIZER: {
    id: 'performance_optimizer',
    title: 'Speed Demon',
    description: 'Optimized contract for maximum performance',
    icon: '⚡',
    xp: 275,
    rarity: 'rare'
  },
  CROSS_CHAIN_MASTER: {
    id: 'cross_chain_master',
    title: 'Chain Signatures Master',
    description: 'Mastered multi-chain development',
    icon: '🌐',
    xp: 600,
    rarity: 'legendary'
  },
  QUEST_COMPLETIONIST: {
    id: 'quest_completionist',
    title: 'Quest Completionist',
    description: 'Completed all available quests',
    icon: '🏆',
    xp: 1000,
    rarity: 'legendary'
  }
};

export const useAchievements = () => {
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState(new Set());
  const [achievementQueue, setAchievementQueue] = useState([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);

  // Process the queue of achievements
  const processQueue = useCallback(() => {
    if (isProcessingQueue || achievementQueue.length === 0 || isVisible) {
      return;
    }

    setIsProcessingQueue(true);
    const nextAchievement = achievementQueue[0];
    setAchievementQueue(prev => prev.slice(1));

    // Display the achievement
    setCurrentAchievement(nextAchievement);
    setIsVisible(true);

    // Play sound and haptic feedback
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different sounds for different rarities
      let baseFreq = 800;
      switch (nextAchievement.rarity) {
        case 'rare':
          baseFreq = 900;
          break;
        case 'epic':
          baseFreq = 1000;
          break;
        case 'legendary':
          baseFreq = 1200;
          break;
      }
      
      oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(baseFreq + 200, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(baseFreq + 400, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Audio not available for achievement sound');
    }

    // Trigger haptic feedback
    if ('vibrate' in navigator) {
      const vibrationPattern = nextAchievement.rarity === 'legendary' ? [100, 50, 100, 50, 100] : [100, 50, 100];
      navigator.vibrate(vibrationPattern);
    }

    // Set timeout to hide achievement and process next in queue
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentAchievement(null);
        setIsProcessingQueue(false);
        // Process next achievement in queue after a short delay
        setTimeout(processQueue, 100);
      }, 500);
    }, 6000);
  }, [isProcessingQueue, achievementQueue, isVisible]);

  // Effect to start processing queue when new items are added
  React.useEffect(() => {
    if (achievementQueue.length > 0 && !isProcessingQueue && !isVisible) {
      processQueue();
    }
  }, [achievementQueue, isProcessingQueue, isVisible, processQueue]);

  const showAchievement = useCallback((achievementId, customAchievement = null) => {
    let achievement;
    
    if (customAchievement) {
      achievement = customAchievement;
    } else if (ACHIEVEMENTS[achievementId]) {
      achievement = ACHIEVEMENTS[achievementId];
    } else {
      console.warn(`Achievement with id "${achievementId}" not found`);
      return;
    }

    // Check if achievement was already unlocked
    if (achievement.id && unlockedAchievements.has(achievement.id)) {
      console.log(`Achievement "${achievement.title}" already unlocked`);
      return;
    }

    // Mark achievement as unlocked
    if (achievement.id) {
      setUnlockedAchievements(prev => new Set([...prev, achievement.id]));
    }

    // Add XP to total
    setTotalXP(prev => prev + (achievement.xp || 0));

    // Add achievement to queue
    setAchievementQueue(prev => [...prev, achievement]);
  }, [unlockedAchievements]);

  const hideAchievement = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentAchievement(null);
      setIsProcessingQueue(false);
      // Process next achievement in queue after a short delay
      setTimeout(processQueue, 100);
    }, 500);
  }, [processQueue]);

  const createCustomAchievement = useCallback((title, description, icon = '🎉', xp = 100, rarity = 'common') => {
    return {
      title,
      description,
      icon,
      xp,
      rarity
    };
  }, []);

  const getAchievementsByRarity = useCallback((rarity) => {
    return Object.values(ACHIEVEMENTS).filter(achievement => achievement.rarity === rarity);
  }, []);

  const getProgress = useCallback(() => {
    const totalAchievements = Object.keys(ACHIEVEMENTS).length;
    const unlockedCount = unlockedAchievements.size;
    return {
      unlocked: unlockedCount,
      total: totalAchievements,
      percentage: Math.round((unlockedCount / totalAchievements) * 100)
    };
  }, [unlockedAchievements]);

  return {
    currentAchievement,
    isVisible,
    totalXP,
    unlockedAchievements: Array.from(unlockedAchievements),
    achievementQueue,
    queueLength: achievementQueue.length,
    isProcessingQueue,
    showAchievement,
    hideAchievement,
    createCustomAchievement,
    getAchievementsByRarity,
    getProgress,
    ACHIEVEMENTS
  };
};
