---
id: anatomy
title: Anatomy of a Contract
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import MainAs from "./example/main.as.md";
import MainRs from "./example/main.rs.md";


Smart contracts are composed by public and private functions that interact with each other. Public functions expose an interface for NEAR users, while private functions can only be used internally.

---

## Example: Anatomy of a Counter

Lets take a look to the anatomy of a simple contract: a [counter](https://near.dev). The contract stores a numerical variable and exposes a method to increment it.

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - Assemblyscript">
    <MainAs></MainAs>
  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">
    <MainRs></MainRs>
  </TabItem>
</Tabs>

### Public Methods


## Rust

- The public methods that do **NOT** change the state take as a parameter `&self` (without being mutable).
- The public methods that **DO** modify the state take as parameter `&mut self` (mutable)