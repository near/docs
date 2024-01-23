import {Github} from "@site/src/components/codetabs";

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

<hr class="subsection" />

### Register user

In order to transfer FTs to another account receiver account have to be registered in the token contract and make storage deposit. User can register their account or another account can do it for them.

How to check storage balance:

```js
const balance = await wallet.viewMethod({
  method: 'storage_balance_of',
  args: {
    account_id: 'alice.near'
  },
  contractId: TOKEN_CONTRACT_ADDRESS
});
```

**Example response:**

It returns `null` if account is not registered.

```json
{
  "available": "0",
  "total": "1250000000000000000000"
}
```


How to register another account:

```js
const newAliceStorageBalance = await wallet.callMethod({
  method: 'storage_deposit',
  args: {
    receiver_id: 'alice.near',
    amount: '100000000000000000',
  },
  contractId: TOKEN_CONTRACT_ADDRESS,
  deposit: 1250000000000000000000
});
```

If you need to register your own account just pass `{}` as arguments to call.

<details>
<summary>Example response</summary>
<p>

```json
{
  "available": "0",
  "total": "1250000000000000000000"
}
```

</p>

</details>

All the examples are using a `Wallet` object, which comes from our basic template:

<Github fname="near-wallet.js"
  url="https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js"
  start="20" end="27" />