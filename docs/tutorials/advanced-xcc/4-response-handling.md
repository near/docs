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

### Processing Similar Results

The callback can iterate through results more efficiently when all contracts return the same type:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

<Github fname="contract.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/contract.ts"
      start="62" end="65" />

<Github fname="similar_contracts.ts"
      url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-ts/src/internal/similar_contracts.ts"
      start="37" end="54" />

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

<Github fname="similar_contracts.rs"
        url="https://github.com/near-examples/cross-contract-calls/blob/main/contract-advanced-rs/src/similar_contracts.rs"
        start="32" end="57" />

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
        holders: token_data.holder_count,
        last_updated: token_data.timestamp
      });
    }
  }

  // Calculate averages and ratios
  const avg_holders = aggregated_data.contracts_responding > 0 
    ? aggregated_data.total_holders / aggregated_data.contracts_responding 
    : 0;

  return {
    summary: {
      total_supply: aggregated_data.total_supply.toString(),
      total_holders: aggregated_data.total_holders,
      average_holders_per_contract: avg_holders,
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
    timestamp: u64,
}

#[derive(Serialize, Deserialize)]
pub struct AggregatedData {
    total_supply: U128,
    total_holders: u32,
    contracts_responding: u32,
    contract_details: Vec<TokenData>,
}

#[private]
pub fn aggregate_token_data_callback(&mut self) -> serde_json::Value {
    let mut aggregated = AggregatedData {
        total_supply: U128(0),
        total_holders: 0,
        contracts_responding: 0,
        contract_details: Vec::new(),
    };

    for i in 0..env::promise_results_count() {
        match env::promise_result(i) {
            PromiseResult::Successful(result) => {
                if let Ok(token_data) = near_sdk::serde_json::from_slice::<TokenData>(&result) {
                    // Aggregate the data
                    aggregated.total_supply.0 += token_data.total_supply.0;
                    aggregated.total_holders += token_data.holder_count;
                    aggregated.contracts_responding += 1;
                    aggregated.contract_details.push(token_data);
                }
            }
            PromiseResult::Failed => {
                // Log failure but continue processing
                env::log_str(&format!("Contract {} failed to respond", i));
            }
        }
    }

    // Calculate metrics
    let avg_holders = if aggregated.contracts_responding > 0 {
        aggregated.total_holders / aggregated.contracts_responding
    } else {
        0
    };

    json!({
        "summary": {
            "total_supply": aggregated.total_supply,
            "total_holders": aggregated.total_holders,
            "average_holders_per_contract": avg_holders,
            "response_rate": format!("{}/{}", aggregated.contracts_responding, env::promise_results_count())
        },
        "details": aggregated.contract_details
    })
}
```

  </TabItem>
</Tabs>

### Pattern 2: Conditional Processing

Process results differently based on their content or source:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
@call({privateFunction: true})
conditional_processing_callback({
  contract_types
}: {
  contract_types: string[]
}) {
  const results = {
    defi_data: [],
    nft_data: [],
    governance_data: [],
    errors: []
  };

  for (let i = 0; i < contract_types.length; i++) {
    const result = getValueFromPromise(i);
    const contract_type = contract_types[i];
    
    if (result.success) {
      const data = JSON.parse(result.value);
      
      switch(contract_type) {
        case 'defi':
          results.defi_data.push({
            ...data,
            apy_formatted: `${(data.apy * 100).toFixed(2)}%`,
            tvl_formatted: this.format_currency(data.total_value_locked)
          });
          break;
          
        case 'nft':
          results.nft_data.push({
            ...data,
            floor_price_formatted: this.format_currency(data.floor_price),
            volume_24h_formatted: this.format_currency(data.volume_24h)
          });
          break;
          
        case 'governance':
          results.governance_data.push({
            ...data,
            proposal_status: data.active_proposals > 0 ? 'Active' : 'Inactive',
            participation_rate: `${(data.votes_cast / data.total_eligible * 100).toFixed(1)}%`
          });
          break;
          
        default:
          env.log(`Unknown contract type: ${contract_type}`);
      }
    } else {
      results.errors.push({
        index: i,
        contract_type,
        error: result.error || 'Unknown error'
      });
    }
  }

  return {
    ...results,
    summary: {
      total_contracts: contract_types.length,
      successful_responses: contract_types.length - results.errors.length,
      defi_contracts: results.defi_data.length,
      nft_contracts: results.nft_data.length,
      governance_contracts: results.governance_data.length,
      failed_contracts: results.errors.length
    }
  };
}

format_currency(amount: string): string {
  const num = parseFloat(amount);
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;  
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return `${num.toFixed(2)}`;
}
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
#[derive(Serialize, Deserialize)]
pub struct ConditionalResults {
    defi_data: Vec<serde_json::Value>,
    nft_data: Vec<serde_json::Value>,
    governance_data: Vec<serde_json::Value>,
    errors: Vec<ErrorInfo>,
}

#[derive(Serialize, Deserialize)]
pub struct ErrorInfo {
    index: usize,
    contract_type: String,
    error: String,
}

#[private]
pub fn conditional_processing_callback(
    &mut self,
    contract_types: Vec<String>
) -> serde_json::Value {
    let mut results = ConditionalResults {
        defi_data: Vec::new(),
        nft_data: Vec::new(),
        governance_data: Vec::new(),
        errors: Vec::new(),
    };

    for (i, contract_type) in contract_types.iter().enumerate() {
        match env::promise_result(i) {
            PromiseResult::Successful(result) => {
                if let Ok(mut data) = near_sdk::serde_json::from_slice::<serde_json::Value>(&result) {
                    match contract_type.as_str() {
                        "defi" => {
                            // Add formatted fields for DeFi data
                            if let Some(apy) = data.get("apy").and_then(|v| v.as_f64()) {
                                data["apy_formatted"] = json!(format!("{:.2}%", apy * 100.0));
                            }
                            if let Some(tvl) = data.get("total_value_locked").and_then(|v| v.as_str()) {
                                data["tvl_formatted"] = json!(self.format_currency(tvl));
                            }
                            results.defi_data.push(data);
                        }
                        
                        "nft" => {
                            // Add formatted fields for NFT data
                            if let Some(floor_price) = data.get("floor_price").and_then(|v| v.as_str()) {
                                data["floor_price_formatted"] = json!(self.format_currency(floor_price));
                            }
                            if let Some(volume) = data.get("volume_24h").and_then(|v| v.as_str()) {
                                data["volume_24h_formatted"] = json!(self.format_currency(volume));
                            }
                            results.nft_data.push(data);
                        }
                        
                        "governance" => {
                            // Add computed fields for governance data
                            if let Some(active_proposals) = data.get("active_proposals").and_then(|v| v.as_u64()) {
                                data["proposal_status"] = json!(if active_proposals > 0 { "Active" } else { "Inactive" });
                            }
                            
                            if let (Some(votes_cast), Some(total_eligible)) = (
                                data.get("votes_cast").and_then(|v| v.as_u64()),
                                data.get("total_eligible").and_then(|v| v.as_u64())
                            ) {
                                let participation_rate = if total_eligible > 0 {
                                    (votes_cast as f64 / total_eligible as f64) * 100.0
                                } else {
                                    0.0
                                };
                                data["participation_rate"] = json!(format!("{:.1}%", participation_rate));
                            }
                            results.governance_data.push(data);
                        }
                        
                        _ => {
                            env::log_str(&format!("Unknown contract type: {}", contract_type));
                        }
                    }
                }
            }
            PromiseResult::Failed => {
                results.errors.push(ErrorInfo {
                    index: i,
                    contract_type: contract_type.clone(),
                    error: "Contract call failed".to_string(),
                });
            }
        }
    }

    json!({
        "defi_data": results.defi_data,
        "nft_data": results.nft_data,
        "governance_data": results.governance_data,
        "errors": results.errors,
        "summary": {
            "total_contracts": contract_types.len(),
            "successful_responses": contract_types.len() - results.errors.len(),
            "defi_contracts": results.defi_data.len(),
            "nft_contracts": results.nft_data.len(),
            "governance_contracts": results.governance_data.len(),
            "failed_contracts": results.errors.len()
        }
    })
}

fn format_currency(&self, amount: &str) -> String {
    if let Ok(num) = amount.parse::<f64>() {
        if num >= 1e9 {
            format!("${:.2}B", num / 1e9)
        } else if num >= 1e6 {
            format!("${:.2}M", num / 1e6)
        } else if num >= 1e3 {
            format!("${:.2}K", num / 1e3)
        } else {
            format!("${:.2}", num)
        }
    } else {
        format!("${}", amount)
    }
}
```

  </TabItem>
</Tabs>

### Pattern 3: Response Validation and Sanitization

Validate and sanitize data from external contracts:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
@call({privateFunction: true})
validated_response_callback() {
  const validated_results = [];
  const validation_errors = [];

  for (let i = 0; i < env.promise_results_count(); i++) {
    const result = getValueFromPromise(i);
    
    if (result.success) {
      try {
        const raw_data = JSON.parse(result.value);
        const validation_result = this.validate_and_sanitize(raw_data, i);
        
        if (validation_result.valid) {
          validated_results.push({
            index: i,
            data: validation_result.sanitized_data,
            timestamp: env.block_timestamp_ms()
          });
        } else {
          validation_errors.push({
            index: i,
            errors: validation_result.errors,
            raw_data: raw_data
          });
        }
      } catch (error) {
        validation_errors.push({
          index: i,
          errors: [`JSON parse error: ${error}`],
          raw_data: result.value
        });
      }
    } else {
      validation_errors.push({
        index: i,
        errors: [`Contract call failed: ${result.error || 'Unknown error'}`],
        raw_data: null
      });
    }
  }

  return {
    valid_results: validated_results,
    validation_errors: validation_errors,
    summary: {
      total_calls: env.promise_results_count(),
      valid_responses: validated_results.length,
      invalid_responses: validation_errors.length,
      success_rate: `${(validated_results.length / env.promise_results_count() * 100).toFixed(1)}%`
    }
  };
}

validate_and_sanitize(data: any, index: number): {valid: boolean, sanitized_data?: any, errors?: string[]} {
  const errors = [];
  const sanitized = {...data};

  // Required field validation
  if (!data.hasOwnProperty('id') || typeof data.id !== 'string') {
    errors.push('Missing or invalid id field');
  }

  if (!data.hasOwnProperty('timestamp') || typeof data.timestamp !== 'number') {
    errors.push('Missing or invalid timestamp field');
  }

  // Range validation for numeric fields
  if (data.hasOwnProperty('amount')) {
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount < 0) {
      errors.push('Invalid amount: must be a positive number');
    } else if (amount > 1e18) {
      errors.push('Amount too large: exceeds maximum allowed value');
    } else {
      sanitized.amount = amount.toString(); // Normalize to string
    }
  }

  // String sanitization
  if (data.hasOwnProperty('description')) {
    if (typeof data.description !== 'string') {
      errors.push('Description must be a string');
    } else if (data.description.length > 1000) {
      errors.push('Description too long: max 1000 characters');
    } else {
      // Sanitize string (remove potentially harmful content)
      sanitized.description = data.description
        .replace(/[<>]/g, '') // Remove angle brackets
        .substring(0, 1000); // Truncate to max length
    }
  }

  // Array validation
  if (data.hasOwnProperty('tags') && Array.isArray(data.tags)) {
    sanitized.tags = data.tags
      .filter(tag => typeof tag === 'string' && tag.length <= 50)
      .slice(0, 10); // Max 10 tags
  }

  return {
    valid: errors.length === 0,
    sanitized_data: errors.length === 0 ? sanitized : undefined,
    errors: errors.length > 0 ? errors : undefined
  };
}
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
#[derive(Serialize, Deserialize)]
pub struct ValidationResult {
    valid: bool,
    sanitized_data: Option<serde_json::Value>,
    errors: Option<Vec<String>>,
}

#[derive(Serialize, Deserialize)]
pub struct ValidatedResponse {
    index: usize,
    data: serde_json::Value,
    timestamp: u64,
}

#[private]
pub fn validated_response_callback(&mut self) -> serde_json::Value {
    let mut validated_results = Vec::new();
    let mut validation_errors = Vec::new();

    for i in 0..env::promise_results_count() {
        match env::promise_result(i) {
            PromiseResult::Successful(result) => {
                match near_sdk::serde_json::from_slice::<serde_json::Value>(&result) {
                    Ok(raw_data) => {
                        let validation_result = self.validate_and_sanitize(&raw_data, i);
                        
                        if validation_result.valid {
                            if let Some(sanitized_data) = validation_result.sanitized_data {
                                validated_results.push(ValidatedResponse {
                                    index: i,
                                    data: sanitized_data,
                                    timestamp: env::block_timestamp_ms(),
                                });
                            }
                        } else {
                            validation_errors.push(json!({
                                "index": i,
                                "errors": validation_result.errors,
                                "raw_data": raw_data
                            }));
                        }
                    }
                    Err(e) => {
                        validation_errors.push(json!({
                            "index": i,
                            "errors": [format!("JSON parse error: {}", e)],
                            "raw_data": String::from_utf8_lossy(&result)
                        }));
                    }
                }
            }
            PromiseResult::Failed => {
                validation_errors.push(json!({
                    "index": i,
                    "errors": ["Contract call failed"],
                    "raw_data": null
                }));
            }
        }
    }

    let total_calls = env::promise_results_count();
    let valid_count = validated_results.len();
    let success_rate = if total_calls > 0 {
        (valid_count as f64 / total_calls as f64) * 100.0
    } else {
        0.0
    };

    json!({
        "valid_results": validated_results,
        "validation_errors": validation_errors,
        "summary": {
            "total_calls": total_calls,
            "valid_responses": valid_count,
            "invalid_responses": validation_errors.len(),
            "success_rate": format!("{:.1}%", success_rate)
        }
    })
}

fn validate_and_sanitize(&self, data: &serde_json::Value, index: usize) -> ValidationResult {
    let mut errors = Vec::new();
    let mut sanitized = data.clone();

    // Required field validation
    if !data.get("id").map_or(false, |v| v.is_string()) {
        errors.push("Missing or invalid id field".to_string());
    }

    if !data.get("timestamp").map_or(false, |v| v.is_number()) {
        errors.push("Missing or invalid timestamp field".to_string());
    }

    // Range validation for numeric fields
    if let Some(amount_val) = data.get("amount") {
        if let Some(amount_str) = amount_val.as_str() {
            match amount_str.parse::<f64>() {
                Ok(amount) if amount >= 0.0 && amount <= 1e18 => {
                    sanitized["amount"] = json!(amount.to_string());
                }
                Ok(amount) if amount < 0.0 => {
                    errors.push("Invalid amount: must be positive".to_string());
                }
                Ok(_) => {
                    errors.push("Amount too large: exceeds maximum".to_string());
                }
                Err(_) => {
                    errors.push("Invalid amount format".to_string());
                }
            }
        } else {
            errors.push("Amount must be a string".to_string());
        }
    }

    // String sanitization
    if let Some(desc) = data.get("description").and_then(|v| v.as_str()) {
        if desc.len() > 1000 {
            errors.push("Description too long: max 1000 characters".to_string());
        } else {
            // Sanitize string
            let sanitized_desc = desc
                .chars()
                .filter(|&c| c != '<' && c != '>')
                .take(1000)
                .collect::<String>();
            sanitized["description"] = json!(sanitized_desc);
        }
    }

    // Array validation
    if let Some(tags_array) = data.get("tags").and_then(|v| v.as_array()) {
        let sanitized_tags: Vec<String> = tags_array
            .iter()
            .filter_map(|tag| tag.as_str())
            .filter(|tag| tag.len() <= 50)
            .take(10)
            .map(|s| s.to_string())
            .collect();
        sanitized["tags"] = json!(sanitized_tags);
    }

    ValidationResult {
        valid: errors.is_empty(),
        sanitized_data: if errors.is_empty() { Some(sanitized) } else { None },
        errors: if errors.is_empty() { None } else { Some(errors) },
    }
}
```

  </TabItem>
</Tabs>

## Error Recovery Strategies

### Strategy 1: Circuit Breaker Pattern

Automatically handle failing contracts by implementing a circuit breaker:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
// Track contract failure rates
contract_failures: LookupMap<AccountId, number> = new LookupMap("failures");
contract_success_counts: LookupMap<AccountId, number> = new LookupMap("successes");

@call({privateFunction: true})
circuit_breaker_callback({contracts}: {contracts: AccountId[]}) {
  const results = [];
  
  for (let i = 0; i < contracts.length; i++) {
    const contract_id = contracts[i];
    const result = getValueFromPromise(i);
    
    if (result.success) {
      // Reset failure count on success
      this.contract_failures.set(contract_id, 0);
      const success_count = this.contract_success_counts.get(contract_id) || 0;
      this.contract_success_counts.set(contract_id, success_count + 1);
      
      results.push({
        contract_id,
        status: 'success',
        data: JSON.parse(result.value)
      });
    } else {
      // Increment failure count
      const failure_count = this.contract_failures.get(contract_id) || 0;
      this.contract_failures.set(contract_id, failure_count + 1);
      
      const circuit_open = failure_count >= 3; // Circuit opens after 3 failures
      
      results.push({
        contract_id,
        status: circuit_open ? 'circuit_open' : 'failed',
        error: result.error,
        failure_count: failure_count + 1,
        circuit_open
      });
    }
  }
  
  return {
    results,
    circuit_status: this.get_circuit_status(contracts)
  };
}

get_circuit_status(contracts: AccountId[]): any {
  const status = {};
  for (const contract of contracts) {
    const failures = this.contract_failures.get(contract) || 0;
    const successes = this.contract_success_counts.get(contract) || 0;
    const total_calls = failures + successes;
    
    status[contract] = {
      failure_count: failures,
      success_count: successes,
      success_rate: total_calls > 0 ? (successes / total_calls * 100).toFixed(1) + '%' : 'N/A',
      circuit_open: failures >= 3
    };
  }
  return status;
}
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
#[near_bindgen]
impl Contract {
    #[private]
    pub fn circuit_breaker_callback(&mut self, contracts: Vec<AccountId>) -> serde_json::Value {
        let mut results = Vec::new();
        
        for (i, contract_id) in contracts.iter().enumerate() {
            match env::promise_result(i) {
                PromiseResult::Successful(result) => {
                    // Reset failure count on success
                    self.contract_failures.insert(contract_id, &0);
                    let success_count = self.contract_success_counts.get(contract_id).unwrap_or(0);
                    self.contract_success_counts.insert(contract_id, &(success_count + 1));
                    
                    if let Ok(data) = near_sdk::serde_json::from_slice::<serde_json::Value>(&result) {
                        results.push(json!({
                            "contract_id": contract_id,
                            "status": "success",
                            "data": data
                        }));
                    }
                }
                PromiseResult::Failed => {
                    // Increment failure count
                    let failure_count = self.contract_failures.get(contract_id).unwrap_or(0);
                    self.contract_failures.insert(contract_id, &(failure_count + 1));
                    
                    let circuit_open = failure_count >= 2; // Circuit opens after 3 total failures
                    
                    results.push(json!({
                        "contract_id": contract_id,
                        "status": if circuit_open { "circuit_open" } else { "failed" },
                        "failure_count": failure_count + 1,
                        "circuit_open": circuit_open
                    }));
                }
            }
        }
        
        json!({
            "results": results,
            "circuit_status": self.get_circuit_status(&contracts)
        })
    }
    
    fn get_circuit_status(&self, contracts: &[AccountId]) -> serde_json::Value {
        let mut status = serde_json::Map::new();
        
        for contract in contracts {
            let failures = self.contract_failures.get(contract).unwrap_or(0);
            let successes = self.contract_success_counts.get(contract).unwrap_or(0);
            let total_calls = failures + successes;
            
            let success_rate = if total_calls > 0 {
                format!("{:.1}%", (successes as f64 / total_calls as f64) * 100.0)
            } else {
                "N/A".to_string()
            };
            
            status.insert(contract.to_string(), json!({
                "failure_count": failures,
                "success_count": successes,
                "success_rate": success_rate,
                "circuit_open": failures >= 3
            }));
        }
        
        json!(status)
    }
}
```

  </TabItem>
</Tabs>

### Strategy 2: Fallback Data Sources

Implement fallback mechanisms when primary data sources fail:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
@call({})
get_price_with_fallbacks({
  primary_oracles,
  fallback_oracles,
  token_id
}: {
  primary_oracles: AccountId[];
  fallback_oracles: AccountId[];
  token_id: string;
}) {
  // Try primary oracles first
  const primary_promises = primary_oracles.map(oracle =>
    NearPromise.new(oracle)
      .functionCall(
        "get_price",
        JSON.stringify({token_id}),
        0n,
        10_000_000_000_000n
      )
  );

  // Combine all primary promises
  let combined_promise = primary_promises[0];
  for (let i = 1; i < primary_promises.length; i++) {
    combined_promise = combined_promise.and(primary_promises[i]);
  }

  return combined_promise.then(
    NearPromise.new(env.current_account_id())
      .functionCall(
        "price_callback_with_fallback",
        JSON.stringify({
          token_id,
          fallback_oracles,
          attempt: 1
        }),
        0n,
        30_000_000_000_000n
      )
  );
}

@call({privateFunction: true})
price_callback_with_fallback({
  token_id,
  fallback_oracles,
  attempt
}: {
  token_id: string;
  fallback_oracles: AccountId[];
  attempt: number;
}) {
  const primary_results = [];
  let valid_prices = 0;
  let price_sum = 0;

  // Check primary oracle results
  for (let i = 0; i < env.promise_results_count(); i++) {
    const result = getValueFromPromise(i);
    if (result.success) {
      try {
        const price_data = JSON.parse(result.value);
        if (price_data.price && price_data.price > 0) {
          primary_results.push(price_data.price);
          price_sum += parseFloat(price_data.price);
          valid_prices++;
        }
      } catch (error) {
        // Invalid price data, continue
      }
    }
  }

  // If we have enough valid prices, return average
  if (valid_prices >= 2) {
    const average_price = (price_sum / valid_prices).toString();
    return {
      token_id,
      price: average_price,
      source: 'primary_oracles',
      oracle_count: valid_prices,
      attempt,
      confidence: valid_prices >= 3 ? 'high' : 'medium'
    };
  }

  // Not enough valid prices, try fallback oracles
  if (fallback_oracles.length > 0 && attempt <= 2) {
    return this.try_fallback_oracles(token_id, fallback_oracles, attempt + 1);
  }

  // All oracles failed, return cached price or error
  return {
    token_id,
    price: null,
    source: 'failed',
    error: `All ${attempt} attempts failed. Primary: ${env.promise_results_count()}, Fallback: ${fallback_oracles.length}`,
    attempt
  };
}

try_fallback_oracles(token_id: string, fallback_oracles: AccountId[], attempt: number): NearPromise {
  const fallback_promises = fallback_oracles.map(oracle =>
    NearPromise.new(oracle)
      .functionCall(
        "get_price",
        JSON.stringify({token_id}),
        0n,
        10_000_000_000_000n
      )
  );

  let combined_promise = fallback_promises[0];
  for (let i = 1; i < fallback_promises.length; i++) {
    combined_promise = combined_promise.and(fallback_promises[i]);
  }

  return combined_promise.then(
    NearPromise.new(env.current_account_id())
      .functionCall(
        "fallback_price_callback",
        JSON.stringify({token_id, attempt}),
        0n,
        15_000_000_000_000n
      )
  );
}
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
pub fn get_price_with_fallbacks(
    &mut self,
    primary_oracles: Vec<AccountId>,
    fallback_oracles: Vec<AccountId>,
    token_id: String,
) -> Promise {
    // Create promises for all primary oracles
    let mut promise_chain = Promise::new(primary_oracles[0].clone())
        .function_call(
            "get_price".to_owned(),
            json!({"token_id": token_id}).to_string().into_bytes(),
            0,
            Gas::from_tgas(10),
        );

    // Chain additional primary oracles
    for oracle in primary_oracles.iter().skip(1) {
        promise_chain = promise_chain.and(
            Promise::new(oracle.clone()).function_call(
                "get_price".to_owned(),
                json!({"token_id": token_id}).to_string().into_bytes(),
                0,
                Gas::from_tgas(10),
            )
        );
    }

    // Add callback with fallback information
    promise_chain.then(
        Promise::new(env::current_account_id()).function_call(
            "price_callback_with_fallback".to_owned(),
            json!({
                "token_id": token_id,
                "fallback_oracles": fallback_oracles,
                "attempt": 1
            }).to_string().into_bytes(),
            0,
            Gas::from_tgas(30),
        )
    )
}

#[private]
pub fn price_callback_with_fallback(
    &mut self,
    token_id: String,
    fallback_oracles: Vec<AccountId>,
    attempt: u8,
) -> serde_json::Value {
    let mut valid_prices = Vec::new();
    
    // Process primary oracle results
    for i in 0..env::promise_results_count() {
        if let PromiseResult::Successful(result) = env::promise_result(i) {
            if let Ok(price_data) = near_sdk::serde_json::from_slice::<serde_json::Value>(&result) {
                if let Some(price) = price_data.get("price").and_then(|p| p.as_str()) {
                    if let Ok(price_num) = price.parse::<f64>() {
                        if price_num > 0.0 {
                            valid_prices.push(price_num);
                        }
                    }
                }
            }
        }
    }
    
    // If we have enough valid prices, return average
    if valid_prices.len() >= 2 {
        let average_price = valid_prices.iter().sum::<f64>() / valid_prices.len() as f64;
        let confidence = if valid_prices.len() >= 3 { "high" } else { "medium" };
        
        return json!({
            "token_id": token_id,
            "price": average_price.to_string(),
            "source": "primary_oracles",
            "oracle_count": valid_prices.len(),
            "attempt": attempt,
            "confidence": confidence
        });
    }
    
    // Not enough valid prices, try fallback if available
    if !fallback_oracles.is_empty() && attempt <= 2 {
        // This would trigger fallback oracle calls
        return json!({
            "token_id": token_id,
            "price": null,
            "source": "retrying_with_fallback",
            "attempt": attempt
        });
    }
    
    // All attempts failed
    json!({
        "token_id": token_id,
        "price": null,
        "source": "failed",
        "error": format!("All {} attempts failed", attempt),
        "attempt": attempt
    })
}
```

  </TabItem>
</Tabs>

## Testing Response Handling

Testing complex response handling requires simulating various success and failure scenarios:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
test('handles mixed success and failure responses', async (t) => {
  const contract = t.context.contract;
  
  // Mock contracts that will return different results
  const result = await contract.call(
    'multiple_contracts',
    {},
    { gas: '300000000000000' }
  );
  
  // Verify response contains both successes and handles failures gracefully
  t.true(result.includes('Hello:'));
  t.true(result.includes('Counter:'));
  t.true(typeof result === 'string');
});

test('validates and sanitizes response data', async (t) => {
  const contract = t.context.contract;
  
  // Test with various data formats
  const result = await contract.call(
    'validated_response_test',
    {
      test_data: [
        { id: 'valid1', amount: '100', description: 'Valid data' },
        { id: 'invalid1', amount: 'not_a_number', description: 'Invalid amount' },
        { amount: '200', description: 'Missing ID' }, // Missing required field
        { id: 'too_large', amount: '999999999999999999999', description: 'Amount too large' }
      ]
    },
    { gas: '300000000000000' }
  );
  
  const parsed = JSON.parse(result);
  
  // Should have 1 valid result and 3 validation errors
  t.is(parsed.valid_results.length, 1);
  t.is(parsed.validation_errors.length, 3);
  t.is(parsed.summary.success_rate, '25.0%');
});

test('circuit breaker prevents repeated calls to failing contracts', async (t) => {
  const contract = t.context.contract;
  
  // Simulate multiple failures to trigger circuit breaker
  for (let i = 0; i < 4; i++) {
    await contract.call('call_failing_contract', {}, { gas: '100000000000000' });
  }
  
  const status = await contract.view('get_circuit_status', {
    contracts: ['failing-contract.testnet']
  });
  
  t.true(status['failing-contract.testnet'].circuit_open);
  t.is(status['failing-contract.testnet'].failure_count, 3);
});

test('fallback data sources work correctly', async (t) => {
  const contract = t.context.contract;
  
  const result = await contract.call(
    'get_price_with_fallbacks',
    {
      primary_oracles: ['unreliable-oracle.testnet'],
      fallback_oracles: ['reliable-oracle.testnet', 'backup-oracle.testnet'],
      token_id: 'NEAR'
    },
    { gas: '300000000000000' }
  );
  
  const parsed = JSON.parse(result);
  
  // Should eventually get a price from fallback oracles
  t.truthy(parsed.price);
  t.is(parsed.source, 'primary_oracles'); // Or 'fallback_oracles' depending on test setup
});
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
#[tokio::test]
async fn test_mixed_response_handling() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_account = sandbox.dev_account().await?;
    
    // Deploy main contract and test contracts
    let wasm = near_workspaces::compile_project("./").await?;
    let contract = contract_account.deploy(&wasm).await?.unwrap();
    
    let result = contract
        .call("multiple_contracts")
        .gas(300_000_000_000_000)
        .transact()
        .await?;
    
    assert!(result.is_success());
    
    // Parse response and verify structure
    let response: serde_json::Value = result.json()?;
    assert!(response.get("summary").is_some());
    assert!(response.get("results").is_some());
    
    Ok(())
}

#[tokio::test]
async fn test_response_validation() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_account = sandbox.dev_account().await?;
    let wasm = near_workspaces::compile_project("./").await?;
    let contract = contract_account.deploy(&wasm).await?.unwrap();
    
    // Test data validation with various formats
    let test_data = json!([
        {"id": "valid1", "amount": "100", "description": "Valid data"},
        {"id": "invalid1", "amount": "not_a_number", "description": "Invalid amount"},
        {"amount": "200", "description": "Missing ID"},
        {"id": "too_large", "amount": "999999999999999999999", "description": "Too large"}
    ]);
    
    let result = contract
        .call("validated_response_test")
        .args_json(json!({"test_data": test_data}))
        .gas(300_000_000_000_000)
        .transact()
        .await?;
    
    let response: serde_json::Value = result.json()?;
    
    // Verify validation results
    assert_eq!(response["valid_results"].as_array().unwrap().len(), 1);
    assert_eq!(response["validation_errors"].as_array().unwrap().len(), 3);
    assert_eq!(response["summary"]["success_rate"], "25.0%");
    
    Ok(())
}

#[tokio::test]
async fn test_circuit_breaker_functionality() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_account = sandbox.dev_account().await?;
    let wasm = near_workspaces::compile_project("./").await?;
    let contract = contract_account.deploy(&wasm).await?.unwrap();
    
    // Trigger multiple failures
    for _ in 0..4 {
        let _ = contract
            .call("call_failing_contract")
            .gas(100_000_000_000_000)
            .transact()
            .await;
    }
    
    // Check circuit breaker status
    let status = contract
        .view("get_circuit_status")
        .args_json(json!({"contracts": ["failing-contract.testnet"]}))
        .await?;
    
    let circuit_status: serde_json::Value = status.json()?;
    assert_eq!(circuit_status["failing-contract.testnet"]["circuit_open"], true);
    
    Ok(())
}
```

  </TabItem>
</Tabs>

## Performance Optimization Techniques

### Technique 1: Response Caching

Cache frequently accessed data to reduce redundant contract calls:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
// Cache structure for responses
response_cache: LookupMap<string, CachedResponse> = new LookupMap("cache");

interface CachedResponse {
  data: any;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

@call({privateFunction: true})
cached_response_callback({cache_key, ttl_ms}: {cache_key: string, ttl_ms: number}) {
  const responses = [];
  const current_time = env.block_timestamp_ms();
  
  for (let i = 0; i < env.promise_results_count(); i++) {
    const result = getValueFromPromise(i);
    
    if (result.success) {
      const data = JSON.parse(result.value);
      
      // Cache the response
      const cached_response: CachedResponse = {
        data,
        timestamp: current_time,
        ttl: ttl_ms
      };
      
      const contract_cache_key = `${cache_key}_${i}`;
      this.response_cache.set(contract_cache_key, cached_response);
      
      responses.push({
        index: i,
        data,
        cached: true,
        timestamp: current_time
      });
    } else {
      responses.push({
        index: i,
        error: result.error,
        cached: false
      });
    }
  }
  
  return {
    responses,
    cache_info: {
      cache_key,
      ttl_ms,
      cached_at: current_time
    }
  };
}

// Method to get cached data before making calls
get_cached_or_fetch({
  contracts,
  method_name,
  cache_key,
  ttl_ms = 300000 // 5 minutes default
}: {
  contracts: AccountId[];
  method_name: string;
  cache_key: string;
  ttl_ms?: number;
}): any {
  const current_time = env.block_timestamp_ms();
  const cached_responses = [];
  const contracts_to_call = [];
  
  // Check cache for each contract
  for (let i = 0; i < contracts.length; i++) {
    const contract_cache_key = `${cache_key}_${i}`;
    const cached = this.response_cache.get(contract_cache_key);
    
    if (cached && (current_time - cached.timestamp) < cached.ttl) {
      // Use cached data
      cached_responses[i] = {
        index: i,
        data: cached.data,
        cached: true,
        cached_at: cached.timestamp
      };
    } else {
      // Need to fetch fresh data
      contracts_to_call.push({index: i, contract: contracts[i]});
    }
  }
  
  if (contracts_to_call.length === 0) {
    // All data was cached
    return {
      responses: cached_responses,
      all_cached: true
    };
  }
  
  // Make calls only for non-cached contracts
  return this.fetch_and_cache_responses(contracts_to_call, method_name, cache_key, ttl_ms);
}
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
pub struct CachedResponse {
    data: serde_json::Value,
    timestamp: u64,
    ttl: u64,
}

#[near_bindgen]
impl Contract {
    #[private]
    pub fn cached_response_callback(&mut self, cache_key: String, ttl_ms: u64) -> serde_json::Value {
        let mut responses = Vec::new();
        let current_time = env::block_timestamp_ms();
        
        for i in 0..env::promise_results_count() {
            match env::promise_result(i) {
                PromiseResult::Successful(result) => {
                    if let Ok(data) = near_sdk::serde_json::from_slice::<serde_json::Value>(&result) {
                        // Cache the response
                        let cached_response = CachedResponse {
                            data: data.clone(),
                            timestamp: current_time,
                            ttl: ttl_ms,
                        };
                        
                        let contract_cache_key = format!("{}_{}", cache_key, i);
                        self.response_cache.insert(&contract_cache_key, &cached_response);
                        
                        responses.push(json!({
                            "index": i,
                            "data": data,
                            "cached": true,
                            "timestamp": current_time
                        }));
                    }
                }
                PromiseResult::Failed => {
                    responses.push(json!({
                        "index": i,
                        "error": "Contract call failed",
                        "cached": false
                    }));
                }
            }
        }
        
        json!({
            "responses": responses,
            "cache_info": {
                "cache_key": cache_key,
                "ttl_ms": ttl_ms,
                "cached_at": current_time
            }
        })
    }
    
    pub fn get_cached_or_fetch(
        &mut self,
        contracts: Vec<AccountId>,
        method_name: String,
        cache_key: String,
        ttl_ms: Option<u64>,
    ) -> serde_json::Value {
        let ttl_ms = ttl_ms.unwrap_or(300000); // 5 minutes default
        let current_time = env::block_timestamp_ms();
        let mut cached_responses = Vec::new();
        let mut contracts_to_call = Vec::new();
        
        // Check cache for each contract
        for (i, contract) in contracts.iter().enumerate() {
            let contract_cache_key = format!("{}_{}", cache_key, i);
            
            if let Some(cached) = self.response_cache.get(&contract_cache_key) {
                if (current_time - cached.timestamp) < cached.ttl {
                    // Use cached data
                    cached_responses.push(json!({
                        "index": i,
                        "data": cached.data,
                        "cached": true,
                        "cached_at": cached.timestamp
                    }));
                    continue;
                }
            }
            
            // Need to fetch fresh data
            contracts_to_call.push((i, contract.clone()));
        }
        
        if contracts_to_call.is_empty() {
            // All data was cached
            return json!({
                "responses": cached_responses,
                "all_cached": true
            });
        }
        
        // Make calls only for non-cached contracts (implementation would continue here)
        json!({
            "cached_count": cached_responses.len(),
            "fresh_calls_needed": contracts_to_call.len()
        })
    }
}
```

  </TabItem>
</Tabs>

### Technique 2: Response Streaming

For large datasets, implement streaming responses:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 TypeScript">

```typescript
@call({privateFunction: true})
streaming_response_callback({
  batch_size,
  offset,
  total_expected
}: {
  batch_size: number;
  offset: number;
  total_expected: number;
}) {
  const batch_results = [];
  let processed = 0;
  
  for (let i = 0; i < env.promise_results_count(); i++) {
    const result = getValueFromPromise(i);
    
    if (result.success) {
      const data = JSON.parse(result.value);
      
      // Process data in chunks
      if (Array.isArray(data)) {
        const chunk_start = offset + processed;
        const chunk_end = Math.min(chunk_start + batch_size, data.length);
        const chunk = data.slice(chunk_start, chunk_end);
        
        batch_results.push({
          contract_index: i,
          chunk_start,
          chunk_end,
          data: chunk,
          has_more: chunk_end < data.length
        });
        
        processed += chunk.length;
      } else {
        batch_results.push({
          contract_index: i,
          data,
          has_more: false
        });
      }
    }
  }
  
  const has_more_batches = processed < total_expected;
  
  return {
    batch: {
      offset,
      size: processed,
      results: batch_results
    },
    pagination: {
      has_more: has_more_batches,
      next_offset: offset + processed,
      total_processed: offset + processed,
      total_expected
    }
  };
}
```

  </TabItem>
  <TabItem value="rust" label="🦀 Rust">

```rust
#[derive(Serialize, Deserialize)]
pub struct BatchResult {
    contract_index: usize,
    chunk_start: usize,
    chunk_end: usize,
    data: serde_json::Value,
    has_more: bool,
}

#[derive(Serialize, Deserialize)]
pub struct PaginationInfo {
    has_more: bool,
    next_offset: usize,
    total_processed: usize,
    total_expected: usize,
}

#[private]
pub fn streaming_response_callback(
    &mut self,
    batch_size: usize,
    offset: usize,
    total_expected: usize,
) -> serde_json::Value {
    let mut batch_results = Vec::new();
    let mut processed = 0;
    
    for i in 0..env::promise_results_count() {
        match env::promise_result(i) {
            PromiseResult::Successful(result) => {
                if let Ok(data) = near_sdk::serde_json::from_slice::<serde_json::Value>(&result) {
                    if let Some(array_data) = data.as_array() {
                        // Process array data in chunks
                        let chunk_start = offset + processed;
                        let chunk_end = std::cmp::min(chunk_start + batch_size, array_data.len());
                        
                        if chunk_start < array_data.len() {
                            let chunk: Vec<_> = array_data[chunk_start..chunk_end].to_vec();
                            
                            batch_results.push(BatchResult {
                                contract_index: i,
                                chunk_start,
                                chunk_end,
                                data: json!(chunk),
                                has_more: chunk_end < array_data.len(),
                            });
                            
                            processed += chunk.len();
                        }
                    } else {
                        // Single data item
                        batch_results.push(BatchResult {
                            contract_index: i,
                            chunk_start: 0,
                            chunk_end: 1,
                            data,
                            has_more: false,
                        });
                    }
                }
            }
            PromiseResult::Failed => {
                env::log_str(&format!("Contract {} failed in streaming callback", i));
            }
        }
    }
    
    let has_more_batches = processed < total_expected;
    
    json!({
        "batch": {
            "offset": offset,
            "size": processed,
            "results": batch_results
        },
        "pagination": PaginationInfo {
            has_more: has_more_batches,
            next_offset: offset + processed,
            total_processed: offset + processed,
            total_expected,
        }
    })
}
```

  </TabItem>
</Tabs>

## Common Pitfalls and Best Practices

### ❌ Common Mistakes

1. **Index Misalignment**: Not properly tracking which promise result corresponds to which contract
2. **Insufficient Error Handling**: Not handling all possible failure scenarios gracefully
3. **Memory Overload**: Processing too much data at once without pagination
4. **Cache Invalidation**: Not properly managing cache expiration and updates
5. **Gas Estimation**: Underestimating gas needed for complex response processing

### ✅ Best Practices

1. **Structured Response Types**: Define clear interfaces for different response types
2. **Comprehensive Error Handling**: Handle partial failures, timeouts, and data corruption
3. **Response Validation**: Always validate data from external contracts
4. **Performance Monitoring**: Track response times and failure rates
5. **Graceful Degradation**: Provide meaningful responses even when some calls fail
6. **Documentation**: Document response formats and error conditions clearly

## Summary

Advanced response handling is crucial for building robust cross-contract applications. Key takeaways:

- **Design for Failure**: Always expect some contract calls to fail
- **Validate Everything**: Never trust data from external contracts without validation
- **Cache Wisely**: Use caching to improve performance but manage invalidation carefully
- **Monitor Performance**: Track metrics to identify slow or failing contracts
- **Plan for Scale**: Use streaming and pagination for large datasets

## Next Steps

You now understand advanced response handling patterns! The final step is to learn about [testing and deployment](5-testing-deployment.md) to ensure your contracts work reliably in production.

:::tip Response Handling Strategy

Choose your response handling strategy based on your use case:
- **Real-time applications**: Prioritize speed with caching and circuit breakers
- **Data accuracy critical**: Focus on validation and multiple source verification  
- **High availability**: Implement comprehensive fallback mechanisms
- **Large datasets**: Use streaming and pagination for scalability

:::