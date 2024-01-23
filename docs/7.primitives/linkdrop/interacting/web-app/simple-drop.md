import {Github} from "@site/src/components/codetabs";

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const DROP_AMOUNT = "10000000000000000000000"; // 0.1 NEAR

const wallet = new Wallet({ createAccessKeyFor: KEYPOM_CONTRACT_ADDRESS }); 

await wallet.callMethod({
  method: "create_drop",
  contractId: KEYPOM_CONTRACT_ADDRESS,
  args: {
    public_keys: state.publicKeys,
    deposit_per_use: DROP_AMOUNT,
  },
  deposit: "23000000000000000000000" // state.publicKeys.length * dropAmount + 3000000000000000000000,
  gas: "100000000000000",
});
```

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />