---
id: frontend-multiple-contracts
title: "Multi-Contract Frontend Development on NEAR"
sidebar_label: Multi-Contract Frontends
description: "Master multi-contract frontend patterns on NEAR. Learn efficient querying, transaction orchestration, and bulletproof error handling for production applications."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

# Multi-Contract Frontend Development on NEAR

Modern dApps rarely interact with just one contract. Your application might need to query token balances, execute swaps, manage NFTs, and handle governance votes - each requiring different contracts. This creates complexity that, if not handled properly, leads to poor user experiences and unreliable applications.

This guide covers the essential patterns for building robust multi-contract frontends that scale.

## Contract Interaction Strategies

### Parallel Query Execution

The foundation of efficient multi-contract frontends is parallel data fetching. Never fetch contract data sequentially when you can do it in parallel.

<Language value="js" language="ts">
  <Github fname="index.js"
        url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
        start="70" end="76" />
</Language>

This basic pattern works, but production applications need more sophisticated handling:

```js
const ContractDataManager = {
  async fetchMultiple(wallet, queries) {
    const promises = queries.map(async query => {
      try {
        const result = await wallet.viewMethod({
          contractId: query.contractId,
          method: query.method,
          args: query.args || {}
        });
        return { success: true, data: result, query };
      } catch (error) {
        return { success: false, error, query };
      }
    });

    return Promise.all(promises);
  },

  processResults(results) {
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    return {
      data: successful.reduce((acc, r) => ({ ...acc, [r.query.key]: r.data }), {}),
      errors: failed.map(r => ({ key: r.query.key, error: r.error }))
    };
  }
};
```

### Transaction Coordination Patterns

Multi-contract transactions require careful orchestration. There are three main patterns, each with specific use cases.

#### Independent Transactions

Use when transactions don't depend on each other and partial failure is acceptable:

<Language value="js" language="ts">
  <Github fname="index.js"
          url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
          start="35" end="62" />
</Language>

:::caution
Independent transactions can partially succeed. One transaction might complete while another fails. Design your UI to handle this scenario gracefully.
:::

#### Dependent Transactions

When transaction order matters, execute them sequentially with proper error propagation:

```js
async function executeSwapWorkflow(wallet, tokenA, tokenB, amount) {
  const workflow = [
    {
      name: 'token_approval',
      transaction: {
        receiverId: tokenA,
        actions: [{
          type: 'FunctionCall',
          params: {
            methodName: 'ft_transfer_call',
            args: {
              receiver_id: 'dex.near',
              amount,
              msg: JSON.stringify({ token_out: tokenB })
            },
            gas: '50000000000000',
            deposit: '1'
          }
        }]
      }
    }
  ];

  for (const step of workflow) {
    const result = await wallet.signAndSendTransaction(step.transaction);
    
    // Verify transaction success before proceeding
    if (!result.transaction?.hash) {
      throw new Error(`${step.name} failed: no transaction hash`);
    }
  }
}
```

#### Atomic Batch Operations

For operations that must succeed or fail together on the same contract:

```js
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

Batch operations provide atomicity - all actions execute successfully or all are reverted.

## Production Implementation Patterns

### Centralized Contract Management

Organize contract interactions through a centralized manager:

```js
class ContractRegistry {
  constructor(wallet, config) {
    this.wallet = wallet;
    this.contracts = config.contracts;
    this.cache = new Map();
  }

  getContract(name) {
    if (!this.contracts[name]) {
      throw new Error(`Contract ${name} not configured`);
    }
    return this.contracts[name];
  }

  async call(contractName, method, args = {}) {
    const contractId = this.getContract(contractName);
    return this.wallet.viewMethod({ contractId, method, args });
  }

  async transaction(contractName, method, args = {}, gas = '30000000000000', deposit = '0') {
    const contractId = this.getContract(contractName);
    return this.wallet.signAndSendTransaction({
      receiverId: contractId,
      actions: [{
        type: 'FunctionCall',
        params: { methodName: method, args, gas, deposit }
      }]
    });
  }
}
```

### Error Recovery Mechanisms

Implement robust error handling for multi-contract operations:

```js
class TransactionHandler {
  constructor(wallet, maxRetries = 3) {
    this.wallet = wallet;
    this.maxRetries = maxRetries;
  }

  async executeWithRetry(operation, retries = 0) {
    try {
      return await operation();
    } catch (error) {
      if (retries < this.maxRetries && this.isRetryableError(error)) {
        await this.delay(Math.pow(2, retries) * 1000); // exponential backoff
        return this.executeWithRetry(operation, retries + 1);
      }
      throw error;
    }
  }

  isRetryableError(error) {
    const retryablePatterns = [
      /timeout/i,
      /network/i,
      /connection/i,
      /temporary/i
    ];
    
    return retryablePatterns.some(pattern => pattern.test(error.message));
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### State Management Integration

Integrate multi-contract data with your application state:

```js
// Redux-style state management for multi-contract data
const contractSlice = {
  name: 'contracts',
  initialState: {
    data: {},
    loading: {},
    errors: {}
  },
  reducers: {
    setLoading: (state, action) => {
      const { contractId, method, loading } = action.payload;
      const key = `${contractId}:${method}`;
      state.loading[key] = loading;
    },
    setData: (state, action) => {
      const { contractId, method, data } = action.payload;
      const key = `${contractId}:${method}`;
      state.data[key] = { data, timestamp: Date.now() };
      state.loading[key] = false;
      delete state.errors[key];
    },
    setError: (state, action) => {
      const { contractId, method, error } = action.payload;
      const key = `${contractId}:${method}`;
      state.errors[key] = error;
      state.loading[key] = false;
    }
  }
};
```

## Performance Optimization

### Intelligent Caching

Implement cache strategies based on data characteristics:

```js
class SmartCache {
  constructor() {
    this.cache = new Map();
    this.strategies = {
      'balance': 30000,      // 30s - balances change frequently
      'metadata': 300000,    // 5min - metadata rarely changes
      'price': 15000,        // 15s - prices change rapidly
      'supply': 60000        // 1min - total supply changes moderately
    };
  }

  getCacheKey(contractId, method, args) {
    return `${contractId}:${method}:${JSON.stringify(args)}`;
  }

  getCacheStrategy(method) {
    for (const [key, duration] of Object.entries(this.strategies)) {
      if (method.includes(key)) return duration;
    }
    return 30000; // default
  }

  get(contractId, method, args) {
    const key = this.getCacheKey(contractId, method, args);
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    const duration = this.getCacheStrategy(method);
    if (Date.now() - cached.timestamp > duration) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  set(contractId, method, args, data) {
    const key = this.getCacheKey(contractId, method, args);
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}
```

### Request Batching

Group similar requests to reduce network overhead:

```js
class RequestBatcher {
  constructor(delay = 50) {
    this.delay = delay;
    this.pending = new Map();
  }

  async batch(contractId, requests) {
    const batchKey = contractId;
    
    if (this.pending.has(batchKey)) {
      return this.pending.get(batchKey);
    }

    const batchPromise = new Promise((resolve) => {
      setTimeout(async () => {
        const batch = this.pending.get(batchKey) || [];
        this.pending.delete(batchKey);
        
        const results = await this.executeBatch(contractId, requests);
        resolve(results);
      }, this.delay);
    });

    this.pending.set(batchKey, batchPromise);
    return batchPromise;
  }

  async executeBatch(contractId, requests) {
    // Execute all requests for this contract in parallel
    return Promise.all(requests.map(req => 
      this.wallet.viewMethod({ contractId, ...req })
    ));
  }
}
```

## Testing Strategies

### Mock Contract Responses

Create comprehensive mocks for testing multi-contract interactions:

```js
class MockWallet {
  constructor(responses = {}) {
    this.responses = responses;
    this.callLog = [];
  }

  viewMethod({ contractId, method, args }) {
    const key = `${contractId}.${method}`;
    this.callLog.push({ contractId, method, args });
    
    const response = this.responses[key];
    if (response instanceof Error) return Promise.reject(response);
    if (typeof response === 'function') return Promise.resolve(response(args));
    return Promise.resolve(response);
  }

  signAndSendTransaction(transaction) {
    this.callLog.push({ type: 'transaction', transaction });
    return Promise.resolve({ transaction: { hash: 'mock-hash' } });
  }

  getCallLog() { return this.callLog; }
  clearLog() { this.callLog = []; }
}

// Usage in tests
const mockWallet = new MockWallet({
  'token.near.ft_balance_of': '1000000000000000000000000',
  'nft.near.nft_tokens_for_owner': [],
  'dex.near.get_pool': (args) => ({ 
    token_a: args.token_a, 
    token_b: args.token_b, 
    fee: 0.3 
  }),
  'oracle.near.get_price': new Error('Oracle offline')
});
```

### Integration Testing

Test real contract interactions in controlled environments:

```js
describe('Multi-Contract Integration', () => {
  let contractRegistry;
  
  beforeEach(() => {
    contractRegistry = new ContractRegistry(testWallet, {
      contracts: {
        token: 'dev-token.testnet',
        dex: 'dev-dex.testnet',
        nft: 'dev-nft.testnet'
      }
    });
  });

  test('should handle partial contract failures gracefully', async () => {
    // Test with one contract offline
    const results = await contractRegistry.fetchMultiple([
      { key: 'balance', contractName: 'token', method: 'ft_balance_of' },
      { key: 'pool', contractName: 'offline', method: 'get_data' }
    ]);

    expect(results.data.balance).toBeDefined();
    expect(results.errors).toHaveLength(1);
    expect(results.errors[0].key).toBe('pool');
  });
});
```

## Common Pitfalls

**Gas Estimation Errors**: Different contracts require different gas amounts. Don't use static values across all contracts.

**Race Conditions**: When contracts depend on each other's state, ensure proper sequencing.

**Partial State Updates**: Handle scenarios where some contracts update successfully while others fail.

**Cache Invalidation**: Implement proper cache invalidation when contract state changes.

**Error Propagation**: Ensure errors from individual contracts don't crash your entire application.

## Summary

Multi-contract frontends require disciplined architecture and robust error handling. The patterns covered here provide a foundation for building scalable applications that interact with multiple NEAR contracts efficiently.
