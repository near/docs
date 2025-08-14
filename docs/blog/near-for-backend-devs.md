# NEAR for Web2 Backend Developers: A Familiar Frontier

As an experienced backend developer, you're adept at building robust services, managing databases, and ensuring system reliability. When you hear "blockchain," it might sound like a completely different paradigm. However, platforms like [NEAR Protocol](/protocol/basics) are designed to be surprisingly accessible, offering a new kind of backend infrastructure that leverages many concepts you're already familiar with.

This article will guide you through understanding NEAR from a backend perspective. We'll explore how it can be seen as a decentralized, highly available backend platform where:

*   **Your Application's Backend Logic** lives in "[smart contracts](/smart-contracts/what-is)," which you can write in familiar languages like [Rust](/tools/sdk) (and others that compile to [WebAssembly](/smart-contracts/anatomy/)).
*   **Application State** is managed per application, similar to having a dedicated database for your service, but with global availability and data integrity secured by the network.
*   **User Identity and Permissions** are cryptographically secured and can be reliably checked within your application logic using an [AccountId](/protocol/account-model).
*   **Data Replication** is handled by the network, providing something akin to a master-master replication setup with eventual consistency, typically reaching [finality](/protocol/transaction-execution#receipts--finality) (undisputed agreement) in about 1-2 seconds.

We'll build a simplified Twitter-like application using Rust to demonstrate these concepts in action. Let's explore how your backend skills translate to this decentralized frontier.

## NEAR as Your Decentralized Backend Platform

Imagine building a backend service that doesn't run on a specific server or cluster you manage, but on a global network of computers. This is the essence of NEAR. Let's break down how familiar backend concepts map to NEAR.

**1. Application State: Your Own Namespace, Globally Replicated**

On NEAR, each application (called a "smart contract" or just "contract") gets its own unique identifier, its [AccountId](/protocol/account-model) (e.g., `your-app.near`, `twitter-clone.your-account.near`). Think of this `AccountId` as a namespace for your application's dedicated state.

*   **Isolated State:** All data for your application is stored within the context of its `AccountId`. It's like having a dedicated key-value store or a NoSQL document database scoped specifically to your application. One application cannot directly tamper with the raw storage of another.
*   **Mutability with Control:** While the history of *changes* to this state is cryptographically secured and immutable (forming the blockchain), the *current state* of your application's data is indeed mutable. However, these mutations are not arbitrary. They can only occur by invoking the logic defined within your smart contract – your application's backend code. You define the rules for how state can change.
*   **Data Replication & Availability:** This application state isn't just on one machine. The NEAR network, composed of many independent "[validator" nodes](/protocol/network/validators), replicates this state. This is analogous to a distributed database system with master-master replication. If some nodes go offline, the network continues to operate, and your application's state remains available.
*   **Eventual Consistency with Fast Finality:** When a user interacts with your application to change its state (e.g., posting a tweet), this change is broadcast to the network. Validators process it, and once consensus is reached, the change is final. NEAR is designed for fast [finality](/protocol/transactions/overview#transaction-lifecycle--finality), typically around 1-2 seconds. After this, the new state is an undisputed part of the global record. This is a form of eventual consistency, but with a very short window to reach that consistent, final state.

**2. Backend Logic: Smart Contracts**

The code that defines how your application's state can be read and modified is what we call a "[smart contract](/smart-contracts/what-is)."

*   **Your Business Logic:** This is where you write your application's rules. For our Twitter example, this logic will define how a tweet is created, who can post it, how tweets are retrieved, etc.
*   **Execution Environment:** This code doesn't run on a traditional OS. It's compiled into [WebAssembly (Wasm)](/smart-contracts/anatomy/wasm), a highly efficient and sandboxed binary format. This Wasm code is what's stored on the NEAR platform under your application's `AccountId` and executed by the validator nodes. The use of Wasm means you can write this logic in several familiar languages, with [Rust](/tools/sdk) being a primary and robust choice offering strong safety and performance.
*   **Millions of Contracts:** The NEAR blockchain can host millions of these smart contracts, each operating within its own account namespace, managing its own state, and exposing its own set of functions.

**3. User Identity and Authorization: Cryptographic Certainty**

In traditional web2 backends, you manage user authentication (e.g., passwords, OAuth) and then use sessions or tokens to identify users for subsequent requests. NEAR has a built-in, cryptographically secure way to identify who is initiating an action.

*   **Transactions and Signatures:** Every interaction that attempts to change your application's state must be initiated as a "[transaction](/protocol/transactions/overview)" signed by a NEAR account. This signature proves ownership of that account.
*   **`predecessor_account_id`:** When your smart contract code is executed, it has access to [`env::predecessor_account_id()`](https://docs.rs/near-sdk/latest/near_sdk/env/fn.predecessor_account_id.html). This reliably tells your code which NEAR account signed and sent the transaction that triggered the current function call.
*   **Built-in Access Control:** You can use `predecessor_account_id` to implement powerful access control. For example:
    *   A user can only modify or delete data they "own" (e.g., only the author of a tweet can delete it).
    *   Certain functions can only be called by specific administrative accounts.
    *   This is like having `@isAuthenticated` and `@hasPermission` checks, but grounded in cryptographic proof tied to the user's account, not just a session token your server issued.

By combining these elements – namespaced and replicated state, Wasm-compiled business logic (smart contracts), and cryptographic user identity – NEAR provides a robust platform for building decentralized applications with familiar backend engineering principles.

## Smart Contracts in Rust: The Twitter Example

Now, let's see how this translates into code. Your backend logic on NEAR is encapsulated in a smart contract. As mentioned, these contracts are compiled to [WebAssembly (Wasm)](/smart-contracts/anatomy/wasm), allowing you to use languages like [Rust](/tools/sdk). Rust is a popular choice due to its performance, safety features, and strong tooling support within the NEAR ecosystem.

We'll build a simplified Twitter-like application. Users will be able to post tweets, view all tweets, view tweets by a specific author, and like tweets. The core idea is that each tweet is undeniably linked to its author via their NEAR account ID.

Here's the Rust code for our contract:

```rust
// ================================================================================================
// NEAR SMART CONTRACT: Twitter-like Social Media Platform
// ================================================================================================
//
// This smart contract implements a Twitter-like platform on the NEAR blockchain.
// For backend engineers new to blockchain, think of this as a REST API service that:
// - Stores data permanently on a distributed database (the blockchain)
// - Has no central server - it runs on thousands of nodes worldwide
// - Charges small fees (gas) for write operations to prevent spam
// - Is immutable once deployed (like deploying code that can't be changed)
//
// Key NEAR/Blockchain Concepts for Backend Engineers:
// - Smart Contract = Your backend service logic that runs on blockchain
// - Account ID = User identifier (like username, but globally unique)
// - Gas = Computational cost (like AWS Lambda pricing, but for blockchain operations)
// - Storage = Persistent data (like a database, but decentralized and permanent)
// - View Methods = Read operations (free, like GET requests)
// - Call Methods = Write operations (cost gas, like POST/PUT/DELETE requests)

// Import NEAR SDK components - think of this as importing your web framework
use near_sdk::store::IterableMap; // Like HashMap but optimized for blockchain storage
use near_sdk::{env, near, AccountId, PanicOnDefault, Timestamp};

// ================================================================================================
// DATA STRUCTURES
// ================================================================================================

// Tweet represents a single tweet in our social media platform
// The #[near] attribute automatically handles serialization/deserialization
// Think of this as your API response/request DTOs, but for blockchain
#[near(serializers = [borsh, json])]
#[derive(Clone, Debug, PartialEq)]
pub struct Tweet {
    // Unique identifier for this tweet (like auto-increment ID in SQL)
    pub id: u64,

    // NEAR account that created this tweet (like user_id in traditional apps)
    // AccountId is NEAR's version of a username/user identifier
    pub author: AccountId,

    // The actual tweet content (like message body)
    pub text: String,

    // When this tweet was created (NEAR provides nanoseconds since Unix epoch)
    // Think of this as created_at timestamp in your database
    pub timestamp: Timestamp,

    // Number of likes this tweet has received (like a counter field)
    pub likes: u64,
}

// ================================================================================================
// SMART CONTRACT STATE
// ================================================================================================

// TwitterContract is the main contract state - think of this as your application's
// in-memory state that persists between requests (like instance variables in a service class)
//
// In traditional backend:
// - You'd have a database to store tweets
// - You'd have application state in memory/cache
//
// In NEAR:
// - Contract state IS your database (stored on blockchain)
// - State persists between function calls
// - State is automatically loaded/saved by NEAR runtime
#[near(contract_state)]
#[derive(PanicOnDefault)] // Prevents accidental initialization without proper setup
pub struct TwitterContract {
    // Storage for all tweets - like your main tweets table
    // IterableMap is NEAR's version of HashMap optimized for blockchain storage
    // Key: tweet_id, Value: Tweet object
    tweets: IterableMap<u64, Tweet>,

    // Counter for generating unique tweet IDs (like auto-increment in SQL)
    // This ensures each tweet gets a unique identifier
    next_tweet_id: u64,
}

// ================================================================================================
// CONTRACT IMPLEMENTATION
// ================================================================================================

// The #[near] attribute marks this implementation block as containing contract methods
// Think of these as your REST API endpoints, but they run on the blockchain
#[near]
impl TwitterContract {
    // ============================================================================================
    // INITIALIZATION METHOD
    // ============================================================================================

    // Contract constructor - called once when the contract is first deployed
    // Similar to database migrations or initial setup in traditional backends
    // The #[init] attribute marks this as the initialization method
    #[init]
    pub fn new() -> Self {
        Self {
            // Initialize tweet storage with a unique storage prefix
            // "b't'" is a byte string prefix to avoid storage conflicts
            // Think of this as creating a table in your database
            tweets: IterableMap::new(b"t"),

            // Start tweet IDs from 0
            next_tweet_id: 0,
        }
    }

    // ============================================================================================
    // WRITE METHODS (Cost gas, modify state)
    // ============================================================================================

    // Post a new tweet - equivalent to POST /tweets endpoint
    // This is a "call" method that modifies state and costs gas
    pub fn post_tweet(&mut self, text: String) -> Tweet {
        // Get the account that called this method (like extracting user from JWT token)
        // env::predecessor_account_id() returns who made the transaction
        let author = env::predecessor_account_id();

        // Get current blockchain timestamp (like System.currentTimeMillis() in Java)
        // NEAR provides nanoseconds since Unix epoch
        let timestamp = env::block_timestamp();

        // Generate unique ID for this tweet (like auto-increment primary key)
        let tweet_id = self.next_tweet_id;

        // Create the tweet object (like building your entity/model)
        let new_tweet = Tweet {
            id: tweet_id,
            author: author.clone(),
            text,
            timestamp,
            likes: 0, // New tweets start with 0 likes
        };

        // Store the tweet in our "database" (contract storage)
        // This is like INSERT INTO tweets (...) VALUES (...)
        self.tweets.insert(tweet_id, new_tweet.clone());

        // Increment ID counter for next tweet (like auto-increment)
        self.next_tweet_id += 1;

        // Log the action - similar to application logging
        // These logs are stored on blockchain and can be queried
        env::log_str(&format!(
            "Tweet #{} posted by @{} at {}",
            tweet_id, author, timestamp
        ));

        // Return the created tweet (like returning the entity in REST API)
        new_tweet
    }

    // Like a tweet - equivalent to POST /tweets/{id}/like endpoint
    // This modifies state (increments like counter) so it costs gas
    pub fn like_tweet(&mut self, tweet_id: u64) -> Option<Tweet> {
        // Try to get a mutable reference to the tweet
        // This is like: SELECT * FROM tweets WHERE id = ? FOR UPDATE
        if let Some(tweet) = self.tweets.get_mut(&tweet_id) {
            // Increment the like counter (like UPDATE tweets SET likes = likes + 1)
            tweet.likes += 1;

            // Log the like action for transparency/debugging
            env::log_str(&format!(
                "Tweet #{} liked by @{}. Total likes: {}",
                tweet_id,
                env::predecessor_account_id(), // Who liked the tweet
                tweet.likes
            ));

            // Return the updated tweet (clone because we need to return owned data)
            Some(tweet.clone())
        } else {
            // Tweet doesn't exist - log the attempt
            // In REST API, this would be a 404 Not Found
            env::log_str(&format!(
                "Attempt to like non-existent tweet #{} by @{}",
                tweet_id,
                env::predecessor_account_id()
            ));
            None
        }
    }

    // Delete a tweet - equivalent to DELETE /tweets/{id} endpoint
    // Only the tweet author can delete their own tweets (authorization check)
    pub fn delete_tweet(&mut self, tweet_id: u64) {
        // Get who's trying to delete the tweet (like checking JWT/session)
        let caller = env::predecessor_account_id();

        // Check if tweet exists and verify ownership
        // This is like: SELECT author FROM tweets WHERE id = ?
        if let Some(tweet) = self.tweets.get(&tweet_id) {
            // Authorization check - only author can delete their tweet
            // Similar to checking if user owns the resource in REST API
            if tweet.author == caller {
                // Delete the tweet from storage
                // Like: DELETE FROM tweets WHERE id = ?
                self.tweets.remove(&tweet_id);
                env::log_str(&format!("Tweet #{} deleted by @{}", tweet_id, caller));
            } else {
                // Unauthorized deletion attempt - log security event
                // In REST API, this would be 403 Forbidden
                env::log_str(&format!(
                    "User @{} attempted to delete tweet #{} but is not the author.",
                    caller, tweet_id
                ));
            }
        } else {
            // Tweet doesn't exist - log the attempt
            // In REST API, this would be 404 Not Found
            env::log_str(&format!(
                "Attempt to delete non-existent tweet #{} by @{}",
                tweet_id, caller
            ));
        }
    }

    // ============================================================================================
    // READ METHODS (Free, don't modify state)
    // ============================================================================================
    // These are "view" methods - they don't cost gas and don't modify contract state
    // Think of these as GET endpoints in your REST API

    // Get all tweets with pagination - like GET /tweets?offset=0&limit=10
    // from_index: starting position (like OFFSET in SQL)
    // limit: maximum number of tweets to return (like LIMIT in SQL)
    pub fn get_all_tweets(&self, from_index: Option<u64>, limit: Option<u64>) -> Vec<Tweet> {
        // Set default values if not provided (common REST API pattern)
        let start = from_index.unwrap_or(0);
        let limit_val = limit.unwrap_or(10);

        // Query tweets with pagination (like SELECT * FROM tweets LIMIT x OFFSET y)
        self.tweets
            .iter() // Iterate over all tweets
            .skip(start as usize) // Skip 'start' number of tweets (OFFSET)
            .take(limit_val as usize) // Take only 'limit_val' tweets (LIMIT)
            .map(|(_key, tweet)| tweet.clone()) // Extract tweet objects (ignore keys)
            .collect() // Collect into Vector to return
    }

    // Get specific tweet by ID - like GET /tweets/{id}
    pub fn get_tweet_by_id(&self, tweet_id: u64) -> Option<Tweet> {
        // Simple lookup by primary key
        // Like: SELECT * FROM tweets WHERE id = ?
        self.tweets.get(&tweet_id).cloned()
    }

    // Get tweets by specific author with pagination - like GET /users/{id}/tweets
    // This demonstrates filtering in blockchain storage (no SQL WHERE clause available)
    pub fn get_tweets_by_author(
        &self,
        author_id: AccountId,
        from_index: Option<u64>,
        limit: Option<u64>,
    ) -> Vec<Tweet> {
        let start = from_index.unwrap_or(0);
        let limit_val = limit.unwrap_or(10);

        // We need to manually filter since blockchain storage doesn't have SQL-like queries
        // This is like doing: SELECT * FROM tweets WHERE author = ? LIMIT x OFFSET y
        // But we have to iterate through all tweets and filter manually
        let mut author_tweets = Vec::new();
        let mut count = 0;
        let mut current_index = 0;

        // Iterate through all tweets to find matches
        for (_id, tweet) in self.tweets.iter() {
            // Check if this tweet belongs to the requested author
            if tweet.author == author_id {
                // Apply pagination logic
                if current_index >= start && count < limit_val {
                    author_tweets.push(tweet.clone());
                    count += 1;
                }
                current_index += 1;
            }

            // Optimization: stop early if we've found enough tweets
            if count >= limit_val && current_index > start {
                break;
            }
        }

        author_tweets
    }
}

// ================================================================================================
// KEY DIFFERENCES FROM TRADITIONAL BACKEND:
// ================================================================================================
//
// 1. STATE PERSISTENCE:
//    - Traditional: Use database, cache, session storage
//    - NEAR: Contract state IS your database, automatically persisted
//
// 2. USER AUTHENTICATION:
//    - Traditional: JWT tokens, sessions, OAuth
//    - NEAR: Cryptographic signatures, account-based auth built-in
//
// 3. SCALABILITY:
//    - Traditional: Horizontal scaling, load balancers, microservices
//    - NEAR: Automatic scaling across blockchain network
//
// 4. COSTS:
//    - Traditional: Server costs, database costs, bandwidth
//    - NEAR: Gas fees for computations, storage costs per byte
//
// 5. DEPLOYMENT:
//    - Traditional: CI/CD pipelines, blue-green deployments
//    - NEAR: Deploy once, immutable (or upgradeable with special patterns)
//
// 6. DATA CONSISTENCY:
//    - Traditional: ACID transactions, eventual consistency
//    - NEAR: Atomic transactions guaranteed by blockchain consensus
//
// 7. QUERYING DATA:
//    - Traditional: SQL, NoSQL query languages
//    - NEAR: Manual iteration, no complex queries (design for simple access patterns)
```

This Rust smart contract ([here is the full version](https://github.com/frol/near-twitter-example-rs)) acts as the backend for our Twitter application. It defines the data structures, the initial state, and the functions that users can call to interact with the application. The use of `predecessor_account_id` is central to associating tweets with their authors.

## Interacting with Your NEAR Backend (Smart Contract)

Once your Rust smart contract is compiled to Wasm and deployed to a NEAR account (e.g., `twitter-app.your-account.near`), it's live and ready for interaction. So, how do you or your users "call" these backend functions?

Think of it like interacting with a standard web API, but instead of HTTP requests to a server you own, you're sending transactions or making RPC calls to the NEAR network, targeting your specific contract account and method.

**1. Calling Methods that Change State (e.g., `post_tweet`, `like_tweet`):**

These are "call" methods (marked `&mut self` in Rust) because they modify the contract's state.

*   **Transactions:** To execute these, a user (or an application acting on their behalf) constructs a [transaction](/protocol/transactions/overview). This transaction specifies:
    *   The `receiver_id`: Your contract's account ID (e.g., `twitter-app.your-account.near`).
    *   The `method_name`: The function to call (e.g., `"post_tweet"`).
    *   `args`: The arguments for the function, typically as a JSON string (e.g., `{"text": "My first NEAR tweet!"}`).
    *   `signer_id`: The NEAR account ID of the user initiating the action. The transaction must be signed with this account's private key. This signature is how `env::predecessor_account_id()` in your contract gets populated.
    *   `attached_deposit`: If the method is `#[payable]`, users can attach NEAR tokens to the call. (Not used in our Twitter example's `post_tweet`).
    *   `gas`: An amount of "[gas](/protocol/gas)" to pay for the computation and storage resources used by the transaction. Gas is a fee mechanism on the network.
*   **Tools:**
    *   **[NEAR CLI](/tools/near-cli):** A command-line interface for interacting with NEAR. Example:
        ```bash
        near call twitter-app.your-account.near post_tweet '{"text": "Hello from CLI!"}' --accountId user1.near
        ```
    *   **NEAR SDKs (JavaScript, etc.):** For web or mobile frontends, you'd use a JavaScript library (like [`near-api-js`](/tools/near-api)) to construct and send these transactions through a user's NEAR Wallet (which handles the signing).

**2. Calling Methods that Only Read State (e.g., `get_all_tweets`, `get_tweet_by_id`):**

These are "view" methods (marked `&self` in Rust) because they only read state and don't modify it.

*   **RPC Calls:** These can be made directly to a NEAR [RPC node](/api/rpc/introduction) without needing to send a full transaction and without requiring gas from the caller (though the RPC provider might have its own rate limits or fees for heavy usage).
*   **Tools:**
    *   **[NEAR CLI](/tools/near-cli):**
        ```bash
        near view twitter-app.your-account.near get_all_tweets '{"from_index": 0, "limit": 5}'
        ```
    *   **NEAR SDKs (JavaScript, etc.):** Libraries like [`near-api-js`](/tools/near-api) provide straightforward ways to make these view calls.

**In essence:**

*   **Modifying state:** Requires a signed transaction, costs gas, involves the whole network consensus. This is your `POST`, `PUT`, `DELETE` equivalent.
*   **Reading state:** Can be done with a lighter-weight RPC view call, generally free at the contract level. This is your `GET` equivalent.

Your frontend application (web, mobile) or other backend services would use these mechanisms to interact with the smart contract, which acts as the secure, decentralized backend logic and data store. The key is that the user always initiates and authorizes state-changing actions via their own NEAR account and cryptographic signatures.

## Benefits for Backend Developers: Why Consider NEAR?

As an experienced backend developer, you might be wondering what advantages building on a platform like NEAR offers compared to your traditional stacks. Here are a few key benefits:

1.  **Enhanced Data Integrity and Auditability:**
    *   Every state change is a transaction recorded on an immutable ledger. This provides an automatic, transparent audit trail. For applications where provenance, history, or verifiability is critical, this is a built-in feature, not something you need to painstakingly architect.
    *   The rules for state changes are defined in the smart contract code, which is itself auditable on the blockchain.

2.  **Reduced Need for Trust / Trustless Interactions:**
    *   Because the backend logic (smart contract) and state are managed by a decentralized network with consensus, users (and other services) don't need to trust a single central operator to execute logic correctly or maintain data integrity. The "code is law" principle reduces counterparty risk.
    *   This is powerful for multi-party applications where participants might not fully trust each other but can trust the neutral execution environment of the blockchain.

3.  **Built-in User Account System and Cryptographic Security:**
    *   NEAR's [account model](/protocol/account-model) provides a ready-made, secure user identity system. You don't need to build and maintain your own user database, password hashing, or session management for core identity.
    *   The use of `predecessor_account_id` based on cryptographic signatures provides strong guarantees about who initiated an action, simplifying authorization logic within your contract.

4.  **High Availability and Resilience:**
    *   Being a decentralized network, NEAR is inherently resilient to single points of failure. Your application's backend logic and state remain accessible as long as the NEAR network itself is operational, which is designed for high uptime. This is like getting a globally distributed, fault-tolerant deployment out of the box.

5.  **Censorship Resistance:**
    *   Once deployed, your smart contract logic cannot be easily shut down or tampered with by a single entity, including the original developer (unless specific upgrade mechanisms are built in and governed by clear rules). This provides a degree of censorship resistance for applications and their data.

6.  **Fast Finality and Scalable by Design:**
    *   NEAR's ~1-2 second [finality](/protocol/transactions/overview#transaction-lifecycle--finality) means transactions are quickly confirmed and irreversible, providing a responsive user experience for a decentralized system.
    *   The sharding architecture ([Nightshade](https://near.org/blog/near-launches-nightshade-sharding-paving-the-way-for-mass-adoption)) is designed for scalability, allowing the network to handle an increasing number of transactions as more applications and users join the ecosystem. This addresses a common concern with older blockchain technologies.

7.  **Interoperability and Composability (Advanced):**
    *   Smart contracts on NEAR can call each other, allowing for complex applications to be built by composing functionalities from different contracts. This opens up possibilities for creating ecosystems of interconnected services.

While NEAR (and blockchain in general) introduces new considerations like [gas fees](/protocol/gas) for transactions and on-chain [storage costs](/protocol/storage/storage-staking), it offers a unique set of benefits for specific types of applications. If your application requires high degrees of transparency, user control over their data, verifiable logic, or interactions between multiple distrusting parties, NEAR provides a compelling backend infrastructure that complements your existing skillset.

## Conclusion: Your Backend Skills, Decentralized on NEAR

Transitioning from traditional web2 backend development to building on NEAR isn't about discarding your expertise; it's about applying it in a new context. We've seen how NEAR can be understood as a decentralized backend platform where:

*   **Application-specific state** is managed securely and replicated globally, akin to a highly available, namespaced database.
*   **Smart contracts**, written in languages like Rust, serve as your backend logic, defining all rules for state interaction.
*   **User identity** is cryptographically enforced, with `predecessor_account_id` offering a reliable way to manage permissions and ownership.
*   The platform provides **fast finality** (~1-2 seconds) and is designed for **scalability**.

The Twitter example, though simplified, illustrates how you can build applications where data ownership and control are transparently handled by the logic you deploy. Concepts like managing state, defining APIs (contract methods), and ensuring data integrity are all directly transferable.

NEAR offers a robust environment for building applications that benefit from decentralization – whether for enhanced transparency, user empowerment, or creating new forms of multi-party collaboration. With your existing backend development skills, you're well-equipped to explore this powerful platform and build the next generation of applications. The learning curve is more about understanding the decentralized paradigm and NEAR's specific APIs rather than learning programming from scratch.

Ready to dive deeper? Check out the [NEAR Documentation](/) and the [Rust SDK examples](https://github.com/near-examples?q=&type=all&language=rust&sort=) to start your journey.
