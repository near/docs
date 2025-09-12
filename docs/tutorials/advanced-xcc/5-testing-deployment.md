---
id: testing-deployment
title: Testing & Deployment
sidebar_label: Testing & Deployment  
description: "Quick testing and deployment guide for your advanced cross-contract call system on NEAR networks."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Now that you've built your advanced cross-contract call system, let's get it tested and deployed quickly.

## Basic Testing

### Quick Test Setup

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```bash
# Install and run tests
npm install
npm test
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```bash
# Build and test
cargo near build
cargo test
```

  </TabItem>
</Tabs>

### Essential Test Examples

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```javascript
import { Worker } from 'near-workspaces';
import test from 'ava';

test('batch actions work correctly', async (t) => {
  const worker = await Worker.init();
  const contract = await worker.dev_deploy('./build/contract.wasm');
  
  const result = await contract.call('batch_call_contracts', {
    contracts: ['hello.near', 'counter.near'],
    method: 'get_greeting'
  });
  
  t.true(Array.isArray(result));
  t.true(result.length > 0);
  
  await worker.tearDown();
});

test('parallel calls handle failures gracefully', async (t) => {
  const worker = await Worker.init();
  const contract = await worker.dev_deploy('./build/contract.wasm');
  
  const result = await contract.call('call_multiple_contracts', {
    contracts: ['working.near', 'broken.near'],
    method: 'ping'
  });
  
  // Should handle partial failures
  t.truthy(result.success_count);
  t.truthy(result.error_count);
  
  await worker.tearDown();
});
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
use near_workspaces;
use serde_json::json;

#[tokio::test]
async fn test_batch_actions() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&wasm).await?;
    
    let result = contract
        .call("batch_call_contracts")
        .args_json(json!({
            "contracts": ["hello.near", "counter.near"],
            "method": "get_greeting"
        }))
        .transact()
        .await?;
    
    assert!(result.is_success());
    
    Ok(())
}

#[tokio::test]
async fn test_parallel_calls() -> Result<(), Box<dyn std::error::Error>> {
    let worker = near_workspaces::sandbox().await?;
    let wasm = near_workspaces::compile_project("./").await?;
    let contract = worker.dev_deploy(&wasm).await?;
    
    let result = contract
        .call("call_multiple_contracts")
        .args_json(json!({
            "contracts": ["working.near", "broken.near"],
            "method": "ping"
        }))
        .transact()
        .await?;
    
    // Should handle partial failures gracefully
    assert!(result.is_success());
    
    Ok(())
}
```

  </TabItem>
</Tabs>

## Deployment

### Network Configuration

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
// config.ts
export const CONFIG = {
  testnet: {
    gas_limit: '150000000000000', // 150 TGas
    max_batch_size: 5
  },
  mainnet: {
    gas_limit: '100000000000000', // 100 TGas  
    max_batch_size: 3
  }
};
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
// config.rs
pub struct Config {
    pub max_batch_size: u8,
    pub gas_limit: u64,
}

impl Config {
    pub fn testnet() -> Self {
        Self { max_batch_size: 5, gas_limit: 150_000_000_000_000 }
    }
    
    pub fn mainnet() -> Self {
        Self { max_batch_size: 3, gas_limit: 100_000_000_000_000 }
    }
}
```

  </TabItem>
</Tabs>

### Deploy Commands

```bash
# Build contract
cargo near build

# Deploy to testnet
near dev-deploy --wasmFile target/wasm32-unknown-unknown/release/contract.wasm

# Initialize
near call $CONTRACT_NAME new '{"config": "testnet"}' --accountId your-account.testnet

# For mainnet
near deploy --wasmFile contract.wasm --accountId your-contract.near
near call your-contract.near new '{"config": "mainnet"}' --accountId your-account.near
```

## Basic Monitoring

### Health Check

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
@view({})
health_check() {
  return {
    status: 'ok',
    version: '1.0.0',
    timestamp: env.block_timestamp_ms()
  };
}

@view({})
get_stats() {
  return {
    total_calls: this.total_calls || 0,
    success_rate: this.calculate_success_rate()
  };
}
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
impl Contract {
    pub fn health_check(&self) -> serde_json::Value {
        json!({
            "status": "ok",
            "version": "1.0.0",
            "timestamp": env::block_timestamp_ms()
        })
    }
    
    pub fn get_stats(&self) -> serde_json::Value {
        json!({
            "total_calls": self.total_calls.unwrap_or(0),
            "active": true
        })
    }
}
```

  </TabItem>
</Tabs>

## Production Checklist

### Pre-deployment
- [ ] Tests pass locally
- [ ] Gas limits configured appropriately  
- [ ] Contract built without warnings
- [ ] Access keys ready

### Post-deployment
- [ ] Health check responds correctly
- [ ] Basic operations work
- [ ] Monitor for first few hours
- [ ] Document contract address

## Monitoring Commands

```bash
# Check health
near view your-contract.near health_check

# Get statistics  
near view your-contract.near get_stats

# Test basic functionality
near call your-contract.near batch_call_contracts '{"contracts":["hello.near"],"method":"ping"}' --accountId your-account.near
```

## Common Issues

| Problem | Solution |
|---------|----------|
| Gas limit exceeded | Reduce batch size or increase gas |
| Contract not found | Check deployment and account names |
| Method not found | Verify contract methods are public |

## Summary

You now have a working cross-contract call system deployed on NEAR! The key points:

- **Test Locally First**: Run basic functionality tests before deploying
- **Start Conservative**: Use smaller batch sizes and higher gas limits initially
- **Monitor Closely**: Watch the first few transactions to catch issues early
- **Keep It Simple**: Start with basic monitoring and expand as needed

Your contract is ready to handle complex multi-contract interactions on NEAR Protocol.

:::tip Quick Start
For rapid deployment: build → test → deploy to testnet → verify health check → deploy to mainnet when ready.
:::