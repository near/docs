## POSTMORTEM June 9th, 2021

### Quick summary

On December 2, 2020, we noticed the determined way of creating [transaction hash collisions on Testnet](https://github.com/near/nearcore/security/advisories/GHSA-2v6r-g342-282f), then also on Mainnet.

It still affects the data representation in some services such as [Near Explorer](https://explorer.near.org).

[The fix](https://github.com/near/nearcore/pull/4064) was merged on 11 of March 2021 and released in [1.19.0](https://github.com/near/nearcore/releases/tag/1.19.0), so new examples of reproducible hash collisions will not appear again.

### In details

There was a possibility to apply the same transaction two or more times.
Such transactions are logically different objects, but they have the same hash.
It means that now, in the general case, the transaction hash does not fully identify the transaction. 

We observe some limitations because of that:
- It's not possible to get the non-first appearance of transaction via [RPC](https://docs.near.org/docs/api/rpc#transaction-status).
- There is no information about the non-first appearance of transaction and all related entities in the [Indexer DB](https://github.com/near/near-indexer-for-explorer).
- As a result, [Near Explorer](https://explorer.near.org) miss such transactions, which may look confusing.

We are aware of these appearances on Mainnet:
- ...
- ...

**TODO** we should collect and report here about all such cases on Mainnet (@telezhnaya will do that)

The existence of this issue does not mean that the blockchain is corrupted somehow or there are problems with balances.
Since we've fixed the issue, the only problem now is the data representation.

**TODO** add the high-level explanation about the solution that we've come up with. (@bowenwang1996 please write here 1-2 sentences)

We are confident that such a problem will never repeat again.
Sorry for the inconvenience caused.

