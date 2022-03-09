---
id: overview
title: Overview
sidebar_label: Overview
---

![NEAR terminology](/docs/assets/near-terminology.png)

- **Blockchain**: an incentivized, distributed, permanent, irrefutable record of computation and data
- **Transaction**: a cryptographically signed request for work on the blockchain made up of one or more Actions
- **Action**: one of 8 types of primitive work (ie. CreateAccount, DeployContract, FunctionCall) that can be completed by the NEAR platform
- **Storage**: the database (key-value store) maintained by the blockchain and available to contracts for state management

---

- **Block**: a unit of consensus among validators that includes processed transactions
- **Chunk**: a portion of the blockchain which is processed on a single node (one chunk per node per block)
- **Epoch**: a unit of time during which validators of the network remain constant

---

- **Validator**: a person or company that maintains a computer which processes transactions on the blockchain using Proof of Stake consensus
- **Node**: a computer, run by a validator, that participates on the network and follows one or more shards
- **Shard**: a piece of the blockchain which operates in parallel to store data, process transactions and achieve consensus. (note: there may be one shard or there may be many, depending on how far the chain has scaled)

---

- **Genesis**: the launch of the chain which includes at least all validators for the first epoch
