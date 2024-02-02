

```js
import { Wallet } from './near-wallet';

const TOKEN_CONTRACT_ADDRESS = "token.v2.ref-finance.near";
const wallet = new Wallet({ createAccessKeyFor: TOKEN_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'ft_transfer',
  args: {
    receiver_id: 'alice.near',
    amount: '100000000000000000',
  },
  contractId: TOKEN_CONTRACT_ADDRESS,
  deposit: 1
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_ 