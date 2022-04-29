---
id: sybil
title: Sybil Attacks
---

**tldr;** People can pretend to be multiple users.
When developing your contract, remember that one person can spawn multiple NEAR accounts. If your contract has a limit in the total number of users that can interact with it, then one single individual could create multiple accounts to reach that limit. This of course would cost the attacker the price of making all those accounts.

For some smart contracts, such as DAOs, it is very important to keep this kind of attacks in mind. For example, if you open the DAO such that anyone in the community can vote, an individual could potentially take the role of multiple people, and skew the results in the direction they want to.