---
description: Frequently Asked Questions
---

# FAQs

### Is there a testnet deployment?

There's no `testnet` deployment and no plans for it. We recommend testing on NEAR `mainnet` with using separate dev/test NEAR accounts.

### Is there support for native NEAR deposits?

Only  `ft_transfer_call` can be used to deposit NEP-141 tokens from Near to `intents.near`:


```
<TOKEN_ACCOUNT_ID>::ft_transfer_call({
  "receiver_id": "intents.near",
  "amount": "1234",
  "msg": "{\"receiver_id\": \"<ACCOUNT_ID>\"}"
})
```

Here is an example [receipt](https://nearblocks.io/txns/EwmeXzZJStA6e5JB49vgxNYJDemqeYCFGvPH7zapP1Fw#execution#4tyaF4MnMcNQVqrg3kXzsH9277ErDeCXS9g3c2keV38G) for that.\
Parameter `msg` can also be empty, so that funds will be deposited to `sender_id` (i.e. caller of `ft_transfer_call`). Here is an example of such [transaction](https://nearblocks.io/txns/HoWpAR8dF5azsUVaQWrBW5VsRve5X4dwr9GGiHWj3R1P#execution).

### `tx_hash` in the `recent_deposit` response for all SOL deposits is empty

This information is not available for Solana because the mechanism of deposit tracking works a bit differently there.

### Is there a reason why my UTXOs aren't being swept on the BTC ? I sent 5,000 sats

This is a very small amount that is considered to be "dust" and there is a special business logic to process such small amount.

### How does the deposit process work?

The deposit process begins once the transfer transaction on the foreign network has been completed.  When the balance of the user's unique deposit address has become positive our indexer generates a deposit event and assigns it a `PENDING` status.

The next step is collecting the current tokens in storage. The result of this process will be either a `COMPLETED` or `FAILED` status. Deposits with a `FAILED` status are currently handled manually and eventually updated to the `COMPLETED` status.

On EVM networks, deposits can bypass the `PENDING` status due to faster processing and transfer completion times.

The data structure for the `PENDING` and `FAILED` statuses is identical to that of the `COMPLETED` status.

Regarding BTC deposits: If you want to make a deposit to an account that hasn’t yet been connected to the application - this is possible but requires extreme caution. You can request a deposit address by calling the bridge API (`deposit_address`) and specifying the `account_id` parameter. The `account_id` can be a NEAR account, an EVM address, or a SOL address to which you have access.

It is recommended starting with a small amount for experimentation. After the deposit is completed, you can connect wallet and check the tokens.
