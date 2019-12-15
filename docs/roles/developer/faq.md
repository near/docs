---
id: faq
title: Developer FAQ
sidebar_label: Developer FAQ
---

## Maintaining Applications

### How do I make sure that my application is running as expected on the network?

The only parts of your application that will run on the network are storage and compute related to contract calls made directly as part of your application (or indirectly as a result of your calls to other applications).

For example if you have an application that wants to have the latest state of your contract on chain - the easiest way to track the state of your contract is to track the shard you're contract is on.

NEAR keeps each account on one and only one shard for its lifetime. All accounts include related contract code and key-value storage of the contract (stored in a ordered trie).  This means that tracking the shard your contract account is on menas you will always have access to the most accurate version for contract code and storage.

You can explicitly track shards using the `tracking_shards` setting in a network node's configuration.



<blockquote class="warning">
<strong>work in progress</strong> <span>Documentation to help developers get started.</span><br><br>

- Build smart contracts
- Setup your environment and toolchain
- Explore sample applications

</blockquote>
