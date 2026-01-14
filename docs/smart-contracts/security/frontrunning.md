---
id: frontrunning
title: Front Running
description: "Learn about frontrunning attacks in NEAR smart contracts and how to prevent them with proper transaction ordering and MEV protection techniques."
---

Frontrunning is a type of attack where validators (or other actors) see pending transactions before they execute and submit their own transactions to profit from the information. In NEAR Protocol, validators have access to the transaction pool, enabling them to frontrun user transactions.

In the NEAR network:
- **Validators have access to the transaction pool** - they can see all pending transactions
- **Transactions are visible before execution** - validators can analyze them
- **Validators control transaction ordering** - they decide which transactions to include and in what order
- **Validators can insert their own transactions** - they can submit transactions before user transactions.

---

## The Attack Mechanism

### Basic Frontrunning Process

1. **User submits transaction** - e.g., solving a puzzle for a reward
2. **Validator sees transaction** - transaction is in the pool, visible to validator
3. **Validator analyzes** - validator identifies profitable opportunity
4. **Validator submits own transaction** - validator creates transaction with winning answer
5. **Validator includes their transaction first** - validator orders transactions to execute their own first
6. **Validator claims reward** - validator's transaction executes first and claims the prize
7. **User's transaction fails or gets nothing** - user's transaction executes but reward is already claimed.

**Result**: Validator profits from information they shouldn't have access to, user loses.

---

## Example: Puzzle-Solving Game

### Vulnerable Game Design

Imagine you create a game where:
- Users submit solutions to puzzles
- First correct solution wins a prize
- Solutions are submitted as transactions
- Contract pays reward to first solver

<hr class="subsection" />

### The Attack

**Scenario**:
1. User solves puzzle and submits transaction with correct answer
2. Validator sees the transaction in the pool
3. Validator extracts the correct answer from user's transaction
4. Validator creates their own transaction with the same answer
5. Validator includes their transaction before user's transaction
6. Validator's transaction executes first and claims the prize
7. User's transaction executes but finds prize already claimed.

```rust
// ❌ VULNERABILITY: First-come-first-served - validator can frontrun
// Validator sees user's solution in transaction pool and submits it first
pub fn solve_puzzle(&mut self, puzzle_id: String, solution: String) {
    // Validator can see this transaction in pool and extract solution
    let correct_answer = self.get_puzzle_answer(&puzzle_id);

    if solution == correct_answer {
        // First solver gets reward - validator can frontrun!
        if !self.solved_puzzles.contains_key(&puzzle_id) {
            let solver = env::signer_account_id();
            self.solved_puzzles.insert(puzzle_id, solver.clone());

            let reward = NearToken::from_near(1);
            let previous_solver_reward = self.rewards.get(&solver).unwrap_or(&NearToken::ZERO);
            let solver_reward = previous_solver_reward.saturating_add(reward);
            self.rewards.insert(solver, solver_reward);
        }
    }
}
```

**Result**: Validator steals the reward that should have gone to the user.

---

## Types of Frontrunning Attacks

### 1. Simple Frontrunning
- Validator sees profitable transaction
- Validator submits identical or similar transaction
- Validator's transaction executes first
- Validator profits, user loses.

### 2. Sandwich Attacks
- Validator sees large trade transaction
- Validator places transaction before (frontrun) and after (backrun)
- Validator profits from price impact
- User gets worse price due to validator's transactions.

### 3. Priority Gas Auctions
- Multiple actors compete to frontrun
- They bid higher gas fees for priority
- Highest bidder gets frontrun position
- Creates expensive competition.

---

## Real-World Impact

Frontrunning attacks are particularly dangerous for:

- **Reward mechanisms** - Games, competitions, bounties
- **DEX trades** - Token swaps where price impact matters
- **NFT minting** - First-come-first-served mints
- **Auction systems** - Time-based or first-bid auctions
- **Oracle updates** - Transactions that depend on external data

---

## Prevention Strategies

### 1. Commit-Reveal Schemes

**How it works**:
1. Users commit to their answer (hash of answer + secret)
2. After commit period, users reveal their answer and secret
3. Contract verifies hash matches revealed answer
4. Winner determined after all reveals.

**Benefits**:
- Validators cannot see the actual answer in the commit phase
- Only after reveal can they see answers, but it's too late
- Prevents frontrunning of answers.

<hr class="subsection" />

### 2. Time-Delayed Execution

**How it works**:
- Users submit transactions
- Transactions are queued but not executed immediately
- Execution happens after a delay (e.g., next block)
- Validators cannot predict final state

**Benefits**:
- Reduces validator's information advantage
- Makes frontrunning more difficult
- Still vulnerable but harder to exploit

<hr class="subsection" />

### 3. Private Transaction Pools

**How it works**:
- Use private transaction submission
- Transactions not visible in public pool
- Only executed when included in block

**Limitations**:
- Requires infrastructure support
- May not be available on all networks
- Adds complexity

<hr class="subsection" />

### 4. Randomized Execution

**How it works**:
- Randomize which transactions execute
- Don't use first-come-first-served
- Use lottery or random selection

**Benefits**:
- Reduces advantage of frontrunning
- Makes attacks less predictable
- Fairer distribution

<hr class="subsection" />

### 5. Economic Disincentives

**How it works**:
- Require deposits for participation
- Slash deposits for malicious behavior
- Make frontrunning unprofitable

---

## Best Practices

1. **Never use first-come-first-served** for valuable rewards
2. **Use commit-reveal schemes** for games and competitions
3. **Add time delays** to reduce information advantage
4. **Randomize selection** when possible
5. **Require deposits** to discourage malicious behavior
6. **Test with frontrunning scenarios** before deployment
7. **Document frontrunning risks** for users.

## Additional Resources

For more information on frontrunning and MEV (Maximal Extractable Value), see:
- Paradigm's "Ethereum is a Dark Forest" blog post: https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest
- This explains the broader concept of frontrunning in blockchain systems.
