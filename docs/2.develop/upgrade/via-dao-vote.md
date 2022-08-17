---
id: dao-updates
---

# DAO-Governed Updates

When you first deploy a contract to [mainnet](/concepts/basics/networks), you will likely keep control of a [Full Access key](/concepts/basics/accounts/access-keys) for the contract. This puts the contract in "trusted" mode, in which you and other maintainers can change it at-will (which means your users need to trust you to not steal their funds, change their votes, or otherwise behave maliciously). This is fine for early-stage contracts & apps, but like any blockchain, NEAR allows you to do better.

When you're ready, you can remove all Full Access keys. This means no one will be able to unilaterally upgrade the contract. Instead, the contract will be upgradable only via a [DAO](https://whiteboardcrypto.com/what-is-a-dao/). Before you remove all Full Access keys, you implement two methods:

1. A method to store a proposed new version of the contract (as Wasm bytes, in an inspectable way so DAO members can verify that the bytes match a specific change to the source code). This function is safe, and could be called by anyone.
2. Another method to actually deploy a proposed new version. This method should check that it is being called by your DAO contract. The account name of the DAO could be set in your contract's storage with a field like `owner_id`, so that it is itself upgradable via the same process.

Here's [how Ref Finance does this](https://github.com/ref-finance/ref-contracts/blob/b3aa78e83f2459017c9301d1f1b8d1ba8bcf6e7e/ref-exchange/src/owner.rs#L52-L107), [how SputnikDAO does it](https://github.com/near-daos/sputnik-dao-contract/blob/a8fc9a8c1cbde37610e56e1efda8e5971e79b845/sputnikdao2/src/types.rs#L74-L142), and some [other tips](https://hackmd.io/_UMem3SNSAeIqQASlRZahg).

That's all we have for now! This page is a stub. Sorry about that. Can you help?
