```js
import { Wallet } from './near-wallet';

const DAO_CONTRACT_ADDRESS = "primitives.sputnik-dao.near";
const wallet = new Wallet({ createAccessKeyFor: DAO_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'add_proposal',
  args: {
    proposal: {
      description: "My first proposal",
      kind: {
        Transfer: {
          token_id: "",
          receiver_id: "bob.near",
          amount: "10000000000000000000000000",
        },
      },
    },
  },
  contractId: DAO_CONTRACT_ADDRESS,
  gas: 300000000000000,
  deposit: 100000000000000000000000
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_
