---
id: randomness-on-chain
title: "Handling Randomness in Smart Contracts"
description: "Learn how to implement secure randomness in NEAR smart contracts with practical examples, security considerations, and testing strategies."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Randomness is essential for many blockchain applications, from games and lotteries to cryptographic protocols. However, generating truly random numbers in a deterministic blockchain environment presents unique challenges. This tutorial explores how to handle randomness securely in NEAR smart contracts using the coin flip example.

![img](/docs/assets/examples/coin-flip.png)

---

## The Blockchain Randomness Challenge

In traditional computing, randomness comes from hardware entropy or pseudo-random generators. Blockchains, however, are deterministic systems where every validator must reach identical conclusions. This creates the fundamental "blockchain randomness problem."

### Why Traditional Randomness Fails

Every blockchain transaction must be reproducible. If validators generated different random numbers for the same contract call, consensus would break. The network requires predictable outcomes from identical inputs.

---

## NEAR's Randomness Solution

NEAR Protocol addresses this through the `env::random_seed()` function, which provides deterministic but unpredictable entropy. This function returns a 32-byte array derived from block metadata and previous block hashes.

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/src/contract.ts"
            start="23" end="56" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/src/lib.rs"
            start="46" end="70" />
  </Language>
</CodeTabs>

### How NEAR's Random Seed Works

The random seed combines:
- Current block hash
- Previous block hashes  
- Block timestamp
- Block metadata

This ensures values are:
- **Deterministic**: Same inputs produce identical outputs
- **Unpredictable**: Cannot be predicted before block production
- **Uniform**: Evenly distributed across the possible range

---

## Security Considerations

While NEAR's randomness suits many applications, important limitations exist:

### Validator Influence
Block producers control timing and transaction ordering, potentially influencing the random seed for high-value applications.

### Predictability Window  
The random seed becomes predictable once the block is produced. Applications requiring future unpredictability need additional measures.

### Enhanced Security Patterns

**Commit-Reveal Scheme:**
```rust
// Phase 1: User commits to their guess
pub fn commit_guess(&mut self, commitment_hash: String) {
    self.commitments.insert(&env::predecessor_account_id(), commitment_hash);
}

// Phase 2: Reveal after randomness is generated
pub fn reveal_guess(&mut self, guess: String, nonce: String) -> String {
    let expected_hash = env::sha256(format!("{}{}", guess, nonce).as_bytes());
    // Verify commitment and determine winner
}
```

**Combining Multiple Entropy Sources:**
```rust
pub fn enhanced_random(&self, user_salt: String) -> u8 {
    let random_bytes = env::random_seed();
    let combined = format!("{}{}", user_salt, hex::encode(random_bytes));
    let hash = env::sha256(combined.as_bytes());
    hash[0]
}
```

---

## Testing Randomness

Testing random functions requires special approaches since outputs vary with each call:

<CodeTabs>
  <Language value="js" language="ts">
    <Github fname="main.test.js"
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
            start="32" end="57" />
  </Language>
  <Language value="rust" language="rust">
    <Github fname="lib.rs" 
            url="https://github.com/near-examples/coin-flip-examples/blob/main/contract-rs/tests/tests.rs"
            start="25" end="82" />
  </Language>
</CodeTabs>

### Testing Strategies

**Distribution Testing:**
```rust
#[test]
fn test_randomness_distribution() {
    let mut heads_count = 0;
    let mut tails_count = 0;
    
    for _ in 0..1000 {
        let result = contract.flip_coin("heads".to_string());
        if result.contains("heads") {
            heads_count += 1;
        } else {
            tails_count += 1;
        }
    }
    
    // Verify roughly even distribution (within 10%)
    let ratio = heads_count as f64 / tails_count as f64;
    assert!(ratio > 0.9 && ratio < 1.1);
}
```

**Predictability Testing:**
```rust
#[test]  
fn test_randomness_unpredictability() {
    let first_result = contract.flip_coin("heads".to_string());
    let second_result = contract.flip_coin("heads".to_string());
    
    // Results should vary (not always identical)
    // Note: This test may occasionally fail due to chance
    assert_ne!(first_result, second_result);
}
```

---

## Alternative Approaches

### Oracle-Based Randomness
For applications requiring higher security guarantees:

```rust
// Request secure random from external oracle
pub fn request_secure_random(&mut self) -> Promise {
    oracle::request_random()
        .then(ext_self::handle_random_callback(env::current_account_id()))
}

pub fn handle_random_callback(&mut self, random_value: u256) {
    self.process_game_result(random_value);
}
```

### Multi-Party Randomness
Combine inputs from multiple parties:

```rust
pub fn multi_party_flip(&mut self, player_seeds: Vec<String>) -> String {
    let mut combined_entropy = env::random_seed().to_vec();
    
    for seed in player_seeds {
        let seed_hash = env::sha256(seed.as_bytes());
        combined_entropy.extend_from_slice(&seed_hash);
    }
    
    let final_hash = env::sha256(&combined_entropy);
    if final_hash[0] % 2 == 0 { "heads" } else { "tails" }
}
```

---

## Choosing the Right Approach

| Method | Best For | Security Level | Complexity |
|--------|----------|----------------|------------|
| `env::random_seed()` | Games, simple lotteries | Medium | Low |
| Commit-Reveal | Interactive games | High | Medium |
| External Oracles | Financial applications | Very High | High |
| Multi-Party | Consensus games | High | Medium |

---

## Real-World Implementation: Coin Flip

The coin flip example demonstrates practical randomness implementation:

1. **User submits guess** ("heads" or "tails")
2. **Contract generates randomness** using `env::random_seed()`  
3. **Contract determines outcome** by checking if random byte is even/odd
4. **Contract updates points** if guess was correct
5. **Contract returns result** with outcome message

This approach works well for:
- Low-stakes gaming
- Educational examples  
- Immediate result requirements
- Simple user interactions

---

## Best Practices Summary

1. **Understand your security requirements** - Higher stakes need stronger randomness
2. **Test thoroughly** - Verify distribution and unpredictability  
3. **Consider attack vectors** - Validator manipulation, predictability windows
4. **Use appropriate methods** - Match security to application needs
5. **Document limitations** - Be transparent about randomness properties
6. **Plan for upgrades** - Design systems that can adopt stronger randomness later

---

## Advanced Considerations

### Economic Incentives
Consider the economic value at stake. A validator might manipulate randomness for a $1M lottery but not for a 1Â¢ game.

### Timing Attacks
Be aware that transaction timing can influence randomness. Consider using future block hashes for delayed reveals.

### Regulatory Compliance
Some jurisdictions have specific requirements for gambling randomness. Consult legal experts for regulated applications.

---

## Conclusion

Blockchain randomness requires balancing security, usability, and cost. NEAR's `env::random_seed()` provides excellent randomness for most applications. High-value or security-critical applications should implement additional measures like commit-reveal schemes or external oracles.

The key is matching your randomness solution to your application's specific requirements and risk profile.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- node: `18.19.1` 
- rustc: `1.77.0`

:::
