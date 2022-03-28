# Access Keys

## How Access Keys Work on Other Blockchains

On other blockchains, access keys often follow the Public and Private Key Pair pattern. Public keys are used to identify an account, and Private Keys are used for signing transactions.

If anyone has access to your private key, they have access to all the cryptocurrency in your account.

## What does NEAR do Instead?

NEAR uses a human-readable account system where the public identifier is the name you create. For example:

* **`Bob100.near`** is what you would find on NEAR
* **`Public Key: 0x123xxxxx.....`** is what you would find on other blockchains as a means of identifying accounts

Instead of a crazy string of random numbersInstead of a crazy string of random numbers that you have to write down and keep safe, you simply use an account name similar to that of your average social media username.

On NEAR, there are two types of Access Keys that these accounts manage:

* **Full Access Keys**
* **FunctionCall Access Keys**

## Full and FunctionCall Access Keys

Let's talk about what these keys are and how do they work. The difference between these keys is based on the level of permissions a user wants to grant a decentralized application (or dApp).

### Why should you care?

FunctionCall access keys adds a layer of protection from malicious Apps:

* Requires user's approval per transaction
* Limits excessive Gas fees

### Full Access Keys

First, let's review full access keys in detail. An application with a full access key has the ability to:

* Freely utilize all of your tokens
* Create new accounts funded and managed by your account
* Delete accounts
* Make Contract Calls with no [Gas](https://docs.near.org/docs/concepts/gas) limit
* Deploy [Contracts](https://www.ibm.com/topics/smart-contracts) onto the account (each account can have one contract deployed onto it at a time)
* Full access to your NEAR tokens with the ability to stake them or transfer them without secondary approval
* Create additional keys
* Delete keys

The NEAR wallet, for example, is a dApp that utilizes a Full Access Key and is given the key-pair to that account upon the account's creation.

There can be multiple full access keys per one account, which can be a good or a bad thing. For example, say you find out that someone has one of your full-access keys. You can resecure your account by deleting a full access key.

Of course, you should be very careful with what applications you give full access to. Generally, you do not want to grant full access to any application if you can avoid it.

To protect users from malicious applications, NEAR can limit the kinds of permission an application has. That's where FunctionCall Access Key comes in.

### FunctionCall Access Keys

FunctionCall Access Keys Have unique restrictions designed to help protect users.

These kinds of keys require the user's approval to transfer NEAR via redirect to the NEAR wallet.

The developer can specify with View and Change Methods the user can interact with using their account.

Each transaction that changes the state of the NEAR blockchain incurs a fee. However, FunctionCall Keys allows fees of up to only **0.25 NEAR** to be accrued per transaction.

## How can you get Started?

Head on over to [wallet.near.org](https://wallet.near.org) to get started creating your `mainnet` wallet and find me on the [NEAR Discord channel](https://near.chat).

Then head on over to [awesomenear.com](https://awesomenear.com) to explore some of the cool applications out there built on NEAR, or head on over to [near.org](https://near.org) to get started on developing your NEAR project.
