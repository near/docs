---
id: nft
title: Non-Fungible Tokens (NFT)
hide_table_of_contents: false
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BOSMintNFT from "./nft/bos/mint.md"
import BOSBuyNFT from "./nft/bos/buy.md"
import BOSQueryNFT from "./nft/bos/query.md"
import BOSTransferNFT from "./nft/bos/transfer.md"
import BOSListNFTForSale from "./nft/bos/list-for-sale.md"

import WebAppMintNFT from "./nft/web-app/mint.md"
import WebAppBuyNFT from "./nft/web-app/buy.md"
import WebAppQueryNFT from "./nft/web-app/query.md"
import WebAppTransferNFT from "./nft/web-app/transfer.md"
import WebAppListNFTForSale from "./nft/web-app/list-for-sale.md"

import CLIMintNFT from "./nft/near-cli/mint.md"
import CLIBuyNFT from "./nft/near-cli/buy.md"
import CLIQueryNFT from "./nft/near-cli/query.md"
import CLITransferNFT from "./nft/near-cli/transfer.md"
import CLIListNFTForSale from "./nft/near-cli/list-for-sale.md"

import SmartContractMintNFT from "./nft/smart-contract/mint.md"
import SmartContractBuyNFT from "./nft/smart-contract/buy.md"
import SmartContractQueryNFT from "./nft/smart-contract/query.md"
import SmartContractTransferNFT from "./nft/smart-contract/transfer.md"

In contrast with fungible tokens, non-fungible tokens (NFT) are unitary and therefore unique. This makes NFTs ideal to represent ownership of assets such as a piece of digital content, or a ticket for an event.

As with fungible tokens, NFTs are **not stored** in the user's wallet, instead, each NFT lives in a **NFT contract**. The NFT contract works as a bookkeeper, this is: it is in charge of handling the creation, storage and transfers of NFTs.

In order for a contract to be considered a NFT-contract it has to follow the [**NEP-171 and NEP-177 standards**](https://nomicon.io/Standards/Tokens/NonFungibleToken). The **NEP-171** & **NEP-177** standards explain the **minimum interface** required to be implemented, as well as the expected functionality.

:::info NFT & Marketplaces

Be mindful of not confusing an NFT with an NFT-marketplace. NFT simply store information (metadata), while NFT-marketplaces are contracts where NFT can be listed and exchanged for a price.

:::

---

## Community Projects
The easiest way to create and handle NFTs is by using one of the existing community projects.

1. [Paras](https://paras.id/) - a classic NFT marketplace. Just login with your NEAR account, create a collection and share the link with your community.
2. [Mintbase](https://www.mintbase.xyz/) - a marketplace that allows to create NFT collections, and buy NFTs using credit cards or stablecoins.
3. [Enleap](https://enleap.app/) - a no-code launchpad for NFTs. Provides NFT minting, staking, whitelist managing, tracking functionality.

---

## Deploying a NFT Contract
If you want to deploy your own NFT contract, you can create one using our [reference implementation](https://github.com/near-examples/NFT) 

Simply personalize it and deploy it to your account.

```bash
near deploy <account-id> --wasmFile contract.wasm --initFunction new
```

:::tip

Check the [Contract Wizard](https://dev.near.org/contractwizard.near/widget/ContractWizardUI) to create a personalized NFT contract!.

:::

---

## Minting a NFT
To create a new NFT (a.k.a. minting it) you will call the `nft_mint` method passing as arguments the metadata that defines the NFT.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSMintNFT />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppMintNFT />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIMintNFT />
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
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSQueryNFT />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppQueryNFT />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIQueryNFT />
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
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSTransferNFT />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppTransferNFT />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLITransferNFT />
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

</Tabs>

:::info

If the `msg` parameter is included, then a cross-contract call will be made to `<authorized_account>.nft_on_approve(msg)`. Which in turn will make a callback to `nft_resolve_transfer` in your NFT contract.

:::

---

## List a NFT for sale

Basic NFT contracts following [the NEP-171 and NEP-177 standards](https://nomicon.io/Standards/Tokens/NonFungibleToken) do not implement marketplace functionality.

For this purpose, there are ecosystem apps such as [Paras](https://paras.id/) or [Mintbase](https://www.mintbase.xyz/), that use dedicated marketplace contracts.

In order to put a NFT for a sale on a marketplace you need to do two actions: 

1. Cover data storage costs in the marketplace contract. 
2. Approve the marketplace to sell the NFT in your NFT contract.

<br />

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSListNFTForSale />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppListNFTForSale />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIListNFTForSale />
  </TabItem>
</Tabs>

---

## Buy a NFT

Basic NFT contracts following [the NEP-171 and NEP-177 standards](https://nomicon.io/Standards/Tokens/NonFungibleToken) do not implement marketplace functionality.

For this purpose, there are ecosystem apps such as [Paras](https://paras.id/) or [Mintbase](https://www.mintbase.xyz/), that use dedicated marketplace contracts.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSBuyNFT />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppBuyNFT />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIBuyNFT />
  </TabItem>
  <TabItem value="📄 Contract" label="📄 Contract" default>
    <SmartContractBuyNFT />
  </TabItem>
</Tabs>

---

## Additional Resources

1. [NFT Tutorial](/tutorials/nfts/js/introduction) (NEAR examples, JavaScript SDK) - a set of tutorials that cover how to create a NFT contract using JavaScript.
2. [NFT Tutorial](/tutorials/nfts/introduction) (NEAR examples, Rust SDK) - a set of tutorials that cover how to create a NFT contract using Rust.
3. [NFT Tutorial by Keypom](https://github.com/keypom/nft-tutorial-series) (a fork of the NEAR example tutorial).
4. [Paras API documentation](https://parashq.github.io/).
5. [Mintbase API documentation](https://docs.mintbase.xyz/dev/mintbase-graph).
6. [Mintbase JS SDK](https://docs.mintbase.xyz/dev/mintbase-sdk-ref) - a set of methods to get data from blockchain, interact with Mintbase contracts, etc.