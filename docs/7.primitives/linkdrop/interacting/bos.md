---
id: bos
title: NEAR Component
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to create different kinds of linkdrop from a [NEAR Component](../../../bos/components.md).

In order to create any kind of drop, you need to first generate key pairs. 

You will need to create one key per drop you want to generate, and you will always pass the `public` part of the key to create the drop, and give the `private` part of the key to the user you want to receive the drop.

---

## Getting key pairs

```js
const dropsNumber = "2";
const keysGeneratorUrl = "https://keypom.sctuts.com/keypair/";

asyncFetch(keysGeneratorUrl + dropsNumber + "/rootEntrophy").then((res) => {
  const keyPairs = JSON.parse(res.body);
  const pubKeys = [];
  const privKeys = [];

  keyPairs.forEach((e) => {
    pubKeys.push(e.pub);
    privKeys.push(e.priv);
  });

  const obj = {
    publicKeys: pubKeys,
    privKeys: privKeys,
  };

  State.update(obj);
});
```

---

## Simple Drop

This snippet will enable you to create a simple $NEAR drop. A simple drop allows you to onboard both existing and new users.

```js
const keypomContract = "v2.keypom.near";
const dropAmount = "10000000000000000000000";

Near.call([
  {
    contractName: keypomContract,
    methodName: "create_drop",
    args: {
      public_keys: state.publicKeys,
      deposit_per_use: dropAmount,
    },
    deposit: "23000000000000000000000", // state.publicKeys.length * dropAmount + 3000000000000000000000,
    gas: "100000000000000",
  },
]);
```

---

## NFT Drop

This snippet will enable you to create a NFT Drop.

First of all, you need to create a NFT. See you how to do it from NEAR Component [here](../../nft/interacting/bos.md#mint-a-nft).

Then you need to create a drop. You can do it exactly the same way as for a simple drop, but pass extended object as `args`:

<hr class="subsection" />

### Creating a drop

```js
const accountId = context.accountId ?? props.accountId;
const keypomContract = "v2.keypom.near";
const nftContract = "nft.primitives.near";
const dropAmount = "10000000000000000000000";

 Near.call([
  {
    contractName: keypomContract,
    methodName: "create_drop",
    args: {
      public_keys: state.publicKeys,
      deposit_per_use: dropAmount,
      nft: {
        // Who will be sending the NFTs to the Keypom contract
        sender_id: accountId,
        // NFT Contract Id that the tokens will come from
        contract_id: nftContract,
      },
    },
    deposit: "23000000000000000000000" // state.publicKeys.length * dropAmount + 3000000000000000000000,
    gas: "100000000000000",
  },
]);
```

<hr class="subsection" />

### Getting drop id

```js
const accountId = context.accountId ?? props.accountId;
const keypomContract = "v2.keypom.near";

const dropSupplyForOwner = Near.view(
  keypomContract,
  "get_drop_supply_for_owner",
  { account_id: accountId }
);

const dropsForOwner = Near.view(keypomContract, "get_drops_for_owner", {
  account_id: accountId,
  from_index: (dropSupplyForOwner - 1).toString(),
});

const dropId = dropsForOwner[dropsForOwner.length - 1].drop_id;
```

<hr class="subsection" />

### Transferring NFT

Then you should to transfer your NFT to KeyPom contract.

```js
const nftTokenId = "1";

Near.call([{
  contractName: nftContract, 
  methodName: 'nft_transfer_call', 
  args: {
    receiver_id: keypomContract,
    token_id: nftTokenId,
    msg: dropId.toString()
  },
  deposit: "1",
  gas: "300000000000000"
}]);
```

---

## FT Drop

This snippet will enable you to create a FT Drop.

The process is very similar to creating [NFT drop](#nft-drop). You just need to transfer FTs to KeyPom contract instead of transferring NFT and pass another set of arguments during creating drop.

<hr class="subsection" />

### Creating a drop

```js
const keypomContract = "v2.keypom.near";
const ftContract = "ft.primitives.near";
const dropAmount = "10000000000000000000000";

Near.call([
  {
    contractName: keypomContract,
    methodName: "create_drop",
    args: {
      public_keys: state.publicKeys,
      deposit_per_use: dropAmount,
      ftData: {
	    	contractId: ftContract,
	    	senderId: accountId,
	    	// This balance per use is balance of human readable FTs per use. 
	    	amount: "1"
        // Alternatively, you could use absoluteAmount, which is dependant on the decimals value of the FT
        // ex. if decimals of an ft = 8, then 1 FT token would be absoluteAmount = 100000000
	    },
    },
    deposit: "23000000000000000000000", // state.publicKeys.length * dropAmount + 3000000000000000000000,
    gas: "100000000000000"
  },
]);
```

<hr class="subsection" />

### Transferring FT

Then you should to transfer your FTs to KeyPom contract.

```js
Near.call([
  {
    contractName: ftContract,
    methodName: "ft_transfer",
    args: {
      receiver_id: keypomContract,
      amount: "1",
    },
    deposit: "1",
    gas: "300000000000000",
  },
]);
```

:::note
Keypom contract have to be registered at FT contract. How to register accounts at FT contracts you can find [here](../../ft/interacting/bos.md#register-user).
:::

---

## Function Call Drop

This snippet will enable you to create a Function Call Drop.

The process is very similar to creating [NFT drop](#nft-drop). You just need to  ass another set of arguments during creating drop.

```js
const accountId = context.accountId ?? props.accountId;
const keypomContract = "v2.keypom.near";
const nftContract = "nft.primitives.near";
const nftTokenId = "1";
const dropAmount = "10000000000000000000000";

Near.call([
  {
    contractName: keypomContract,
    methodName: "create_drop",
    args: {
      public_keys: state.publicKeys,
      deposit_per_use: dropAmount,
      fcData: {
        // 2D array of function calls. In this case, there is 1 function call to make for a key use
        // By default, if only one array of methods is present, this array of function calls will be used for all key uses
        methods: [
          // Array of functions for Key use 1. 
            [{
              receiverId: nftContract,
              methodName: "nft_mint",
              args: JSON.stringify({
              // Change this token_id if it already exists -> check explorer transaction
                  token_id: nftTokenId,
                  metadata: {
                    title: "My NFT drop",
                    description: "",
                    media: "",
                  }
              }),
              accountIdField: "receiver_id",
              // Attached deposit for when the receiver makes this function call
              attachedDeposit: "10000000000000000000000"
            }]
        ]
      }
    },
    deposit: "23000000000000000000000", // state.publicKeys.length * dropAmount + 3000000000000000000000,
    gas: "100000000000000",
  },
]);
```

---

## Building drop links

```js
const getLinks = () => {
  const links = [];

  // It assumes that private keys have been already stored in State by using State.init() and State.update() method
  state.privKeys.map((e, i) => {
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

:::note
If you didn't save your linkdrop links before closing NEAR App, you can always find them on [KeyPom app](https://keypom.xyz/drops).
:::

---

## Additional Resources

1. [Linkdrop plus](https://near.org/near/widget/ComponentDetailsPage?src=cuongdcdev.near/widget/linkdrop_plus) allows to create a Simple Drop. Powered by [KeyPom](https://keypom.xyz/)
2. [Keypom Drop Viewer](https://near.org/near/widget/ComponentDetailsPage?src=kiskesis.near/widget/Keypom-Drop-Viewer-fork) shows drops created by current logged in user.