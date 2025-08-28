---
id: frontend-multiple-contracts
title: "Building Multi-Contract NEAR Applications"
sidebar_label: Multi-Contract Apps
description: "Learn to build NEAR frontends that seamlessly coordinate multiple smart contracts. From data aggregation to complex workflows, master the patterns that matter."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

# Building Multi-Contract NEAR Applications

Real applications rarely live in isolation. Your DeFi protocol talks to oracles. Your NFT platform integrates with marketplaces. Your DAO coordinates with treasury contracts. Understanding how to build frontends that work across contract boundaries isn't optional—it's essential.

## Why Multiple Contracts Matter

Smart contracts excel when they're focused. A token contract handles transfers. A marketplace handles listings. An oracle provides prices. But your application needs all three working together seamlessly.

The alternative—building everything in one massive contract—creates deployment bottlenecks, limits reusability, and makes upgrades risky. Multi-contract architecture gives you flexibility, but your frontend becomes the orchestration layer.

## Data Aggregation Patterns

Start with the fundamentals: getting data from multiple sources efficiently.

<Language value="js" language="ts">
  <Github fname="index.js"
        url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
        start="70" end="76" />
</Language>

This works for simple cases, but production apps need resilience:

```js
class DataAggregator {
  constructor(wallet) {
    this.wallet = wallet;
  }

  async fetchWithTimeout(promise, timeoutMs = 5000) {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    );
    
    return Promise.race([promise, timeout]);
  }

  async aggregateData(sources) {
    const results = await Promise.allSettled(
      sources.map(async ({ key, contractId, method, args = {} }) => {
        const data = await this.fetchWithTimeout(
          this.wallet.viewMethod({ contractId, method, args })
        );
        return { key, data };
      })
    );

    const successful = results
      .filter(r => r.status === 'fulfilled')
      .reduce((acc, r) => {
        acc[r.value.key] = r.value.data;
        return acc;
      }, {});

    const failed = results
      .filter(r => r.status === 'rejected')
      .map((r, i) => ({ key: sources[i].key, error: r.reason }));

    return { data: successful, errors: failed };
  }
}
```

## Transaction Orchestration

Multi-contract transactions come in three flavors. Choose the right pattern for your use case.

### Parallel Execution

When transactions are independent, run them concurrently:

<Language value="js" language="ts">
  <Github fname="index.js"
          url="https://github.com/near-examples/frontend-multiple-contracts/blob/main/frontend/index.js"
          start="35" end="62" />
</Language>

Perfect for operations like claiming multiple rewards or updating profiles across platforms.

:::caution
Parallel transactions succeed or fail independently. Design your UX to handle partial success scenarios.
:::

### Sequential Workflows

When order matters, execute transactions in sequence:

```js
async function executeOrderedWorkflow(wallet, steps) {
  const results = [];
  
  for (const [index, step] of steps.entries()) {
    try {
      const result = await wallet.signAndSendTransaction({
        receiverId: step.contractId,
        actions: [{
          type: 'FunctionCall',
          params: {
            methodName: step.method,
            args: step.args,
            gas: step.gas || '30000000000000',
            deposit: step.deposit || '0'
          }
        }]
      });
      
      results.push({ step: index, success: true, result });
      
    } catch (error) {
      results.push({ step: index, success: false, error });
      
      if (step.critical) {
        throw new Error(`Critical step ${index} failed: ${error.message}`);
      }
    }
  }
  
  return results;
}
```

### Atomic Operations

When multiple actions on one contract must succeed together:

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

Atomic operations either complete fully or revert completely. Use them when partial execution would leave your system in an inconsistent state.

## Application Patterns

### The Aggregation Dashboard

Build dashboards that pull data from multiple protocols:

```js
class PortfolioService {
  constructor(wallet, contracts) {
    this.wallet = wallet;
    this.contracts = contracts;
    this.aggregator = new DataAggregator(wallet);
  }

  async getPortfolio(accountId) {
    const dataSources = [
      {
        key: 'tokens',
        contractId: this.contracts.TOKEN,
        method: 'ft_balance_of',
        args: { account_id: accountId }
      },
      {
        key: 'staking',
        contractId: this.contracts.STAKING,
        method: 'get_account_staked_balance',
        args: { account_id: accountId }
      },
      {
        key: 'governance',
        contractId: this.contracts.DAO,
        method: 'get_user_weight',
        args: { account_id: accountId }
      }
    ];

    const { data, errors } = await this.aggregator.aggregateData(dataSources);

    return {
      totalValue: this.calculateValue(data),
      breakdown: data,
      issues: errors
    };
  }

  calculateValue(data) {
    // Aggregate and calculate total portfolio value
    return Object.values(data).reduce((total, value) => {
      return total + parseFloat(value || '0');
    }, 0);
  }
}
```

### The Cross-Protocol Bridge

Handle complex workflows that span multiple contracts:

```js
class BridgeService {
  constructor(wallet, config) {
    this.wallet = wallet;
    this.config = config;
  }

  async bridgeAsset(tokenContract, amount, destinationChain) {
    const workflow = [
      {
        name: 'lock_tokens',
        contractId: tokenContract,
        method: 'ft_transfer_call',
        args: {
          receiver_id: this.config.BRIDGE_CONTRACT,
          amount: amount,
          msg: JSON.stringify({
            destination: destinationChain,
            recipient: this.wallet.accountId
          })
        },
        gas: '50000000000000',
        deposit: '1',
        critical: true
      }
    ];

    return executeOrderedWorkflow(this.wallet, workflow);
  }

  async monitorBridge(transactionHash) {
    // Poll bridge status across chains
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes with 5s intervals

    while (attempts < maxAttempts) {
      const status = await this.checkBridgeStatus(transactionHash);
      
      if (status.completed) {
        return status;
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    }
    
    throw new Error('Bridge monitoring timeout');
  }
}
```

## State Synchronization

Keep your frontend state consistent across multiple contracts:

```js
class ContractStateManager {
  constructor() {
    this.state = {};
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  updateContractState(contractId, updates) {
    this.state[contractId] = {
      ...this.state[contractId],
      ...updates,
      lastUpdated: Date.now()
    };

    this.notifySubscribers();
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => {
      try {
        callback(this.state);
      } catch (error) {
        console.error('Subscriber error:', error);
      }
    });
  }

  getContractState(contractId) {
    return this.state[contractId] || {};
  }

  isStale(contractId, maxAge = 30000) {
    const contractState = this.state[contractId];
    if (!contractState?.lastUpdated) return true;
    
    return Date.now() - contractState.lastUpdated > maxAge;
  }
}
```

## Error Handling Strategies

Multi-contract applications fail in complex ways. Build defensive systems:

```js
class RobustContractClient {
  constructor(wallet) {
    this.wallet = wallet;
    this.circuitBreakers = new Map();
  }

  async callWithCircuitBreaker(contractId, method, args) {
    const key = `${contractId}:${method}`;
    const breaker = this.getCircuitBreaker(key);

    if (breaker.isOpen()) {
      throw new Error(`Circuit breaker open for ${key}`);
    }

    try {
      const result = await this.wallet.viewMethod({ contractId, method, args });
      breaker.recordSuccess();
      return result;
    } catch (error) {
      breaker.recordFailure();
      throw error;
    }
  }

  getCircuitBreaker(key) {
    if (!this.circuitBreakers.has(key)) {
      this.circuitBreakers.set(key, new CircuitBreaker());
    }
    return this.circuitBreakers.get(key);
  }
}

class CircuitBreaker {
  constructor(failureThreshold = 5, timeout = 60000) {
    this.failureThreshold = failureThreshold;
    this.timeout = timeout;
    this.failureCount = 0;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = 0;
  }

  isOpen() {
    if (this.state === 'OPEN' && Date.now() > this.nextAttempt) {
      this.state = 'HALF_OPEN';
      return false;
    }
    return this.state === 'OPEN';
  }

  recordSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  recordFailure() {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}
```

## Performance Optimization

### Request Deduplication

Avoid duplicate requests when multiple components need the same data:

```js
class RequestDeduplicator {
  constructor() {
    this.pending = new Map();
  }

  async dedupe(key, requestFn) {
    if (this.pending.has(key)) {
      return this.pending.get(key);
    }

    const promise = requestFn()
      .finally(() => this.pending.delete(key));

    this.pending.set(key, promise);
    return promise;
  }

  createKey(contractId, method, args) {
    return `${contractId}:${method}:${JSON.stringify(args)}`;
  }
}
```

### Background Refresh

Keep data fresh without blocking user interactions:

```js
class BackgroundRefresh {
  constructor(dataFetcher, interval = 30000) {
    this.dataFetcher = dataFetcher;
    this.interval = interval;
    this.active = new Set();
  }

  startRefresh(key, fetchFn) {
    if (this.active.has(key)) return;

    this.active.add(key);
    
    const refresh = async () => {
      if (!this.active.has(key)) return;
      
      try {
        await fetchFn();
      } catch (error) {
        console.warn(`Background refresh failed for ${key}:`, error);
      }
      
      setTimeout(refresh, this.interval);
    };

    // Start after initial delay
    setTimeout(refresh, this.interval);
  }

  stopRefresh(key) {
    this.active.delete(key);
  }
}
```

## Testing Multi-Contract Systems

Test contract interactions in isolation and integration:

```js
describe('Multi-Contract Portfolio', () => {
  let mockWallet;
  let portfolioService;

  beforeEach(() => {
    mockWallet = {
      viewMethod: jest.fn(),
      accountId: 'test.near'
    };
    
    portfolioService = new PortfolioService(mockWallet, {
      TOKEN: 'token.near',
      STAKING: 'staking.near',
      DAO: 'dao.near'
    });
  });

  test('aggregates data from multiple contracts', async () => {
    mockWallet.viewMethod
      .mockResolvedValueOnce('1000000') // token balance
      .mockResolvedValueOnce('500000')  // staked amount
      .mockResolvedValueOnce('100');    // voting weight

    const portfolio = await portfolioService.getPortfolio('test.near');

    expect(portfolio.breakdown.tokens).toBe('1000000');
    expect(portfolio.breakdown.staking).toBe('500000');
    expect(portfolio.breakdown.governance).toBe('100');
  });

  test('handles partial failures gracefully', async () => {
    mockWallet.viewMethod
      .mockResolvedValueOnce('1000000')
      .mockRejectedValueOnce(new Error('Staking contract offline'))
      .mockResolvedValueOnce('100');

    const portfolio = await portfolioService.getPortfolio('test.near');

    expect(portfolio.breakdown.tokens).toBe('1000000');
    expect(portfolio.issues).toHaveLength(1);
    expect(portfolio.issues[0].key).toBe('staking');
  });
});
```

## Key Takeaways

Multi-contract frontends require different thinking than single-contract apps. Success depends on:

**Resilient Data Fetching**: Always assume some contracts might be unavailable. Build graceful degradation into your data layer.

**Smart Transaction Orchestration**: Choose the right execution pattern—parallel, sequential, or atomic—based on your business logic.

**Comprehensive Error Handling**: Use circuit breakers, timeouts, and retry logic to handle the complexity of distributed systems.

**Performance Optimization**: Implement request deduplication, background refresh, and intelligent caching to keep your app responsive.

**Thorough Testing**: Test both individual contract interactions and complex multi-contract workflows.

The complexity is worth it. Multi-contract architectures enable powerful applications that leverage the entire NEAR ecosystem rather than building everything from scratch.
