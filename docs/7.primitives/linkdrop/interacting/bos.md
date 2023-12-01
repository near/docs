---
id: bos
title: NEAR Component
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to create different kinds of linkdrop from a [NEAR Component](../../../bos/components.md).

---

## Simple Drop

This snippet will enable you to create a simple $NEAR drop. A simple drop allows you to onboard both existing and new users.

```js
State.init({
  amount: "0.05",
  drops: "2",
  img: null,
  desc: "",
  publicKeys: [],
  privKeys: [],
});

if (Storage.privateGet("key_list")) {
  const obj = Storage.privateGet("key_list");

  State.update({
    publicKeys: obj.publicKeys,
    privKeys: obj.privKeys,
  });
}

const keypomContract = "v2.keypom.near";
const gatewayUrl = "https://near.org/cuongdcdev.near/widget/linkdrop-viewer";
const generatorUrl = "https://keypom.sctuts.com/keypair/";

const Near2Yocto = (amount) =>
  new Big(amount).times(new Big(10).pow(24)).toFixed().toString();

asyncFetch(generatorUrl + state.drops + "/rootEntrophy").then((res) => {
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
  Storage.privateSet("key_list", obj);

  Near.call([
    {
      contractName: keypomContract,
      methodName: "create_drop",
      args: {
        public_keys: state.publicKeys,
        deposit_per_use: Near2Yocto(state.amount ?? "0.05"),
      },
      deposit: Near2Yocto(state.publicKeys.length * state.amount + 0.3),
      gas: "100000000000000",
    },
  ]);
});

const getLinks = () => {
  const links = [];

  state.privKeys.map((e, i) => {
    const link =
      "https://app.mynearwallet.com" + "/linkdrop/v2.keypom.near/" + e;
    links.push(link);
  });

  return links;
};

if (state.privKeys) {
  const links = getLinks();
  console.log("Your drop links:", links);
}
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

---

## NFT Drop

This snippet will enable you to create a NFT Drop.

First of all, you need to create a NFT. See you how to do it from NEAR Component [here](../../nft/interacting/bos.md#mint-a-nft).

Then you need to create a drop. You can do it exactly the same way as for a simple drop, but pass extended object as `args`:

```js
 Near.call([
  {
    contractName: keypomContract,
    methodName: "create_drop",
    args: {
      public_keys: state.publicKeys,
      deposit_per_use: Near2Yocto(state.amount ?? "0.05"),
      nft: {
        // Who will be sending the NFTs to the Keypom contract
        sender_id: accountId,
        // NFT Contract Id that the tokens will come from
        contract_id: NFT_CONTRACT,
      },
    },
    deposit: Near2Yocto(state.publicKeys.length * state.amount + 0.3),
    gas: "100000000000000",
  },
]);
```

Get your dropId.

```js
const dropSupplyForOwner = Near.view({
  contractId: keypomContract,
  methodName: "get_drop_supply_for_owner",
  args: { account_id: accountId },
});

const dropsForOwner = Near.view({
  contractId: keypomContract, 
  methodName: 'get_drops_for_owner', 
  args: { account_id: accountId, from_index: (dropSupplyForOwner - 1).toString() }
});

const dropId = dropsForOwner[dropsForOwner.length - 1].drop_id;
console.log(dropId);
```

Then you should to transfer your NFT to KeyPom contract.

```js
Near.call({
  contractId: NFT_CONTRACT, 
  methodName: 'nft_transfer_call', 
  args: {
    receiver_id: keypomContract,
    token_id: NFT_TOKEN_ID,
    msg: dropId.toString()
  },
  gas: "300000000000000",
  attachedDeposit: "1"
});
```

And build your drop links.

```js
const getLinks = () => {
  const links = [];

  state.privKeys.map((e, i) => {
    const link =
      "https://app.mynearwallet.com" + "/linkdrop/v2.keypom.near/" + e;
    links.push(link);
  });

  return links;
};
```

---

## FT Drop

This snippet will enable you to create a FT Drop.

The process is very similar to creating [NFT drop](#nft-drop). You just need to transfer FTs to KeyPom contract instead of transferring NFT and pass another set of arguments during creating drop.

```js
Near.call([
  {
    contractName: keypomContract,
    methodName: "create_drop",
    args: {
      public_keys: state.publicKeys,
      deposit_per_use: Near2Yocto(state.amount ?? "0.05"),
      ftData: {
	    	contractId: FT_CONTRACT,
	    	senderId: YOUR_ACCOUNT,
	    	// This balance per use is balance of human readable FTs per use. 
	    	amount: "1"
        // Alternatively, you could use absoluteAmount, which is dependant on the decimals value of the FT
        // ex. if decimals of an ft = 8, then 1 FT token would be absoluteAmount = 100000000
	    },
    },
    deposit: Near2Yocto(state.publicKeys.length * state.amount + 0.3),
    gas: "100000000000000",
  },
]);
```

---

## Function Call Drop

This snippet will enable you to create a Function Call Drop.

The process is very similar to creating [NFT drop](#nft-drop). You just need to  ass another set of arguments during creating drop.

```js
Near.call([
  {
    contractName: keypomContract,
    methodName: "create_drop",
    args: {
      public_keys: state.publicKeys,
      deposit_per_use: Near2Yocto(state.amount ?? "0.05"),
      fcData: {
        // 2D array of function calls. In this case, there is 1 function call to make for a key use
        // By default, if only one array of methods is present, this array of function calls will be used for all key uses
        methods: [
          // Array of functions for Key use 1. 
            [{
              receiverId: NFT_CONTRACT,
              methodName: "nft_mint",
              args: JSON.stringify({
              // Change this token_id if it already exists -> check explorer transaction
                  token_id: NFT_TOKEN_ID,
                  metadata: {
                      title: "My Keypom NFT",
                      description: "Keypom is lit fam",
                      media: "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
                  }
              }),
              accountIdField: "receiver_id",
              // Attached deposit of 1 $NEAR for when the receiver makes this function call
              attachedDeposit: parseNearAmount("1")
            }]
        ]
      }
    },
    deposit: Near2Yocto(state.publicKeys.length * state.amount + 0.3),
    gas: "100000000000000",
  },
]);
```

---

:::note
If you didn't save your linkdrop links before closing NEAR App, you can always find them on [KeyPom app](https://keypom.xyz/drops).
:::

## Additional Resources

1. [Linkdrop plus](https://near.org/near/widget/ComponentDetailsPage?src=cuongdcdev.near/widget/linkdrop_plus) allows to create a Simple Drop. Powered by [KeyPom](https://keypom.xyz/)
2. [Keypom Drop Viewer](https://near.org/near/widget/ComponentDetailsPage?src=kiskesis.near/widget/Keypom-Drop-Viewer-fork) shows drops created by current logged in user.