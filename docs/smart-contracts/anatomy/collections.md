---
id: collections
title: Collections
description: "Efficiently store, access, and manage data in smart contracts."
---
import {CodeTabs, Language, Github} from "@site/src/components/UI/Codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When deciding on data structures it is important to understand their tradeoffs. Choosing the wrong structure can create a bottleneck as the application scales, and migrating the state to the new data structures will come at a cost.

You can choose between two types of collections:

1. Native collections (e.g. `Array`, `Map`, `Set`), provided by the language
2. SDK collections (e.g. `IterableMap`, `Vector`), provided by the NEAR SDK

Understanding how the contract stores and loads both types of collections is crucial to decide which one to use.

:::tip Native vs SDK Collections

Use native collections for small amounts of data that need to be accessed altogether, and SDK collections for large amounts of data that do not need to be accessed altogether.

If your collection has up to 100 entries, it's acceptable to use the native collection. For larger ones, prefer to use SDK collection. For comparison please refer to [this benchmark](https://www.github.com/volodymyr-matselyukh/near-benchmarking).

:::

<details>

<summary> How the State is Handled </summary>

Each time the contract is executed, the first thing it will do is to read the values and [deserialize](./serialization.md) them into memory, and after the function finishes, it will [serialize](./serialization.md) and write the values back to the database.

For native collections, the contract will fully load the collection into memory before any method executes. This happens even if the method you invoke does not use the collection. Know that this will have impact on GAS you spend for methods in your contract.

</details>

---

## Native Collections

Native collections are those provided by the language:
- JS: `Array`, `Set`, `Map`, `Object` ...
- Rust: `Vector`, `HashMap`, `Set` ...

All entries in a native collection are **serialized into a single value** and **stored together** into the state. This means that every time a function execute, the SDK will read and **deserialize all entries** in the native collection.

<details>

<summary> Serialization & Storage Example </summary>

The array `[1,2,3,4]` will be serialized into the JSON string `"[1,2,3,4]"` in Javascript, and the Borsh byte-stream `[0,0,0,4,1,2,3,4]` in Rust before being stored

</details>

:::tip When to use them

Native collections are useful if you are planning to store smalls amounts of data that need to be accessed all together

:::

:::danger Keep Native Collections Small

As the native collection grows, deserializing it from memory will cost more and more gas. If the collections grows too large, your contract might expend all the gas trying to read its state, making it fail on each function call

:::

---

## SDK Collections

The NEAR SDKs expose collections that are optimized for random access of large amounts of data. SDK collections are instantiated using a "prefix", which is used as an index to split the data into chunks. This way, SDK collections can defer reading and writing to the store until needed.

These collections are built to have an interface similar to native collections.

<details>

<summary> Serialization & Storage Example </summary>

The sdk array `[1,2,3,4]` with prefix `"p"` will be stored as the string `"p"` in the contract's attribute, and create four entries in the contract's storage: `p-0:1`, `p-1:2`...

</details>


:::tip when to use them

SDK collections are useful when you are planning to store large amounts of data that do not need to be accessed all together

:::

<hr class="subsection" />

### Exposed Collections

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

| SDK Collection | Native Equivalent | Description                                                                                                                                                                                      |
|----------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Vector`       | `Array`           | A growable array type. The values are sharded in memory and can be used for iterable and indexable values that are dynamically sized.                                                            |
| `LookupSet`    | `Set`             | A set, which is similar to `LookupMap` but without storing values, can be used for checking the unique existence of values. This structure is not iterable and can only be used for lookups.     |
| `UnorderedSet` | `Set`             | An iterable equivalent of `LookupSet` which stores additional metadata for the elements contained in the set.                                                                                    |
| `LookupMap`    | `Map`             | This structure behaves as a thin wrapper around the key-value storage available to contracts. This structure does not contain any metadata about the elements in the map, so it is not iterable. |
| `UnorderedMap` | `Map`             | Similar to `LookupMap`, except that it stores additional data to be able to iterate through elements in the data structure.                                                                      |

</TabItem>

<TabItem value="rust" label="🦀 Rust">

| SDK collection                                | `std`&nbsp;equivalent             | Description                                                                                                                                                                                       |
|-----------------------------------------------|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `store::Vector<T>`                            | `Vec<T>`                          | A growable array type. The values are sharded in memory and can be used for iterable and indexable values that are dynamically sized.                                                             |
| <code>store::LookupMap`<K,&nbsp;V>`</code>    | <code>HashMap`<K,&nbsp;V>`</code> | This structure behaves as a thin wrapper around the key-value storage available to contracts. This structure does not contain any metadata about the elements in the map, so it is not iterable.  |
| <code>store::IterableMap`<K,&nbsp;V>`</code>  | <code>HashMap`<K,&nbsp;V>`</code> | Similar to `LookupMap`, except that it stores additional data to be able to iterate through elements in the data structure.                                                                       |
| <code>store::UnorderedMap`<K,&nbsp;V>`</code> | <code>HashMap`<K,&nbsp;V>`</code> | Similar to `LookupMap`, except that it stores additional data to be able to iterate through elements in the data structure.                                                                       |
| `store::LookupSet<T>`                         | `HashSet<T>`                      | A set, which is similar to `LookupMap` but without storing values, can be used for checking the unique existence of values. This structure is not iterable and can only be used for lookups.      |
| `store::IterableSet<T>`                       | `HashSet<T>`                      | An iterable equivalent of `LookupSet` which stores additional metadata for the elements contained in the set.                                                                                     |
| `store::UnorderedSet<T>`                      | `HashSet<T>`                      | An iterable equivalent of `LookupSet` which stores additional metadata for the elements contained in the set.                                                                                     |

</TabItem>

<TabItem value="rust-legacy" label="🦀 Rust (legacy)">

:::info Note

The `near_sdk::collections` is now deprecated in favor of `near_sdk::store`. To use `near_sdk::collections` you will have to use the [`legacy` feature](https://github.com/near-examples/storage-examples/blob/2a138a6e8915e08ce76718add3e36c04c2ea2fbb/collections-rs/legacy/Cargo.toml#L11).

:::

| SDK collection                                     | `std`&nbsp;equivalent              | Description                                                                                                                                                                                                                                        |
|----------------------------------------------------|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `collections::Vector<T>`                            | `Vec<T>`                           | A growable array type. The values are sharded in memory and can be used for iterable and indexable values that are dynamically sized.                                                                                                              |
| <code>collections::LookupMap`<K,&nbsp;V>`</code>    | <code>HashMap`<K,&nbsp;V>`</code>  | This structure behaves as a thin wrapper around the key-value storage available to contracts. This structure does not contairn any metadata about the elements in the map, so it is not iterable.                                                  |
| <code>collections::UnorderedMap`<K,&nbsp;V>`</code> | <code>HashMap`<K,&nbsp;V>`</code>  | Similar to `LookupMap`, except that it stores additional data to be able to iterate through elements in the data structure.                                                                                                                        |
| <code>collections::TreeMap`<K,&nbsp;V>`</code>      | <code>BTreeMap`<K,&nbsp;V>`</code> | An ordered equivalent of `UnorderedMap`. The underlying implementation is based on an [AVL tree](https://en.wikipedia.org/wiki/AVL_tree). This structure should be used when a consistent order is needed or accessing the min/max keys is needed. |
| `collections::LookupSet<T>`                         | `HashSet<T>`                       | A set, which is similar to `LookupMap` but without storing values, can be used for checking the unique existence of values. This structure is not iterable and can only be used for lookups.                                                       |
| `collections::UnorderedSet<T>`                      | `HashSet<T>`                       | An iterable equivalent of `LookupSet` which stores additional metadata for the elements contained in the set.                                                                                                                                      |
| `collections::LazyOption<T>`                       | `Option<T>`                        | Optional value in storage. This value will only be read from storage when interacted with. This value will be `Some<T>` when the value is saved in storage, and `None` if the value at the prefix does not exist.                                  |
</TabItem>

<TabItem value="python" label="🐍 Python">

| SDK Collection | Native Equivalent | Description                                                                                                                                                                         |
| -------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Vector`       | `list`            | A growable array type. The values are sharded in memory and can be used for iterable and indexable values that are dynamically sized.                                               |
| `LookupMap`    | `dict`            | A non-iterable key-value store. This structure does not track keys for iteration, so it is optimized for lookups but cannot provide collection operations like keys or values.      |
| `UnorderedMap` | `dict`            | Similar to `LookupMap`, except that it stores additional data to be able to iterate through elements and supports dictionary-like operations such as keys(), values(), and items(). |
| `IterableMap`  | `dict`            | An alias for `UnorderedMap` provided for compatibility with Rust SDK naming conventions.                                                                                            |
| `LookupSet`    | `set`             | A non-iterable set of unique values. This structure cannot be iterated over and can only be used for membership testing.                                                            |
| `UnorderedSet` | `set`             | An iterable equivalent of `LookupSet` which stores additional metadata to allow iteration over the values in the set.                                                               |
| `IterableSet`  | `set`             | An alias for `UnorderedSet` provided for compatibility with Rust SDK naming conventions.                                                                                            |
| `TreeMap`      | `SortedDict`      | An ordered key-value store where keys are maintained in sorted order. Provides operations for range queries, finding nearest keys, and efficient min/max operations.                |

</TabItem>

</Tabs>

<hr class="subsection" />

### Features
| Type           | Iterable | Clear All Values | Preserves Insertion Order | Range Selection |
|----------------|:--------:|:----------------:|:-------------------------:|:---------------:|
| `Vector`       |    ✅     |        ✅         |             ✅             |        ✅        |
| `LookupSet`    |          |                  |                           |                 |
| `UnorderedSet` |    ✅     |        ✅         |                           |        ✅        |
| `IterableSet`  |    ✅     |        ✅         |                           |        ✅        |
| `LookupMap`    |          |                  |                           |                 |
| `UnorderedMap` |    ✅     |        ✅         |                           |        ✅        |
| `IterableMap`  |    ✅     |        ✅         |                           |        ✅        |
| `TreeMap`      |    ✅     |        ✅         |             ✅             |        ✅        |

<hr class="subsection" />

### Complexity

| Type           | Access |  Insert  |  Delete  |  Search  | Traverse | Clear |
|----------------|:------:|:--------:|:--------:|:--------:|:--------:|:-----:|
| `Vector`       |  O(1)  |  O(1)\*  | O(1)\*\* |   O(n)   |   O(n)   | O(n)  |
| `LookupSet`    |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   N/A    |  N/A  |
| `UnorderedSet` |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   O(n)   | O(n)  |
| `IterableSet`  |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   O(n)   | O(n)  |
| `LookupMap`    |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   N/A    |  N/A  |
| `IterableMap`  |  O(1)  |   O(1)   |   O(1)   |   O(1)   |   O(n)   | O(n)  |
| `TreeMap`      |  O(1)  | O(log n) | O(log n) | O(log n) |   O(n)   | O(n)  |

_\* - to insert at the end of the vector using `push_back` (or `push_front` for deque)_
_\*\* - to delete from the end of the vector using `pop` (or `pop_front` for deque), or delete using `swap_remove` which swaps the element with the last element of the vector and then removes it._

---

## SDK Collections Cookbook

Let's see how to use the SDK collections in practice

<hr class="subsection" />

### Instantiation

All structures need to be initialized using a **unique `prefix`**, which will be used to index the collection's values in the account's state

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    
    <Github fname="contract.ts" language="js"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts"
          start="6" end="25" />

:::tip

Do not forget to use the `schema` to define how your contract's state is structured

:::

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">
    <Github fname="lib.rs" language="rust" 
          url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/lib.rs"
          start="24" end="47"/>

  :::tip

  Notice how we use `enums` to ensure all collections have a different prefix. Another advantage of using `enums` is that they are serialized into a single `byte` prefix. 

  :::

  </TabItem>

  <TabItem value="rust-legacy" label="🦀 Rust (legacy)">
    <Github fname="lib.rs" language="rust" 
            url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/legacy/src/lib.rs" start="33" end="62"/>

  :::tip

  Notice how we use `enums` to ensure all collections have a different prefix. Another advantage of using `enums` is that they are serialized into a single `byte` prefix. 

  :::

  </TabItem>

  <TabItem value="python" label="🐍 Python">
```python
from near_sdk_py import view, call, init
from near_sdk_py.collections import Vector, LookupMap, UnorderedMap, LookupSet, UnorderedSet

class MyContract:
    @init
    def new(self): # Create a Vector with prefix "v"
        self.my_vector = Vector("v")

        # Create a LookupMap with prefix "m"
        self.my_lookup_map = LookupMap("m")

        # Create an UnorderedMap with prefix "um"
        self.my_unordered_map = UnorderedMap("um")

        # Create a LookupSet with prefix "s"
        self.my_lookup_set = LookupSet("s")

        # Create an UnorderedSet with prefix "us"
        self.my_unordered_set = UnorderedSet("us")

        # For nested collections, use different prefixes
        self.nested_maps = UnorderedMap("nested")

        return True

    @call
    def create_nested_map(self, key: str):
        # Create a new map that will be stored inside another map
        inner_map = UnorderedMap(f"inner_{key}")
        self.nested_maps[key] = inner_map
        return {"success": True}

````
  </TabItem>

</Tabs>

:::danger

Be careful of not using the same prefix in two collections, otherwise, their storage space will collide, and you might overwrite information from one collection when writing in the other

:::

<hr className="subsection" />

### Vector

Implements a [vector/array](https://en.wikipedia.org/wiki/Array_data_structure) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
            url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts"
            start="48" end="73" />
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="vector.rs" language="rust"
            url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/vector.rs" start="4" end="29"/>
  </TabItem>
  <TabItem value="rust-legacy" label="🦀 Rust (legacy)">
    <Github fname="vector.rs" language="rust"
            url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/legacy/src/vector.rs" start="6" end="31"/>
  </TabItem>
  <TabItem value="python" label="🐍 Python">
```python
from near_sdk_py import view, call, init
from near_sdk_py.collections import Vector

class VectorExample:
    @init
    def new(self):
        # Create a Vector with prefix "v"
        self.my_vector = Vector("v")
        
    @call
    def add_number(self, number):
        # Append a value to the vector
        self.my_vector.append(number)
        return len(self.my_vector)
        
    @view
    def get_number(self, index):
        # Get a value at specific index
        try:
            return self.my_vector[index]
        except Exception:
            return None
            
    @view
    def get_all_numbers(self):
        # Convert entire vector to a list
        return [num for num in self.my_vector]
```
  </TabItem>
</Tabs>

<hr className="subsection" />

### LookupMap

Implements a [map/dictionary](https://en.wikipedia.org/wiki/Associative_array) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts"
          start="111" end="131" />
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="lookup_map.rs" language="rust"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/lookup_map.rs" start="4" end="22"/>
  </TabItem>
  <TabItem value="python" label="🐍 Python">
```python
from near_sdk_py import view, call, init
from near_sdk_py.collections import LookupMap

class LookupMapExample:
    @init
    def new(self):
        # Create a LookupMap with prefix "m"
        self.balances = LookupMap("m")
        
    @call
    def set_balance(self, account_id, amount):
        # Set a value for a key
        self.balances[account_id] = amount
        return True
        
    @view
    def get_balance(self, account_id):
        # Get a value for a key with a default
        return self.balances.get(account_id, 0)
        
    @call
    def remove_balance(self, account_id):
        # Remove a key
        if account_id in self.balances:
            del self.balances[account_id]
            return True
        return False
```
  </TabItem>
</Tabs>

<hr className="subsection" />

### UnorderedMap / IterableMap

Implements a [map/dictionary](https://en.wikipedia.org/wiki/Associative_array) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts"
          start="132" end="152" />
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="iterable_map.rs" language="rust"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/iterable_map.rs" start="4" end="29"/>
  </TabItem>
  <TabItem value="python" label="🐍 Python">
```python
from near_sdk_py import view, call, init
from near_sdk_py.collections import UnorderedMap

class UnorderedMapExample:
    @init
    def new(self):
        # Create an UnorderedMap with prefix "um"
        self.user_data = UnorderedMap("um")
        
    @call
    def set_user_data(self, account_id, data):
        # Set a value for a key
        self.user_data[account_id] = data
        return True
        
    @view
    def get_user_data(self, account_id):
        # Get a value for a key
        try:
            return self.user_data[account_id]
        except Exception:
            return None
        
    @view
    def list_all_users(self):
        # Iterate through keys and values
        return {
            "keys": self.user_data.keys(),
            "values": self.user_data.values(),
            "items": self.user_data.items()
        }
```
  </TabItem>
</Tabs>

<hr className="subsection" />

### LookupSet

Implements a [set](https://en.wikipedia.org/wiki/Set_(abstract_data_type)) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<Tabs groupId="code-tabs">

  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
      url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts" start="74" end="89" />
  </TabItem>

  <TabItem value="rust" label="🦀 Rust">
      <Github fname="lookup_set.rs" language="rust"
        url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/lookup_set.rs" start="4" end="18"/>
  </TabItem>
  
  <TabItem value="python" label="🐍 Python">
```python
from near_sdk_py import view, call, init
from near_sdk_py.collections import LookupSet

class LookupSetExample:
    @init
    def new(self):
        # Create a LookupSet with prefix "s"
        self.whitelist = LookupSet("s")
        
    @call
    def add_to_whitelist(self, account_id):
        # Add a value to the set
        self.whitelist.add(account_id)
        return True
        
    @view
    def is_whitelisted(self, account_id):
        # Check if a value exists in the set
        return account_id in self.whitelist
        
    @call
    def remove_from_whitelist(self, account_id):
        # Remove a value from the set
        try:
            self.whitelist.remove(account_id)
            return True
        except Exception:
            return False
```
  </TabItem>

</Tabs>

<hr className="subsection" />

### UnorderedSet / IterableSet

Implements a [map/dictionary](https://en.wikipedia.org/wiki/Associative_array) which persists in the contract's storage. Please refer to the Rust and JS SDK's for a full reference on their interfaces.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    <Github fname="contract.ts" language="js"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts"
          start="90" end="110" />
  </TabItem>
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="iterable_set.rs" language="rust"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/iterable_set.rs" start="4" end="26"/>
  </TabItem>
  <TabItem value="python" label="🐍 Python">
```python
from near_sdk_py import view, call, init
from near_sdk_py.collections import UnorderedSet

class UnorderedSetExample:
    @init
    def new(self):
        # Create an UnorderedSet with prefix "us"
        self.owners = UnorderedSet("us")
        
    @call
    def register_owner(self, account_id):
        # Add a value to the set
        self.owners.add(account_id)
        return True
        
    @view
    def is_owner(self, account_id):
        # Check if a value exists in the set
        return account_id in self.owners
        
    @view
    def list_all_owners(self):
        # Get all values as a list
        return self.owners.values()
        
    @call
    def remove_owner(self, account_id):
        # Try to remove a value if it exists
        self.owners.discard(account_id)
        return True
```
  </TabItem>
</Tabs>

<hr className="subsection" />

### Tree

An ordered equivalent of Map. The underlying implementation is based on an [AVL](https://en.wikipedia.org/wiki/AVL_tree). You should use this structure when you need to: have a consistent order, or access the min/max keys.

<Tabs groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="tree.rs" language="rust"
          url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/legacy/src/tree.rs" start="6" end="24"/>
  </TabItem>
  <TabItem value="python" label="🐍 Python">
```python
from near_sdk_py import view, call, init
from near_sdk_py.collections import TreeMap

class TreeMapExample:
    @init
    def new(self):
        # Create a TreeMap with prefix "tm"
        self.scores = TreeMap("tm")
        
    @call
    def add_score(self, user_id, score):
        # Set score for a user
        self.scores[user_id] = score
        return True
        
    @view
    def get_top_scores(self, limit=10):
        # Get top scores using ordered keys
        # This returns highest scores first
        top_users = []
        max_key = self.scores.max_key()
        current_key = max_key
        count = 0
        
        while current_key is not None and count < limit:
            top_users.append({
                "user": current_key,
                "score": self.scores[current_key]
            })
            current_key = self.scores.floor_key(current_key - 1)  # Get next highest key
            count += 1
            
        return top_users
```
  </TabItem>
</Tabs>

<hr class="subsection" />

### LazyOption (Legacy)

LazyOptions are great to store large values (i.e. a wasm file), since its value will not be read from storage until it is interacted with.

It acts like an `Option` that can either hold a value or not and also requires a unique prefix (a key in this case)
like other persistent collections.

Compared to other collections, `LazyOption` only allows you to initialize the value during initialization.

---

## Nesting Collections

When nesting SDK collections, be careful to **use different prefixes** for all collections, including the nested ones.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">

    <Github fname="nested.ts" language="js"
            url="https://github.com/near-examples/storage-examples/blob/main/collections-js/src/contract.ts" start="153" end="196"/>

  </TabItem>

  <TabItem value="rust" label="🦀 Rust">

    <Github fname="nested.ts" language="rust"
            url="https://github.com/near-examples/storage-examples/blob/main/collections-rs/store/src/nested.rs" start="4" end="30"/>

  :::tip

  Notice how we use `enums` that take a `String` argument to ensure all collections have a different prefix

  :::

  </TabItem>
  
  <TabItem value="python" label="🐍 Python">
```python
from near_sdk_py import view, call, init
from near_sdk_py.collections import UnorderedMap, Vector
from near_sdk_py.collections import create_prefix_guard

class NestedCollectionsExample:
    @init
    def new(self):
        # Main map of users to their assets
        self.user_assets = UnorderedMap("users")

    @call
    def add_asset(self, user_id, asset_id, metadata):
        # Get or create the user's assets vector with a unique prefix
        if user_id not in self.user_assets:
            # Create a prefix guard to ensure unique prefixes for this user
            prefix = f"assets:{user_id}"
            # Create a new vector for this user's assets
            self.user_assets[user_id] = Vector(prefix)

        # Add the asset to the user's assets vector
        user_assets = self.user_assets[user_id]
        user_assets.append({
            "asset_id": asset_id,
            "metadata": metadata
        })

        # Update the vector in the map
        self.user_assets[user_id] = user_assets
        return True

    @view
    def get_user_assets(self, user_id):
        if user_id not in self.user_assets:
            return []

        # Get all assets for the user
        user_assets = self.user_assets[user_id]
        return [asset for asset in user_assets]
````

:::tip

In Python, we create unique prefixes for nested collections by including the parent's identifier in the prefix string. The SDK also provides a `create_prefix_guard` utility to help manage prefixes.

:::

  </TabItem>
</Tabs>

---

## Error prone patterns

Because the values are not kept in memory and are lazily loaded from storage, it's important to make sure if a collection is replaced or removed, that the storage is cleared. In addition, it is important that if the collection is modified, the collection itself is updated in state because most collections will store some metadata.

Some error-prone patterns to avoid that cannot be restricted at the type level are:

<Tabs>
<TabItem value="rust" label="🦀 Rust">

```rust
use near_sdk::store::UnorderedMap;

let mut m = UnorderedMap::<u8, String>::new(b"m");
m.insert(1, "test".to_string());
assert_eq!(m.len(), 1);
assert_eq!(m.get(&1), Some(&"test".to_string()));

// Bug 1: Should not replace any collections without clearing state, this will reset any
// metadata, such as the number of elements, leading to bugs. If you replace the collection
// with something with a different prefix, it will be functional, but you will lose any
// previous data and the old values will not be removed from storage.
m = UnorderedMap::new(b"m");
assert!(m.is_empty());
assert_eq!(m.get(&1), Some(&"test".to_string()));

// Bug 2: Should not use the same prefix as another collection
// or there will be unexpected side effects.
let m2 = UnorderedMap::<u8, String>::new(b"m");
assert!(m2.is_empty());
assert_eq!(m2.get(&1), Some(&"test".to_string()));

// Bug 3: forgetting to save the collection in storage. When the collection is attached to
// the contract state (`self` in `#[near]`) this will be done automatically, but if
// interacting with storage manually or working with nested collections, this is relevant.
use near_sdk::store::Vector;

// Simulate roughly what happens during a function call that initializes state.
{
    let v = Vector::<u8>::new(b"v");
    near_sdk::env::state_write(&v);
}

// Simulate what happens during a function call that just modifies the collection
// but does not store the collection itself.
{
    let mut v: Vector<u8> = near_sdk::env::state_read().unwrap();
    v.push(1);
    // The bug is here that the collection itself if not written back
}

let v: Vector<u8> = near_sdk::env::state_read().unwrap();
// This will report as if the collection is empty, even though the element exists
assert!(v.get(0).is_none());
assert!(
    near_sdk::env::storage_read(&[b"v".as_slice(), &0u32.to_le_bytes()].concat()).is_some()
);

// Bug 4 (only relevant for `near_sdk::store`): These collections will cache writes as well
// as reads, and the writes are performed on [`Drop`](https://doc.rust-lang.org/std/ops/trait.Drop.html)
// so if the collection is kept in static memory or something like `std::mem::forget` is used,
// the changes will not be persisted.
use near_sdk::store::IterableSet;

let mut m: IterableSet<u8> = IterableSet::new(b"l");
m.insert(1);
assert!(m.contains(&1));

// This would be the fix, manually flushing the intermediate changes to storage.
// m.flush();
std::mem::forget(m);

m = IterableSet::new(b"l");
assert!(!m.contains(&1));
```

<hr class="subsection" />

### Nesting Errors

By extension of the error-prone patterns to avoid mentioned in the [collections section](./collections.md#error-prone-patterns), it is important to keep in mind how these bugs can easily be introduced into a contract when using nested collections.

Some issues for more context:
- https://github.com/near/near-sdk-rs/issues/560
- https://github.com/near/near-sdk-rs/issues/703

The following cases are the most commonly encountered bugs that cannot be restricted at the type level (only relevant for `near_sdk::collections`, not `near_sdk::store`):

```rust
use near_sdk::borsh::{self, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedSet};
use near_sdk::BorshStorageKey;

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKey {
    Root,
    Nested(u8),
}

// Bug 1: Nested collection is removed without clearing its own state.
let mut root: LookupMap<u8, UnorderedSet<String>> = LookupMap::new(StorageKey::Root);
let mut nested = UnorderedSet::new(StorageKey::Nested(1));
nested.insert(&"test".to_string());
root.insert(&1, &nested);

// Remove inserted collection without clearing its sub-state.
let mut _removed = root.remove(&1).unwrap();

// This line would fix the bug:
// _removed.clear();

// This collection will now be in an inconsistent state if an empty UnorderedSet is put
// in the same entry of `root`.
root.insert(&1, &UnorderedSet::new(StorageKey::Nested(1)));
let n = root.get(&1).unwrap();
assert!(n.is_empty());
assert!(n.contains(&"test".to_string()));

// Bug 2: Nested collection is modified without updating the collection itself in the outer collection.
//
// This is fixed at the type level in `near_sdk::store` because the values are modified
// in-place and guarded by regular Rust borrow-checker rules.
root.insert(&2, &UnorderedSet::new(StorageKey::Nested(2)));

let mut nested = root.get(&2).unwrap();
nested.insert(&"some value".to_string());

// This line would fix the bug:
// root.insert(&2, &nested);

let n = root.get(&2).unwrap();
assert!(n.is_empty());
assert!(n.contains(&"some value".to_string()));
```

</TabItem>
</Tabs>

---

## Pagination

Persistent collections such as `IterableMap/UnorderedMap`, `IterableSet/UnorderedSet` and `Vector` may
contain more elements than the amount of gas available to read them all.
In order to expose them all through view calls, we can use pagination.

<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
    With JavaScript this can be done using iterators with [`toArray`](https://developer.mozilla.org/en-US/assets/docs/Web/JavaScript/Reference/Global_Objects/Iterator/toArray) and [`slice`](https://developer.mozilla.org/en-US/assets/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

    ```ts
      /// Returns multiple elements from the `UnorderedMap`.
      /// - `from_index` is the index to start from.
      /// - `limit` is the maximum number of elements to return.
      @view({})
      get_updates({ from_index, limit }: { from_index: number, limit:number }) {
        return this.status_updates.toArray().slice(from_index, limit);
      }
    ```
  </TabItem>

  <TabItem value="rust" label="🦀 Rust">
    With Rust this can be done using iterators with [`Skip`](https://doc.rust-lang.org/std/iter/struct.Skip.html) and [`Take`](https://doc.rust-lang.org/std/iter/struct.Take.html). This will only load elements from storage within the range.

    ```rust
      #[near(contract_state)]
      #[derive(PanicOnDefault)]
      pub struct Contract {
          pub status_updates: IterableMap<AccountId, String>,
      }

      #[near]
      impl Contract {
          /// Retrieves multiple elements from the `IterableMap`.
          /// - `from_index` is the index to start from.
          /// - `limit` is the maximum number of elements to return.
          pub fn get_updates(&self, from_index: usize, limit: usize) -> Vec<(AccountId, String)> {
              self.status_updates
                  .iter()
                  .skip(from_index)
                  .take(limit)
                  .collect()
          }
      }
    ```

  </TabItem>

  <TabItem value="python" label="🐍 Python">
    ```python
    # With Python this can be done using standard list slicing.

    @view
    def get_updates(self, from_index: int = 0, limit: int = 50) -> list:
        """Returns multiple elements from the collection with pagination.
        
        Args:
            from_index: The index to start from
            limit: The maximum number of elements to return
            
        Returns:
            A list of elements from the collection
        """
        # Get all values from the collection
        all_items = self.status_updates.values()
        
        # Apply pagination with list slicing
        start = min(from_index, len(all_items))
        end = min(start + limit, len(all_items))
        
        return all_items[start:end]
    ```
  </TabItem>
</Tabs>

---

## Storage Cost

Your contract needs to lock a portion of their balance proportional to the amount of data they stored in the blockchain. This means that:

- If more data is added and the **storage increases ↑**, then your contract's **balance decreases ↓**.
- If data is deleted and the **storage decreases ↓**, then your contract's **balance increases ↑**.

Currently, it costs approximately **1 Ⓝ** to store **100kb** of data.

:::info

You can save on smart contract storage if using NEAR Account IDs by encoding them using base32. Since they consist of `[a-z.-_]` characters with a maximum length of 64 characters, they can be encoded using 5 bits per character, with terminal `\0`. Going to a size of 65 * 5 = 325 bits from the original (64 + 4) * 8 = 544 bits. This is a 40% reduction in storage costs

:::

:::caution

Your contract will panic if you try to store data but don't have NEAR to cover its storage cost

:::

:::warning

Be mindful of potential [small deposit attacks](../security/storage.md)

:::

---

## Storage Constraints on NEAR

For storing data on-chain it’s important to keep in mind the following:

- There is a 4mb limit on how much you can upload at once

Let’s say for example, someone wants to put an NFT purely on-chain (rather than IPFS or some other decentralized storage solution) you’ll have almost an unlimited amount of storage but will have to pay 1 $NEAR per 100kb of storage used.

Users will be limited to 4MB per contract call upload due to MAX_GAS constraints. The maximum amount of gas one can attach to a given functionCall is 300TGas.
