---
id: standards
title: Contract Standards
---

The NEAR community can prose and vote on a series of standards called Near Enhancement Proposals (NEP). These standards define
how to implement specific contract, so the community can achieve consensus when building apps.

---

## 🪙 Fungible Tokens
Besides the $NEAR native token, users can create and use a multitude of other fungible tokens.

In contrast with the NEAR token, fungible tokens are **not stored in the wallet**. Instead, they live in a contract which is in charge of doing **bookkeeping**. 

- FT contracts follow the [**NEP-141 and NEP-148 standards**](https://nomicon.io/Standards/FungibleToken/).
- Check our [**tutorials on FT**](../relevant-contracts/ft.md).


---

## 🎟️ Non-Fungible Tokens

In contrast with fungible tokens, non-fungible tokens are unitary, making then ideal to represent ownership of assets.

As with fungible tokens, NFTs are **not stored** in the user's wallet, instead, each NFT lives in a **NFT contract**. The NFT contract is in charge of handling the creation, storage and transfers of NFTs.

- NFT contracts follow the [**NEP-171 and NEP-177 standards**](https://nomicon.io/Standards/Tokens/NonFungibleToken).
- Check our [**tutorials on NFT**](../relevant-contracts/nft.md).