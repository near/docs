---
description: Example of signing solver intent
title: Solver example
sidebar_label: Solver example
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Solver example

Example of how to create response for quote for solvers using TypeScript

Steps:
1. Build a message response based on the `params`
2. Generate a nonce
3. Serialize the intent
4. Sign the message

Here `params`  has same type as what you receive from a relay in the [**"quote"** event](solver-relay.md#2-receive-quote-requests):


```typescript
params: {
  defuse_asset_identifier_in: string;
  defuse_asset_identifier_out: string;
  exact_amount_in: string | undefined;
  exact_amount_out: string | undefined;
  min_deadline_ms: number;
},
```

## Methods

<Tabs>
<TabItem value="generateNonce" label="generateNonce()">

You can generate the nonce with the `generateNonce()` method:

```typescript
const generateNonce = async (): Promise<string> => {
    const randomArray = randomBytes(32);
    return randomArray.toString('base64');
    if (await this.isNonceUsed(nonceString)) { //this step can be skipped but if nonce is already used quote wont be taken into account
      return this.generateNonce();
    } else {
     return nonceString;
    }
}
const isNonceUsed = async (nonce: string) => {
    const account = getAccount(); //function that will return Account instance(from "near-api-js") of solver Near account
    return await account.viewFunction({
      contractId: defuseContract,
      methodName: 'is_nonce_used',
      args: {
        account_id: account.accountId,
        nonce,
      },
    });
}
```

</TabItem>
<TabItem value="serializeIntent" label="serializeIntent()">

You can serialize the response message with the `serializeIntent()` method:

```typescript
import { BorshSchema, borshSerialize } from 'borsher';

const standardNumber = {
    ["nep413"]: 413,
  };
const Nep413PayloadSchema = BorshSchema.Struct({
  message: BorshSchema.String,
  nonce: BorshSchema.Array(BorshSchema.u8, 32),
  recipient: BorshSchema.String,
  callback_url: BorshSchema.Option(BorshSchema.String),
});
const serializeIntent = (
  intentMessage: any,
  recipient: string,
  nonce: string,
  standard: string,
): Buffer => {
  const payload = {
    message: intentMessage,
    nonce: base64ToUint8Array(nonce),
    recipient,
  };
  const payloadSerialized = borshSerialize(Nep413PayloadSchema, payload);
  const baseInt = 2 ** 31 + standardNumber[standard];
  const baseIntSerialized = borshSerialize(BorshSchema.u32, baseInt);
  const combinedData = Buffer.concat([baseIntSerialized, payloadSerialized]);
  return crypto.createHash('sha256').update(combinedData).digest();
}

const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
```

</TabItem>
<TabItem value="signMessage" label="signMessage()">

You can sign the response message using the `signMessage()` method:

```typescript
const signMessage = async (message: Uint8Array) { //you can implement your own way to sign message with near wallet
  return (await keyStore.getKey(nearNetworkId, accountId)).sign(message); //keyStore is instance of KeyStore(from "near-api-js")
}
```

</TabItem>
</Tabs>


## Example

```typescript
import bs58 from 'bs58';

const amount = "1000" //calculated amount solver want to propose
const standard = "nep413";
const message = {
  signer_id: "...", //account id of solver account that will be used for signing
  deadline: {
    timestamp: 10000, //timestamp deadline in seconds
  },
  intents: [
    {
      intent: 'token_diff',
      diff: {
        [params.defuse_asset_identifier_in]: !!params.exact_amount_in
          ? params.exact_amount_in
          : amount,
        [params.defuse_asset_identifier_out]: `-${
          !!params.exact_amount_out ? params.exact_amount_out : amount
        }`,
      },
    },
  ],
};
const messageStr = JSON.stringify(message);
const nonce = await generateNonce();
const recipient = defuseContract; //for example "intents.near"
const quoteHash = serializeIntent(messageStr, recipient, nonce, standard);
const signature = signMessage(quoteHash);

const resp: IQuoteObject = {
  quote_id,
  quote_output: {},
  signed_data: {
    standard,
    payload: {
      message: messageStr,
      nonce,
      recipient,
    },
    signature: `ed25519:${bs58.encode(signature.signature)}`,
    public_key: `ed25519:${bs58.encode(signature.publicKey.data)}`,
  },
};
if (!params.exact_amount_in) {
  resp.quote_output.amount_in = amount;
} else {
  resp.quote_output.amount_out = amount;
}
```
