---
id: gas-advanced
title: Gas - Advanced

---

## Costs of complex actions {#costs-of-complex-actions}

The numbers above should give you the sense that transactions on NEAR are cheap! But they don't give you much sense of how much it will cost to use a more complex app or operate a NEAR-based business. Let's cover some more complex gas calculations: deploying contracts and function calls.

### Deploying Contracts {#deploying-contracts}

The basic action costs include two different values for deploying contracts. Simplified, these are:

    deploy_contract_cost: 184765750000,
    deploy_contract_cost_per_byte: 64572944,

These values can be queried by using the [`protocol_config`](/api/rpc/setup#protocol-config) RPC endpoint.

The first is a baseline cost, no matter the contract size. Keeping in mind that each need to be multiplied by two, for both `send` and `execute` costs, and will also require sending & executing a receipt (see blue box above), the gas units comes to:

    2 * 184765750000 +
    2 * contract_size_in_bytes * 64572944 +
    2 * 108059500000

(Divide the resulting number by 10¹² to get to TGas!)

Note that this covers the cost of uploading and writing bytes to storage, but does _not_ cover the cost of holding these bytes in storage. Long-term storage is compensated via storage staking, a recoverable cost-per-byte amount that will also be deducted from your account during contract deployment.

The AssemblyScript contract in [this example Fungible Token](https://github.com/near-examples/FT/pull/42) compiles to just over 16kb (the Rust contract is much larger, but this [will be optimized](https://github.com/near/near-sdk-rs/issues/167)). Using the calculation above, we find that it requires **2.65 TGas** (and thus 0.265mN at minimum gas price) for the transaction fee to deploy the contract, while 1.5N will be locked up for storage staking.

### Function calls {#function-calls}

Given the general-purpose nature of NEAR, function calls win the award for most complex gas calculations. A given function call will use a hard-to-predict amount of CPU, network, and IO, and the amount of each can even change based on the amount of data already stored in the contract!

With this level of complexity, it's no longer useful to walk through an example, enumerating each (see `ext_costs` under `wasm_config` using the [`protocol_config`](/api/rpc/setup#protocol-config) RPC endpoint) of the gas calculations as we go (you can research this yourself, [if you want](https://github.com/near/nearcore/pull/3038)). Instead, let's approach this from two other angles: ballpark comparisons to Ethereum, and getting accurate estimates with automated tests.

<blockquote class="lesson">
**How much of the gas fee goes as a 30% reward to the smart contract account?**

The NEAR Whitepaper mentions that [30% of all gas fees](https://near.org/papers/the-official-near-white-paper/) go to smart contract accounts on which the fees are expensed. 

This amount can be calculated for function calls in two ways:
1. Summing all values in the gas profile 
2. Taking the total gas burnt for the transaction and subtract the static execution gas (which is equal to the amount of gas spent on sending the receipt(s)) from it. Both these numbers are available on the [NEAR Explorer](https://explorer.near.org/) overview page for a transaction.

The second approach is shorter, and quite possibly easier to remember. So here's an example: 

- An account calls the method `submit` on `aurora`
  - Converting the transaction to receipt burned a total of ~0.00024Ⓝ
  - Executing the receipt burned a total of ~0.00376Ⓝ

The 30% reward for the smart contract owner (in this case aurora) would be: (0.00376Ⓝ - 0.00024Ⓝ) * 0.3 = 0.001056Ⓝ 

This transaction can also be found [here](https://explorer.near.org/transactions/GzRn9yhDaQ8f3ReJguCBGxdi4iJEeBguJ5MWufMcu1JP) on NEAR Explorer, feel free to have a look around!

For calls involving multiple contracts, calculating the reward for each contract with this method would not be possible with the data shown on NEAR Explorer (June 2022) as the explorer does not show the conversion cost for the second (and other) receipt(s).

</blockquote>

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
[storage staking]: /concepts/storage/storage-staking
[~45k]: https://ethereum.stackexchange.com/questions/71235/gas-limit-for-erc-20-tokens
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

---

## Pessimistic gas price inflation

A transactions may take several blocks before it completes. Due to dynamic gas price adjustments, later blocks may have a higher gas price than when the transaction was signed. To guarantee that the transaction can still finish, the amount of tokens reserved when starting a transaction is increased by the *pessimistic-inflation rule*.

The pessimistic inflation rule means that the gas has to be purchased at the highest theoretical gas price that the transaction could reach. The extra spending is only temporary, the difference between the pessimistic and actual price is refunded when the transaction finishes. This is the reason why in the explorer, virtually every transaction that spans more than one block contains a refund, even if all the gas has been spent.

By how much is the price inflated? It depends on how many blocks a transaction may take. A simple transaction that only sends tokens from one account to another can take between 2-3 blocks. 
- One block to subtract the money from the signer's account
- One block to add it to the receivers account
- Potentially another block if the receiver is on another shard and the receipt application gets delayed. 

Therefore, the pessimistically inflated price is increased by 3% or calculated as `gas_price` ⨉ 1.03. Every additional cross-shard communication adds another factor of 1.03.

For a function call, the maximum block delay is computed as the total gas attached divided by the minimum amount required to call another function. Therefore, the more gas you attach to a transaction, the higher your gas price. But again, the increased price is temporarily and will be refunded unless the network actually becomes that congested. Prices would have to go up by the maximum every block and your receipts would need to be very unlucky to have extra delays every time.

---

## What's the price of gas right now? {#whats-the-price-of-gas-right-now}

You can directly query the NEAR platform for the price of gas on a specific block using the RPC method `gas_price`. This price may change depending on network load. The price is denominated in yoctoNEAR (10^-24 NEAR)

1. Take any recent block hash from the blockchain using [NEAR Explorer](https://explorer.testnet.near.org/blocks)

   _At time of writing, `SqNPYxdgspCT3dXK93uVvYZh18yPmekirUaXpoXshHv` was the latest block hash_

2. Issue an RPC request for the price of gas on this block using the method `gas_price` [documented here](/api/rpc/setup)

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

---

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

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
<h8>Ask it on StackOverflow!</h8></a>
:::
