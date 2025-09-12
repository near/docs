---
id: response-handling
title: Advanced Response Handling Patterns
sidebar_label: Response Handling
description: "Master sophisticated patterns for processing complex results from multiple contract interactions, including error handling and data transformation."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

Response handling is where the complexity of advanced cross-contract calls really becomes apparent. You need to process multiple results, handle various error conditions, and transform data into useful formats - all while maintaining performance and reliability.

## Understanding Response Types

NEAR provides different response patterns depending on your call structure:

| Call Type | Response Format | Use Case |
|-----------|----------------|----------|
| **Single Call** | Single value or error | Basic interactions |
| **Batch Actions** | Last action result | Sequential operations |
| **Parallel Calls** | Array of results | Independent operations |
| **Similar Contracts** | Array of same-type results | Data aggregation |

## Processing Similar Contract Results

When calling multiple contracts that return the same data type, you can use specialized handling patterns:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

<Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="65" end="70" />

<Github fname="similar_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/similar_contracts.ts"
      start="6" end="35" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

<Github fname="lib.rs"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/lib.rs"
        start="44" end="49" />

<Github fname="similar_contracts.rs"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/similar_contracts.rs"
        start="8" end="31" />

  </TabItem>
</Tabs>

## Advanced Response Processing Patterns

### Pattern 1: Data Aggregation

Combine results from multiple contracts into a unified response:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
@call({privateFunction: true})
aggregate_token_data_callback() {
  const aggregated_data = {
    total_supply: 0n,
    total_holders: 0,
    contracts_responding: 0,
    contract_details: []
  };

  for (let i = 0; i < env.promise_results_count(); i++) {
    const result = getValueFromPromise(i);
    
    if (result.success) {
      const token_data = JSON.parse(result.value);
      
      // Aggregate the data
      aggregated_data.total_supply += BigInt(token_data.total_supply);
      aggregated_data.total_holders += token_data.holder_count;
      aggregated_data.contracts_responding++;
      
      aggregated_data.contract_details.push({
        contract_id: token_data.contract_id,
        supply: token_data.total_supply,
        holders: token_data.holder_count
      });
    }
  }

  return {
    summary: {
      total_supply: aggregated_data.total_supply.toString(),
      total_holders: aggregated_data.total_holders,
      response_rate: `${aggregated_data.contracts_responding}/${env.promise_results_count()}`
    },
    details: aggregated_data.contract_details
  };
}
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
#[derive(Serialize, Deserialize)]
pub struct TokenData {
    contract_id: AccountId,
    total_supply: U128,
    holder_count: u32,
}

#[private]
pub fn aggregate_token_data_callback(&mut self) -> serde_json::Value {
    let mut total_supply = 0u128;
    let mut total_holders = 0u32;
    let mut contracts_responding = 0u32;
    let mut contract_details = Vec::new();

    for i in 0..env::promise_results_count() {
        if let PromiseResult::Successful(result) = env::promise_result(i) {
            if let Ok(token_data) = near_sdk::serde_json::from_slice::<TokenData>(&result) {
                total_supply += token_data.total_supply.0;
                total_holders += token_data.holder_count;
                contracts_responding += 1;
                contract_details.push(token_data);
            }
        }
    }

    json!({
        "summary": {
            "total_supply": U128(total_supply),
            "total_holders": total_holders,
            "response_rate": format!("{}/{}", contracts_responding, env::promise_results_count())
        },
        "details": contract_details
    })
}
```

  </TabItem>
</Tabs>

### Pattern 2: Response Validation and Error Recovery

Validate and sanitize data while implementing fallback mechanisms:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
// Track contract reliability
contract_failures: LookupMap<AccountId, number> = new LookupMap("failures");

@call({privateFunction: true})
validated_callback_with_fallback({contracts}: {contracts: AccountId[]}) {
  const results = [];
  const errors = [];
  
  for (let i = 0; i < contracts.length; i++) {
    const contract_id = contracts[i];
    const result = getValueFromPromise(i);
    
    if (result.success) {
      try {
        const data = JSON.parse(result.value);
        
        // Basic validation
        if (this.validate_response(data)) {
          // Reset failure count on success
          this.contract_failures.set(contract_id, 0);
          results.push({
            contract_id,
            data: this.sanitize_data(data),
            status: 'success'
          });
        } else {
          errors.push({contract_id, error: 'Invalid data format'});
        }
      } catch (e) {
        errors.push({contract_id, error: 'JSON parse failed'});
      }
    } else {
      // Track failures for circuit breaker
      const failures = this.contract_failures.get(contract_id) || 0;
      this.contract_failures.set(contract_id, failures + 1);
      
      errors.push({
        contract_id, 
        error: result.error,
        circuit_open: failures >= 2
      });
    }
  }
  
  return {results, errors, success_rate: `${results.length}/${contracts.length}`};
}

validate_response(data: any): boolean {
  return data && typeof data.id === 'string' && typeof data.timestamp === 'number';
}

sanitize_data(data: any): any {
  return {
    id: data.id,
    timestamp: data.timestamp,
    amount: data.amount ? parseFloat(data.amount).toString() : '0',
    description: data.description ? data.description.substring(0, 500) : ''
  };
}
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
#[private]
pub fn validated_callback_with_fallback(
    &mut self, 
    contracts: Vec<AccountId>
) -> serde_json::Value {
    let mut results = Vec::new();
    let mut errors = Vec::new();
    
    for (i, contract_id) in contracts.iter().enumerate() {
        match env::promise_result(i) {
            PromiseResult::Successful(result) => {
                if let Ok(data) = near_sdk::serde_json::from_slice::<serde_json::Value>(&result) {
                    if self.validate_response(&data) {
                        // Reset failure count
                        self.contract_failures.insert(contract_id, &0);
                        results.push(json!({
                            "contract_id": contract_id,
                            "data": self.sanitize_data(&data),
                            "status": "success"
                        }));
                    } else {
                        errors.push(json!({"contract_id": contract_id, "error": "Invalid format"}));
                    }
                } else {
                    errors.push(json!({"contract_id": contract_id, "error": "Parse failed"}));
                }
            }
            PromiseResult::Failed => {
                let failures = self.contract_failures.get(contract_id).unwrap_or(0);
                self.contract_failures.insert(contract_id, &(failures + 1));
                
                errors.push(json!({
                    "contract_id": contract_id,
                    "error": "Contract call failed",
                    "circuit_open": failures >= 2
                }));
            }
        }
    }
    
    json!({
        "results": results,
        "errors": errors,
        "success_rate": format!("{}/{}", results.len(), contracts.len())
    })
}

fn validate_response(&self, data: &serde_json::Value) -> bool {
    data.get("id").and_then(|v| v.as_str()).is_some() &&
    data.get("timestamp").and_then(|v| v.as_u64()).is_some()
}

fn sanitize_data(&self, data: &serde_json::Value) -> serde_json::Value {
    json!({
        "id": data.get("id").unwrap_or(&json!("")),
        "timestamp": data.get("timestamp").unwrap_or(&json!(0)),
        "amount": data.get("amount")
            .and_then(|v| v.as_str())
            .and_then(|s| s.parse::<f64>().ok())
            .map(|n| json!(n.to_string()))
            .unwrap_or(json!("0")),
        "description": data.get("description")
            .and_then(|v| v.as_str())
            .map(|s| json!(s.chars().take(500).collect::<String>()))
            .unwrap_or(json!(""))
    })
}
```

  </TabItem>
</Tabs>

## Performance Optimization: Response Caching

Cache frequently accessed data to reduce redundant contract calls:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
// Simple cache with TTL
response_cache: LookupMap<string, string> = new LookupMap("cache");
cache_timestamps: LookupMap<string, number> = new LookupMap("cache_time");

get_cached_or_call({contracts, method, cache_key, ttl_ms = 300000}: {
  contracts: AccountId[];
  method: string;
  cache_key: string;
  ttl_ms?: number;
}) {
  const current_time = env.block_timestamp_ms();
  const cached_data = this.response_cache.get(cache_key);
  const cache_time = this.cache_timestamps.get(cache_key);
  
  // Return cached data if still valid
  if (cached_data && cache_time && (current_time - cache_time) < ttl_ms) {
    return JSON.parse(cached_data);
  }
  
  // Make fresh calls and cache results
  return this.call_contracts_with_caching(contracts, method, cache_key);
}

@call({privateFunction: true})
cache_response_callback({cache_key}: {cache_key: string}) {
  const results = [];
  for (let i = 0; i < env.promise_results_count(); i++) {
    const result = getValueFromPromise(i);
    if (result.success) {
      results.push(JSON.parse(result.value));
    }
  }
  
  // Cache the aggregated results
  this.response_cache.set(cache_key, JSON.stringify(results));
  this.cache_timestamps.set(cache_key, env.block_timestamp_ms());
  
  return results;
}
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
pub fn get_cached_or_call(
    &mut self,
    contracts: Vec<AccountId>,
    method: String,
    cache_key: String,
    ttl_ms: Option<u64>,
) -> serde_json::Value {
    let ttl_ms = ttl_ms.unwrap_or(300000); // 5 minutes default
    let current_time = env::block_timestamp_ms();
    
    // Check cache validity
    if let (Some(cached_data), Some(cache_time)) = (
        self.response_cache.get(&cache_key),
        self.cache_timestamps.get(&cache_key)
    ) {
        if (current_time - cache_time) < ttl_ms {
            return cached_data;
        }
    }
    
    // Cache miss - need fresh data
    json!({"cache_miss": true, "contracts_to_call": contracts.len()})
}

#[private]
pub fn cache_response_callback(&mut self, cache_key: String) -> serde_json::Value {
    let mut results = Vec::new();
    
    for i in 0..env::promise_results_count() {
        if let PromiseResult::Successful(result) = env::promise_result(i) {
            if let Ok(data) = near_sdk::serde_json::from_slice::<serde_json::Value>(&result) {
                results.push(data);
            }
        }
    }
    
    // Cache the results
    let results_json = json!(results);
    self.response_cache.insert(&cache_key, &results_json);
    self.cache_timestamps.insert(&cache_key, &env::block_timestamp_ms());
    
    results_json
}
```

  </TabItem>
</Tabs>

## Best Practices Summary

### ✅ Essential Patterns

1. **Always Validate External Data**: Never trust responses from other contracts without validation
2. **Implement Circuit Breakers**: Track failure rates to prevent repeated calls to failing contracts  
3. **Use Structured Error Handling**: Provide meaningful error messages and partial success information
4. **Cache Strategically**: Balance freshness with performance for frequently accessed data
5. **Plan for Partial Failures**: Design responses that work even when some contracts fail

### ❌ Common Pitfalls

- **Index Misalignment**: Not tracking which response belongs to which contract
- **Insufficient Validation**: Assuming external contract responses are always valid
- **Poor Error Recovery**: Failing completely when only some contracts fail
- **Cache Invalidation Issues**: Not properly managing cache expiration

## Summary

Advanced response handling enables robust multi-contract interactions by:

- **Processing Multiple Response Types**: Handle both successful and failed contract calls appropriately
- **Implementing Data Validation**: Ensure external data meets your contract's requirements  
- **Building Resilience**: Use circuit breakers and fallbacks for unreliable contracts
- **Optimizing Performance**: Cache results to reduce redundant network calls

The key is designing your response handling to gracefully handle the unpredictable nature of cross-contract calls while maintaining data integrity and user experience.

## Next Steps

You've mastered advanced response handling patterns! Now let's move to [testing and deployment](5-testing-deployment.md) to get your sophisticated cross-contract system running in production.

:::tip Response Strategy Guide

Choose your approach based on requirements:
- **High Reliability**: Focus on validation and circuit breakers
- **Performance Critical**: Implement comprehensive caching
- **Data Accuracy**: Use multiple sources with consensus mechanisms  
- **User Experience**: Provide partial results with clear error states

:::