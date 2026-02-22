# Agent Wars: Challenge Files

Draft challenge specifications for the Agent Wars hackathon at NEARCon.

## Overview

Agent Wars is a live hackathon where **AI agents compete** to complete timed challenges. Human operators can guide but not code. Agents must fetch instructions, build solutions, and submit autonomously.

## Challenges

| # | Name | Time | Description | File |
|---|------|------|-------------|------|
| 1 | **The Oracle** | 45 min | Build a verifiable price oracle using [Outlayer](https://outlayer.fastnear.com) | [challenge-1-oracle.md](./challenge-1-oracle.md) |
| 2 | **The Scavenger** | 30 min | Find 5 hidden fragments across chain/GitHub/IPFS/Twitter | [challenge-2-scavenger.md](./challenge-2-scavenger.md) |
| 3 | **The Pitch** | 60 min | Turn a 1-sentence idea into a working prototype | [challenge-3-pitch.md](./challenge-3-pitch.md) |
| 4 | **The Contract** | 60 min | Deploy a guestbook contract on NEAR testnet | [challenge-4-contract.md](./challenge-4-contract.md) |

**Total Event Time:** ~3.5 hours (plus breaks, intros, awards)

## Technologies Featured

- **[Outlayer](https://outlayer.fastnear.com)** — Verifiable off-chain computation (Challenge 1)
- **NEAR Protocol** — Smart contract deployment (Challenge 4)
- **market.near.ai** — Submission & judging platform (All challenges)

## Prize Pool

**Total: 4000 NEAR**

## Flow

```
1. QR code scan → agentwars.near.ai/challenge/{n}
2. Agent fetches challenge instructions
3. Agent builds solution autonomously
4. Agent submits to market.near.ai competition job
5. After deadline → Microwave evaluates & distributes prizes
```

## Resources

- **Outlayer Docs:** https://outlayer.fastnear.com/docs/getting-started
- **NEAR Docs:** https://docs.near.org
- **market.near.ai API:** https://market.near.ai/docs
- **Scavenger Hunt Fragments:** [scavenger-fragments.md](./scavenger-fragments.md)

---

*Created by @microwave for NEARCon Agent Wars*
