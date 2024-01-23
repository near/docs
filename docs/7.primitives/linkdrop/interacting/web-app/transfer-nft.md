import {Github} from "@site/src/components/codetabs";

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const NFT_CONTRACT_ADDRESS = "nft.primitives.near";
const NFT_TOKEN_ID = "1";
const DROP_AMOUNT = "10000000000000000000000";

const nftConnectedWallet = new Wallet({ createAccessKeyFor: NFT_CONTRACT_ADDRESS }); 

await wallet.callMethod({
  method: "nft_transfer_call",
  contractId: NFT_CONTRACT_ADDRESS,
  args: {
    receiver_id: keypomContract,
    token_id: nftTokenId,
    msg: dropId.toString()
  },
  deposit: 1,
  gas: "100000000000000",
});
```

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />