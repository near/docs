---
name: An "oracle"
route: /tutorials/oracle
menu: Tutorials
---

# Writing an Oracle

Decentralized apps are great for running verifiable computation, dealing with monetary assets and having trust in the results. But these apps can only perform operations that involve internal data, transaction data and calls to other decentralized apps. They can't natively interface with the Internet.

Oracles are the way to use data from internet or call some external non-blockchain service \(price feed, DNS server, etc\).

An Oracle is a service that runs outside of the blockchain which can consume events from both the internet and the blockchain and then post information to both of these areas as well.

Examples:

* **Price feed:** reads price for some currency and posts it on the blockchain. Used for building stable coins, prediction markets and others.
* **Sensor feed:** sensors in the wild record information and post it into the blockchain.
* **External service validation:** such as Twitter account or DNS name - on posting of the account on the blockchain, this oracle will get the posted info, validate it via the web2 service and then post result back into blockchain.
* **Outbound oracle:** - allows to send information from blockchain into the web2. For example on receival of payment in blockchain to perform some operation in web2 service.

For some of the applications a single oracles is enough to provide required functionality. For example if you are budiling an e-commerce website and want to accept payments from the blockchain, you can implement outbound oracle that runs on your server. Other cases are when data consumed from outside world inside the blockchain must be accurate as there are some incentive to falsify it. For example, price feed should be provided by multiple independent entities and then a basic consensus done on what is the actual price at the moment.

In this tutorial we will start by building a price feed oracle, starting from single oracle providing data and extending it to multi-oracle system.

## Step 1 -- Build smart contract to host the price

Coming soon!

