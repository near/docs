export const networks = {
  mainnet: {
    networkId: 'mainnet',
    viewAccountId: 'near',
    nodeUrl: 'https://rpc.mainnet.fastnear.com',
    walletUrl: 'https://wallet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
    fastAuth: {
      mpcRecoveryUrl: 'https://mpc-recovery-leader-mainnet-cg7nolnlpa-ue.a.run.app',
      authHelperUrl: 'https://api.kitwallet.app',
      accountIdSuffix: 'near',
      firebase: {
        apiKey: 'AIzaSyDhxTQVeoWdnbpYTocBAABbLULGf6H5khQ',
        authDomain: 'near-fastauth-prod.firebaseapp.com',
        projectId: 'near-fastauth-prod',
        storageBucket: 'near-fastauth-prod.appspot.com',
        messagingSenderId: '829449955812',
        appId: '1:829449955812:web:532436aa35572be60abff1',
        measurementId: 'G-T2PPJ8QRYY',
      },
    },
    linkdrop: 'v2.keypom.near',
    apiNearBlocks: 'https://api.nearblocks.io',
    ftContract: 'tkn.primitives.near',
    nftContract: 'nft.primitives.near',
    daoContract: 'sputnik-dao.near',
    multisigContract: 'multisig-v2-factory.near',
    fastNearApi: 'https://api.fastnear.com',
  },
  testnet: {
    networkId: 'testnet',
    viewAccountId: 'testnet',
    nodeUrl: 'https://rpc.testnet.fastnear.com',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    fastAuth: {
      mpcRecoveryUrl: 'https://mpc-recovery-7tk2cmmtcq-ue.a.run.app',
      authHelperUrl: 'https://testnet-api.kitwallet.app',
      accountIdSuffix: 'testnet',
      firebase: {
        apiKey: 'AIzaSyDAh6lSSkEbpRekkGYdDM5jazV6IQnIZFU',
        authDomain: 'pagoda-oboarding-dev.firebaseapp.com',
        projectId: 'pagoda-oboarding-dev',
        storageBucket: 'pagoda-oboarding-dev.appspot.com',
        messagingSenderId: '116526963563',
        appId: '1:116526963563:web:053cb0c425bf514007ca2e',
        measurementId: 'G-HF2NBGE60S',
      },
    },
    linkdrop: 'v2.keypom.testnet',
    apiNearBlocks: 'https://api-testnet.nearblocks.io',
    ftContract: 'tkn.primitives.testnet',
    nftContract: 'nft.primitives.testnet',
    daoContract: 'sputnik-v2.testnet',
    multisigContract: 'multisig-v2-factory.testnet',
    fastNearApi: 'https://test.api.fastnear.com',
  },

  // localnet: {
  //   // these are defined by https://github.com/kurtosis-tech/near-package
  //   networkId: 'localnet',
  //   viewAccountId: 'test.near',
  //   nodeUrl: 'http://127.0.0.1:8332',
  //   walletUrl: 'http://127.0.0.1:8334',
  //   helperUrl: 'http://127.0.0.1:8330',
  // },
};

// Chains for EVM Wallets
const evmWalletChains = {
  mainnet: {
    chainId: 397,
    name: 'Near Protocol',
    explorer: 'https://eth-explorer.near.org',
    rpc: 'https://eth-rpc.mainnet.near.org',
  },
  testnet: {
    chainId: 398,
    name: 'Near Testnet',
    explorer: 'https://eth-explorer-testnet.near.org',
    rpc: 'https://eth-rpc.testnet.near.org',
  },
};

export const networkId = 'testnet';
export const network = networks[networkId];
export const signInContractId = networkId === 'testnet' ? 'v1.social08.testnet' : 'social.near';