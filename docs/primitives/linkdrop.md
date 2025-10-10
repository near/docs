---
id: linkdrop
title: Linkdrops
hide_table_of_contents: false
description: "Learn about linkdrops following NEP-452 standard - distribute assets and onboard users to Web3 apps through simple web links using access keys and the Keypom platform."
---
import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Github } from "@site/src/components/UI/Codetabs"
import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

Linkdrops allow users to distribute assets and onboard people to Web3 apps through a simple web link.

![Linkdrop](/assets/docs/primitives/linkdrop.png)

They work by storing assets and linking [AccessKeys](../protocol/access-keys.md) to them. The `AccessKeys` are then distributed to users in the form of web links. These links take users to a website that automatically uses the keys to call the `claim` method in the `linkdrop` contract.

In order for a contract to be considered a Linkdrop-contract it has to follow the [**NEP-452 standard**](https://github.com/near/NEPs/blob/master/neps/nep-0452.md). The **NEP-452** explains the **minimum interface** required to be implemented, as well as the expected functionality.

:::tip

The simplest way to create a linkdrop is by interacting with our [LinkDrop Generator](/toolbox)

:::

---

## About the Linkdrop Standard

[NEP-0452](https://github.com/near/NEPs/blob/master/neps/nep-0452.md) standardizes a secure and flexible method for creating linkdrops on NEAR. A linkdrop is a mechanism where a sender can fund a special, one-time-use account (or `key`) and generate a unique link. Anyone who possesses this link can then claim the assets (like NEAR tokens or NFTs) locked within it, often without needing an existing NEAR account.

The specification keeps the linkdrop logic in a smart contract and introduces a secure key type:

- Separation of Concerns: The standard clearly separates the roles of the **Sender** (who funds the linkdrop), the **Claimer** (who redeems it), and the **Contract** (which holds the logic and assets).

- Function Call Keys: Instead of a full-access key, a linkdrop is secured by a [Function Call Access Key](../protocol/access-keys.md#function-call-keys). This key is only permitted to call a single, specific method on the smart contract (e.g., `claim`). Even if the private key is exposed, an attacker cannot do anything else with it.

- Smart Contract Driven: The entire claiming process is managed by a smart contract. This allows for immense flexibility, enabling linkdrops to contain not just NEAR tokens, but also [NFTs](nft.md), [FTs (Fungible Tokens)](ft.md), or any other on-chain asset.

The NEP-0452 standard defines linkdrop implementation by leveraging smart contracts and Function Call Keys, opening up a wide range of possibilities for developers while prioritizing security and a seamless user experience.

---

## AccessKeys

In order to create any kind of drop, you need to first generate key pairs. You will need to create **one key per drop**.

- The `linkdrop` contract will store the **`public`** part of the key.
- You will give the `private` part of the key to the user you want to receive the drop.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

    ```js
    import { KeyPair } from 'near-api-js';

    const newKeyPair = KeyPair.fromRandom('ed25519');
    newKeyPair.public_key = newKeyPair.publicKey.toString();
    ```

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

  ```bash
  near generate-key

  # Key pair with ed25519:33Vn9VtNEtWQPPd1f4jf5HzJ5weLcvGHU8oz7o5UnPqy public key for an account "1e5b1346bdb4fc5ccd465f6757a9082a84bcacfd396e7d80b0c726252fe8b3e8"
  ```

</TabItem>

  <TabItem value="Lantstool" label={<LantstoolLabel/>}>

    <p>Generate a new key on [Lantstool](https://app.lantstool.dev/)</p>
    ![lantstool](/assets/docs/tools/lantstool-near_protocol-utils-key_generator.png)
  
  </TabItem>
</Tabs>

---

## $NEAR Drops

To create a $NEAR drop you will ask the contract to create a drop (`create_drop`), passing the public part of the keys you generated, and how much you want to drop on each key use (`deposit_per_use`).

The contract will create a drop and **return the numerical ID** that identifies it.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const DROP_AMOUNT = "10000000000000000000000"; // 0.1 NEAR

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

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near call v2.keypom.near create_drop '{"public_keys": <PUBLIC_KEYS>, "deposit_per_use": "10000000000000000000000"}' --depositYocto 23000000000000000000000 --gas 100000000000000 --accountId bob.near
```

  </TabItem>

  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/linkdrop/create-near-drop.json" />
  </TabItem>
</Tabs>

:::info
To claim the drop, you will need to send the user a [link with the private key](#building-drop-links)
:::

:::tip

The simplest way to create a linkdrop is by interacting with our [LinkDrop Generator](/toolbox)

:::

---

## NFT Drops

To drop an existing NFT, you will (1) create a drop, and then (2) **transfer the NFT** to keypom.

#### 1. Creating the Drop

To create an NFT drop, you will call the `create_drop` method, now passing a `nft` argument, which will tell the linkdrop contract to wait for an NFT to be transferred.

The contract will then create a drop and **return the numerical ID** that identifies it.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const NFT_CONTRACT_ADDRESS = "nft.primitives.near";
const DROP_AMOUNT = "10000000000000000000000";

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

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near call v2.keypom.near create_drop '{"public_keys": <PUBLIC_KEYS>, "deposit_per_use": "10000000000000000000000", "nft": {"sender_id": "bob.near", "contract_id": "nft.primitives.near"}}' --depositYocto 23000000000000000000000 --gas 100000000000000 --accountId bob.near
```

  </TabItem>

    <TabItem value="Lantstool" label={<LantstoolLabel />}>
        <TryOutOnLantstool path="docs/2.build/5.primitives/linkdrop/create-nft-drop.json" />
    </TabItem>
</Tabs>

#### 2. Transferring the NFT

Having the Drop ID, you now need to transfer the NFT to the linkdrop contract, specifying to which drop you want to add it.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const NFT_CONTRACT_ADDRESS = "nft.primitives.near";
const NFT_TOKEN_ID = "1";
const DROP_AMOUNT = "10000000000000000000000";

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

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near call nft.primitives.near nft_transfer_call '{"receiver_id": "v2.keypom.near", "token_id": <YOUR TOKEN ID>, "msg": <YOUR DROP ID>}' --depositYocto 1 --gas 100000000000000 --accountId bob.near
```

  </TabItem>

  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/linkdrop/transfer-nft-to-v2keypomnear.json" />
  </TabItem>
</Tabs>

:::tip
The `linkdrop` contract will validate that you are transferring the NFT to a drop that belongs to you
:::

:::tip

The simplest way to create a linkdrop is by interacting with our [LinkDrop Generator](/toolbox)

:::

---

## FT Drops

The process to drop a Fungible Token is very similar to that of creating an [NFT drop](#nft-drops). You will first create the drop, and then fund it with FTs.

#### 1.Creating a drop

To create a FT drop you will call the `create_drop` method, now passing a `ftData` argument, which will tell the linkdrop contract to wait for a certain amount of FT to be transferred.

The contract will then create a drop and **return the numerical ID** that identifies it.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const FT_CONTRACT_ADDRESS = "ft.primitives.near";
const DROP_AMOUNT = "10000000000000000000000";

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

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near call v2.keypom.near create_drop '{"public_keys": <PUBLIC_KEYS>, "deposit_per_use": "10000000000000000000000", "ftData": {"contractId": "ft.primitives.near","senderId": "bob.near", "amount": "1"}}}' --depositYocto 23000000000000000000000 --gas 100000000000000 --accountId bob.near
```

  </TabItem>

  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/linkdrop/create-ft-drop.json" />
  </TabItem>
</Tabs>

#### 2. Transferring FT

Having the Drop ID, you now need to transfer the fungible tokens to the linkdrop contract.

:::note
To transfer FTs to an account, you need to first [register](./ft#registering-a-user) the receiver account (e.g. the keypom contract) on the FT contract.
:::

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

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

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near call ft.primitives.near ft_transfer '{"receiver_id": "v2.keypom.near", "amount": "1"}' --depositYocto 1 --gas 100000000000000 --accountId bob.near
```

  </TabItem>

  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/linkdrop/transfer-ft-to-v2keypomnear.json" />
  </TabItem>
</Tabs>

:::tip

The simplest way to create a linkdrop is by interacting with our [LinkDrop Generator](/toolbox)

:::

---

## Function Call Drop
Linkdrop contracts allow to create `function call` drops. These drops will execute one or more methods on a contract when the user claims the drop.

:::tip
Function call drops can be thought as the abstract version of other drops: you can create a drop that will mint an NFT, register a user in a DAO, or pay for a service.
:::

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">

```js
import { Wallet } from './near-wallet';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.near";
const NFT_CONTRACT_ADDRESS = "nft.primitives.near";
const NFT_TOKEN_ID = "1";
const DROP_AMOUNT = "10000000000000000000000";

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
            // Attached deposit for when the receiver makes this function call
            attachedDeposit: "10000000000000000000000"
          }]
      ]
    }
  },
  deposit: "23000000000000000000000" // state.publicKeys.length * dropAmount + 3000000000000000000000,
  gas: "100000000000000",
});
```

_The `Wallet` object comes from our [quickstart template](https://github.com/near-examples/hello-near-examples/blob/main/frontend/src/wallets/near.js)_

  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near call v2.keypom.near create_drop '{"public_keys": <PUBLIC_KEYS>, "deposit_per_use": "10000000000000000000000", "fcData": {"methods": [[{"receiverId": "nft.primitives.near","methodName": "nft_mint","args": {"token_id": "1", "metadata": {"title": "My NFT drop","description": "","media": ""}, "accountIdField": "receiver_id", "attachedDeposit": "10000000000000000000000"}]]}}' --depositYocto 23000000000000000000000 --gas 100000000000000 --accountId bob.near
```

  </TabItem>

  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/linkdrop/create-function-call-drop.json" />
  </TabItem>
</Tabs>

---

## Building drop links

To create a linkdrop link, simply append the private key to the `claim` page:


```
http://localhost:3001/claim/linkdrop?id=ed25519:5Ly2arHZ4niWBVyEuzpN3J8QQX1BrYfWsirGqdYR3JfqUDhJ3SRK7JeQfVsh4UL8Wn6uf8RzWE4RPHymkePywVVd
```
