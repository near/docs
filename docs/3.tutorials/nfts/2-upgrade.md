---
id: upgrade-contract
title: Upgrading the Contract
sidebar_label: Upgrade a Contract
---
import {Github} from "@site/src/components/codetabs"

In this tutorial, you'll build off the work you previously did to implement the [minting functionality](2-minting.md) on a skeleton smart contract. You got to the point where NFTs could be minted and the wallet correctly picked up on the fact that you owned an NFT. However, it had no way of displaying the tokens since your contract didn't implement the method that the wallet was trying to call.

---

## Introduction

Today you'll learn about deploying patch fixes to smart contracts and you'll use that knowledge to implement the `nft_tokens_for_owner` function on the contract you deployed in the previous tutorial.

---

## Upgrading contracts overview {#upgrading-contracts}

Upgrading contracts, when done right, can be an immensely powerful tool. If done wrong, it can lead to a lot of headaches. It's important to distinguish between the code and state of a smart contract. When a contract is deployed on top of an existing contract, the only thing that changes is the code. The state will remain the same and that's where a lot of developer's issues come to fruition.

The NEAR Runtime will read the serialized state from disk and it will attempt to load it using the current contract code. When your code changes, it might not be able to figure out how to do this.

You need to strategically upgrade your contracts and make sure that the runtime will be able to read your current state with the new contract code. For more information about upgrading contracts and some best practices, see the NEAR SDK's [upgrading contracts](../../2.build/2.smart-contracts/release/upgrade.md) write-up.

---

## Modifications to our contract {#modifications-to-contract}

In order for the wallet to properly display your NFTs, you need to implement the `nft_tokens_for_owner` method. This will allow anyone to query for a paginated list of NFTs owned by a given account ID.

To accomplish this, let's break it down into some smaller subtasks. First, you need to get access to a list of all token IDs owned by a user. This information can be found in the `tokens_per_owner` data structure. Now that you have a set of token IDs, you need to convert them into `JsonToken` objects as that's what you'll be returning from the function.

Luckily, you wrote a function `nft_token` which takes a token ID and returns a `JsonToken` in the `nft_core.rs` file. As you can guess, in order to get a list of `JsonToken` objects, you would need to iterate through the token IDs owned by the user and then convert each token ID into a `JsonToken` and store that in a list.

As for the pagination, Rust has some awesome functions for skipping to a starting index and taking the first `n` elements of an iterator.

Let's move over to the `enumeration.rs` file and implement that logic:

<Github language="rust" start="46" end="75" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/enumeration.rs" />

---

## Redeploying the contract {#redeploying-contract}

Now that you've implemented the necessary logic for `nft_tokens_for_owner`, it's time to build and re-deploy the contract to your account. Using the cargo-near, deploy the contract as you did in the previous tutorial:

```bash
cargo near deploy $NFT_CONTRACT_ID without-init-call network-config testnet sign-with-keychain send
```

Once the contract has been redeployed, let's test and see if the state migrated correctly by running a simple view function:

```bash
near contract call-function as-read-only $NFT_CONTRACT_ID nft_metadata json-args {} network-config testnet now
```

This should return an output similar to the following:

```bash
{
  spec: 'nft-1.0.0',
  name: 'NFT Tutorial Contract',
  symbol: 'GOTEAM',
  icon: null,
  base_uri: null,
  reference: null,
  reference_hash: null
}
```

**Go team!** At this point, you can now test and see if the new function you wrote works correctly. Let's query for the list of tokens that you own:

```bash
near contract call-function as-read-only $NFT_CONTRACT_ID nft_tokens_for_owner json-args '{"account_id": "'$NFT_CONTRACT_ID'", "limit": 5}' network-config testnet now
```

<details>
<summary>Example response: </summary>
<p>

```bash
[
  {
    token_id: 'token-1',
    owner_id: 'goteam.examples.testnet',
    metadata: {
      title: 'My Non Fungible Team Token',
      description: 'The Team Most Certainly Goes :)',
      media: 'https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif',
      media_hash: null,
      copies: null,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null
    }
  }
]
```

</p>
</details>

---

## Viewing NFTs in the wallet {#viewing-nfts-in-wallet}

Now that your contract implements the necessary functions that the wallet uses to display NFTs, you should be able to see your tokens on display in the [collectibles tab](https://testnet.mynearwallet.com/?tab=collectibles).

![filled-nft-in-wallet](/docs/assets/nfts/filled-nft-in-wallet.png)

---

## Conclusion

In this tutorial, you learned about the basics of [upgrading contracts](#upgrading-contracts). Then, you implemented the necessary [modifications to your smart contract](#modifications-to-contract) and [redeployed it](#redeploying-contract). Finally you navigated to the wallet collectibles tab and [viewed your NFTs](#viewing-nfts-in-wallet).

In the [next tutorial](3-enumeration.md), you'll implement the remaining functions needed to complete the [enumeration](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration) standard.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- rustc: `1.77.1`
- near-cli-rs: `0.11.0`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`

:::
