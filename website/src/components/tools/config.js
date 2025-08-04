export const networks = {
  mainnet: {
    networkId: 'mainnet',
    viewAccountId: 'near',
    nodeUrl: 'https://rpc.mainnet.fastnear.com',
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
    linkdrop: 'v2.keypom.testnet',
    apiNearBlocks: 'https://api-testnet.nearblocks.io',
    ftContract: 'tkn.primitives.testnet',
    nftContract: 'nft.primitives.testnet',
    daoContract: 'sputnik-v2.testnet',
    multisigContract: 'multisig-v2-factory.testnet',
    fastNearApi: 'https://test.api.fastnear.com',
  },
};

export const networkId = 'testnet';
export const network = networks[networkId];