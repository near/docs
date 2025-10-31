---
id: query
title: Querying Multiple Contracts
sidebar_label: Query Data
---

import {Github} from "@site/src/components/codetabs"

Reading data from multiple contracts is straightforward - simply make multiple view calls. No authentication is required for reading blockchain data.

## The View Method

The wallet's `viewMethod` function handles read-only calls to contracts:

<Github fname="wallet.js"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/wallet.js"
    start="80" end="96" />

This method:
- Connects to the NEAR RPC endpoint
- Encodes the arguments in base64
- Queries the contract method
- Decodes and returns the result

## Querying Multiple Contracts

To read from multiple contracts, simply call `viewMethod` multiple times:

<Github fname="index.js"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
    start="64" end="76" />

### Breaking It Down

**Query Hello NEAR contract:**
```javascript
const currentGreeting = await wallet.viewMethod({ 
  method: 'get_greeting', 
  contractId: HELLO_ADDRESS 
});
```

**Query Guest Book contract:**
```javascript
// First, get total message count
const totalMessages = await wallet.viewMethod({
  method: 'total_messages', 
  contractId: GUEST_ADDRESS 
});

// Then fetch the last 4 messages
const from_index = (totalMessages > 4 ? totalMessages - 4 : 0).toString();
const latestMessages = await wallet.viewMethod({ 
  method: 'get_messages', 
  contractId: GUEST_ADDRESS, 
  args: { from_index, limit: "4" } 
});
```

## Updating the UI

Once you have the data, update your interface:

<Github fname="index.js"
    url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
    start="102" end="121" />

The `update_UI` function:
1. Displays the current greeting from Hello NEAR
2. Iterates through Guest Book messages
3. Creates table rows with message details (sender, text, premium status)

## Key Points

- View calls don't require authentication
- View calls don't cost gas fees
- Multiple view calls execute independently
- Failed view calls don't affect other queries
- Results are returned as JSON

## Testing

You can test querying contracts directly in the browser console:

```javascript
// Query Hello NEAR
const greeting = await wallet.viewMethod({ 
  method: 'get_greeting', 
  contractId: 'hello.near-examples.testnet' 
});
console.log(greeting);

// Query Guest Book
const messages = await wallet.viewMethod({ 
  method: 'get_messages', 
  contractId: 'guestbook.near-examples.testnet',
  args: { from_index: "0", limit: "10" }
});
console.log(messages);
```

Now that you can read data from multiple contracts, let's learn how to send transactions to them.