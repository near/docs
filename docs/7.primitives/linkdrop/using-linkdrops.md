---
id: using-linkdrops
title: Using Linkdrops
hide_table_of_contents: false
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import ContactUs from '@site/src/components/ContactUs.mdx';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BOSGetKeyPairs from "./interacting/bos/get-key-pairs.md"
import BOSSimpleDrop from "./interacting/bos/simple-drop.md"
import BOSCreateNFTDrop from "./interacting/bos/create-nft-drop.md"
import BOSGetDropId from "./interacting/bos/get-drop-id.md"
import BOSTransferNFT from "./interacting/bos/transfer-nft.md"
import BOSCreateFTDrop from "./interacting/bos/create-ft-drop.md"
import BOSTransferFT from "./interacting/bos/transfer-ft.md"
import BOSCreateFunctionCallDrop from "./interacting/bos/create-function-call-drop.md"

import WebAppGetKeyPairs from "./interacting/web-app/get-key-pairs.md"
import WebAppSimpleDrop from "./interacting/web-app/simple-drop.md"
import WebAppCreateNFTDrop from "./interacting/web-app/create-nft-drop.md"
import WebAppGetDropId from "./interacting/web-app/get-drop-id.md"
import WebAppTransferNFT from "./interacting/web-app/transfer-nft.md"
import WebAppCreateFTDrop from "./interacting/web-app/create-ft-drop.md"
import WebAppTransferFT from "./interacting/web-app/transfer-ft.md"
import WebAppCreateFunctionCallDrop from "./interacting/web-app/create-function-call-drop.md"

import CLIGetKeyPairs from "./interacting/near-cli/get-key-pairs.md"
import CLISimpleDrop from "./interacting/near-cli/simple-drop.md"
import CLICreateNFTDrop from "./interacting/near-cli/create-nft-drop.md"
import CLIGetDropId from "./interacting/near-cli/get-drop-id.md"
import CLITransferNFT from "./interacting/near-cli/transfer-nft.md"
import CLICreateFTDrop from "./interacting/near-cli/create-ft-drop.md"
import CLITransferFT from "./interacting/near-cli/transfer-ft.md"
import CLICreateFunctionCallDrop from "./interacting/near-cli/create-function-call-drop.md"

Linkdrops are an easy way to distribute blockchain items (NFTs, FTs) via links. You provide a link for user and they can claim your drop.

This section provides some examples how to create different linkdrops from [a NEAR component](./interacting/bos.md), [web app](./interacting/web-app.md) and [near-cli](./interacting/near-cli.md).

:::note
In this section we will use as reference the [Keypom implementation](https://keypom.xyz/).
:::

In order to create any kind of drop, you need to first generate key pairs. 

You will need to create one key per drop you want to generate, and you will always pass the `public` part of the key to create the drop, and give the `private` part of the key to the user you want to receive the drop.

---

## Getting key pairs

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSGetKeyPairs />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppGetKeyPairs />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIGetKeyPairs />
  </TabItem>
</Tabs>

---

## Simple Drop

These snippets will enable you to create a simple $NEAR drop. A simple drop allows you to onboard both existing and new users.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSSimpleDrop />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppSimpleDrop />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLISimpleDrop />
  </TabItem>
</Tabs>

---

## NFT Drop

These snippets will enable you to create a NFT Drop.

First of all, you need to create a NFT. See you how to do it from [here](../../nft/using-nfts#mint-a-nft).

Then you need to create a drop. You can do it exactly the same way as for a simple drop, but pass extended object as `args`:

<hr class="subsection" />

### Creating a drop

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSCreateNFTDrop />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppCreateNFTDrop />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLICreateNFTDrop />
  </TabItem>
</Tabs>

<hr class="subsection" />

### Getting drop id

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSGetDropId />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppGetDropId />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIGetDropId />
  </TabItem>
</Tabs>

<hr class="subsection" />

### Transferring NFT

Then you should to transfer your NFT to KeyPom contract.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSTransferNFT />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppTransferNFT />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLITransferNFT />
  </TabItem>
</Tabs>

---

## FT Drop

These snippets will enable you to create a FT Drop.

The process is very similar to creating [NFT drop](#nft-drop). You just need to transfer FTs to KeyPom contract instead of transferring NFT and pass another set of arguments during creating drop.

<hr class="subsection" />

### Creating a drop

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSCreateFTDrop />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppCreateFTDrop />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLICreateFTDrop />
  </TabItem>
</Tabs>

<hr class="subsection" />

### Transferring FT

Then you should to transfer your FTs to KeyPom contract.

:::note
Keypom contract have to be registered at FT contract. How to register accounts at FT contracts you can find [here](../../ft/interacting/bos.md#register-user).
:::

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSTransferFT />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppTransferFT />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLITransferFT />
  </TabItem>
</Tabs>

---

## Function Call Drop

These snippet will enable you to create a Function Call Drop.

The process is very similar to creating [NFT drop](#nft-drop). You just need to pass another set of arguments during creating drop.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSCreateFunctionCallDrop />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppCreateFunctionCallDrop />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLICreateFunctionCallDrop />
  </TabItem>
</Tabs>

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