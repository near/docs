---
id: random
title: Random Numbers
description: "Learn about secure random number generation in NEAR smart contracts and how to avoid predictable randomness vulnerabilities."
---

Generating secure random numbers in blockchain environments is challenging because blockchains are deterministic. NEAR Protocol provides a `random seed` mechanism, but understanding its properties and limitations is crucial for building secure applications that rely on randomness.

---

## How NEAR Random Seed Works

NEAR provides a `random seed` that enables smart contracts to create random numbers and strings. This seed has unique properties:

### Deterministic and Verifiable

The random seed is **deterministic and verifiable**:
- It comes from the validator that produced the block
- The validator signs the previous block-hash with their private key
- The signature becomes the random seed for the current block
- Anyone can verify the seed, but only the validator knows it in advance.

---

## Security Properties

The way the random seed is created provides two important security properties:

### 1. Only Validator Can Predict
- **Only the validator mining the transaction can predict** which random number will be generated
- **No one else can predict it** because nobody knows the validator's private key (except the validator)
- This provides some security, but creates a centralization risk.

### 2. Validator Cannot Interfere
- The validator **cannot interfere** with the random number being created
- They must sign the previous block-hash, over which they (with high probability) had no control
- The previous block was likely produced by a different validator.

**Important**: While validators cannot directly manipulate the seed, they can still exploit it through other means.

---

## Attack Type 1: Gaming the Input

### The Vulnerability

If your contract asks users to provide an input and rewards them if it matches the random seed, validators can exploit this:

**Example**: 
- Contract asks user to choose a number between 1-100
- If user's number matches the random seed, they win a prize
- Validator knows the random seed before the block is mined
- Validator creates a transaction with the winning number
- Validator includes their transaction in the block
- Validator wins the prize

```rust
// ❌ VULNERABILITY: Gaming the input - validator can predict and win
// User provides input and random seed is generated in same block
pub fn guess_number(&mut self, guess: u8) {
    let account_id = env::signer_account_id();

    // Store user's guess
    self.bets.insert(account_id.clone(), guess.to_string());

    // Generate random number in SAME block - validator knows it!
    let random_seed = env::random_seed();
    let random_number = (random_seed[0] % 100) as u8;

    // Validator can see user's guess and create winning transaction
    if guess == random_number {
        let reward = NearToken::from_near(1);
        let previous_user_reward = self.rewards.get(&account_id).unwrap_or(&NearToken::ZERO);
        let user_reward = previous_user_reward.saturating_add(reward);
        self.rewards.insert(account_id, user_reward);
    }
}
```

### Why This Works

Since the validator knows which `random seed` will be generated in their block, they can:
1. Calculate the winning input
2. Create a transaction with that input
3. Include their transaction in the block
4. Win every time

**Result**: Validators can guarantee wins in single-block games.

---

## Attack Type 2: Refusing to Mine the Block

### The Two-Stage Solution

One way to fix "gaming the input" is to use a two-stage process:

1. **Bet Stage**: User sends their input/choice (e.g., "heads" or "tails")
2. **Resolve Stage**: Contract generates random number and determines winner (in a later block)

This prevents validators from gaming the input because:
- User's choice is locked in the first block
- Random seed is generated in a different (later) block
- Validator cannot know the random seed when user makes their choice

### The Remaining Vulnerability

However, validators can still exploit this through selective block mining:

**Attack Process**:
1. Validator creates a "bet" transaction with their account
2. Validator chooses either input (doesn't matter which)
3. When it's the validator's turn to validate:
   - They check what random seed will be generated
   - If their bet would win, they include the "resolve" transaction in the block
   - If their bet would lose, they skip the "resolve" transaction
4. Other validators might mine it, but validator increases their win rate

**Result**: Validator improves their probability of winning, though doesn't guarantee it.

---

## Coin Flip Example: Probability Manipulation

### Fair Coin Flip (Without Attack)

In a fair coin-flip game:
- You choose "heads" or "tails" in the bet stage
- Random seed determines outcome in resolve stage
- **Probability of winning: 50%** (1/2)

### With Refusing to Mine Attack

If you're a validator and can refuse to mine losing blocks:

**Scenarios**:
- You bet "heads"
- If random seed = "heads": You mine the block and win ✅
- If random seed = "tails": You skip the block (other validator might mine it)
  - If other validator mines: You lose ❌
  - If no one mines: Transaction delayed, you try again later

**Mathematical Analysis**:

If you always bet "heads" and can choose to flip again when "tails" comes out:

**Possible outcomes** (H = heads, T = tails):
- H H: Win ✅
- T H: Win ✅ (retry after T)
- H T: Win ✅ (retry after H)
- T T: Lose ❌ (retry after T, then T again)

**Result**: You win in 3 out of 4 scenarios = **75% win rate** (3/4)

**Improvement**: From 50% to 75% = **25% increase in win probability**

**Note**: These odds dilute in games with more possible outcomes (e.g., dice with 6 sides).

---

## Best Practices for Randomness

### 1. Use Multi-Block Randomness
- Separate bet and resolve into different blocks
- Prevents input gaming attacks
- Still vulnerable to selective mining, but reduces risk.

### 2. Use Commit-Reveal Schemes
- Users commit to their choice (hash of choice + secret)
- Later reveal the choice and secret
- Random seed generated after reveal
- Prevents both input gaming and selective mining.

### 3. Use External Oracles
- Use trusted external randomness sources
- Chainlink VRF or similar services
- More secure but requires external dependencies.

### 4. Accept Validator Advantage
- For non-critical randomness, accept that validators have slight advantage
- Use for games where small advantage is acceptable
- Not suitable for high-stakes applications.

### 5. Use Multiple Validators
- Distribute randomness across multiple validators
- Reduces single validator control
- More decentralized approach.
