:::info
Remember about fungible token precision. You may need this value to show a response of balance requests in an understandable-to-user way in your app. How to get precision value (decimals) you may find [here](#querying-metadata).
:::

```js
import { Wallet } from './near-wallet';

const TOKEN_CONTRACT_ADDRESS = 'token.v2.ref-finance.near';
const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });

await wallet.viewMethod({
  method: 'ft_balance_of',
  args: {
    account_id: 'bob.near',
  },
  contractId: TOKEN_CONTRACT_ADDRESS,
});
```

<details>
<summary>Example response</summary>
<p>

```json
"3479615037675962643842"
```

</p>

</details>

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_
