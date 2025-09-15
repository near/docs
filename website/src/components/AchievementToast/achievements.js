export const ACHIEVEMENTS = {
  // Common Achievements (100-150 XP)
  FIRST_QUEST: {
    id: 'FIRST_QUEST',
    title: 'First Quest',
    description: 'Completed your first NEAR Quest!',
    icon: '🚀',
    xp: 100,
    rarity: 'common'
  },
  ACCOUNT_CREATED: {
    id: 'ACCOUNT_CREATED',
    title: 'Account Creator',
    description: 'Successfully created a NEAR account!',
    icon: '👤',
    xp: 120,
    rarity: 'common'
  },
  FIRST_CONTRACT: {
    id: 'FIRST_CONTRACT',
    title: 'Smart Contract Novice',
    description: 'Deployed your first smart contract!',
    icon: '📜',
    xp: 150,
    rarity: 'common'
  },

  // Rare Achievements (200-300 XP)
  TOKEN_CREATOR: {
    id: 'TOKEN_CREATOR',
    title: 'Token Master',
    description: 'Created your first fungible token!',
    icon: '🪙',
    xp: 250,
    rarity: 'rare'
  },
  NFT_MINTER: {
    id: 'NFT_MINTER',
    title: 'NFT Artist',
    description: 'Minted your first NFT collection!',
    icon: '🎨',
    xp: 200,
    rarity: 'rare'
  },
  DAO_CREATOR: {
    id: 'DAO_CREATOR',
    title: 'DAO Founder',
    description: 'Established your first DAO!',
    icon: '🏛️',
    xp: 300,
    rarity: 'rare'
  },

  // Epic Achievements (400-500 XP)
  TOKEN_EXPLORER: {
    id: 'TOKEN_EXPLORER',
    title: 'DeFi Explorer',
    description: 'Mastered token transfers and DeFi protocols!',
    icon: '💎',
    xp: 400,
    rarity: 'epic'
  },
  CONTRACT_AUDITOR: {
    id: 'CONTRACT_AUDITOR',
    title: 'Security Expert',
    description: 'Completed advanced security audits!',
    icon: '🛡️',
    xp: 450,
    rarity: 'epic'
  },
  TESTING_GURU: {
    id: 'TESTING_GURU',
    title: 'Testing Master',
    description: 'Achieved 100% test coverage!',
    icon: '🧪',
    xp: 500,
    rarity: 'epic'
  },

  // Legendary Achievements (750-1000 XP)
  CROSS_CHAIN_MASTER: {
    id: 'CROSS_CHAIN_MASTER',
    title: 'Chain Signatures Master',
    description: 'Mastered cross-chain operations with Chain Signatures!',
    icon: '🌐',
    xp: 750,
    rarity: 'legendary'
  },
  NEAR_AMBASSADOR: {
    id: 'NEAR_AMBASSADOR',
    title: 'NEAR Ambassador',
    description: 'Completed all NEAR development quests!',
    icon: '👑',
    xp: 1000,
    rarity: 'legendary'
  },
  ECOSYSTEM_CONTRIBUTOR: {
    id: 'ECOSYSTEM_CONTRIBUTOR',
    title: 'Ecosystem Pioneer',
    description: 'Made significant contributions to the NEAR ecosystem!',
    icon: '⭐',
    xp: 850,
    rarity: 'legendary'
  }
};

export default ACHIEVEMENTS;
