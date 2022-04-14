---
id: anatomy
title: Anatomy of a Contract
sidebar_label: 🧠 Anatomy of a Contract
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

import ReferenceCode from '@theme/ReferenceCodeBlock'

import MainAs from "./example/main.as.md";
import ModelAs from "./example/models.as.md";

import MainRs from "./example/main.rs.md";
import ModelRs from "./example/models.rs.md";

import {CodeTabs, Language, Github} from "@site/components/codetabs"


When writing smart contracts you will leverage programming concepts such as types, collections, modules, interfaces, and objects among others. Depending on the language you choose to use, the implementation will variate a little. However, the main anatomy of a smart contract follows the same ideas despite how you choose to implement them.

---

## Snippet: Anatomy of a Donation

Let's take a look at the anatomy of a simple contract, which main purpose is to enable donating money to someone. Particularly, the contract defines a `beneficiary` account on initialization and exposes a `donation` method to forward money while keeping track of it. Please notice that this contract is written for educational purposes only.

<!-- <CodeTabs>
  <Language value="🦀 - Rust" language="rust">
    <Github fname="main.ts"
            url="https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx"
            start="105" end="108" />
    <CodeBlock fname="test.ts">
          const chau = 3;
    </CodeBlock>
  </Language>
  <Language value="🚀 - AssemblyScript" language="ts">
    <Github fname="main.ts"
            url="https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx"
            start="105" end="108" />
    <CodeBlock fname="test.ts">
          const chau = 3;
    </CodeBlock>
  </Language>
</CodeTabs> -->

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - AssemblyScript">
    <Tabs className="file-tabs">
      <TabItem value="as-main" label="main.ts">
        <MainAs></MainAs>
      </TabItem>
      <TabItem value="as-external" label="models.ts">
        <ModelAs></ModelAs>
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">
    <Tabs className="file-tabs">
      <TabItem value="as-main" label="main.ts">
        <MainRs></MainRs>
      </TabItem>
      <TabItem value="as-external" label="models.ts">
        <ModelRs></ModelRs>
      </TabItem>
    </Tabs>
  </TabItem>
</Tabs>

---

## Modules
Modules are useful to organize your code and leverage already existing code. The module that you will be using the most is the NEAR sdk module. Indeed, the snippet above started by importing elements from the near-sdk module. 

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - AssemblyScript">

  ```ts
    import { env, logging, storage } from "near-sdk-as"
  ```

  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
    use near_sdk::{env, near_bindgen, AccountId};
    use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
  ```

  </TabItem>
</Tabs>

The NEAR SDK defines methods to, among other things:

1. Understand the context of the call (e.g. who started it, how much money they sent).
2. Handle the state (storage) of the smart contract.
3. Transfer money to other users/contracts.
4. Interact with other smart contracts.

---
## Contract's Interface
Smart contracts expose an interface so users in the blockchain can interact with them. A contract's interface is made of all the public methods that live in the main file.

### Init
In RUST, Contracts have a public `init` method, which can only be called once. It enables to instantiate the contract with its first values. For example, in the snippet above,
the `init` function is used to define the `beneficiary` variable.

:::warning
In AssemblyScript there is no `init` method. You can create one yourself, as in the example above, but be mindful that, as any other method, it could be called multiple times the `init` function. You can force the function to work only once by adding the following code:

```ts
  const initialized: bool = storage.getPrimitive<bool>('initialized', false)
  assert(!initialized, "Already initialized")
  storage.set<bool>('initialized', true)
```
:::

### Public and Private methods
All public methods that appear in the main file (`🚀 main.as`, `🦀 lib.rs`) will be **accessible** by all users in the blockchain. In the snippet above, such methods are:

1. `init`: Enables to initialize the contract with a specific `beneficiary`.
2. `donate`: A method in which the users attach NEARs in order to make a donation.
3. `get_donation_by_number`: Returns a object with two fields: account_id, and amount. Represents a donation recorded in the system.

All the other methods remain private, and can only be called from within the contract.

---

## Constant and variables

Smart contracts can store values within them, we cover this topic in depth on the [Storage](../storage.md) section. Here, we will just notice that an important difference between RUST and AssemblyScript is that in RUST the smart contract is an object. Therefore, in RUST the contract's attributes are stored in `self`. In contrast, in AssemblyScript we need to explicitly rely on the `storage` object to store all the attributes.

:::tip
In RUST we are also relying in the `env::storage` object to store the contract's attributes. However, this gets abstracted away by the SDK.
:::

---

## Classes and NEAR Bindgen

You might have notice in the examples that the classes are decorated with `nearbindgen`:

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - AssemblyScript">

  ```ts
    @nearbindgen
    class Donation{
      account_id: string,
      amount: u128
    }
  ```

  </TabItem>
  <TabItem value="rs" label="🦀 - Rust">

  ```rust
    #[near_bindgen]
    #[derive(Default, BorshDeserialize, BorshSerialize)]
    pub struct Donation {
      account_id: AccountId,
      amount: Balance
    }
  ```

  </TabItem>
</Tabs>

The `nearbindgen` decorator adds methods to the classes, so once instantiated they can be correctly serialized in the contract's state (storage). For example, the class decorated in AssemblyScript originally has only two attributes: `account_id` and `amount`. However, after being decorated it gains methods to be serialized into JSON. This is helpful since contracts actually obtain and return values encoded in JSON!.

:::tip
In RUST the objects are actually stored using their Borsh representation. That's why the RUST code includes `#[derive(Default, BorshDeserialize, BorshSerialize)]`.
:::

### &nbsp;
---
## 🎞️📚 Additional Resources
These educational resources could help you to better understand the subject
### Videos
- [Ready Layer One Hackathon](https://www.youtube.com/watch?v=2mRpIRJ8IK0): A high level explanation for the different parts of a smart contract, given as part of an AssemblyScript workshop.

### Blog Posts

### Code