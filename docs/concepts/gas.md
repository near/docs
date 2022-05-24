---
id: gas
title: Introduction
sidebar_label: Introduction
---

When you make calls to the NEAR blockchain to update or change data, the people running the infrastructure of the blockchain incur some cost. At the end of the day, some computers somewhere process your request, and the [validators](https://github.com/near/wiki/blob/master/Archive/validators/about.md) running these computers spend significant capital to keep these computers running.

Like other programmable blockchains, NEAR compensates these people by charging _transaction fees_, also called _gas fees_.

If you're familiar with web2 cloud service providers (Amazon Web Services, Google Cloud, etc), a big difference with blockchains is that _users_ get charged immediately when they make a call to an app, rather than developers fronting the cost of using all that infrastructure. This creates new possibilities, such as apps that have no long-term risk of going away due to developer/company funds running out. However, it also comes with some usability speed bumps. To help with this, NEAR also provides the ability for developers to [cover gas costs for users](#what-about-prepaid-gas), to create a more familiar experience to those coming from web2.

When thinking about gas, keep two concepts in mind:

- **Gas units**: internally, transaction fees are not calculated directly in NEAR tokens, but instead go through an in-between phase of "gas units". The benefit of gas units is that they are deterministic – the same transaction will always cost the same number of gas units.
- **Gas price**: gas units are then multiplied by a _gas price_ to determine how much to charge users. This price is automatically recalculated each block depending on network demand (if previous block is more than half full the price goes up, otherwise it goes down, and it won't change by more than 1% each block), and bottoms out at a price that's configured by the network, currently 100 million [yocto][metric prefixes]NEAR.

  [metric prefixes]: https://www.nanotech-now.com/metric-prefix-table.htm

Note that the gas price can differ between NEAR's mainnet & testnet. [Check the gas price](#whats-the-price-of-gas-right-now) before relying on the numbers below.

## Thinking in gas {#thinking-in-gas}

NEAR has a more-or-less one second block time, accomplished by limiting the amount of gas per block. You can query this value by using the [`protocol_config`](/docs/api/rpc#protocol-config) RPC endpoint and search for `max_gas_burnt` under `limit_config`. The gas units have been carefully calculated to work out to some easy-to-think-in numbers:

- 10¹² gas units, or **1 TGas** (_[Tera][metric prefixes]Gas_)...
- ≈ **1 millisecond** of "compute" time
- ...which, at a minimum gas price of 100 million yoctoNEAR, equals a **0.1 milliNEAR** charge

This `1ms` is a rough but useful approximation, and is the current goal of how gas units are set within NEAR. Gas units encapsulate not only compute/CPU time but also bandwidth/network time and storage/IO time. Via a governance mechanism, system parameters can be tweaked, shifting the mapping between TGas and milliseconds in the future, but the above is still a good starting point for thinking about what gas units mean and where they come from.

## The cost of common actions {#the-cost-of-common-actions}

To give you a starting point for what to expect for costs on NEAR, the table below lists some common actions and how much TGas they currently require, and what the fee would be, in milliNEAR, at the minimum gas price of 100 million yN.

| Operation           | TGas | fee (mN) | fee (Ⓝ)  |
| ------------------- | ---- | -------- | -------- |
| Create Account      | 0.42 | 0.042    | 4.2⨉10⁻⁵ |
| Send Funds          | 0.45 | 0.045    | 4.5⨉10⁻⁵ |
| Stake               | 0.50 | 0.050    | 5.0⨉10⁻⁵ |
| Add Full Access Key | 0.42 | 0.042    | 4.2⨉10⁻⁵ |
| Delete Key          | 0.41 | 0.041    | 4.1⨉10⁻⁵ |

<blockquote class="info">
<strong>Dig Deeper</strong><br /><br />

Where do these numbers come from?

NEAR is [configured](https://github.com/near/nearcore/blob/master/nearcore/res/genesis_config.json#L57-L119) with base costs. An example:

    create_account_cost: {
      send_sir:     99607375000,
      send_not_sir: 99607375000,
      execution:    99607375000
    }

The "sir" here stands for "sender is receiver". Yes, these are all identical, but that could change in the future.

When you make a request to create a new account, NEAR immediately deducts the appropriate `send` amount from your account. Then it creates a _receipt_, an internal book-keeping mechanism to facilitate NEAR's asynchronous, sharded design (if you're coming from Ethereum, forget what you know about Ethereum's receipts, as they're completely different). Creating a receipt has its own associated costs:

    action_receipt_creation_config: {
      send_sir:     108059500000,
      send_not_sir: 108059500000,
      execution:    108059500000
    }

You can query this value by using the [`protocol_config`](/docs/api/rpc#protocol-config) RPC endpoint and search for `action_receipt_creation_config`. 

The appropriate `send` amount for creating this receipt is also immediately deducted from your account.

The "create account" action won't be finalized until the next block. At this point, the `execution` amount for each of these actions will be deducted from your account (something subtle: the gas units on this next block could be multiplied by a gas price that's up to 1% different, since gas price is recalculated on each block). Adding it all up to find the total transaction fee:

    (create_account_cost.send_sir  + action_receipt_creation_config.send_sir ) * gas_price_at_block_1 +
    (create_account_cost.execution + action_receipt_creation_config.execution) * gas_price_at_block_2

</blockquote>

## Costs of complex actions {#costs-of-complex-actions}

The numbers above should give you the sense that transactions on NEAR are cheap! But they don't give you much sense of how much it will cost to use a more complex app or operate a NEAR-based business. Let's cover some more complex gas calculations: deploying contracts and function calls.

### Deploying Contracts {#deploying-contracts}

The basic action costs include two different values for deploying contracts. Simplified, these are:

    deploy_contract_cost: 184765750000,
    deploy_contract_cost_per_byte: 64572944,

Again, these values can be queried by using the [`protocol_config`](/docs/api/rpc#protocol-config) RPC endpoint.

The first is a baseline cost, no matter the contract size. Keeping in mind that each need to be multiplied by two, for both `send` and `execute` costs, and will also require sending & executing a receipt (see blue box above), the gas units comes to:

    2 * 184765750000 +
    2 * contract_size_in_bytes * 64572944 +
    2 * 108059500000

(Divide the resulting number by 10¹² to get to TGas!)

Note that this covers the cost of uploading and writing bytes to storage, but does _not_ cover the cost of holding these bytes in storage. Long-term storage is compensated via [storage staking], a recoverable cost-per-byte amount that will also be deducted from your account during contract deployment.

The AssemblyScript contract in [this example Fungible Token](https://github.com/near-examples/FT/pull/42) compiles to just over 16kb (the Rust contract is much larger, but this [will be optimized](https://github.com/near/near-sdk-rs/issues/167)). Using the calculation above, we find that it requires **2.65 TGas** (and thus 0.265mN at minimum gas price) for the transaction fee to deploy the contract, while 1.5N will be locked up for storage staking.

### Function calls {#function-calls}

Given the general-purpose nature of NEAR, function calls win the award for most complex gas calculations. A given function call will use a hard-to-predict amount of CPU, network, and IO, and the amount of each can even change based on the amount of data already stored in the contract!

With this level of complexity, it's no longer useful to walk through an example, enumerating each (see `ext_costs` under `wasm_config` using the [`protocol_config`](/docs/api/rpc#protocol-config) RPC endpoint) of the gas calculations as we go (you can research this yourself, [if you want](https://github.com/near/nearcore/pull/3038)). Instead, let's approach this from two other angles: ballpark comparisons to Ethereum, and getting accurate estimates with automated tests.

#### Ballpark Comparisons to Ethereum {#ballpark-comparisons-to-ethereum}

Like NEAR, Ethereum uses gas units to model computational complexity of an operation. Unlike NEAR, rather than using a predictable gas price, Ethereum uses a dynamic, auction-based marketplace. This makes a comparison to Ethereum's gas prices a little tricky, but we'll do our best.

Etherscan gives a [historic Ethereum gas price chart](https://etherscan.io/chart/gasprice). These prices are given in "Gwei", or Gigawei, where a wei is the smallest possible amount of ETH, 10⁻¹⁸. From November 2017 through July 2020, average gas price was 21Gwei. Let's call this the "average" gas price. In July 2020, average gas price went up to 57Gwei. Let's use this as a "high" Ethereum gas fee.

Multiplying Ethereum's gas units by gas price usually results in an amount that's easy to show in milliETH (mE), the same way we've been converting NEAR's TGas to milliNEAR. Let's look at some common operations side-by-side, comparing ETH's gas units to NEAR's, as well as converting to both the above "average" & "high" gas prices.

| Operation                                       | ETH gas units | avg mE | high mE | NEAR TGas           | mN                                   |
| ----------------------------------------------- | ------------- | ------ | ------- | ------------------- | ------------------------------------ |
| Transfer native token (ETH or NEAR)             | 21k           | 0.441  | 1.197   | 0.45                | 0.045                                |
| Deploy & initialize a [fungible token] contract | [1.1M]        | 23.3   | 63.1    | [9]<super>†</super> | 0.9 (plus 1.5Ⓝ in [storage staking]) |
| Transfer a fungible token                       | [~45k]        | 0.945  | 2.565   | [14]                | 1.4                                  |
| Setting an escrow for a fungible token          | [44k]         | 0.926  | 2.51    | [8]                 | 0.8                                  |
| Checking a balance for a fungible token         | 0             | 0      | 0       | 0                   | 0                                    |

<super>†</super> Function calls require spinning up a VM and loading all compiled Wasm bytes into memory, hence the increased cost over base operations; this is [being optimized](https://github.com/near/nearcore/issues/3094).

While some of these operations on their surface appear to only be about a 10x improvement over Ethereum, something else to note is that the total supply of NEAR is more than 1 billion, while total supply of Ethereum is more like 100 million. So as fraction of total supply, NEAR's gas fees are approximately another 10x lower than Ethereum's. Additionally, if the price of NEAR goes up significantly, then the minimum gas fee set by the network can be lowered.

You can expect the network to sit at the minimum gas price most of the time; learn more in the [Economics whitepaper](https://near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees).

[fungible token]: https://github.com/near-examples/FT/pull/42
[1.1m]: https://github.com/chadoh/erc20-test
[9]: https://explorer.testnet.near.org/transactions/GsgH2KoxLZoL8eoutM2NkHe5tBPnRfyhcDMZaBEsC7Sm
[storage staking]: /docs/concepts/storage-staking
[~45k]: https://ethereum.stackexchange.com/a/72573/57498
[14]: https://explorer.testnet.near.org/transactions/5joKRvsmpEXzhVShsPDdV8z5EG9bGMWeuM9e9apLJhLe
[8]: https://explorer.testnet.near.org/transactions/34pW67zsotFsD1DY8GktNhZT9yP5KHHeWAmhKaYvvma6
[44k]: https://github.com/chadoh/erc20-test

#### Accurate Estimates with Automated Tests {#accurate-estimates-with-automated-tests}

We will have a demonstration of how to do in-depth gas cost estimation soon; [subscribe to this issue](https://github.com/near/devx/issues/253) for updates. Until then, you may want to look at this [example of how to do simulation testing](https://github.com/near-examples/simulation-testing), a powerful way to test your contracts and inspect every aspect of their execution.

If you're using NEAR's AssemblyScript SDK, you can use [two methods](https://github.com/near/near-sdk-as/blob/741956d8a9a44e4252f8441dcd0ba3c19743590a/assembly/runtime/contract.ts#L68-L81), `context.prepaidGas` and `context.usedGas`. These can be used with or without tests to report what the virtual machine knows about attached gas and its consumption at the moment your contract method is being executed:

```ts
/**
* Get the number of gas units attached to the call
*/
get prepaidGas(): u64 {
 return env.prepaid_gas();
}

/**
* Get the number of gas units that was already burnt during the contract execution and
* attached to promises (cannot exceed prepaid gas).
*/
get usedGas(): u64 {
 return env.used_gas();
}
```

## How do I buy gas? {#how-do-i-buy-gas}

You don't directly buy gas; you attach tokens to transactions.

Calls to NEAR to read data are always free. But when you make a call to add or update data, you have to do so from an account that has some amount of NEAR tokens available in its balance, and these tokens will be attached to pay the gas fee.

If you're coming from Ethereum, you may be used to the idea of paying a higher gas price to get your transaction processed faster. In NEAR, gas costs are deterministic, and you can't pay extra.

For basic operations like "transfer funds," you can't specify an amount to attach. The gas needed is easy to calculate ahead of time, so it's automatically attached for you. (Check it: [`near-cli`](https://github.com/near/near-cli) has a `send` command, which accepts no `gas` parameter; [`near-api-js`](https://github.com/near/near-api-js) has a [`sendTokens`](https://near.github.io/near-api-js/classes/near.near-1.html#sendtokens) function which accepts no `gas` argument.) As shown in the tables above, these operations are cheap, so you probably won't even notice the slight reduction in your account's balance.

Function calls are more complex and you can attach an explicit amount of gas to these transactions, up to a maximum value of 3⨉10¹⁴ gas units. This maximum value of prepaid gas is subject to change but you can query this value by using the [`protocol_config`](/docs/api/rpc#protocol-config) RPC endpoint and search for `max_total_prepaid_gas`. 

You can also override the default value of attached gas. Here is an example using [`near-cli`](https://github.com/near/near-cli):

    near call myContract.testnet myFunction "{ \"arg1\": \"val1\" }" --gas=300000000000000

And in [`near-api-js`](https://github.com/near/near-api-js), you can also specify an explicit amount of gas units to attach when calling a change method; see [example here](https://github.com/near-examples/guest-book/blob/ceb2a39e53351b4ffc21d01987e2b0b21d633fa7/src/App.js#L29).

The telltale error that calls for this solution looks like this:

```text
Error:
  Transaction A9BzFKmgNNUmEx9Ue9ARC2rbWeiMnq6LpcXh53xPhSN6 failed.
  Exceeded the prepaid gas
```

<blockquote class="warning">
<strong>How many tokens will these units cost?</strong><br /><br />

Note that you are greenlighting a maximum number of gas _units_, not a number of NEAR tokens or yoctoNEAR.

These units will be multiplied by the gas price at the block in which they're processed. If the function call makes cross-contract calls, then separate parts of the function will be processed in different blocks, and could use different gas prices. At a minimum, the function will take two blocks to complete, as explained in [the blue box above](#the-cost-of-common-actions).

Assuming the system rests at minimum gas price of 100 million yoctoNEAR during the total operation, a maximum attached gas of 3⨉10¹⁴ would seem to allow a maximum expenditure of 3⨉10²² yN. However, there's also a pessimistic multiplier of about 6.4 to [prevent shard congestion](https://github.com/nearprotocol/NEPs/issues/67).

Multiplying all three of these numbers, we find that maximum attached gas units allow about 0.2Ⓝ to be spent on the operation if gas prices stay at their minimum. If gas prices are above the minimum, this charge could be higher.

What if the gas price is at the minimum during the starting block, but the operation takes several blocks to complete, and subsequent blocks have higher gas prices? Could the charge be more than ~0.2Ⓝ? No. The pessimistic multiplier accounts for this possibility.

</blockquote>

## Attach extra gas; get refunded! {#attach-extra-gas-get-refunded}

How can you know the exact right amount to attach when you call a function? You can't!

Gas units are based on computational complexity for a given operation, which can be affected by a smart contract's state. This is hard to predict ahead of time. And gas price is adjusted each block based on how busy the network was during the previous block, which is also hard to predict ahead of time.

But good news!

- Gas doesn't cost much on NEAR
- If you attach more gas than needed, you'll get refunded

This is also true for basic operations. In the previous section we mentioned that these are automatically calculated and attached. In fact, given that the gas price could be adjusted slightly while these operations are being applied (see blue box [above](#the-cost-of-common-actions)), a slight amount extra is attached, and any beyond what's necessary gets refunded.

## Pessimistic gas price inflation

A transactions may take several blocks before it completes. Due to dynamic gas price adjustments, later blocks may have a higher gas price than when the transaction was signed. To guarantee that the transaction can still finish, the amount of tokens reserved when starting a transaction is increased by the *pessimistic-inflation rule*.

The pessimistic inflation rule means that the gas has to be purchased at the highest theoretical gas price that the transaction could reach. The extra spending is only temporary, the difference between the pessimistic and actual price is refunded when the transaction finishes. This is the reason why in the explorer, virtually every transaction that spans more than one block contains a refund, even if all the gas has been spent.

By how much is the price inflated? It depends on how many blocks a transaction may take. A simple transaction that only sends tokens from one account to another can take between 2-3 blocks. 
- One block to subtract the money from the signer's account
- One block to add it to the receivers account
- Potentially another block if the receiver is on another shard and the receipt application gets delayed. 

Therefore, the pessimistically inflated price is increased by 3% or calculated as `gas_price` ⨉ 1.03. Every additional cross-shard communication adds another factor of 1.03.

For a function call, the maximum block delay is computed as the total gas attached divided by the minimum amount required to call another function. Therefore, the more gas you attach to a transaction, the higher your gas price. But again, the increased price is temporarily and will be refunded unless the network actually becomes that congested. Prices would have to go up by the maximum every block and your receipts would need to be very unlucky to have extra delays every time.


## What about Prepaid Gas? {#what-about-prepaid-gas}

The NEAR Team understands that developers want to provide their users with the best possible onboarding experience. To realize this vision, developers can design their applications in a way that first-time users can draw funds for purchasing gas directly from an account maintained by the developer. Once onboarded, users can then transition to paying for their own platform use.

In this sense, prepaid gas can be realized using a funded account and related contract(s) for onboarding new users.

_So how can a developer pay the gas fee for their users on NEAR?_

- A user can use the funds directly from the developer's account suitable only for the gas fees on this dApp. Then the developer has to distinguish users based on the signers' keys instead of the account names.

- Using function calls, you can allow a new user without an account to use your dApp and your contract on-chain. The back-end creates a new access key for the user on the contract's account and points it towards the contract itself. Now the user can immediately use the web app without going through any wallet.

NEAR Protocol does not provide any limiting feature on the usage of developer funds. Developers can set allowances on access keys that correspond to specific users -- one `FunctionCall` access key per new user with a specific allowance.

## What's the price of gas right now? {#whats-the-price-of-gas-right-now}

You can directly query the NEAR platform for the price of gas on a specific block using the RPC method `gas_price`. This price may change depending on network load. The price is denominated in yoctoNEAR (10^-24 NEAR)

1. Take any recent block hash from the blockchain using [NEAR Explorer](https://explorer.testnet.near.org/blocks)

   _At time of writing, `SqNPYxdgspCT3dXK93uVvYZh18yPmekirUaXpoXshHv` was the latest block hash_

2. Issue an RPC request for the price of gas on this block using the method `gas_price` [documented here](/docs/api/rpc)

   ```bash
   http post https://rpc.testnet.near.org jsonrpc=2.0 method=gas_price params:='["SqNPYxdgspCT3dXK93uVvYZh18yPmekirUaXpoXshHv"]' id=dontcare
   ```

3. Observe the results

   ```json
   {
     "id": "dontcare",
     "jsonrpc": "2.0",
     "result": {
       "gas_price": "5000"
     }
   }
   ```

The price of 1 unit of gas at this block was 5000 yoctoNEAR (10^-24 NEAR).

## Some closing thoughts from the whitepaper {#some-closing-thoughts-from-the-whitepaper}

<blockquote class="info">
Fundamentally, the NEAR platform is a marketplace between willing participants.  On the supply side, operators of the validator nodes and other fundamental infrastructure need to be incentivized to provide these services which make up the “community cloud.”  On the demand side, the developers and end-users of the platform who are paying for its use need to be able to do so in a way which is simple, clear and consistent so it helps them.

A blockchain-based cloud provides several specific resources to the applications which run atop it:

- **Compute (CPU)**: This is the actual computer processing (and immediately available RAM) which run the code in a contract.
- **Bandwidth ("Network")**: This is the network traffic between participants and users, including messages which submit transactions and those which propagate blocks.
- **Storage**: Permanent data storage on the chain, typically expressed as a function of both storage space and time.

Existing blockchains like Ethereum account for all of these in a single up front transaction fee which represents a separate accounting for each of them but ultimately charges developers or users for them only once in a single fee. This is a high volatility fee commonly denominated in “gas”.

Developers prefer predictable pricing so they can budget and provide prices for their end users. The pricing for the above-mentioned resources on NEAR is an amount which is slowly adjusted based on system usage (and subject to the smoothing effect of resharding for extreme usage) rather than being fully auction-based. This means that a developer can more predictably know that the cost of running transactions or maintaining their storage.

</blockquote>

To dig deeper into how and why gas works the way it does on NEAR, check out the [Economics](https://near.org/papers/the-official-near-white-paper/#economics) section of the main whitepaper and the [Transaction and Storage Fees](https://near.org/papers/economics-in-sharded-blockchain/#transaction-and-storage-fees) section of the economics whitepaper.

> Got a question?
> <a href="https://stackoverflow.com/questions/tagged/nearprotocol">
> <h8>Ask it on StackOverflow!</h8></a>
