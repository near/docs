

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const NFT_CONTRACT_ADDRESS = "nft.primitives.near";
const NFT_TOKEN_ID = "1";
const DROP_AMOUNT = "10000000000000000000000";

const wallet = new Wallet({ createAccessKeyFor: DAO_CONTRACT_ADDRESS });

await wallet.callMethod({
  method: "create_drop",
  contractId: KEYPOM_CONTRACT_ADDRESS,
  args: {
    public_keys: state.publicKeys,
    deposit_per_use: DROP_AMOUNT,
    fcData: {
      // 2D array of function calls. In this case, there is 1 function call to make for a key use
      // By default, if only one array of methods is present, this array of function calls will be used for all key uses
      methods: [
        // Array of functions for Key use 1. 
          [{
            receiverId: NFT_CONTRACT_ADDRESS,
            methodName: "nft_mint",
            args: JSON.stringify({
            // Change this token_id if it already exists -> check explorer transaction
                token_id: NFT_TOKEN_ID,
                metadata: {
                  title: "My NFT drop",
                  description: "",
                  media: "",
                }
            }),
            accountIdField: "receiver_id",
            // Attached deposit for when the receiver makes this function call
            attachedDeposit: "10000000000000000000000"
          }]
      ]
    }
  },
  deposit: "23000000000000000000000" // state.publicKeys.length * dropAmount + 3000000000000000000000,
  gas: "100000000000000",
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_ 