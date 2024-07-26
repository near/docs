---
id: introduction
title: Auction Zero to Hero 
sidebar_label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this Zero to Hero series, you'll build an auction smart contract from start to finish, deploy a factory contract to launch multiple auctions, , and craft a frontend to interact with the auctions. This series will slowly build up in complexity, teaching you about several key primitives and concepts along the way:
- Using block_timestamp
- Locking a contract 
- Making cross-contract calls
- Sending Non-Fungible Tokens
- Sending and receiving Fungible Tokens 

This tutorial comes with contracts written in both JavaScript and Rust. 

---

## Prerequisites

To complete this series you'll need:

<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">



    </TabItem>

    <TabItem value="rust" label="🦀 Rust">

        - [Rust](https://www.rust-lang.org/tools/install)
        - [NEAR-CLI-RS](../../4.tools/cli-rs.md#setup)
        - [cargo-near](https://github.com/near/cargo-near)

    </TabItem>

</Tabs>



---


| Step | Name                              | Description |
|------|-----------------------------------|-------------|
| 1    | [Basic contract](./1-basic.md)           | Learn how to create a basic smart contract from scratch, use block time and test a contract |
| 2    | [Locking the contract](./2-locking.md)   | Learn to create contracts with no access keys |
| 3    | [Winning an NFT](./3-nft.md)             | Learn about sending NFTs using cross-contract calls |
| 4    | [Bidding with FTs](./4-ft.md)            | Learn about sending and recieving FTs |

---

## Versioning 

:::note Versioning for this tutorial
At the time of this writing, this example works with the following versions:

- rustc: `1.78.0`
- near-sdk-rs: `5.1.0`
- cargo-near: `0.6.2`
- near-cli-rs `0.12.0`

:::




<Tabs groupId="code-tabs">

    <TabItem value="js" label="🌐 JavaScript">

    TODO

    </TabItem>

    <TabItem value="rust" label="🦀 Rust">


    </TabItem>

</Tabs>