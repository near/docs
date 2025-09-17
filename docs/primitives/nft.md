---
id: nft
title: Non-Fungible Tokens (NFT)
hide_table_of_contents: false
description: "Learn about NEAR non-fungible tokens (NFT) following NEP-171 and NEP-177 standards - mint, transfer, query, and trade unique digital assets with comprehensive examples."
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import WebAppMintNFT from "@site/src/components/docs/primitives/nft/web-app/mint.md"
import WebAppQueryNFT from "@site/src/components/docs/primitives/nft/web-app/query.md"
import WebAppTransferNFT from "@site/src/components/docs/primitives/nft/web-app/transfer.md"

import CLIMintNFT from "@site/src/components/docs/primitives/nft/near-cli/mint.md"
import CLIQueryNFT from "@site/src/components/docs/primitives/nft/near-cli/query.md"
import CLITransferNFT from "@site/src/components/docs/primitives/nft/near-cli/transfer.md"

import LantstoolMintNFT from "@site/src/components/docs/primitives/nft/lantstool/mint.md"
import LantstoolQuryNFT from "@site/src/components/docs/primitives/nft/lantstool/query.md"
import LantstoolTransferNFT from "@site/src/components/docs/primitives/nft/lantstool/transfer.md"

import SmartContractMintNFT from "@site/src/components/docs/primitives/nft/smart-contract/mint.md"
import SmartContractQueryNFT from "@site/src/components/docs/primitives/nft/smart-contract/query.md"
import SmartContractTransferNFT from "@site/src/components/docs/primitives/nft/smart-contract/transfer.md"

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

import MintNFT from "@site/src/components/tools/NonFungibleToken/MintNFT";


In contrast with fungible tokens, non-fungible tokens (NFT) are unitary and therefore unique. This makes NFTs ideal to represent ownership of assets such as a piece of digital content, or a ticket for an event.

As with fungible tokens, NFTs are **not stored** in the user's wallet, instead, each NFT lives in a **NFT contract**. The NFT contract works as a bookkeeper, this is: it is in charge of handling the creation, storage and transfers of NFTs.

In order for a contract to be considered a NFT-contract it has to follow the [**NEP-171 and NEP-177 standards**](https://nomicon.io/Standards/Tokens/NonFungibleToken). The **NEP-171** & **NEP-177** standards explain the **minimum interface** required to be implemented, as well as the expected functionality.

:::info NFT & Marketplaces

Be mindful of not confusing an NFT with an NFT-marketplace. NFT simply store information (metadata), while NFT-marketplaces are contracts where NFT can be listed and exchanged for a price.

:::

---

## Deploying a NFT Contract

If you want to deploy your own NFT contract, you can create one using our [reference implementation](https://github.com/near-examples/NFT).

<Tabs groupId="code-tabs">
 <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near deploy <account-id> --wasmFile contract.wasm --initFunction new
```

 </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/nft/deploy-nft-contract.json" />
  </TabItem>
</Tabs>

<hr class="subsection" />

### Global Contract

You can deploy a new Non-Fungible Token using our global NFT contract - a pre-deployed [standard NFT contract](https://github.com/near-examples/NFT) that you can reuse. [Global contracts](../smart-contracts/global-contracts.md) are deployed once and can be reused by any account without incurring high storage costs.

<Tabs groupId="code-tabs">
  <TabItem value="account" label="By Account">

    ```bash
    near contract deploy <account-id> use-global-account-id nft.globals.primitives.testnet \
      with-init-call new \
      json-args '{"owner_id": "<account-id>", "metadata": {"spec": "nft-1.0.0", "name": "MY_NFT", "symbol": "NFT2000", "icon": "data:image/svg+xml,%3Csvg xmlns='\''http://www.w3.org/2000/svg'\'' viewBox='\''0 0 288 288'\''%3E%3Cg id='\''l'\'' data-name='\''l'\''%3E%3Cpath d='\''M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'\''/%3E%3C/g%3E%3C/svg%3E"}}' \
      prepaid-gas '100.0 Tgas' \
      attached-deposit '0 NEAR' \
      network-config testnet \
      sign-with-keychain \
      send
    ```

  </TabItem>
  <TabItem value="hash" label="By Hash">

    ```bash
    near contract deploy <account-id> use-global-hash ivu1e9obVRnMJLSvVPRgtYefUYUS1L3f5eYHjS86zL9 \
      with-init-call new \
      json-args '{"owner_id": "<account-id>", "metadata": {"spec": "nft-1.0.0", "name": "MY_NFT", "symbol": "NFT2000", "icon": "data:image/svg+xml,%3Csvg xmlns='\''http://www.w3.org/2000/svg'\'' viewBox='\''0 0 288 288'\''%3E%3Cg id='\''l'\'' data-name='\''l'\''%3E%3Cpath d='\''M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'\''/%3E%3C/g%3E%3C/svg%3E"}}' \
      prepaid-gas '100.0 Tgas' \
      attached-deposit '0 NEAR' \
      network-config testnet \
      sign-with-keychain \
      send
    ```

  </TabItem>
</Tabs>

:::note
Deploying by **hash** creates an immutable contract that never changes. Deploying by **account ID** creates an updatable contract that changes when the referenced account's contract is updated. Choose based on whether you want your FT contract to be updatable or permanent.
:::

---

## Minting a NFT
To create a new NFT (a.k.a. minting it) you will call the `nft_mint` method passing as arguments the metadata that defines the NFT.

<Tabs groupId="code-tabs">
  <TabItem value="UI" label="🎨 UI">
    <MintNFT />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppMintNFT />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIMintNFT />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <LantstoolMintNFT/>
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract" default>
    <SmartContractMintNFT />
  </TabItem>
</Tabs>

:::info

See the [metadata standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata) for the full list of `TokenMetadata` parameters.

:::

:::warning

Values of gas and deposit might vary depending on which NFT contract you are calling.

:::

<hr className="subsection" />

### Minting Collections

Many times people want to create multiple 100 copies of an NFT (this is called a collection). In such cases, what you actually need to do is to mint 100 different NFTs with the same metadata (but different `token-id`).

:::tip

Notice that [minting in Mintbase](#minting-a-nft) allows you to pass a `num_to_mint` parameter.

:::

<hr className="subsection" />

### Royalties
You might have noticed that one of the parameters is a structure called royalties. Royalties enable you to create a list of users that should get paid when the token is sell in a marketplace. For example, if `anna` has `5%` of royalties, each time the NFT is sell, `anna` should get a 5% of the selling price.


---

## Querying NFT data
You can query the NFT's information and metadata by calling the `nft_token`.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppQueryNFT />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIQueryNFT />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <LantstoolQuryNFT/>
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    <SmartContractQueryNFT />
  </TabItem>
</Tabs>

---

## Transferring a NFT
Transferring an NFT can happen in two scenarios: (1) you ask to transfer an NFT, and (2) an [authorized account](#approving-users) asks to transfer the NFT.

In both cases, it is necessary to invoke the `nft_transfer` method, indicating the token id, the receiver, and an (optionally) an [approval_id](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement).


<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppTransferNFT />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLITransferNFT />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <LantstoolTransferNFT/>
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract">
    <SmartContractTransferNFT />
  </TabItem>
</Tabs>

---

## Attaching NFTs to a Call
Natively, only NEAR tokens (Ⓝ) can be attached to a function calls. However, the NFT standard enables to attach a non-fungible tokens in a call by using the NFT-contract as intermediary. This means that, instead of you attaching tokens directly to the call, you ask the NFT-contract to do both a transfer and a function call in your name.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near call <nft-contract> nft_transfer_call '{"receiver_id": "<receiver-contract>", "token_id": "<token_id>", "msg": "<a-string-message>"}' --accountId <your-account> --depositYocto 1
```

</TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/nft/attach-nft-to-call.json" />
  </TabItem>
</Tabs>

:::info

Optionally, a [`memo` parameter](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core#nft-interface) can be passed to provide more information to your contract.

:::

<hr className="subsection" />

### How Does it Work?
Assume you want to attach an NFT (🎫) to a call on the receiver contract. The workflow is as follows:
1. You call `nft_transfer_call` in the NFT-contract passing: the receiver, a message, and the token-id of 🎫.
2. The NFT contract transfers the NFT 🎫 to the receiver.
3. The NFT contract calls **`receiver.nft_on_transfer(sender, token-owner, token-id, msg)`**.
4. The NFT contract handles errors in the `nft_resolve_transfer` callback.
5. The NFT contract returns `true` if it succeeded.

#### The nft_on_transfer method
From the workflow above it follows that the receiver we want to call needs to implement the `nft_on_transfer` method. When executed, such method will know:
- Who is sending the NFT, since it is a parameter
- Who is the current owner, since it is a parameter
- Which NFT was transferred, since it is a parameter.
- If there are any parameters encoded as a message

The `nft_on_transfer` **must return true** if the NFT has to be **returned to the sender**.


---

## Approving Users

You can authorize other users to transfer an NFT you own. This is useful, for example, to enable listing your NFT in a marketplace. In such scenario, you **trust** that the marketplace will only transfer the NFT upon receiving a certain amount of money in exchange.

<Tabs groupId="code-tabs">
  <TabItem value="🖥️ CLI" label="🖥️ CLI">

```bash
near call <nft-contract> nft_approve '{
"token_id": "<token-unique-id>",
"account_id": "<authorized-account>",
"msg": "<json-structure>"
}' --accountId <your-account> --depositYocto 1
```

</TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/nft/approve-user.json" />
  </TabItem>
</Tabs>

:::info

If the `msg` parameter is included, then a cross-contract call will be made to `<authorized_account>.nft_on_approve(msg)`. Which in turn will make a callback to `nft_resolve_transfer` in your NFT contract.

:::

---

## Tutorials

- [NFT Tutorial](/tutorials/nfts/js/introduction) _Zero to Hero_ (JavaScript SDK) - a set of tutorials that cover how to create a NFT contract using JavaScript.
- [NFT Tutorial](/tutorials/nfts/introduction) _Zero to Hero_ (Rust SDK) - a set of tutorials that cover how to create a NFT contract using Rust.
