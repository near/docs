---
id: coin-flip
title: "How to Generate Randomness on NEAR (Coin Flip Tutorial)"
description: "Learn how to simulate randomness in NEAR smart contracts using block hashes and secure patterns."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Why Randomness in Blockchain is Hard

Blockchains are deterministic, meaning every node must agree on outcomes. True randomness is impossible, but we can simulate it using:

- **Block hashes** (unpredictable per block)
- **Account IDs** (add entropy)
- **Cryptographic proofs** (for advanced use cases)

:::warning
On-chain randomness is **not truly random**! Avoid it for high-value applications (use oracles like [Chainlink](https://chain.link) instead).
:::

---

## Implementing a Coin Flip with NEAR Randomness

NEAR provides `env::random_seed()` (Rust) or `near.randomSeed()` (JS):

<Tabs>
<TabItem value="rust" label="Rust">

```rust
pub fn flip_coin() -> String {
    // Get a pseudo-random seed
    let random_seed = env::random_seed();
    // Convert to a number between 0 and 1
    let random_value = u128::from_le_bytes(random_seed[..16].try_into().unwrap()) % 2;
    if random_value == 0 { "heads" } else { "tails" }
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
function flipCoin() {
  const randomSeed = near.randomSeed();
  const randomValue = BigInt(`0x${randomSeed.substr(0, 16)}`) % 2n;
  return randomValue === 0n ? "heads" : "tails";
}
```

</TabItem>
</Tabs>

**Key Notes**:
- `% 2` limits output to 0 or 1 (coin flip).
- This is **pseudo-random**—validators could manipulate it if stakes are high!

---

## Testing Your Randomness

Always verify fairness. Here’s a test for 100 flips:

<Tabs>
<TabItem value="rust" label="Rust">

```rust
#[test]
fn test_coin_flip_distribution() {
    let mut heads = 0;
    for _ in 0..100 {
        if flip_coin() == "heads" { heads += 1; }
    }
    assert!(heads > 30 && heads < 70, "Heads should be ~50%");
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
test("Coin flip distribution", async () => {
  let heads = 0;
  for (let i = 0; i < 100; i++) {
    if (await contract.flipCoin() === "heads") heads++;
  }
  expect(heads).toBeGreaterThan(30);
  expect(heads).toBeLessThan(70);
});
```

</TabItem>
</Tabs>

---

## When to Use On-Chain Randomness

| Use Case | Recommended? | Notes |
|------------------------|--------------|--------------------------------|
| NFT traits | ✅ Yes | Low stakes, fun features |
| Game mechanics | ✅ Yes | Non-financial outcomes |
| Lottery winners | ❌ No | Use oracles for high fairness |

---

## Further Reading
- [NEAR Randomness Security Guide](../../smart-contracts/security/random.md)
- [Chainlink VRF (True Randomness)](https://docs.chain.link/vrf)