---
id: anatomy
title: Anatomy of a Contract
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import MainAs from "./example/main.as.md";
import ModelAs from "./example/models.as.md";

import MainRs from "./example/main.rs.md";
import ModelRs from "./example/models.rs.md";


When writting smart contracts you will leverage programming concepts such as types, collections, modules, interfaces, and objects among others. Depending on the language you choose to use, the implementation will variate a little. However, the main anatomy of a smart contract follows the same ideas despite how you choose to implement them.

---

## Example: Anatomy of a Donation Contract

Lets take a look to the anatomy of a simple contract, which main purpose is to enable donating money to someone. Particulary, the contract defines a `beneficiary` account on initialization, and exposes a method `donation` to forward money while keeping track of it. Please notice that this contract is written for educational purposes only.

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - Assemblyscript">
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

### Modules
Modules are useful to organize your code and leverage already existing code. The module that you will be using the most is the NEAR sdk module. Indeed, the first line of code of both examples imports elements from the near-sdk module. 

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - Assemblyscript">

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
### Contract's Interface
Smart contracts expose an interface so users in the blockchain can interact with them. A contract's interface is made of all the public methods that live in the main file. In our example, the public methods which anyone could call are:

1. `init`: This method can only be called once. It defines the value for the `beneficiary` variable. 
2. `donate`: A method in which the users attach NEARs in order to make a donation.
3. `get_donation_by_number`: Returns a object with two fields: account_id, and amount. Represents a donation recorded in the system.

All the other methods remain private, and can only be called from within the contract.

An important difference between RUST and Assemblyscript is that in RUST the smartcontract is an object. Therefore, in RUST the contract's attributes are stored in `self`. In contrast, in Assemblyscript we need to explicitly rely on the `storage` object to store all the attributes.

:::tip
In RUST we are also relying in the `env::storage` object to store the contract's attributes. However, this gets abstracted away by the SDK.
:::

:::warning
In Assemblyscript you could call multiple times the `init` function. Please make sure to add a check so the function is not called more than once. This can be done by simply adding the following code:

```ts
  const initialized: bool = storage.getPrimitive<bool>('initialized', false)
  assert(!initialized, "Already initialized")
  storage.set<bool>('initialized', true)
```
:::

---

### Classes and NEAR Bindgen

You might have notice in the examples that the classes are decorated with `nearbindgen`:

<Tabs className="language-tabs">
  <TabItem value="as" label="🚀 - Assemblyscript">

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

The `nearbindgen` decorator adds methods to the classes, so once instantiated they can be correctly serialized in the contract's state (storage). For example, the class decorated in Assemblyscript originally has only two attributes: `account_id` and `amount`. However, after being decorated it gains methods to be serialized into JSON. This is helpfull since contracts actually obtain and return values encoded in JSON!.

:::tip
In RUST the objects are actually stored using their Borsh representation. That's why the RUST code includes `#[derive(Default, BorshDeserialize, BorshSerialize)]`.
:::