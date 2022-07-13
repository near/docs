---
id: validators
title: Validators
---

## Intro to Validators

[Validators](https://near.org/papers/the-official-near-white-paper/#economics) are responsible for producing blocks and the security of the network. Since Validators validate all shards, high requirements are set for running them (an 8-Core CPU with 16GB of RAM and 1 TB SSD of storage). The cost of running a block-producing validator node is estimated to be $330 per month for hosting. Please see our hardware and cost estimates page for more info.

The current active Validators are available on the Explorer. The minimum seat price to become a block-producing validator is based on the 100th proposal. (If more than 100 proposals are submitted, the threshold will simply be the stake of the 100th proposal, provided that it’s larger than the minimum threshold of 67,000 $NEAR.) The current seat price to become a block-producing validator is updated live on the Explorer. Any validator nodes with stakes higher than the seat price can join the active set of Validators.

<blockquote class="lesson">
<strong>Is there a plan to support GPU compute if certain validator nodes can offer that or is it just CPU?</strong><br /><br />
  
We don't need GPU support as we are a POS chain and we require very little compute power.

You can read more about our consensus strategy on our <a href="https://github.com/near/wiki/blob/master/Archive/validators/about.md">Validator Quickstart</a> and <a href="https://github.com/near/wiki/blob/master/Archive/validators/faq.md">Staking FA</a>.
</blockquote>

## Chunk-Only Validators

Chunk-Only Producers is a more accessible role with lower hardware and token requirements. This new role will allow the network's validator number to grow, creating more opportunities to earn rewards and secure the NEAR Ecosystem. 

[Chunk-Only Producers](https://near.org/papers/the-official-near-white-paper/#economics) are solely responsible for [producing chunks](https://near.org/papers/nightshade/#nightshade) (parts of the block from a shard, see [Nightshade](https://near.ai/nightshade) for more detail) in one shard (a partition on the network). Because Chunk-Only Producers only need to validate one shard, they can run the validator node on a 4-Core CPU, with 8GB of RAM, and 200 GB SSD of storage.

Like Validators, Chunk-Only Producers will receive, at minimum, 4.5% annual rewards. If less than 100% of the tokens on the network is staked, Chunk-Only Producers stand to earn even more annual rewards. For more details about the Validator’s economics, please check out [NEAR’s Economics Explained](https://near.org/blog/near-protocol-economics/).

TODO



## Hardware Requirements for Validators

TODO


<blockquote class="lesson">
<strong>If a developer writes a vulnerable or malicious dApp, is a validator implicitly taking on risk?</strong><br /><br />
  
No. We have handled the potential damages to the network on the protocol level. For example, we have a lot of limiters that constrain how much data you can pass into a function call or how much compute you can do in one function call, etc.

That said, smart contract developers will need to be responsible for their own dApps, as there is no stage gate or approval process. All vulnerability can only damage the smart contract itself. Luckily, updating smart contracts is very smooth on NEAR, so vulnerabilities can be updated/patched to an account in ways that cannot be done on other blockchains.
</blockquote>