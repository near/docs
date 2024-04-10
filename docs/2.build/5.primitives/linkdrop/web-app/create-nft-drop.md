

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const NFT_CONTRACT_ADDRESS = "nft.primitives.near";
const DROP_AMOUNT = "10000000000000000000000";

const keypomConnectedWallet = new Wallet({ createAccessKeyFor: KEYPOM_CONTRACT_ADDRESS }); 
const nftConnectedWallet = new Wallet({ createAccessKeyFor: NFT_CONTRACT_ADDRESS });

await wallet.callMethod({
  method: "create_drop",
  contractId: KEYPOM_CONTRACT_ADDRESS,
  args: {
    public_keys: state.publicKeys,
    deposit_per_use: DROP_AMOUNT,
    nft: {
      // Who will be sending the NFTs to the Keypom contract
      sender_id: accountId, // TODO How to get it
      // NFT Contract Id that the tokens will come from
      contract_id: NFT_CONTRACT_ADDRESS,
    },
  },
  deposit: "23000000000000000000000" // state.publicKeys.length * dropAmount + 3000000000000000000000,
  gas: "100000000000000",
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_ 