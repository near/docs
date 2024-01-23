import {Github} from "@site/src/components/codetabs";

```js
import { Wallet } from './near-wallet';

const TOKEN_CONTRACT_ADDRESS = "token.v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'ft_transfer_call',
  args: {
    receiver_id: "v2.ref-finance.near",
    amount: "100000000000000000",
    msg: "",
  },
  contractId: TOKEN_CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: 1
});
```

<details>
<summary>Example response</summary>
<p>

```json
'100000000000000000'
```

</p>

</details>

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />