---
id: web-app
title: Web Application
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to create different kinds of linkdrop directly from a web app.

In order to create any kind of drop, you need to first generate key pairs. 

You will need to create one key per drop you want to generate, and you will always pass the `public` part of the key to create the drop, and give the `private` part of the key to the user you want to receive the drop.

:::info
All the examples are using a `Wallet` object, which comes from our [basic template](https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js)
:::

---

## Getting key pairs

```js
import { Wallet } from './near-wallet';

const state = {};

const dropsNumber = "2";
const keysGeneratorUrl = "https://keypom.sctuts.com/keypair/";

fetch(keysGeneratorUrl + dropsNumber + "/rootEntrophy").then((res) => {
  const keyPairs = JSON.parse(res.body);
  const pubKeys = [];
  const privKeys = [];

  keyPairs.forEach((e) => {
    pubKeys.push(e.pub);
    privKeys.push(e.priv);
  });

  state.publicKeys = pubKeys;
  state.privKeys = privKeys;
});
```

---

## Simple Drop

This snippet will enable you to create a simple $NEAR drop. A simple drop allows you to onboard both existing and new users.

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const DROP_AMOUNT = "10000000000000000000000"; // 1 NEAR

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

---

## NFT Drop

This snippet will enable you to create a NFT Drop.

First of all, you need to create a NFT. See you how to do it from a web app [here](../../nft/interacting/web-app.md#mint-a-nft).

Then you need to create a drop. You can do it exactly the same way as for a simple drop, but pass extended object as `args`:

<hr class="subsection" />

### Creating a drop

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const NFT_CONTRACT_ADDRESS = "nft.primitives.near";
const DROP_AMOUNT = "10000000000000000000000"; // 1 NEAR

const keypomConnectedWallet = new Wallet({ createAccessKeyFor: KEYPOM_CONTRACT_ADDRESS }); 
const nftConnectedWallet = new Wallet({ createAccessKeyFor: NFT_CONTRACT_ADDRESS });

await wallet.callMethod({
  method: "create_drop",
  contractId: KEYPOM_CONTRACT_ADDRESS,
  args: {
    public_keys: state.publicKeys,
    deposit_per_use: DROP_AMOUNT,
    nft: {
      // Who will be sending the NFTs to the Keypom contract
      sender_id: accountId, // TODO How to get it
      // NFT Contract Id that the tokens will come from
      contract_id: NFT_CONTRACT_ADDRESS,
    },
  },
  deposit: "23000000000000000000000" // state.publicKeys.length * dropAmount + 3000000000000000000000,
  gas: "100000000000000",
});
```

<hr class="subsection" />

### Getting drop id

```js
const dropSupplyForOwner = await wallet.viewMethod({
  contractId: KEYPOM_CONTRACT_ADDRESS
  method: 'get_drop_supply_for_owner',
  args: { account_id: accountId },
});

const dropsForOwner = await wallet.viewMethod({
  contractId: KEYPOM_CONTRACT_ADDRESS
  method: 'get_drops_for_owner',
  args: { account_id: accountId, from_index: (dropSupplyForOwner - 1).toString() }
});

const dropId = dropsForOwner[dropsForOwner.length - 1].drop_id;
```

<hr class="subsection" />

### Transfering NFT

Then you should to transfer your NFT to KeyPom contract.

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const NFT_CONTRACT_ADDRESS = "nft.primitives.near";
const NFT_TOKEN_ID = "1";
const DROP_AMOUNT = "10000000000000000000000"; // 1 NEAR

const nftConnectedWallet = new Wallet({ createAccessKeyFor: NFT_CONTRACT_ADDRESS }); 

await wallet.callMethod({
  method: "nft_transfer_call",
  contractId: NFT_CONTRACT_ADDRESS,
  args: {
    receiver_id: keypomContract,
    token_id: nftTokenId,
    msg: dropId.toString()
  },
  deposit: 1,
  gas: "100000000000000",
});
```

---

## FT Drop

This snippet will enable you to create a FT Drop.

The process is very similar to creating [NFT drop](#nft-drop). You just need to transfer FTs to KeyPom contract instead of transferring NFT and pass another set of arguments during creating drop.

<hr class="subsection" />

### Creating a drop

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const FT_CONTRACT_ADDRESS = "ft.primitives.near";
const DROP_AMOUNT = "10000000000000000000000"; // 1 NEAR

const wallet = new Wallet({ createAccessKeyFor: KEYPOM_CONTRACT_ADDRESS }); 

await wallet.callMethod({
  method: "create_drop",
  contractId: KEYPOM_CONTRACT_ADDRESS,
  args: {
    public_keys: state.publicKeys,
    deposit_per_use: DROP_AMOUNT,
    ftData: {
      contractId: FT_CONTRACT_ADDRESS,
      senderId: accountId, // TODO How to get account id
      // This balance per use is balance of human readable FTs per use. 
      amount: "1"
      // Alternatively, you could use absoluteAmount, which is dependant on the decimals value of the FT
      // ex. if decimals of an ft = 8, then 1 FT token would be absoluteAmount = 100000000
    },
  },
  deposit: "23000000000000000000000" // state.publicKeys.length * dropAmount + 3000000000000000000000,
  gas: "100000000000000",
});
```

<hr class="subsection" />

### Transfering FT

Then you should to transfer your FTs to KeyPom contract.

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

:::note
Keypom contract have to be registered at FT contract. How to register accounts at FT contracts you can find [here](../../ft/interacting/web-app.md#register-user).
:::

---

## Function Call Drop

This snippet will enable you to create a Function Call Drop.

The process is very similar to creating [NFT drop](#nft-drop). You just need to  ass another set of arguments during creating drop.

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const NFT_CONTRACT_ADDRESS = "nft.primitives.near";
const NFT_TOKEN_ID = "1";
const DROP_AMOUNT = "10000000000000000000000"; // 1 NEAR

const wallet = new Wallet({ createAccessKeyFor: DAO_CONTRACT_ADDRESS });

await wallet.callMethod({
  method: "create_drop",
  contractId: KEYPOM_CONTRACT_ADDRESS,
  args: {
    public_keys: state.publicKeys,
    deposit_per_use: DROP_AMOUNT,
    fcData: {
      // 2D array of function calls. In this case, there is 1 function call to make for a key use
      // By default, if only one array of methods is present, this array of function calls will be used for all key uses
      methods: [
        // Array of functions for Key use 1. 
          [{
            receiverId: NFT_CONTRACT_ADDRESS,
            methodName: "nft_mint",
            args: JSON.stringify({
            // Change this token_id if it already exists -> check explorer transaction
                token_id: NFT_TOKEN_ID,
                metadata: {
                  title: "My NFT drop",
                  description: "",
                  media: "",
                }
            }),
            accountIdField: "receiver_id",
            // Attached deposit of 1 $NEAR for when the receiver makes this function call
            attachedDeposit: "10000000000000000000000"
          }]
      ]
    }
  },
  deposit: "23000000000000000000000" // state.publicKeys.length * dropAmount + 3000000000000000000000,
  gas: "100000000000000",
});
```

---

## Building drop links

```js
const getLinks = () => {
  const links = [];

  // It assumes that there is a array named privKeys which already contains private keys
  privKeys.map((e, i) => {
    const link =
      "https://app.mynearwallet.com" + "/linkdrop/v2.keypom.near/" + e;
    links.push(link);
  });

  return links;
};
```

<details>
<summary>Example response</summary>
<p>

```js
[
  'https://app.mynearwallet.com/linkdrop/v2.keypom.near/ed25519:2H32THYM8ob336yk81cZUxpidvKi34zLck6a97ypmCY8bbSAuEfrCTu9LWmWGiG9df2C6vkg2FGKGZzY9qE4aEcj',
  'https://app.mynearwallet.com/linkdrop/v2.keypom.near/ed25519:3eoMcqKmmY9Q6qgBy3hZy65HisZ8NXQd9aGGYUGe6RRsmNpGJS5YN64MgZaBVVYJJhbFXhQ2ca3DRRBiKh1rYM48'
]
```

</p>
</details>
