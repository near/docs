---
id: transactions
title: Sending Transactions to Multiple Contracts
sidebar_label: Multiple Transactions
---

import {Github} from "@site/src/components/codetabs"

NEAR allows you to dispatch multiple transactions simultaneously, so users only interact with their wallet once. However, these transactions remain **independent** - if one fails, the others are not rolled back.

## Transaction Structure

Each transaction targets a specific contract and contains one or more actions:

<Github fname="index.js"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
    start="35" end="62" />

## Building Transactions

Let's break down the transaction structure:

### Guest Book Transaction

```javascript
const guestTx = {
  receiverId: GUEST_ADDRESS,
  actions: [
    {
      type: 'FunctionCall',
      params: {
        methodName: 'add_message',
        args: { text: greeting.value },
        gas: THIRTY_TGAS,
        deposit: GUEST_DEPOSIT
      }
    }
  ]
}
```

- `receiverId`: The contract account ID (`guestbook.near-examples.testnet`)
- `actions`: Array of actions to execute on this contract
- `methodName`: The contract method to call
- `args`: Arguments passed to the method
- `gas`: Gas limit (30 TGas = 30,000,000,000,000 gas units)
- `deposit`: NEAR tokens to attach (0 for regular, 0.1Ⓝ for premium)

### Hello NEAR Transaction

```javascript
const helloTx = {
  receiverId: HELLO_ADDRESS,
  actions: [
    {
      type: 'FunctionCall',
      params: {
        methodName: 'set_greeting',
        args: { greeting: greeting.value },
        gas: THIRTY_TGAS,
        deposit: NO_DEPOSIT
      }
    }
  ]
}
```

Similar structure, but:
- Targets a different contract (`hello.near-examples.testnet`)
- Calls `set_greeting` method
- No deposit required

## Signing and Sending

The wallet selector handles signing and broadcasting:

<Github fname="wallet.js"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/wallet.js"
    start="149" end="152" />

```javascript
await wallet.signAndSendTransactions({ 
  transactions: [ helloTx, guestTx ] 
});
```

This opens the wallet once for the user to approve both transactions.

## Important Characteristics

:::caution Independence
Even though transactions are signed together, they are **completely independent**:
- If `helloTx` succeeds and `guestTx` fails, `helloTx` is **NOT** rolled back
- Each transaction is processed separately by the network
- Success of one does not guarantee success of another
:::

## Handling Transaction Responses

After submission, you'll receive transaction outcomes:

```javascript
const outcome = await wallet.signAndSendTransactions({ 
  transactions: [ helloTx, guestTx ] 
});

// Each transaction has its own outcome
console.log(outcome);
```

## Complete Form Handler

<Github fname="index.js"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
    start="25" end="62" />

The form handler:
1. Prevents default form submission
2. Extracts form values (greeting text and premium checkbox)
3. Shows loading state
4. Calculates deposit based on premium selection
5. Constructs both transactions
6. Submits them for signing

## Testing Multiple Transactions

Try these scenarios:
1. **Both succeed**: Valid greeting text, sufficient balance
2. **One fails**: Insufficient balance for premium message (Guest Book fails, Hello NEAR succeeds)
3. **Network issues**: Transactions may process at different times

Next, we'll explore batching actions within a single contract for atomic operations.