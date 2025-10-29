---
id: near-conector
title: NEAR Connect Tutorial
description: "Connect users to NEAR wallets with a secure, sandbox-based connector library"
---
import {CodeTabs, Language, Github} from "@site/src/components/UI/Codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `@hot-labs/near-connect` library provides a secure, zero-dependency wallet connector for NEAR blockchain with a unique sandbox-based architecture. Unlike traditional wallet selectors, it offers a dynamic manifest system that allows wallets to be added and updated without requiring developers to update their dependencies.

![Preview](https://github.com/user-attachments/assets/c4422057-38bb-4cd9-8bd0-568e29f46280)

:::tip Why NEAR Connect?

- **Secure Execution**: Wallet scripts run in isolated sandboxed iframes for maximum security
- **Dynamic Wallets**: Wallets are loaded from a manifest and can be updated without code changes
- **Zero Dependencies**: Lightweight library with no external dependencies
- **Automatic Detection**: Supports both injected wallets (extensions) and manifest-based wallets

:::

:::info

Check other options to let users login into your application and use NEAR accounts in the [Web Login](../../concepts/web-login.md) section

:::

:::tip Working Example

For a complete working example with React, check out the [hello-near-connector repository](https://github.com/near-examples/hello-near-connector) which demonstrates all features in action.

:::

---

## Installation

Install the `@hot-labs/near-connect` package along with its required peer dependencies:

```bash
npm install @hot-labs/near-connect \
  @near-js/providers \
  @near-js/utils
```

:::tip How It Works

Unlike traditional wallet selectors that bundle wallet code, NEAR Connect uses a **manifest-based approach**:

1. Wallet providers register their integration scripts in a public manifest
2. The connector dynamically loads wallet scripts when users want to connect
3. Wallet code runs in **isolated sandboxed iframes** for security
4. All wallets implement a standard `NearWallet` interface
5. Communication happens via secure `postMessage` API

This architecture eliminates the need to install individual wallet packages and ensures wallet code can be updated independently from your app.

:::

---

## Creating the Connector

Initialize the `NearConnector` instance in your application. For a complete reference of the `NearConnector` class implementation, see the [source code on GitHub](https://github.com/azbang/hot-connector/blob/main/near-connect/src/NearConnector.ts).

```tsx title="lib/near.ts"
// Basic connector for NEAR testnet
import { NearConnector } from "@hot-labs/near-connect";

connector = new NearConnector({ network: "testnet" });
```

```tsx title="lib/near.ts"
// Full configuration example
import { NearConnector } from "@hot-labs/near-connect";

connector = new NearConnector({
  network: "testnet", // or "mainnet"
  
  // Optional: WalletConnect support for mobile wallets
  walletConnect: {
    projectId: "YOUR_PROJECT_ID",
    metadata: {
      name: "Your App Name",
      description: "Your App Description",
      url: "https://yourapp.com",
      icons: ["https://yourapp.com/icon.png"],
    },
  },
  
  // Optional: Require specific wallet features
  features: {
    signMessage: true,  // Only show wallets that support message signing
    signTransaction: false,
  },
  
  // Optional: Auto-connect to previously used wallet
  autoConnect: true,
  
  // Optional: Request access key for contract interaction
  connectWithKey: {
    contractId: "your-contract.testnet",
    methodNames: ["method1", "method2"],
    allowance: "250000000000000", // 0.25 NEAR
  },
});
```

### Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `network` | `"mainnet"` \| `"testnet"` | NEAR network to connect to |
| `walletConnect` | `object` | WalletConnect configuration for mobile wallets |
| `features` | `Partial<WalletFeatures>` | Filter wallets by supported features |
| `autoConnect` | `boolean` | Auto-reconnect to last used wallet (default: `true`) |
| `connectWithKey` | `object` | Request function call access key during sign-in |
| `manifest` | `string` \| `object` | Custom wallet manifest URL or object |
| `storage` | `DataStorage` | Custom storage implementation (default: `LocalStorage`) |
| `logger` | `Logger` | Custom logger for debugging |

---

## Event Listeners and Subscriptions

The connector uses the Observer Pattern (pub/sub). Subscribe to wallet events to react to connection changes. For a complete reference of available events, see the [NearConnector source code](https://github.com/azbang/hot-connector/blob/main/near-connect/src/NearConnector.ts).

### Available Events

```tsx
import { connector } from "./lib/near";

// Listen for successful sign-in
connector.on("wallet:signIn", async({ wallet, accounts, success }) => {
  const address = await wallet.getAddress();
  // or 
  const address2 = accounts[0].accountId;
  console.log("User signed in:", address);
  console.log("Wallet:", wallet.manifest.name);
});

// Listen for sign-out
connector.on("wallet:signOut", () => {
  console.log("User signed out");
  // Clear user data, redirect, etc.
});

// Listen for wallet list changes (added/removed debug wallets)
connector.on("selector:walletsChanged", () => {
  console.log("Available wallets changed");
  // This fires when debug wallets are registered or removed
});

// Listen for manifest updates
connector.on("selector:manifestUpdated", () => {
  console.log("Wallet manifest has been updated");
  // This fires when the wallet manifest is refreshed or updated
});
```

### Event Types

| Event | Payload | Description |
|-------|---------|-------------|
| `wallet:signIn` | `{ wallet, accounts, success }` | Emitted when user successfully signs in |
| `wallet:signOut` | `{}` | Emitted when user signs out |
| `selector:walletsChanged` | `{}` | Emitted when debug wallets are added/removed |
| `selector:manifestUpdated` | `{}` | Emitted when wallet manifest is refreshed or updated |

### Managing Event Listeners

```tsx
// Listen once (auto-removes after first trigger)
connector.once("wallet:signIn", ({ accounts }) => {
  console.log("First sign-in:", accounts[0].accountId);
});

// Remove specific listener
const handleSignOut = () => console.log("Signed out");
connector.on("wallet:signOut", handleSignOut);
connector.off("wallet:signOut", handleSignOut);

// Remove all listeners for an event
connector.removeAllListeners("wallet:signIn");

// Remove all listeners for all events
connector.removeAllListeners();
```

---

## Connecting to a Wallet

### Connect with Wallet Selection

When you call `connect()` without arguments, the connector shows a modal with available wallets:

```tsx
try {
  const wallet = await connector.connect();
  console.log("Connected to:", wallet.manifest.name);
  
  // Get user accounts
  const accounts = await wallet.getAccounts();
  console.log("Account ID:", accounts[0].accountId);
} catch (error) {
  console.error("Connection failed:", error);
  // User rejected or connection failed
}
```

### Connect to Specific Wallet

If you know the wallet ID, connect directly:

```tsx
// Connect to a specific wallet by ID
await connector.connect("meteor-wallet");

// Available wallet IDs from manifest:
// "meteor-wallet", "mynearwallet", "hot-wallet", 
// "nightly-wallet", "near-mobile-wallet", etc.
```

### Get Connected Wallet

Retrieve the currently connected wallet:

```tsx
try {
  const { wallet, accounts } = await connector.getConnectedWallet();
  console.log("Already connected:", accounts[0].accountId);
} catch (error) {
  console.log("No wallet connected");
}
```

### Disconnect Wallet

```tsx
// Disconnect current wallet
await connector.disconnect();

// Or disconnect a specific wallet instance
const wallet = await connector.wallet();
await connector.disconnect(wallet);
```

---

## Calling View Methods

View methods are read-only and free to call. You can call them directly via RPC without user authentication:

```tsx
import { JsonRpcProvider } from "@near-js/providers";

const provider = new JsonRpcProvider({ url: "https://test.rpc.fastnear.com" });

console.log("Greeting:", await provider.callFunction("hello.near-examples.testnet","get_greeting",{}));
```

---

## Calling Change Methods

Change methods modify blockchain state and require user authentication. Get the wallet instance and call methods:

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

### Send Multiple Transactions

Execute multiple transactions atomically:

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

### Sign Messages (NEP-413)

Sign arbitrary messages for authentication or verification:

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

## Advanced Features

### Available Wallets

Get the list of wallets available to connect:

```tsx
// Wait for manifest to load
await connector.whenManifestLoaded;

// Get all wallets that match your feature requirements
const wallets = connector.availableWallets;

wallets.forEach(wallet => {
  console.log(wallet.manifest.name, wallet.manifest.id);
  console.log("Features:", wallet.manifest.features);
});
```

### Switch Network

Change between mainnet and testnet:

```tsx
// Switch to mainnet (disconnects current wallet)
await connector.switchNetwork("mainnet");

// Switch to testnet
await connector.switchNetwork("testnet");
```

### Debug Wallets

Register custom wallet manifests for testing:

```tsx
// Register a debug wallet from JSON
const manifest = await connector.registerDebugWallet({
  id: "my-test-wallet",
  name: "Test Wallet",
  type: "sandbox",
  executor: "https://localhost:3000/wallet.js",
  icon: "https://localhost:3000/icon.svg",
  features: {
    signMessage: true,
    testnet: true,
  },
  permissions: {
    network: true,
    storage: true,
  },
});

// Remove debug wallet
await connector.removeDebugWallet("my-test-wallet");
```

### Custom Storage

Implement custom storage for connection persistence:

```tsx
import { DataStorage } from "@hot-labs/near-connect";

class CustomStorage implements DataStorage {
  async get(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }
  
  async set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }
  
  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

const connector = new NearConnector({
  storage: new CustomStorage(),
  network: "mainnet",
});
```

### Injected Wallets

NEAR Connect automatically detects browser extension wallets that implement the injection standard:

```tsx
// In your wallet extension
class NearWallet {
  manifest: { ... };
  signIn() {}
  // all implementation
}

window.addEventListener("near-selector-ready", () => {
  window.dispatchEvent(new CustomEvent("near-wallet-injected", { detail: new NearWallet() }));
});
```

---

## React Integration

For React applications, we recommend using a custom hook to manage the connector state and lifecycle. Check out the [`useNear` hook](https://github.com/near-examples/hello-near-connector/blob/main/src/hooks/useNear.jsx) from the example repository:

```tsx
import { useNear } from './hooks/useNear';

function MyComponent() {
  const { 
    connector, 
    wallet, 
    accountId, 
    isConnected, 
    signIn, 
    signOut 
  } = useNear();

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected: {accountId}</p>
          <button onClick={signOut}>Disconnect</button>
        </div>
      ) : (
        <button onClick={signIn}>Connect Wallet</button>
      )}
    </div>
  );
}
```

The hook handles:
- Connector initialization
- Auto-reconnect on page load
- Event listener management and cleanup
- Wallet state synchronization
- Error handling

For a complete implementation, see the [hello-near-connector example](https://github.com/near-examples/hello-near-connector).

---