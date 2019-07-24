# NEAR Economics + constants

## General 

**What is NEAR?**  
NEAR is the name of the currency used within the NEAR protocol.

**What are the denominations of NEAR?**  
The smallest denomination aka _base unit_ of NEAR is an attoNEAR. Below is a list of the named denominations and their value in attoNEAR. 

| Unit | atto-NEAR Value | atto-NEAR |
| :--- | :--- | :--- |
| attoNEAR | 1 attoNEAR | 1 |
| microNEAR | 1e12 attoNEAR | 1 000 000 000 000 |
| milliNEAR | 1e15 attoNEAR | 1 000 000 000 000 000 |
| NEAR | 1e18 attoNEAR | 1 000 000 000 000 000 000 |

**What will the total supply of NEAR be at launch?**  
Total supply of NEAR at mainnet launch will be 1 billion. 

**How often are blocks produced?**  
Block time is currently 1 block per second. If there is an interference on the network, blocks may be produced less frequently.

**What are the block rewards and how are they calculated?**  
Block rewards in NEAR are defined as the total reward for mining each block \(i.e. the combined total of the transaction and storage fees + the coinbase transaction\). 

The minimum yearly block reward is 5% of the total supply. If the transaction + storage fees are less than 5%, the coinbase reward will make up the difference. If the transaction fees + storage fees are more than 5%, the coinbase reward will be zero. 

Here is some example block reward splits. Percentages are based off percentages of total supply in circulation.

| Tx fee + storage fee | Coinbase Reward | Total Block Reward |
| :--- | :--- | :--- |
| 0% | 5% | 5% |
| 2.6% | 2.4% | 5% |
| 5.2% | 0% | 5.2% |

Initially we expect most of the reward for minting a block to come from the block reward, but over time a as network usage grows, the reward will come purely from fees, and once the transaction + storage fee exceeds 5%, the block reward will be zero. 

**What is the estimated block reward at launch?**   
About ~1.59 Near per block. This can be calculated as:

5% X 1 000 000 000 \(total supply of NEAR\) / 31 536 000 blocks \(seconds in a year\) ≈ 1.59 NEAR / block

**How much time in an Epoch?**  
An epoch lasts half a day, or for 43200 blocks \(12 hours X 60 minutes X 60 seconds\). Block rewards are aggregated and distributed at the end of every epoch. 

**How are block rewards distributed?**   
Block rewards are assigned at the end of every epoch, with the total block reward being divided amongst three entities\*: 

| Role | Percentage of Block Reward |
| :--- | :--- |
| Validator | 60% |
| Developers | 30% |
| Protocol | 10% |

\*These proportions may change over time dependent on network decisions to incentivize different behavior. 

