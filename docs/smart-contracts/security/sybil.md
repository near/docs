---
id: sybil
title: Sybil Attacks
description: "Learn about sybil attacks in NEAR smart contracts and how to prevent them with proper identity verification and anti-gaming mechanisms."
---

A Sybil attack occurs when a single individual or entity creates multiple accounts to gain disproportionate influence in a system. In NEAR Protocol, account creation is relatively inexpensive and straightforward, making Sybil attacks a significant concern for applications that rely on per-account voting, governance, or resource allocation.


NEAR Protocol allows anyone to create multiple accounts easily:
- **Low cost** - Account creation is inexpensive
- **No identity verification** - No KYC or identity checks required
- **Unlimited accounts** - No restrictions on number of accounts per person
- **Full functionality** - Each account has full capabilities.

---

## Attack Scenario: DAO Voting

### Vulnerable Voting System

Imagine you create a [DAO](../../primitives/dao.md) (Decentralized Autonomous Organization) with the following design:

- **Open voting** - Anyone in the community can vote
- **One vote per account** - Each NEAR account gets one vote
- **Simple majority** - Decisions made by majority vote
- **No identity verification** - No checks to ensure one person = one account.

<hr class="subsection" />

### The Attack

**Scenario**:
1. DAO proposal requires community vote
2. Malicious actor wants proposal to pass (or fail)
3. Attacker creates 100 NEAR accounts
4. Attacker votes with all 100 accounts in favor of their preferred outcome
5. Attacker's 100 votes outweigh legitimate community votes
6. Attacker controls the outcome.

```rust
// ❌ VULNERABILITY: One-account-one-vote - attacker can create multiple accounts
pub fn vote(&mut self, vote: bool) {
    let voter = env::signer_account_id();

    // No checks for multiple accounts from same person
    // Attacker can create 100 accounts and vote 100 times

    if !self.votes.contains_key(&voter) {
        self.votes.insert(voter, vote);

        if vote {
            self.yes_votes += 1;
        } else {
            self.no_votes += 1;
        }
    }
}
```

**Result**: A single person controls the governance decision through multiple accounts, defeating the purpose of decentralized governance.

---

## Real-World Impact

Sybil attacks are particularly dangerous for:

### 1. DAO Governance
- **Voting manipulation** - Single person controls multiple votes
- **Proposal outcomes** - Attackers can force proposals to pass/fail
- **Treasury control** - Attackers can influence fund allocation
- **Protocol changes** - Attackers can push harmful protocol updates.

### 2. Airdrops and Token Distribution
- **Unfair allocation** - Attackers claim multiple airdrops
- **Resource drain** - Legitimate users get less
- **Economic manipulation** - Attackers accumulate disproportionate tokens.

### 3. Reputation Systems
- **Fake reviews** - Multiple accounts create fake positive/negative reviews
- **Rating manipulation** - Attackers boost or damage reputation scores
- **Trust systems** - Attackers game trust mechanisms.

### 4. Resource Allocation
- **Fair distribution** - Attackers claim multiple shares
- **Quota systems** - Attackers bypass per-account limits
- **Reward programs** - Attackers claim multiple rewards.

---

## Prevention Strategies

### 1. Proof of Humanity / Identity Verification

**How it works**:
- Require users to prove they are unique humans
- Use services that provide identity verification
- Verify identity before allowing participation.

**Benefits**:
- Strong protection against Sybil attacks
- Ensures one person = one vote/account.

**Limitations**:
- Requires external services
- May reduce accessibility
- Privacy concerns.

<hr class="subsection" />

### 2. Token-Weighted Voting

**How it works**:
- Votes weighted by token holdings
- More tokens = more voting power
- Still vulnerable but requires economic stake.

**Benefits**:
- Attackers must acquire tokens (costly)
- Aligns incentives with economic stake
- Reduces casual Sybil attacks.

**Limitations**:
- Wealthy actors still have more influence
- Doesn't prevent wealthy Sybil attacks
- May not be suitable for all use cases.

<hr class="subsection" />

### 3. Reputation-Based Systems

**How it works**:
- Build reputation over time
- Require minimum reputation to vote
- Reputation earned through legitimate activity.

**Benefits**:
- Makes Sybil attacks time-consuming
- Requires sustained legitimate activity
- Reduces impact of new fake accounts.

**Limitations**:
- Doesn't prevent long-term Sybil attacks
- May exclude legitimate new users
- Complex to implement.

<hr class="subsection" />

### 4. Economic Barriers

**How it works**:
- Require deposits or fees to participate
- Make account creation expensive
- Slash deposits for malicious behavior.

**Benefits**:
- Increases cost of Sybil attacks
- Deters casual attackers
- Economic disincentive.

**Limitations**:
- May exclude legitimate users
- Wealthy attackers can still afford it
- Doesn't solve the fundamental problem.

<hr class="subsection" />

### 5. Time-Locked Participation

**How it works**:
- Require accounts to exist for minimum time
- Delay voting rights for new accounts
- Prevent immediate Sybil attacks.

**Benefits**:
- Simple to implement
- Reduces impact of mass account creation
- Gives time to detect patterns.

**Limitations**:
- Doesn't prevent long-term attacks
- May delay legitimate participation
- Attackers can plan ahead.

<hr class="subsection" />

### 6. Activity-Based Requirements

**How it works**:
- Require minimum activity before voting
- Must interact with protocol multiple times
- Prove engagement before participation.

**Benefits**:
- Makes Sybil attacks more expensive
- Requires sustained effort
- Filters out casual fake accounts.

**Limitations**:
- Doesn't prevent determined attackers
- May be gamed with automated activity
- Complex to define "legitimate activity".

---

## Best Practices

1. **Never use simple one-account-one-vote** for important decisions
2. **Combine multiple strategies** - Use layered defenses
3. **Monitor for patterns** - Detect unusual account creation
4. **Require economic stake** - Make attacks costly
5. **Use identity verification** for critical governance
6. **Implement reputation systems** for long-term protection
7. **Document Sybil risks** - Inform users of limitations.

---

## DAO-Specific Recommendations

For DAO governance systems:

- **Use token-weighted voting** with minimum thresholds
- **Require identity verification** for major decisions
- **Implement reputation systems** for ongoing participation
- **Monitor voting patterns** for suspicious activity
- **Use multi-sig or time delays** for critical proposals
- **Combine on-chain and off-chain** governance mechanisms.