---
id: gas-station
title: Multichain Gas Station Contract
sidebar_label: Multichain Gas Station Contract
---

The [multichain gas station smart contract](https://github.com/near/multichain-gas-station-contract) accepts payments in NEAR tokens in exchange for gas funding on non-NEAR foreign chains. Part of the NEAR Multichain effort, it works in conjunction with the [MPC recovery service](https://github.com/near/mpc-recovery) to generate on-chain signatures.

## What is it?

This smart contract is a piece of the NEAR Multichain project, which makes NEAR Protocol an effortlessly cross-chain network. This contract accepts EVM transaction request payloads and facilitates the signing, gas funding, and relaying of the signed transactions to their destination chains. It works in conjunction with a few different services, including:

- The [MPC recovery service](https://github.com/near/mpc-recovery), also called the _"MPC signer service"_, includes a network of trusted MPC signers, which hold keyshares and cooperatively sign transactions on behalf of the MPC network. It also includes an on-chain component, called the _"MPC signer contract,"_ which accepts on-chain signature requests and returns signatures computed by the MPC network.
- The [multichain relayer server](multichain-server.md) scans this smart contract for signed transaction payloads and emits them to foreign chain RPCs.

## How it works

Currently, relaying one transaction to a foreign chain requires three transactions.
Three transactions are required because of the gas restrictions imposed by the protocol. Currently (pre-NEP-516), the MPC signing function requires a _lot_ of gas, so dividing up the signing process into three parts is required to maximize the amount of gas available to each signing call.

:::info
[NEP-516 (delayed receipts / runtime triggers)](https://github.com/near/NEPs/issues/516) will reduce the required transactions to one.
:::

Transaction breakdown:

1. The first transaction is a call to the `create_transaction` function. This function accepts an EVM transaction request payload and a deposit amount (to pay for gas on the foreign chain) and returns an `id` and a `pending_transactions_count`.
2. The second transaction is a call to the `sign_next` function. This function accepts the `id` returned in step 1 and returns a signed payload. This payload is the gas funding transaction, transferring funds from a paymaster account on the foreign chain to the user's account on the foreign chain. It must be submitted to the foreign chain before the second signed payload.
3. The third transaction is another call to the `sign_next` function, identical to the one before. This function accepts an `id` and returns a signed payload. This payload is the signed user transaction.

Once this service and its supporting services are live, the multichain relayer server will be monitoring this gas station contract and relaying the signed transactions in the proper order as they become available, so it will not be strictly necessary for the users of this contract to ensure that the transactions are properly relayed, unless the user wishes to relay the transactions using their own RPC (e.g. to minimize latency).

## Variable Gas fees

There's a premium on the Gas Station in `NEAR` for what the gas will cost on the foreign chain to account for variation in both the exchange rate between transactions, settlement between chains, and to account for variation in gas costs until the transaction is confirmed.

### BSC

This is the formula for calculating the gas fee:

`(gas_limit_of_user_transaction + 21000) * gas_price_of_user_transaction * near_tokens_per_foreign_token * 1.2`

:::note

- `21000` is the exact amount of gas necessary to transfer funds on `BSC`.
- `1.2` is an arbitrage fee: charge 20% more than market rate to discourage people from using the Gas Station as an arbitrage/DEX.

:::

## Settlement

Settlement is needed because the Gas Station contract is accumulating NEAR, while the [Paymaster accounts](multichain-server.md#paymaster) on foreign chains are spending native foreign chain gas tokens (`ETH`, `BNB`, `SOL`, etc).

### Manual settlement

Manual Settlement involves several steps:

1. Withdrawing the NEAR held in the gas station contract and swapping for a token that can be bridged.
   This may be the native gas token of the foreign chain, another token like USDC that has wide bridge support, or NEAR.

2. Bridging the token from NEAR to the foreign chain.
   - Here's an [overview of bridging related to NEAR](https://knotty-marsupial-f6d.notion.site/NEAR-Bridging-Guides-f4359bd35c794dc184b098f7ed00c4ce).

3. Sending the native gas tokens to the paymaster accounts on the foreign chains.
   - A swap from the bridged token to the native gas token before sending to the paymaster accounts is necessary if the token that was bridged was not the foreign chain native gas token

### Automated settlement

Automated settlement is available for select partners based on their cross-chain transaction volume.
When using automated settlement, a Market Maker facilitates the settlement of assets between a partner’s gas station contract and their paymaster accounts on destination chains.

:::info Contact us

If you're interested in using the automated settlement service, please [contact us](https://forms.gle/7z9nKVd4VH3qxbny6) by filling out [this form](https://forms.gle/7z9nKVd4VH3qxbny6).

:::

## Contract Interactions

:::tip
You can review the complete smart contract source code in [this GitHub repository](https://github.com/near/multichain-gas-station-contract).
:::

### Setup and Administration

1. Initialize the contract with a call to `new`. The [owner](https://github.com/near/near-sdk-contract-tools/blob/develop/src/owner.rs) is initialized as the predecessor of this transaction. All of the following transactions must be called by the owner.
2. Refresh the MPC contract public key by calling `refresh_signer_public_key`.
3. Set up foreign chain configurations with `add_foreign_chain`.
   - When performing the function call for `add_foreign_chain`, the chain ID and oracle price ID must be updated appropriately:
     - Specific chain IDs (e.g. BSC, Base, Optimism, Arbitrum) can be [found here](https://chainlist.org/)
     - Pyth oracle price fee IDs can be [found here](https://pyth.network/developers/price-feed-ids)
4. Add paymasters to each foreign chain with `add_paymaster`.

### Price Pusher

In order to get up-to-date information on gas prices for foreign chains, a price pusher service must be run, either on demand or as a `cron` job.

Suggested tools:
- [Pyth Price Pusher](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/price_pusher): this price pusher supports `BNB` and `ETH`

:::tip
A separate price pusher should be used for each token.
:::

### Usage

Users who wish to get transactions signed and relayed by this contract and its accompanying infrastructure should perform the following steps:

1. Construct an unsigned transaction payload for the foreign chain they wish to interact with, e.g. Ethereum.
2. Call `create_transaction` on this contract, passing in that payload and activating the `use_paymaster` toggle in the case that the user wishes to use a paymaster.
   - If the user uses a paymaster, he must attach a sufficient quantity of NEAR tokens to this transaction to pay for the gas + service fee.
   - This function call returns an `id` and a `pending_transactions_count`.
3. Call `sign_next`, passing in the id value obtained in the previous step. This transaction should be executed with the maximum allowable quantity of gas (i.e. 300 TGas).
   - This transaction will return a signed payload, part of the sequence of transactions necessary to send the user's transaction to the foreign chain.
   - Repeat `pending_transactions_count` times.
4. Relay each signed payload to the foreign chain RPC in the order they were requested.

:::tip Contract address

If you want to try things out, this smart contract is available on:
- testnet: `canhazgas.testnet`
- mainnet: `TBD`

:::

## Limitations

When using the Multichain Gas relayer solution, some limitations should be consider. Here's a list of potential issues you might encounter, and suggested ways to mitigate them:
- Not enough gas for a cross-chain transaction to get included in time.
  - **Solution:** overcharge for gas at the gas station and when constructing the transaction include more than the average gas price.
- Slippage violations causing the gas token or foreign chain Fungible Token to get refunded to the user's foreign chain address.
  - **Solution:** encourage your users to use high slippage settings in volatile or low liquidity market conditions.
  - **Solution:** if such error occurs, make the user aware of what happened and that funds were not lost.
  - **Note:** in future versions the solution will support retrying transactions.
- Nonce issues if Paymaster rotation isn't done properly. This issue is a function of concurrent usage, blockchain finality time, and number of paymaster treasury accounts that the [Gas Station](gas-station.md) is rotating through.
  - **Solution:** use a blockchain that has faster finality.
  - **Solution:** increase the number of paymaster treasury accounts that the gas station rotates through.
