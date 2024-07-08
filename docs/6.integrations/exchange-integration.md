---
id: exchange-integration
title: Exchange Integration
sidebar_label: Exchange Integration
---

## Integration Reference {#integration-reference}

- [Balance Changes](/integrations/balance-changes)
- [Accounts](/integrations/accounts)
- [Fungible Tokens](/integrations/fungible-tokens)
- [Implicit Accounts](/integrations/implicit-accounts)

### Transaction Reference Links {#transaction-reference-links}

 - [Basics](/concepts/protocol/transactions)
 - [Specifications](https://nomicon.io/RuntimeSpec/Transactions)
 - [Constructing Transactions](/integrations/create-transactions)

## Blocks and Finality {#blocks-and-finality}

Some important pieces of information regarding blocks and finality include:

- Expected block time is around 1s and expected time to finality is around 2s. The last final block can be queried by
  specifying `{"finality": "final"}` in the block query. For example, to get the latest final block on mainnet, one can run

```bash
http post https://rpc.mainnet.near.org method=block params:='{"finality":"final"}' id=123 jsonrpc=2.0
```

- Block height are not necessarily continuous and certain heights may be skipped if, for example, a block producer for that height is offline. For example, after a block at height 100 is produced, the block at height 101 may be skipped. When block at height 102 is produced, its previous block is the block at height 100.

- Some blocks may not include new chunks if, for example, the previous chunk producer is offline. Even though in the RPC
  return result every block will have non-empty `chunks` field, it does not imply that there is a new chunk included in the block.
  The way to tell whether the chunk is included in the block is to check whether `height_included` in the chunk is the same
  as the height of the block.

## Running an Archival Node {#running-an-archival-node}
Please refer to configuration changes required in `config.json` for archival node by referring to the documentation on [Run an Archival Node](https://near-nodes.io/archival/run-archival-node-with-nearup).

## Staking and Delegation {#staking-and-delegation}

- [https://github.com/nearprotocol/stakewars](https://github.com/nearprotocol/stakewars)
- [https://github.com/near/core-contracts](https://github.com/near/core-contracts)

:::tip Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol" target="_blank" rel="noopener noreferrer"> Ask it on StackOverflow! </a>
:::
