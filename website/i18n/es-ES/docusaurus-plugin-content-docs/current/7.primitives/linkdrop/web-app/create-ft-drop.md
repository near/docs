```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const FT_CONTRACT_ADDRESS = "ft.primitives.near";
const DROP_AMOUNT = "10000000000000000000000";

const wallet = new Wallet({ createAccessKeyFor: KEYPOM_CONTRACT_ADDRESS }); 

await wallet.callMethod({
  method: "create_drop",
  contractId: KEYPOM_CONTRACT_ADDRESS,
  args: {
    public_keys: state.publicKeys,
    deposit_per_use: DROP_AMOUNT,
    ftData: {
      contractId: FT_CONTRACT_ADDRESS,
      senderId: accountId, // TODO How to get account id
      // This balance per use is balance of human readable FTs per use. 
      amount: "1"
      // Alternatively, you could use absoluteAmount, which is dependant on the decimals value of the FT
      // ex. if decimals of an ft = 8, then 1 FT token would be absoluteAmount = 100000000
    },
  },
  deposit: "23000000000000000000000" // state.publicKeys.length * dropAmount + 3000000000000000000000,
  gas: "100000000000000",
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_
