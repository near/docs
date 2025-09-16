---
id: testing-deployment
title: Testing and Deploying Advanced Cross-Contract Calls
sidebar_label: Testing & Deployment
description: "Test your advanced cross-contract patterns and deploy them to NEAR testnet for production use."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {Github} from "@site/src/components/codetabs";

Let's test our advanced patterns and deploy to NEAR testnet.

## Testing with Sandbox

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```javascript
import { Worker } from 'near-workspaces';
import test from 'ava';

test('batch actions execute atomically', async (t) => {
  const worker = await Worker.init();
  const root = worker.rootAccount;
  
  // Deploy contracts
  const main = await root.createSubAccount('main');
  await main.deploy('./build/cross_contract.wasm');
  
  const hello = await root.createSubAccount('hello');
  await hello.deploy('./tests/external-contracts/hello-near.wasm');
  
  // Initialize main contract
  await main.call('init', {
    hello_account: hello.accountId,
    counter_account: counter.accountId,
    guestbook_account: guestbook.accountId
  });
  
  // Test batch actions
  const result = await main.call('batch_actions', {});
  t.truthy(result);
  
  await worker.tearDown();
});

test('parallel execution handles failures', async (t) => {
  // Test with one contract failing
  const result = await main.call('multiple_contracts', {});
  
  // Should contain partial results
  t.true(result.includes('Hello:'));
  t.true(result.includes('failed'));
});
```

  </TabItem>
  <TabItem value="rust" label="Rust">

<Github fname="tests.rs"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/tests/tests.rs"
      start="40" end="80" />

  </TabItem>
</Tabs>

## Running Tests

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```bash
npm test

# Output:
✓ batch actions execute atomically (5s)
✓ parallel execution handles failures (3s)
✓ callbacks process correctly (4s)
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```bash
cargo test

# Output:
test test_batch_actions ... ok
test test_multiple_contracts ... ok
test test_error_handling ... ok
```

  </TabItem>
</Tabs>

## Deployment Steps

### 1. Create Account

```bash
near account create-account sponsor-by-faucet-service advanced-xcc.YOUR_NAME.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
```

### 2. Build Contract

<Tabs>
  <TabItem value="js" label="JavaScript" default>

```bash
npm run build
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```bash
cargo near build
```

  </TabItem>
</Tabs>

### 3. Deploy with Initialization

```bash
near contract deploy advanced-xcc.YOUR_NAME.testnet use-file ./build/cross_contract.wasm with-init-call init json-args '{
  "hello_account": "hello.near-examples.testnet",
  "counter_account": "counter.near-examples.testnet",
  "guestbook_account": "guestbook.near-examples.testnet"
}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

## Testing on Testnet

```bash
# Batch actions
near contract call-function as-transaction advanced-xcc.YOUR_NAME.testnet batch_actions json-args '{}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as YOUR_ACCOUNT.testnet network-config testnet sign-with-keychain send

# Parallel execution
near contract call-function as-transaction advanced-xcc.YOUR_NAME.testnet multiple_contracts json-args '{}' prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as YOUR_ACCOUNT.testnet network-config testnet sign-with-keychain send
```

## Production Checklist

### Security
- [ ] Validate external contract addresses
- [ ] Implement access controls
- [ ] Add callback validation
- [ ] Test failure scenarios

### Gas Optimization
- [ ] Profile gas usage
- [ ] Set appropriate limits
- [ ] Add gas monitoring

### Error Handling
- [ ] Handle partial failures
- [ ] Implement retry logic
- [ ] Add comprehensive logging
- [ ] Create fallback mechanisms

## Common Issues

### Gas Exhaustion
```
Error: Exceeded the prepaid gas
```
**Solution**: Increase gas allocation:
```typescript
.functionCall("callback", args, 0n, 50_000_000_000_000n) // 50 TGas
```

### Callback Failures
```
Error: Promise result not found
```
**Solution**: Match index to promise order:
```typescript
const result0 = getValueFromPromise(0); // First promise
const result1 = getValueFromPromise(1); // Second promise
```

## Performance Benchmarks

| Pattern | Gas Usage | Time |
|---------|-----------|------|
| Batch (3 calls) | ~60 TGas | 2-3 blocks |
| Parallel (3 contracts) | ~45 TGas | 1-2 blocks |
| Complex callback | ~15 TGas | 1 block |

## Monitoring

```bash
# View transactions
near account view-account-summary advanced-xcc.YOUR_NAME.testnet network-config testnet now

# Check state
near contract view-state advanced-xcc.YOUR_NAME.testnet view-state all network-config testnet now
```

## Summary

You've mastered:
- ✅ Batch actions with atomic rollback
- ✅ Parallel execution for efficiency
- ✅ Complex response handling
- ✅ Testing with sandbox
- ✅ Deploying to testnet

## Next Steps

- Build complex DApps combining patterns
- Optimize gas usage
- Implement circuit breakers
- Create reusable libraries

## Resources

- [NEAR SDK Docs](https://docs.near.org/sdk)
- [Example Repository](https://github.com/near-examples/cross-contract-calls)
- [NEAR Discord](https://near.chat)

Congratulations! You can now build sophisticated multi-contract applications on NEAR!