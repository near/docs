---
id: multichain-server
title: Multichain Relayer Server
sidebar_label: Multichain Relayer Server
---



The [Multichain Relayer Server](https://github.com/near/multichain-relayer-server) facilitates cross-chain transactions and enables Chain Abstraction.

## Overview

The main function of this server is interfacing with foreign chain RPCs sending both presigned funding transactions to cover gas and the actual presigned transaction once the funding is done. 

Although the multichain relayer is a server in current design of this system, the goal is to package this as a library that can be called on the client side of the wallet. This will make the system more decentralized.

:::tip
The Multichain Relayer is meant to be deployed alongside the [Gas Station Event Indexer](https://github.com/near/gas-station-event-indexer) on the same server so that the gas station event indexer can call the multichain relayer server via IPC instead of having to send the request over the network introducing extra latency to the system.
:::

## Technical system design

Below is a design diagram of the entire multichain relayer system:

![multichain_relayer_technical_design.png](/docs/multichain_relayer_technical_design.png)

- The [gas station contract](https://github.com/near/multichain-gas-station-contract) and the [MPC signing service contract](https://github.com/near/mpc-recovery/tree/main/contract) are in the green box which take place on NEAR.
- This multichain relayer server focuses on the purple/blue Multichain Relayer Core Backend Services Box in the middle and the connections to the XChain systems in the red box via RPCs.
- The XChain Settlement that's happening in the yellow box is currently manual and will be automated in the future.

## Paymaster

A paymaster represents an address on a destination chain that holds a balance of that chain’s native gas token:
- User addresses on destination chains will be funded directly from paymaster accounts.
- Partners that want to integrate with the Multichain Gas Relayer service need to create, fund, and manage paymaster accounts on the destination chains that they want to have support for.
- [Manual settlement](gas-station.md#settlement) between the [NEAR Gas Station contract](gas-station.md) and paymaster accounts are also required on a regular basis to ensure a consistent balance of funds.

## System workflow

1. The wallet sends a NEAR transaction to the gas station contract that contains 2 actions:
   1. A transfer of `NEAR` (or FT Transfer in the future) to cover gas on the foreign chain
   2. A `create_transaction` function call to the gas station contract `canhazgas.testnet` containing the unsigned foreign chain transaction to be signed by the MPC signing service, assuming the unsigned transaction passes validation.
2. The Gas Station Contract calls the MPC signing service to sign both a funding transaction, which ensures the user's foreign chain account has sufficient gas to execute the desired transaction, and signs the unsigned foreign chain transaction.
3. Upon receipt of both the signed transactions, the Gas Station Contract emits an event which is picked up by the indexer, which then calls the `/send_funding_and_user_signed_txns` with the 2 signed transactions from the indexer.
4. The multichain relayer server sends the funding transaction to the foreign chain RPC to fund the user's account with gas.
5. After the gas funding transaction is confirmed, the multichain relayer server calls the foreign chain RPC again to send the signed transaction initiated by the user in step 1.
6. The Cross Chain Settlement takes care of selling the extra `NEAR` being sent to the gas station contract for gas tokens on foreign chains as well as bridging the tokens to the other chains. This process is currently manual, but will be automated in partnership with market makers in the future.

## Relayer Server Endpoints

1. `/send_funding_and_user_signed_txns` which handles both
   1. Funding the user's XChain account with gas from the paymaster treasury account, which is provided as a raw signed transaction
   2. Sending the user's raw signed transaction (in hexadecimal in EVM case) after the funding transaction has been confirmed on the foreign chain

## Supported Chains

- BSC testnet
- BSC mainnet, Ethereum mainnet, and more chains coming soon!

:::info
Check the Relayer's [GitHub repository](https://github.com/near/multichain-relayer-server) to learn more about upcoming features and updates.
:::

## Limitations

When using the Multichain Gas relayer solution, some limitations should be considered. Here's a list of potential issues you might encounter, and suggested ways to mitigate them:
- Not enough gas for a cross-chain transaction to get included in time.
  - **Solution:** overcharge for gas at the gas station and when constructing the transaction include more than the average gas price.
- Slippage violations causing the gas token or foreign chain Fungible Token to get refunded to the user's foreign chain address.
  - **Solution:** encourage your users to use high slippage settings in volatile or low liquidity market conditions.
  - **Solution:** if such error occurs, make the user aware of what happened and that funds were not lost.
  - **Note:** in future versions the solution will support retrying transactions.
- Nonce issues if Paymaster rotation isn't done properly. This issue is a function of concurrent usage, blockchain finality time, and the number of paymaster treasury accounts that the [Gas Station](gas-station.md) is rotating through.
  - **Solution:** use a blockchain that has faster finality.
  - **Solution:** increase the number of paymaster treasury accounts through which the gas station rotates.

## Total Time expectations for end users

It depends on the chain, but in our current estimation 50-90% of the time will be on NEAR calling and waiting for the signing to complete on the MPC service. 
The signing service will take 15-30 seconds. 
We assume that both the signing of the foreign chain transaction and the gas funding transaction happen in parallel. 
On BSC mainnet (not beaconchain which has 1 second finality) with 3 second blocktimes there should be 2 blocks for confirmation optimistically bringing the total to 6 seconds optimistically/transaction on BSC. 
We need to make 2 transactions, so that's 12-24 seconds on BSC assuming 2-4 blocks for finality. Add in some network overhead for each step in the process, especially the indexer picking up the emitted event (~5-7 seconds), and we're at 30-60 seconds/transaction on BSC. 
For Solana it would be closer to 20-30 seconds (0.4 second block time, 1 block confirmation). See [table 1](https://usa.visa.com/solutions/crypto/deep-dive-on-solana.html) for more confirmation times. 

L2 real finality times can over a day for finality unless we trust a centralized sequencer for soft confirmations, which may be as fast as a few seconds as in the case of [zksync era](https://era.zksync.io/docs/reference/concepts/finality.html#instant-confirmations).

The difference between optimistic or soft confirmations vs real finality is something we are considering. We may get better finalized guarantees when the [Eigenlayer-Near Partnership is live](https://pages.near.org/blog/near-foundation-and-eigen-labs-partner-to-enable-faster-cheaper-web3-transactions-for-ethereum-rollups-via-eigenlayer/). 3-4 second finality for all ETH L2s is much more manageable.
