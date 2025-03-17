---
id: transfer
title: Transfer Near tokens on behalf of a controlled account
sidebar_label: Act on behalf of controllable account
---

In this part of the tutorial, we'll dig into how transaction arguments are built, how to request a signature according to the arguments from the smart contract, and how to broadcast the signed transaction into the network.

## Building transaction arguments

Now that we've set up the account and derived the public key, it's time to build the transaction arguments.

For a transaction to be valid, we must attach both a `nonce` and a `recent_block_hash` - these values ensure that the transaction is unique and prevent replay attacks.

Let's fetch `nonce` first:

```ts
const accessKey = await near.connection.provider.query({
  request_type: "view_access_key",
  account_id: controllableAccountId, // "controllable.testnet"
  public_key: derivedPublicKey, // derived in the previous chapter
  finality: "optimistic",
});

const nonce = accessKey.nonce;
```

And `recent_block_hash`, now it's your turn:

```ts
const block = await near.connection.provider.block({
  finality: "final",
});

const blockHash = block.header.hash;
```

Now that we have everything needed, let's build transaction arguments:

```ts
const transactionArgs = {
  signer_id: controllableAccountId, // "controllable.testnet"
  signer_pk: derivedPublicKey, // derived in the previous chapter
  nonce: (nonce + 1).toString(),
  block_hash: blockHash,
};
```

## Requesting signature from Smart Contract

After building transaction arguments, the next step is to request a signature from the smart contract.

```ts
const adminAccount = await near.account("admin.testnet");

const outcome = await adminAccount.functionCall({
  contractId: contractId, // "broken-rock.testnet"
  methodName: "transfer_on_behalf_of",
  args: {
    args: transactionArgs,
  },
  gas: "300000000000000",
  attachedDeposit: "100000000000000000000000", // 0.1 NEAR is enough in most cases to pay MPC fee
});
```

## Broadcasting the transaction

With the signature in hand, we are now ready to send it to the network!

```ts
// Get the signed transaction from the outcome
result = providers.getTransactionLastResult(outcome);
const signedTx = new Uint8Array(result);

// Send the signed transaction
const transferOutcome = await near.connection.provider.sendJsonRpc(
  "broadcast_tx_commit",
  [Buffer.from(signedTx).toString("base64")]
);

console.log(
  `https://nearblocks.io/txns/${transferOutcome.transaction_outcome.id}`
);
```

## Final Thoughts

With that, we've successfully completed the full journey of acting on behalf of another Near account securely and transferred to yourself 0.1 NEAR from a controllable account. By following this process, you now have a solid understanding of how to manage external accounts on Near using Multi-Party Computation (MPC).
