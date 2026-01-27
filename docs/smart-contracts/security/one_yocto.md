---
id: one-yocto
title: Ensure it is the User (1yⓃ)
description: "Learn about the one yocto security pattern in NEAR smart contracts for verifying account ownership and preventing unauthorized access."
---

NEAR uses a system of [Access Keys](../../protocol/access-keys.md) to simplify handling accounts.There are basically two type of keys: `Full Access`, that have full control over an account (i.e. can perform all [actions](../anatomy/actions.md)), and`Function Call`, that only have permission to call a specified smart contract's method(s) that _do not_ attach Ⓝ as a deposit.

For example, developers can choose to request creating a `Function Call` key when the user logs in, so the application can call specific methods on a smart contract without needing to ask the user to sign every time.

While this is very user friendly for most cases, it is important to be careful in scenarios involving transferring of valuable assets like [NFTs](../../primitives/nft/nft.md)
or [FTs](../../primitives/ft/ft.md). In such cases, you need to ensure that the person asking for the asset to be transfer is **actually the user**.

One direct and inexpensive way to ensure that the user is the one calling is by requiring to attach `1 yⓃ`. In this case, the user will be
redirected to the wallet and be asked to accept the transaction. This is because, once again, only the `Full Access` key can be used to send NEAR.
Since the `Full Access` key is only in the user's wallet, you can trust that a transaction with `1 yⓃ` was made by the user.