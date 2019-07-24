# Validator FAQ

**What is a validator?**  
Validators are nodes that are engaged in building and maintaining the network. 

#### What are the validator responsibilities?

All validators:

* provide security by verifying the validity of state transitions in different blocks. 
* must maintain a 90% uptime. If a node is offline more than 10% they will be removed from the validator proposal pool in the next epoch

A subset of \(randomly selected\) validators are **block-producing validators**. The only difference between a validator and a block-producing validator is that the latter is also tasked with: 

* producing a single block that contains all the current chunks \(shard blocks\).
* collecting transactions for a given shard, producing shard blocks, and communicating these to other nodes on the network

**How are validators rewarded?**  
Validators receive 60% of the block reward for their help in maintaining the network. 

Individual validators are rewarded in proportion to the number of seats they hold, following the formula: 

Validator's % of Block Reward = \# of Seats / Total \# of Seats X Uptime\(%\)

Example:10 seats / 100 total seats X 90% uptime = 9% of the epoch's block reward

**How many seats are available?**  
Total \# of seats = 100 X Total \# of Shards. 

There are 100 seats per shard in NEAR. At launch there should be 8 shards, thus 800 total seats. 

The maximum number of validators = Total \# of seats

**How do I signal my interest in becoming a validator?**  
If you would like to become a validator, take a look at [staking on official TestNet.](running-a-node.md#staking-on-official-testnet) In short you:

1. Create and fund an account
2. Create a new key pair to be used for staking 
3. Start a node with this key pair in validator\_key.json 
4. Send a staking transaction using your wallet / CLI with the stake amount and public key

#### **What is 'staking'?**

We call staking a process of sending StakeTransaction that inform the network that given account wants to become a validator in upcoming epochs. This transaction must provide a public key and staking amount.

**How do I get chosen to become a validator?**

At the beginning of epoch T, we collect proposals from all new stakers from T - 1 as well as validators from T - 1 with an uptime &gt; 90%. From here we calculate a seat price, and validators that stake an amount greater than the seat price will be a validator for that epoch. For proposals with a stake amount less than the seat price, the stake amount will be refunded. 

**How is seat price calculated? How is number of seats calculated?**

1. Minimum Stake = Largest Stake / Total \# of Seats
2. Total Contribution = Sum of all the staking amounts greater than the minimum stake
3. Seat Price = Total contribution / Total Number of Seats by the total number of seats
4. Number of Seats = Stake amount / Seat Price
5. Seat % = Number of Seats / Total Number of Seats

Take a look at our staking spreadsheet for a more in depth look.

**What are the slashing conditions?**  
Currently, the only slashing condition is signing two blocks at the same height. 

**How do I run a node?**

{% page-ref page="running-a-node.md" %}

**Can I delegate stake?** 

NEAR doesn’t implement delegation on the protocol level.

Instead NEAR allows smart contracts to stake, because in NEAR contracts and accounts are the same.

Thus, if validators want to accept delegated stake, they must deploy a contract with specific rules of how delegation and reward splitting works and advertise that contract as destination to delegate.

You can read more details about possible use cases here: [https://research.nearprotocol.com/t/staking-and-delegation-via-smart-contract/43](https://research.nearprotocol.com/t/staking-and-delegation-via-smart-contract/43)

