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

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_
