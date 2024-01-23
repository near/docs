import {Github} from "@site/src/components/codetabs";

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const FT_CONTRACT_ADDRESS = "ft.primitives.near";

const wallet = new Wallet({ createAccessKeyFor: FT_CONTRACT_ADDRESS }); 

await wallet.callMethod({
  method: "ft_transfer",
  contractId: FT_CONTRACT_ADDRESS,
  args: {
    receiver_id: KEYPOM_CONTRACT_ADDRESS,
    amount: "1"
  },
  deposit: "1",
  gas: "100000000000000"
});
```

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />