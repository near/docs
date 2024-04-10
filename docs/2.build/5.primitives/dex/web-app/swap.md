```js
import { Wallet } from './near-wallet';

const AMM_CONTRACT_ADDRESS = "v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: AMM_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'swap',
  args: {
   actions: [
      {
        pool_id: 79,
        token_in: "token.v2.ref-finance.near",
        token_out: "wrap.near",
        amount_in: "100000000000000000",
        min_amount_out: "1",
      },
    ],
  },
  contractId: AMM_CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: 1
});
```
_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_

<details>
<summary>Example response</summary>

```json
"5019606679394603179450"
```
</details>