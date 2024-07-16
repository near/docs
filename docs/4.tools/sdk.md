---
id: sdk
title: "NEAR SDK"
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"
import {FeatureList, Column, Feature} from "@site/src/components/featurelist";

The NEAR SDK is a library that allow to develop smart contracts. Currently, there exist two versions of NEAR SDK: one for Rust and one for JavaScript.

:::tip Want to build a smart contract?

The best place to start learning is our [QuickStart Guide](../2.build/2.smart-contracts/quickstart.md)

:::

<FeatureList>
  <Column title="" size="6">
    <Feature url="https://docs.rs/near-sdk/latest/near_sdk/" title="Rust SDK" subtitle="Rust SDK Reference docs" image="smartcontract-rust.png" />
  </Column>
  <Column title="" size="6">
    <Feature url="https://near.github.io/near-sdk-js/" title="JavaScript SDK" subtitle="Javascript SDK Reference docs" image="smartcontract-js.png" />
  </Column>
</FeatureList>

---

## Smart Contracts on NEAR


This is how a smart contract written in Rust and JavaScript using the NEAR SDK looks like:

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

    ```js
    @NearBindgen({})
    class HelloNear {
      greeting: string = 'Hello';

      @view({}) // This method is read-only and can be called for free
      get_greeting(): string {
        return this.greeting;
      }

      @call({}) // This method changes the state, for which it cost gas
      set_greeting({ greeting }: { greeting: string }): void {
        near.log(`Saving greeting ${greeting}`);
        this.greeting = greeting;
      }
    }
    
    ```

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

    ```rust
    #[near(contract_state)]
    pub struct Contract {
        greeting: String,
    }

    impl Default for Contract {
        fn default() -> Self {
            Self { greeting: "Hello".to_string(), }
        }
    }

    #[near]
    impl Contract {
        pub fn get_greeting(&self) -> String {
            self.greeting.clone()
        }

        pub fn set_greeting(&mut self, greeting: String) {
            self.greeting = greeting;
        }
    }
    ```

  </TabItem>

</Tabs>

:::tip

Want to build a smart contract? Check our [QuickStart Guide](../2.build/2.smart-contracts/quickstart.md)

:::

---

## 🎉 Ready to start developing?

Start from our [Smart Contract QuickStart Guide](../2.build/2.smart-contracts/quickstart.md), and let it guide you through all our documentation on building smart contracts

---

## Want to See Examples?

We have a section dedicated to [tutorials and examples](../3.tutorials/examples/guest-book.md) that will help you understand diverse use cases and how to implement them

:::tip

If you are new to smart contracts, we recommend you start with our [Smart Contract QuickStart Guide](../2.build/2.smart-contracts/quickstart.md) before moving to the examples

:::

---

## Searching for the Reference Docs

If you need to find a specific function signature, or understand the SDK struct/classes, please visit the SDK specific pages:

- [Rust SDK](https://docs.rs/near-sdk/latest/near_sdk/)
- [JavaScript SDK](https://near.github.io/near-sdk-js/)

:::tip

If you are new to smart contracts, we recommend you start with our [Smart Contract QuickStart Guide](../2.build/2.smart-contracts/quickstart.md) before moving to the reference documentation

:::
