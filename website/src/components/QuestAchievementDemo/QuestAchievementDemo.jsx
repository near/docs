import React, { useState } from 'react';
import { AchievementToast, useAchievements, ACHIEVEMENTS } from '../AchievementToast';
import styles from './QuestAchievementDemo.module.scss';

const QuestAchievementDemo = () => {
  const { 
    currentAchievement, 
    isVisible, 
    totalXP, 
    unlockedAchievements,
    queueLength,
    isProcessingQueue,
    showAchievement, 
    hideAchievement,
    createCustomAchievement,
    getProgress
  } = useAchievements();

  const progress = getProgress();

  const achievementsByRarity = {
    common: Object.values(ACHIEVEMENTS).filter(a => a.rarity === 'common'),
    rare: Object.values(ACHIEVEMENTS).filter(a => a.rarity === 'rare'),
    epic: Object.values(ACHIEVEMENTS).filter(a => a.rarity === 'epic'),
    legendary: Object.values(ACHIEVEMENTS).filter(a => a.rarity === 'legendary'),
  };

  const handleDemoAchievement = (rarity) => {
    const achievements = achievementsByRarity[rarity];
    console.log(achievements,achievementsByRarity);
    if (achievements.length > 0) {
      const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
      showAchievement(randomAchievement.id.toUpperCase());
    }
  };

  const handleCustomAchievement = () => {
    const customTitles = [
      "Code Ninja", "Bug Crusher", "Deploy Master", "Test Hero", 
      "Documentation Warrior", "Performance Guru", "Security Champion"
    ];
    const customDescriptions = [
      "Wrote flawless code on first try!",
      "Eliminated all bugs in record time!",
      "Deployed without breaking anything!",
      "Tests pass with flying colors!",
      "Documentation is actually helpful!",
      "Made it run lightning fast!",
      "Protected against all threats!"
    ];
    const customIcons = ["🥷", "🐛", "🚀", "🦸", "📝", "⚡", "🛡️"];
    
    const randomIndex = Math.floor(Math.random() * customTitles.length);
    const custom = createCustomAchievement(
      customTitles[randomIndex],
      customDescriptions[randomIndex],
      customIcons[randomIndex],
      Math.floor(Math.random() * 200) + 50,
      ['common', 'rare', 'epic'][Math.floor(Math.random() * 3)]
    );
    
    showAchievement(null, custom);
  };

  const getRarityClass = (rarity) => {
    const rarityClasses = {
      common: styles.badgeCommon,
      rare: styles.badgeRare,
      epic: styles.badgeEpic,
      legendary: styles.badgeLegendary
    };
    return rarityClasses[rarity] || styles.badgeCommon;
  };

  return (
    <div className={styles.questAchievementDemo}>
      <div className={styles.demoHeader}>
        <h3 className={styles.demoTitle}>🏆 Achievement System Demo</h3>
        <p className={styles.demoDescription}>
          Experience NEAR Quest's Steam-inspired achievement system! Click the buttons below to trigger different achievement notifications.
        </p>
      </div>

      <div className={styles.demoStats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{totalXP}</div>
          <div className={styles.statLabel}>Total XP</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{progress.unlocked}/{progress.total}</div>
          <div className={styles.statLabel}>Achievements</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{progress.percentage}%</div>
          <div className={styles.statLabel}>Progress</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{queueLength}</div>
          <div className={styles.statLabel}>Queued</div>
        </div>
      </div>

      <div className={styles.demoControls}>
        <div className={styles.controlGroup}>
          <h4>Try Different Rarities</h4>
          <div className={styles.rarityButtons}>
            <button 
              className={styles.commonButton}
              onClick={() => handleDemoAchievement('common')}
            >
              Common Achievement
            </button>
            <button 
              className={styles.rareButton}
              onClick={() => handleDemoAchievement('rare')}
            >
              Rare Achievement
            </button>
            <button 
              className={styles.epicButton}
              onClick={() => handleDemoAchievement('epic')}
            >
              Epic Achievement
            </button>
            <button 
              className={styles.legendaryButton}
              onClick={() => handleDemoAchievement('legendary')}
            >
              Legendary Achievement
            </button>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <h4>Custom Achievement</h4>
          <button 
            className={styles.customButton}
            onClick={handleCustomAchievement}
          >
            🎲 Random Custom Achievement
          </button>
        </div>

        <div className={styles.controlGroup}>
          <h4>Queue Testing</h4>
          <div className={styles.quickActions}>
            <button 
              className={styles.smallButton}
              onClick={() => {
                // Trigger multiple achievements quickly to test queue
                showAchievement('FIRST_QUEST');
                setTimeout(() => showAchievement('ACCOUNT_CREATED'), 100);
                setTimeout(() => showAchievement('FIRST_CONTRACT'), 200);
                setTimeout(() => showAchievement('TOKEN_EXPLORER'), 300);
              }}
            >
              🚀 Test Queue (4 achievements)
            </button>
            <button 
              className={styles.smallButton}
              onClick={() => {
                // Test epic vs normal display
                showAchievement('FIRST_QUEST'); // common
                setTimeout(() => showAchievement('TOKEN_EXPLORER'), 100); // epic
              }}
            >
              ⚡ Test Epic Display
            </button>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <h4>Quick Actions</h4>
          <div className={styles.quickActions}>
            <button 
              className={styles.smallButton}
              onClick={() => showAchievement('FIRST_QUEST')}
            >
              🚀 First Quest
            </button>
            <button 
              className={styles.smallButton}
              onClick={() => showAchievement('FIRST_CONTRACT')}
            >
              📜 First Contract
            </button>
            <button 
              className={styles.smallButton}
              onClick={() => showAchievement('CROSS_CHAIN_MASTER')}
            >
              🌐 Chain Master
            </button>
          </div>
        </div>
      </div>

      {unlockedAchievements.length > 0 && (
        <div className={styles.unlockedAchievements}>
          <h4>Unlocked in this session:</h4>
          <div className={styles.achievementBadges}>
            {unlockedAchievements.map(id => {
              const achievement = ACHIEVEMENTS[id];
              if (!achievement) return null;
              return (
                <div key={id} className={`${styles.achievementBadge} ${getRarityClass(achievement.rarity)}`}>
                  <span className={styles.badgeIcon}>{achievement.icon}</span>
                  <span className={styles.badgeTitle}>{achievement.title}</span>
                  <span className={styles.badgeXp}>+{achievement.xp} XP</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className={styles.demoInfo}>
        <div className={styles.infoCard}>
          <h5>🎮 Steam-Inspired Design</h5>
          <p>Familiar achievement notifications with NEAR branding and Web3 themes.</p>
        </div>
        <div className={styles.infoCard}>
          <h5>🎯 Progressive Learning</h5>
          <p>Achievements guide you through NEAR development from basics to advanced concepts.</p>
        </div>
        <div className={styles.infoCard}>
          <h5>🌟 Rarity System</h5>
          <p>Common, Rare, Epic, and Legendary achievements with increasing XP rewards.</p>
        </div>
      </div>

      <AchievementToast
        achievement={currentAchievement}
        isVisible={isVisible}
        onClose={hideAchievement}
        queueLength={queueLength}
      />
    </div>
  );
};

export default QuestAchievementDemo;
