---
id: frontend-multiple-contracts
title: "Working with Multiple NEAR Contracts in Your Frontend"
sidebar_label: Multiple Contract Integration
description: "Build frontends that efficiently communicate with multiple NEAR smart contracts. Learn practical patterns for data fetching, transaction handling, and error management."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

# Working with Multiple NEAR Contracts in Your Frontend

Most successful dApps don't operate in isolation. Your application likely needs to interact with token contracts, governance systems, marketplaces, and external protocols. This creates coordination challenges that separate good applications from great ones.

This guide covers the essential techniques for building frontends that handle multiple contract interactions cleanly and reliably.

## Understanding Contract Dependencies

Before writing code, map out your contract relationships. Some contracts work independently—like separate token balances you need to display. Others have dependencies—like needing token approval before executing a swap.

Understanding these relationships determines your integration strategy.

## Fetching Data from Multiple Sources

Start with the basics. When you need data from multiple contracts, fetch it in parallel:

<Language value="js" language="ts">
  <Github fname="index.js"
        url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
        start="70" end="76" />
</Language>

For production applications, add structure and error handling:

```javascript
async function fetchContractData(wallet, contracts) {
  const promises = contracts.map(async (contract) => {
    try {
      const result = await wallet.viewMethod({
        contractId: contract.id,
        method: contract.method,
        args: contract.args || {}
      });
      return { contractId: contract.id, data: result, error: null };
    } catch (error) {
      return { contractId: contract.id, data: null, error: error.message };
    }
  });

  const results = await Promise.all(promises);
  
  return results.reduce((acc, result) => {
    acc[result.contractId] = result.data;
    if (result.error) {
      acc.errors = acc.errors || [];
      acc.errors.push({ contract: result.contractId, message: result.error });
    }
    return acc;
  }, {});
}
```

This pattern gives you partial results when some contracts fail, preventing complete application breakdowns.

## Handling Multiple Transactions

Transaction coordination is where multi-contract frontends get complex. You have three main approaches:

### Independent Transactions

Use this when transactions don't depend on each other:

<Language value="js" language="ts">
  <Github fname="index.js"
          url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
          start="35" end="62" />
</Language>

:::caution
Independent transactions can succeed partially. Design your interface to show users which operations completed and which failed.
:::

### Sequential Transactions

When one transaction depends on another's success:

```javascript
async function executeSequentialTasks(wallet, tasks) {
  const results = [];
  
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    
    try {
      const result = await wallet.signAndSendTransaction({
        receiverId: task.contractId,
        actions: [{
          type: 'FunctionCall',
          params: {
            methodName: task.method,
            args: task.args,
            gas: task.gas || '30000000000000',
            deposit: task.deposit || '0'
          }
        }]
      });
      
      results.push({ taskId: i, success: true, transaction: result });
      
      // Wait for transaction confirmation before proceeding
      if (i < tasks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
    } catch (error) {
      results.push({ taskId: i, success: false, error: error.message });
      
      // Stop execution if this task is critical
      if (task.required) {
        throw new Error(`Required task ${i} failed: ${error.message}`);
      }
    }
  }
  
  return results;
}
```

### Batch Operations on Single Contract

When multiple actions must succeed or fail together:

```javascript
// Register a user and transfer them FT on a single take
const REGISTER_DEPOSIT = "1250000000000000000000";

const ftTx = {
  receiverId: FT_ADDRESS,
  actions: [
    {
      type: 'FunctionCall',
      params: {
        methodName: 'storage_deposit',
        args: { account_id: "<receiver-account>" },
        gas: THIRTY_TGAS, deposit: REGISTER_DEPOSIT
      }
    },
    {
      type: 'FunctionCall',
      params: {
        methodName: 'ft_transfer',
        args: { receiver_id: "<receiver-account>", amount: amount_in_yocto },
        gas: THIRTY_TGAS, deposit: 1 }
    }
  ]
}

// Ask the wallet to sign and send the transaction
await wallet.signAndSendTransactions({ transactions: [ ftTx ] })
```

Batch operations provide atomicity—all actions execute successfully or none do.

## Real-World Integration Patterns

### Building a DeFi Dashboard

Aggregate data from multiple protocols to show comprehensive user information:

```javascript
class DeFiPortfolio {
  constructor(wallet) {
    this.wallet = wallet;
    this.contracts = {
      token: 'token.near',
      staking: 'staking.near',
      lending: 'lending.near'
    };
  }

  async loadUserPortfolio(accountId) {
    const queries = [
      { 
        id: this.contracts.token, 
        method: 'ft_balance_of', 
        args: { account_id: accountId } 
      },
      { 
        id: this.contracts.staking, 
        method: 'get_account_total_balance', 
        args: { account_id: accountId } 
      },
      { 
        id: this.contracts.lending, 
        method: 'get_account', 
        args: { account_id: accountId } 
      }
    ];

    const results = await fetchContractData(this.wallet, queries);
    
    return {
      tokenBalance: results[this.contracts.token] || '0',
      stakingBalance: results[this.contracts.staking] || '0',
      lendingPosition: results[this.contracts.lending] || null,
      errors: results.errors || []
    };
  }
}
```

### Cross-Contract Workflows

Handle complex operations that span multiple contracts:

```javascript
class TokenSwapper {
  constructor(wallet) {
    this.wallet = wallet;
    this.dexContract = 'dex.near';
  }

  async swapTokens(tokenIn, tokenOut, amountIn) {
    // Single transaction using ft_transfer_call for atomic swap
    const swapTransaction = {
      receiverId: tokenIn,
      actions: [{
        type: 'FunctionCall',
        params: {
          methodName: 'ft_transfer_call',
          args: {
            receiver_id: this.dexContract,
            amount: amountIn,
            msg: JSON.stringify({
              action: 'swap',
              token_out: tokenOut,
              min_amount_out: '1'
            })
          },
          gas: '100000000000000',
          deposit: '1'
        }
      }]
    };

    try {
      const result = await this.wallet.signAndSendTransaction(swapTransaction);
      return { success: true, transaction: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

## Managing Application State

Keep your frontend state synchronized with multiple contracts:

```javascript
class ContractStateManager {
  constructor() {
    this.state = {};
    this.listeners = [];
  }

  updateState(contractId, newData) {
    this.state[contractId] = {
      ...this.state[contractId],
      ...newData,
      lastUpdate: Date.now()
    };
    
    this.notifyListeners(contractId, newData);
  }

  getState(contractId) {
    return this.state[contractId] || {};
  }

  isDataStale(contractId, maxAge = 60000) {
    const contractData = this.state[contractId];
    if (!contractData || !contractData.lastUpdate) return true;
    
    return Date.now() - contractData.lastUpdate > maxAge;
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  notifyListeners(contractId, data) {
    this.listeners.forEach(listener => {
      try {
        listener(contractId, data);
      } catch (error) {
        console.error('State listener error:', error);
      }
    });
  }
}
```

## Error Handling Best Practices

Multi-contract applications fail in unpredictable ways. Build resilient error handling:

```javascript
class ResilientContractCall {
  constructor(wallet, maxRetries = 3) {
    this.wallet = wallet;
    this.maxRetries = maxRetries;
  }

  async callWithRetry(contractId, method, args, retryCount = 0) {
    try {
      return await this.wallet.viewMethod({ contractId, method, args });
    } catch (error) {
      if (retryCount < this.maxRetries && this.shouldRetry(error)) {
        // Wait before retrying (exponential backoff)
        await this.delay(Math.pow(2, retryCount) * 1000);
        return this.callWithRetry(contractId, method, args, retryCount + 1);
      }
      throw error;
    }
  }

  shouldRetry(error) {
    const retryableErrors = [
      'network error',
      'timeout',
      'connection refused',
      'temporary failure'
    ];
    
    const errorMessage = error.message.toLowerCase();
    return retryableErrors.some(msg => errorMessage.includes(msg));
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Performance Considerations

### Data Caching

Cache contract responses to reduce network calls:

```javascript
class ContractDataCache {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = new Map();
  }

  set(key, data, ttl = 30000) {
    this.cache.set(key, data);
    this.cacheExpiry.set(key, Date.now() + ttl);
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    
    const expiry = this.cacheExpiry.get(key);
    if (Date.now() > expiry) {
      this.cache.delete(key);
      this.cacheExpiry.delete(key);
      return null;
    }
    
    return this.cache.get(key);
  }

  createKey(contractId, method, args) {
    return `${contractId}:${method}:${JSON.stringify(args || {})}`;
  }

  async getOrFetch(contractId, method, args, fetcher, ttl) {
    const key = this.createKey(contractId, method, args);
    const cached = this.get(key);
    
    if (cached) return cached;
    
    const fresh = await fetcher();
    this.set(key, fresh, ttl);
    return fresh;
  }
}
```

### Request Batching

Group similar requests to optimize network usage:

```javascript
class RequestBatcher {
  constructor(batchDelay = 100) {
    this.batchDelay = batchDelay;
    this.pendingBatches = new Map();
  }

  async batchRequest(contractId, method, args) {
    const batchKey = `${contractId}:${method}`;
    
    if (!this.pendingBatches.has(batchKey)) {
      const batchPromise = new Promise((resolve) => {
        setTimeout(async () => {
          const batch = this.pendingBatches.get(batchKey);
          this.pendingBatches.delete(batchKey);
          
          if (batch && batch.requests.length > 0) {
            resolve(await this.executeBatch(contractId, method, batch.requests));
          }
        }, this.batchDelay);
      });
      
      this.pendingBatches.set(batchKey, { requests: [], promise: batchPromise });
    }
    
    const batch = this.pendingBatches.get(batchKey);
    const requestId = batch.requests.length;
    batch.requests.push(args);
    
    const results = await batch.promise;
    return results[requestId];
  }

  async executeBatch(contractId, method, argsList) {
    // Execute all requests in parallel
    const promises = argsList.map(args => 
      this.wallet.viewMethod({ contractId, method, args })
    );
    
    return Promise.all(promises);
  }
}
```

## Testing Multi-Contract Interactions

Create reliable tests for complex contract interactions:

```javascript
class MockContractWallet {
  constructor() {
    this.responses = new Map();
    this.transactionLog = [];
  }

  setResponse(contractId, method, response) {
    const key = `${contractId}:${method}`;
    this.responses.set(key, response);
  }

  async viewMethod({ contractId, method, args }) {
    const key = `${contractId}:${method}`;
    const response = this.responses.get(key);
    
    if (response instanceof Error) {
      throw response;
    }
    
    if (typeof response === 'function') {
      return response(args);
    }
    
    return response || null;
  }

  async signAndSendTransaction(transaction) {
    this.transactionLog.push(transaction);
    return { 
      transaction: { 
        hash: `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` 
      } 
    };
  }

  getTransactionLog() {
    return this.transactionLog;
  }

  clearLog() {
    this.transactionLog = [];
  }
}
```

## Common Integration Challenges

**Gas Estimation**: Different contracts require different gas amounts. Don't use static values across all operations.

**State Consistency**: Data from different contracts might be from different block heights. Consider this when displaying related information.

**Network Partitions**: Some contracts might be temporarily unavailable. Build graceful degradation into your user interface.

**Transaction Ordering**: Blockchain transactions can be processed out of order. Don't assume sequential execution unless you enforce it.

## Summary

Multi-contract frontends require careful orchestration of data fetching, transaction handling, and error management. The patterns in this guide provide a foundation for building applications that work reliably across contract boundaries.

Focus on:
- Parallel data fetching with graceful failure handling
- Appropriate transaction coordination patterns for your use case
- Robust error handling and retry logic
- Performance optimization through caching and batching
- Comprehensive testing of multi-contract workflows

These techniques scale from simple two-contract interactions to complex multi-protocol integrations, giving you the tools to build sophisticated NEAR applications.
