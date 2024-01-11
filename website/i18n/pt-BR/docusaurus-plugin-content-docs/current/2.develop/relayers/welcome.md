---
id: build-relayer
title: Building a Meta Transaction Relayer with NextJS
sidebar_label: Building a Relayer
---

This guide will walk you through the steps required to construct a meta transaction relayer using NextJS 13.

:::tip
This guide was originally created by [@microchipgnu](https://x.com/microchipgnu) and can be found in [hackmd](https://hackmd.io/@microchipgnu/meta-transactions-relayer-next-js?utm_source=preview-mode&utm_medium=rec).
:::

---

## Configuring the Environment

Before we begin, it’s crucial to configure our environment correctly. We need to set some environment variables. This is done in the .env file at the root of your project.

```bash
NEXT_PUBLIC_RELAYER_ACCOUNT_ID=xyz.testnet
RELAYER_ACCOUNT_PRIVATE_KEY=xyz
```

The `NEXT_PUBLIC_RELAYER_ACCOUNT_ID` is your public relayer account identifier and the `RELAYER_ACCOUNT_PRIVATE_KEY` is your relayer account’s private key.

## API Route Creation

The next step is creating the API route. For this, we need to take the following actions:

1. Navigate to the `./src/app/api/ directory`
2. Inside the api directory, create a new folder called relayer
3. Inside the relayer folder, create a new file named `route.ts`

Now, let’s fill `route.ts` with the following code:

```js
import { submitTransaction } from "@/utils/near/meta-transactions";
import { SCHEMA } from "@/utils/near/types/schema";
import { SignedDelegate } from "@near-js/transactions";
import { deserialize } from "borsh";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { delegated, network } = body;

  const deserializeDelegate = deserialize(
    SCHEMA,
    SignedDelegate,
    Buffer.from(new Uint8Array(delegated))
  );

  const result = await submitTransaction({
    delegate: deserializeDelegate,
    network,
  });

  return NextResponse.json(
    { result },
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
```

This script is responsible for receiving a delegated transaction, deserializing it, and submitting the transaction using the submitTransaction utility.

---

### Client Code Execution

The client code is divided into two parts. The first part signs a delegated transaction, and the second part submits the transaction through the relayer.

#### Signing a Delegated Transaction

We use the following code snippet to sign a delegated transaction:

```js
import { getKeys } from "@near-js/biometric-ed25519";
import { InMemoryKeyStore } from "@near-js/keystores";
import { actionCreators } from "@near-js/transactions";
import BN from "bn.js";
import { connect } from "./meta-transactions";

export const signDelegatedTransaction = async ({
  network,
  signer,
  privateKey,
  transaction,
  contractAddress,
}: {
  network: string;
  signer: string;
  privateKey: string;
  transaction: {
    methodName: string;
    args: any;
    gas: string | number;
    deposit: string | number;
  };
  contractAddress: string;
}) => {
  const keyStore = new InMemoryKeyStore();

  // TODO: Connect the user

  const signerAccount = await connect(signer, keyStore, network);

  const action = actionCreators.functionCall(
    transaction.methodName,
    JSON.parse(transaction.args),
    new BN(transaction.gas),
    new BN(transaction.deposit)
  );

  const delegate = await signerAccount.signedDelegate({
    actions: [action],
    blockHeightTtl: 600,
    receiverId: contractAddress,
  });

  return delegate;
};
```

This function receives several parameters, including `network`, `signer`, `privateKey`, `transaction`, and `contractAddress`. It generates a delegate using the `signedDelegate` method, which is later used to submit the transaction.

#### Submitting the Transaction via the Relayer

After signing the delegated transaction, we use the following code snippet to submit the transaction through the relayer:

```js
await fetch("/api/internal/near/submit-meta-transaction", {
  body: JSON.stringify({
    delegated: Array.from(encodeSignedDelegate(delegated)),
    network: "testnet",
  }),
  headers: {},
  method: "POST",
});
```

The `fetch` function sends a POST request to the API route we created earlier. The body of this request includes the delegated transaction and the network.
