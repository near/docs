

```js
import { Wallet } from './near-wallet';

const DAO_CONTRACT_ADDRESS = "primitives.sputnik-dao.near";
const wallet = new Wallet({ createAccessKeyFor: DAO_CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'act_proposal',
  args: { id: 0, action: "VoteApprove" },
  contractId: DAO_CONTRACT_ADDRESS,
  gas: 300000000000000,
});
```

:::note
Available vote options: `VoteApprove`, `VoteReject`, `VoteRemove`.
:::

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/near-wallet.js)_ 