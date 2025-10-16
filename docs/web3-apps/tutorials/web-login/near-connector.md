---
id: near-connector
title: NEAR Connect Tutorial
description: "Connect users to NEAR wallets with a secure, sandbox-based connector library"
---
import {CodeTabs, Language, Github} from "@site/src/components/UI/Codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `@hot-labs/near-connect` library provides a secure, zero-dependency wallet connector for NEAR blockchain with a unique sandbox-based architecture. Unlike traditional wallet selectors, it offers a dynamic manifest system that allows wallets to be added and updated without requiring developers to update their dependencies.

:::info Working Example

For a complete working example with React, check out the [hello-near-connector repository](https://github.com/near-examples/hello-near-connector) which demonstrates all features in action.

:::

![Preview](https://github.com/user-attachments/assets/c4422057-38bb-4cd9-8bd0-568e29f46280)


:::tip Why NEAR Connect?

- **Secure Execution**: Wallet scripts run in isolated sandboxed iframes for maximum security
- **Dynamic Wallets**: Wallets are loaded from a manifest and can be updated without code changes
- **Zero Dependencies**: Lightweight library with no external dependencies
- **Automatic Detection**: Supports both injected wallets (extensions) and manifest-based wallets

:::


---

## Installation

Install the `@hot-labs/near-connect` package along with its required peer dependencies:

```bash
npm install @hot-labs/near-connect \
  @near-js/providers \
  @near-js/utils
```

---

## Creating the Connector

Initialize the `NearConnector` instance in your application. For a complete reference of the `NearConnector` class implementation, see the [source code on GitHub](https://github.com/azbang/hot-connector/blob/main/near-connect/src/NearConnector.ts).

```tsx title="lib/near.ts"
// Basic connector for NEAR testnet
import { NearConnector } from "@hot-labs/near-connect";

connector = new NearConnector({ network: "testnet" });
```

<hr class="subsection" />

### Selecting Wallets

Unlike traditional wallet selectors that bundle wallet code, NEAR Connect uses a **manifest-based approach**:

1. Wallet providers register their integration scripts in a public manifest
2. The connector dynamically loads wallet scripts when users want to connect

This architecture eliminates the need to install individual wallet packages and ensures wallet code can be updated independently from your app.

```tsx
connector = new NearConnector({
  network: "testnet", // or "mainnet"
  features: {
    signMessage: true,  // Only show wallets that support message signing
    signTransaction: true,
    signInWithoutAddKey: true,
    signAndSendTransaction: true,
    signAndSendTransactions: true
  },
});
```

<hr class="subsection" />

### Creating an Access Key

The connector can request a [Function-Call Key](/protocol/access-keys#function-call-keys) for a specific contract on behalf of the user. This allows your app to interact with the contract without asking the user to sign every transaction.

```tsx title="lib/near.ts"
const connector = new NearConnector({
  network: "testnet", // or "mainnet"
  
  // Optional: Request access key for contract interaction
  connectWithKey: {
    contractId: "your-contract.testnet",
    methodNames: ["method1", "method2"],
    allowance: "250000000000000", // 0.25 NEAR
  },
});
```

---

## Signing In

The connector uses the Observer Pattern (pub/sub), for which we need to do two things:

1. Subscribe to the `signIn` event:

```tsx
connector.on("wallet:signIn", async({ wallet, accounts, success }) => {
  const address = await wallet.getAddress();
  console.log(`User signed in: ${address}`);
});
```

2. Call the `connect` function to open a modal where the user can select a wallet and sign in:

```tsx
<button onClick={() => connector.connect()}> Login </button>
```

---

## Signing Out

Similarly, to sign out we need to subscribe to the `signOut` event and call the `disconnect` function:

```tsx
// Listen for sign-out
connector.on("wallet:signOut", () => {
  console.log("User signed out");
});

// Disconnect current wallet
<button onClick={() => connector.disconnect()}> Logout </button>
```

---

## Calling Contract Method

To call a contract method, first get the connected wallet instance using `connector.wallet()`, then use the wallet's `signAndSendTransaction` method to make a function call:

```tsx
// Get the connected wallet
const wallet = await connector.wallet();

// Call a change method
const result = await wallet.signAndSendTransaction({
  receiverId: "hello.near-examples.testnet",
  actions: [
    {
      type: "FunctionCall",
      params: {
        methodName: "set_greeting",
        args: { greeting: "Hello from NEAR Connect!" },
        gas: "30000000000000", // 30 TGas
        deposit: "0", // No deposit
      },
    },
  ],
});

console.log("Transaction:", result.transaction.hash);
```

<details>

<summary> Read-only Methods </summary>

The `near-connector` does not provide a built-in way to call read-only (view) methods.

However, you can use the `@near-js/providers` package to create a JSON-RPC provider and call view methods directly:

```tsx
import { JsonRpcProvider } from "@near-js/providers";

const provider = new JsonRpcProvider({ url: "https://test.rpc.fastnear.com" });

const greeting = await provider.callFunction(
  "hello.near-examples.testnet",
  "get_greeting",
  {}
);
```

</details>

---

## Send Multiple Transactions

You can request the user to sign and send multiple transactions in parallel through a single prompt:

```tsx
const wallet = await connector.wallet();

const results = await wallet.signAndSendTransactions({
  transactions: [
    {
      receiverId: "token.near",
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "ft_transfer",
            args: {
              receiver_id: "alice.near",
              amount: "1000000",
            },
            gas: "30000000000000",
            deposit: "1", // 1 yoctoNEAR for security
          },
        },
      ],
    },
    {
      receiverId: "nft.near",
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "nft_mint",
            args: {
              token_id: "token-1",
              receiver_id: "alice.near",
            },
            gas: "30000000000000",
            deposit: "10000000000000000000000", // 0.01 NEAR
          },
        },
      ],
    },
  ],
});

console.log(`Completed ${results.length} transactions`);
```

---

### Sign Messages (NEP-413)

In NEAR, users can sign messages for authentication purposes without needing to send a transaction:

```tsx
const wallet = await connector.wallet();

const signature = await wallet.signMessage({
  message: "Please sign this message to authenticate",
  recipient: "your-app.near",
  nonce: Buffer.from(crypto.randomUUID()),
});

console.log("Signature:", signature.signature);
console.log("Public Key:", signature.publicKey);

// Verify the signature on your backend
```

---

## React Integration

For React applications, the `near-connector` can be easily integrated using a custom hook.

Check out our example [`useNear` hook](https://github.com/near-examples/hello-near-connector/blob/main/src/hooks/useNear.jsx) which handles:
- Connector initialization
- Auto-reconnect on page load
- Event listener management and cleanup
- Wallet state synchronization
- Error handling
