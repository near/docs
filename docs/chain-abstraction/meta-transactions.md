# Meta Transaction Relayers: Gas-Free User Experiences

Meta transaction relayers eliminate gas fees for users by sponsoring blockchain transactions. Users sign transactions locally, relayers pay gas costs and execute on-chain.

## Core Concept

```
User signs transaction â†’ Relayer receives â†’ Relayer pays gas â†’ Transaction executes
```

Benefits: zero-friction onboarding, mainstream adoption, retained user control through cryptographic signatures.

## Basic Implementation

### Server Setup

```typescript
import express from 'express';
import { deserialize, actionCreators } from '@near-js/transactions';

const app = express();
app.use(express.raw({ type: 'application/octet-stream' }));

app.post('/relay', async (req, res) => {
  try {
    const signedTx = deserialize(SCHEMA.SignedDelegate, Buffer.from(req.body));
    
    const result = await relayerAccount.signAndSendTransaction({
      actions: [actionCreators.signedDelegate(signedTx)],
      receiverId: signedTx.delegateAction.senderId
    });
    
    res.json({ hash: result.transaction.hash });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000);
```

### Client Integration

```typescript
async function relayTransaction(contractId, method, args) {
  const action = actionCreators.functionCall(method, args, '0', '50000000000000');
  
  const signedDelegate = await userAccount.signedDelegate({
    actions: [action],
    blockHeightTtl: 60,
    receiverId: contractId
  });
  
  const response = await fetch('/relay', {
    method: 'POST',
    body: serialize(SCHEMA.SignedDelegate, signedDelegate)
  });
  
  return await response.json();
}
```

## Transaction Validation

### Access Control

```typescript
class RelayerValidator {
  validate(signedTransaction) {
    const { receiverId, actions } = signedTransaction.delegateAction;
    
    // Contract whitelist
    if (!ALLOWED_CONTRACTS.includes(receiverId)) {
      throw new Error('Contract not allowed');
    }
    
    // Method validation
    actions.forEach(action => {
      if (action.functionCall) {
        const method = action.functionCall.methodName;
        if (!ALLOWED_METHODS.includes(method)) {
          throw new Error(`Method ${method} not allowed`);
        }
        
        // Deposit limits
        const deposit = BigInt(action.functionCall.deposit || '0');
        if (deposit > MAX_DEPOSIT) {
          throw new Error('Deposit too large');
        }
      }
    });
  }
}
```

### Rate Limiting

```typescript
class RateLimiter {
  constructor() {
    this.userRequests = new Map();
    this.dailyLimits = new Map();
  }
  
  checkLimits(userId) {
    // Per-minute rate limit
    const now = Date.now();
    const userRequests = this.userRequests.get(userId) || [];
    const recentRequests = userRequests.filter(time => now - time < 60000);
    
    if (recentRequests.length >= 10) {
      throw new Error('Rate limit exceeded');
    }
    
    recentRequests.push(now);
    this.userRequests.set(userId, recentRequests);
    
    // Daily gas limit
    const dailyUsed = this.dailyLimits.get(userId) || BigInt('0');
    if (dailyUsed > DAILY_LIMIT_PER_USER) {
      throw new Error('Daily limit reached');
    }
  }
  
  recordUsage(userId, gasUsed) {
    const current = this.dailyLimits.get(userId) || BigInt('0');
    this.dailyLimits.set(userId, current + BigInt(gasUsed));
  }
}
```

## Production Architecture

### Multi-Account Setup

```typescript
class AccountManager {
  constructor(accounts) {
    this.accounts = accounts.map(acc => ({
      ...acc,
      nonce: 0,
      busy: false
    }));
  }
  
  getAvailableAccount() {
    const available = this.accounts.filter(acc => !acc.busy);
    if (!available.length) throw new Error('All accounts busy');
    
    return available.sort((a, b) => a.nonce - b.nonce)[0];
  }
  
  async executeTransaction(signedTx) {
    const account = this.getAvailableAccount();
    account.busy = true;
    
    try {
      const result = await account.signAndSendTransaction({
        actions: [actionCreators.signedDelegate(signedTx)],
        receiverId: signedTx.delegateAction.senderId
      });
      account.nonce++;
      return result;
    } finally {
      account.busy = false;
    }
  }
}
```

### Budget Management

```typescript
class BudgetTracker {
  constructor(dailyBudget) {
    this.dailyBudget = BigInt(dailyBudget);
    this.spent = BigInt('0');
    this.resetDaily();
  }
  
  canSpend(estimatedGas) {
    return this.spent + BigInt(estimatedGas) <= this.dailyBudget;
  }
  
  recordSpending(gasUsed) {
    this.spent += BigInt(gasUsed);
    
    const usage = Number(this.spent * BigInt(100) / this.dailyBudget);
    if (usage >= 90) {
      this.sendAlert('Budget 90% used');
    }
  }
  
  resetDaily() {
    setInterval(() => {
      this.spent = BigInt('0');
    }, 24 * 60 * 60 * 1000);
  }
}
```

## Complete Production Server

```typescript
class ProductionRelayer {
  constructor(config) {
    this.validator = new RelayerValidator();
    this.rateLimiter = new RateLimiter();
    this.accountManager = new AccountManager(config.accounts);
    this.budgetTracker = new BudgetTracker(config.dailyBudget);
    this.setupServer();
  }
  
  setupServer() {
    const app = express();
    app.use(express.raw({ type: 'application/octet-stream' }));
    app.use(this.corsMiddleware());
    
    app.post('/relay', this.handleRelay.bind(this));
    app.get('/health', this.healthCheck.bind(this));
    app.get('/stats', this.getStats.bind(this));
    
    app.listen(process.env.PORT || 3000);
  }
  
  async handleRelay(req, res) {
    try {
      const signedTx = deserialize(SCHEMA.SignedDelegate, Buffer.from(req.body));
      const userId = signedTx.delegateAction.senderId;
      
      // Validation pipeline
      this.rateLimiter.checkLimits(userId);
      this.validator.validate(signedTx);
      
      // Budget check
      const estimatedGas = '50000000000000';
      if (!this.budgetTracker.canSpend(estimatedGas)) {
        throw new Error('Daily budget exceeded');
      }
      
      // Execute transaction
      const result = await this.accountManager.executeTransaction(signedTx);
      const actualGas = this.extractGasUsed(result);
      
      // Record metrics
      this.budgetTracker.recordSpending(actualGas);
      this.rateLimiter.recordUsage(userId, actualGas);
      
      res.json({
        success: true,
        hash: result.transaction.hash,
        gasUsed: actualGas
      });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  corsMiddleware() {
    return (req, res, next) => {
      res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGINS);
      res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      next();
    };
  }
  
  healthCheck(req, res) {
    res.json({
      status: 'healthy',
      accounts: this.accountManager.accounts.length,
      budgetUsed: `${Number(this.budgetTracker.spent * BigInt(100) / this.budgetTracker.dailyBudget)}%`
    });
  }
  
  getStats(req, res) {
    res.json({
      totalSpent: this.budgetTracker.spent.toString(),
      dailyBudget: this.budgetTracker.dailyBudget.toString(),
      activeAccounts: this.accountManager.accounts.filter(acc => !acc.busy).length
    });
  }
  
  extractGasUsed(result) {
    return result.receipts_outcome?.[0]?.outcome?.gas_burnt || '0';
  }
}
```

## Client SDK

```typescript
class RelayerSDK {
  constructor(relayerUrl) {
    this.url = relayerUrl;
  }
  
  async execute(userAccount, contractId, method, args = {}, deposit = '0') {
    const action = actionCreators.functionCall(method, args, deposit, '50000000000000');
    
    const signedDelegate = await userAccount.signedDelegate({
      actions: [action],
      blockHeightTtl: 60,
      receiverId: contractId
    });
    
    const response = await fetch(`${this.url}/relay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: serialize(SCHEMA.SignedDelegate, signedDelegate)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    
    return await response.json();
  }
  
  async batchExecute(userAccount, contractId, calls) {
    const actions = calls.map(call => 
      actionCreators.functionCall(call.method, call.args, call.deposit || '0', '50000000000000')
    );
    
    const signedDelegate = await userAccount.signedDelegate({
      actions,
      blockHeightTtl: 60,
      receiverId: contractId
    });
    
    return await this.sendToRelay(signedDelegate);
  }
  
  async sendToRelay(signedDelegate) {
    const response = await fetch(`${this.url}/relay`, {
      method: 'POST',
      body: serialize(SCHEMA.SignedDelegate, signedDelegate)
    });
    
    return await response.json();
  }
}
```

## Environment Configuration

```typescript
// config.ts
export const config = {
  development: {
    network: 'testnet',
    dailyBudget: '10000000000000000000000000', // 10 NEAR
    accounts: [
      { id: 'dev-relayer.testnet', key: process.env.DEV_RELAYER_KEY }
    ],
    allowedContracts: ['dev-contract.testnet'],
    allowedMethods: ['test_method', 'demo_call']
  },
  
  production: {
    network: 'mainnet',
    dailyBudget: '1000000000000000000000000000', // 1000 NEAR
    accounts: [
      { id: 'relayer1.near', key: process.env.RELAYER_KEY_1 },
      { id: 'relayer2.near', key: process.env.RELAYER_KEY_2 },
      { id: 'relayer3.near', key: process.env.RELAYER_KEY_3 }
    ],
    allowedContracts: ['app.near', 'game.near'],
    allowedMethods: ['play', 'post', 'vote', 'claim']
  }
};
```

## Monitoring

```typescript
class RelayerMonitor {
  constructor() {
    this.metrics = {
      transactions: 0,
      errors: 0,
      gasSpent: BigInt('0'),
      users: new Set()
    };
  }
  
  recordTransaction(userId, gasUsed, success) {
    this.metrics.transactions++;
    this.metrics.users.add(userId);
    
    if (success) {
      this.metrics.gasSpent += BigInt(gasUsed);
    } else {
      this.metrics.errors++;
    }
  }
  
  getMetrics() {
    return {
      totalTransactions: this.metrics.transactions,
      uniqueUsers: this.metrics.users.size,
      errorRate: `${(this.metrics.errors / this.metrics.transactions * 100).toFixed(2)}%`,
      totalGasSpent: `${Number(this.metrics.gasSpent) / 1e24} NEAR`
    };
  }
  
  alert(message) {
    console.log(`ALERT: ${message}`);
    // Send to monitoring service
  }
}
```

## Usage Examples

```typescript
// Initialize relayer
const relayer = new ProductionRelayer(config.production);

// Client usage
const sdk = new RelayerSDK('https://relayer.yourapp.com');

// Single transaction
await sdk.execute(userWallet, 'game.near', 'make_move', { position: 'A4' });

// Batch transactions
await sdk.batchExecute(userWallet, 'social.near', [
  { method: 'post', args: { message: 'Hello World!' } },
  { method: 'like', args: { postId: '123' } }
]);
```

## Security Checklist

- [ ] Validate all transactions before execution
- [ ] Implement per-user rate limiting
- [ ] Set daily budget limits with alerts
- [ ] Use multiple relayer accounts for high throughput
- [ ] Monitor for suspicious patterns
- [ ] Whitelist contracts and methods
- [ ] Limit deposit amounts per transaction
- [ ] Log all transactions for audit trails

## Deployment

```bash
# Environment variables
export RELAYER_ACCOUNTS="relayer1.near,relayer2.near"
export RELAYER_KEYS="key1,key2"
export CORS_ORIGINS="https://yourapp.com"
export DAILY_BUDGET="1000000000000000000000000000"

# Start relayer
npm start
```

Meta transaction relayers provide immediate gas-free experiences while maintaining security through user signatures. This architecture scales from prototype to production with proper validation, monitoring, and budget controls.
