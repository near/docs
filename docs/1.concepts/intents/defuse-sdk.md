---
description: Build a dapp
---

# SDK

:::info
SDK is under heavy development and the API is highly unstable.
:::

### High Level Architecture

The Defuse Protocol SDK is built on two core components that work together to provide a robust and flexible solution for cross-chain asset swaps:

#### 1. State Machines (XState)

Our swap logic is driven by three core state machines, implemented using XState:

* **Deposit Machine:** Manages the entire deposit process from initiation to completion.
* **Swap Machine:** Manages the entire swap process from initiation to completion.
* **Withdraw Machine:** Manages the entire withdrawal process from initiation to completion.

These state machines are framework-agnostic and can be used on both client and server sides. They provide a clear and predictable flow for complex cross-chain swap operations, handling various states, transitions, and edge cases.

Key benefits of using state machines:

* Clear visualization of the swap process
* Easier management of complex logic and edge cases
* Improved testability and maintainability
* Framework-agnostic implementation



**Deposit Machine Chart**

[design](https://stately.ai/registry/editor/embed/8675c51c-3db8-471c-87b4-71331e02e51c?machineId=06cd9c41-9736-41b8-a783-c1f78f420349&mode=design)

<figure><img src="../.gitbook/assets/deposit-ui.png" alt="" /><figcaption><p>Deposit Machine</p></figcaption></figure>

**Swap Machine Chart**

[design](https://stately.ai/registry/editor/embed/8675c51c-3db8-471c-87b4-71331e02e51c?machineId=f396c943-2595-4fdd-b245-32a06d3b85a1)

<figure><img src="../.gitbook/assets/swap-ui.png" alt="" /><figcaption><p>Swap machine</p></figcaption></figure>

**Withdraw Machine Chart**

[design](https://stately.ai/registry/editor/embed/8675c51c-3db8-471c-87b4-71331e02e51c?machineId=5f2320b2-484c-4d97-b966-1544f9e09248&mode=design)

<figure><img src="../.gitbook/assets/withdraw-ui.png" alt="" /><figcaption><p>Withdraw Machine</p></figcaption></figure>

#### 2. Defuse SDK

The Defuse SDK wraps the state machine logic and provides a complete solution as React components and hooks. This layer abstracts the complexity of state management and provides a user-friendly interface for developers to integrate swap functionality into their applications.

Key features of the Defuse SDK:

* **React Components**: Ready-to-use components like `SwapWidget` that encapsulate the entire swap interface.
* **Context Provider**: `SwapWidgetProvider` that manages the global state and provides necessary context to child components.
* **Hooks**: Custom hooks that allow developers to interact with the swap logic programmatically.
* **Theming**: Built-in theming support for easy customization.

#### Architecture Diagram

```
+-------------------+
|    Application    |
+-------------------+
          |
          v
+-------------------+
|    Defuse SDK     |
| (React Components |
|     and Hooks)    |
+-------------------+
          |
          v
+-------------------+
|   State Machines  |
| (Quote & Swap)    |
+-------------------+
          |
          v
+-------------------+
| Blockchain/Web3   |
|    Interactions   |
+-------------------+
```

This architecture allows for a separation of concerns, where the core swap logic is handled by the state machines, while the SDK provides an easy-to-use interface for React applications. Developers can leverage the power of state machines for complex logic handling while enjoying the simplicity of React components for UI integration.

#### Use Defuse SDK

Install the package:

```
yarn add @defuse-protocol/defuse-sdk
```

Now that you’ve installed the SDK, you can use it in your application:

```javascript
"use client"

import { SwapWidget } from "@defuse-protocol/defuse-sdk"

export default function MyApp() {
  return (
    <div>
        <SwapWidget
            tokenList={tokenList}
            userAddress={userAddress}
            sendNearTransaction={sendNearTransaction}
            signMessage={signMessage}
            onSuccessSwap={onSuccessSwap}
            onNavigateDeposit={onNavigateDeposit}
            userChainType={userChainType}
            referral={referral}
          />
    </div>
  )
}
```
