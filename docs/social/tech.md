---
id: tech
title: Technical Documentation
---

This document goes into technical details of the Near Social.  
I recommend reading [The Past, Present, and Future of Near Social](https://thewiki.near.page/PastPresentAndFutureOfNearSocial) first.

## SocialDB

The contract is deployed at the following accounts:
- NEAR mainnet: `social.near`
- NEAR testnet: `v1.social08.testnet`

Source code: [social-db](https://github.com/NearSocial/social-db)

### Data organization

Internally, the contract organizes the data using a tree structure.
Each node in a tree is represented as a `VNode` structure (upgradable `Node`).
Nodes are stored in a `LookupMap` with the key being a `NodeId (u32)`.
The root node has the index `0` and stored separately in the contract state.

The `Node` structure contains the following fields:
- `block_height` - the block height when the node was last modified
- `children` - an unordered iterable key-value map.

Keys in the `children` map are strings, with the following restrictions:
- only the following characters are allowed: `a-z`, `A-Z`, `0-9`, `-`, `_`, `.`
- the key must be at most 256 character long

The value is a node index, a string value, or deleted value.
Both string value and deleted values additionally store the block height when the value was last modified.
The value for an empty string key can't be a node index. It's a special case which will be described later.

Children of the root node are the account IDs of the users, the values are always a node index.

#### An empty string key case

When data object is being added by a user, new non-existing nodes are added to the tree.
But what if a leaf value was originally string? For example, we have the following data:

```json
{
  "alex.near": {
    "profile": {
      "name": "Alex"
    }
  }
}
```

User calls `set` method and wants to add the following data:

```json
{
  "alex.near": {
    "profile": {
      "name": {
        "foo": "bar"
      }
    }
  }
}
```

In this case the value for the key `name` will be transformed to a node, and the previous value will be moved to an empty key under this node:

```json
{
  "alex.near": {
    "profile": {
      "name": {
        "": "Alex",
        "foo": "bar"
      }
    }
  }
}
```

This creates extra complexity in the implementation, but it allows the contract to maintain data without deletion of old values.
But more importantly it allows users to store values for keys that are already a node without losing the node index. For example, a user stores image as an object:

```json
{
  "alex.near": {
    "profile": {
      "image": {
        "url": "foo://bar",
        "nft": {
          "contract": "nft.near",
          "token_id": "1"
        }
      }
    }
  }
}
```

Then the user wants to store image as a serialized value, they call `set` method with the following data:

```json
{
  "alex.near": {
    "profile": {
      "image": "{ \"url\": \"foo://bar\" }"
    }
  }
}
```

Since the value for the key `image` is already a node, the value will be stored under the empty string key:

```json
{
  "alex.near": {
    "profile": {
      "image": {
        "": "{ \"url\": \"foo://bar\" }",
        "url": "foo://bar",
        "nft": {
          "contract": "nft.near",
          "token_id": "1"
        }
      }
    }
  }
}
```

If we wouldn't store the values under the empty string key, the contract would have to delete the index to a node or fail the transaction.
Both situations are undesirable.

### Accounts and storage

The contract stores account information separately from the data.
Each account is represented as a `VAccount` structure (upgradable `Account`).
Accounts are stored in a `LookupMap` with the key being a `NodeId (u32)` matching the node index from the Root node.

The `Account` structure contains the following fields:
- `storage_balance` - the amount of storage tokens attached to the account
- `used_bytes` - the number of bytes used by the account for storing data and account information
- `permissions` - an iterable map of permissions for the account

Users have to cover the storage costs for the data they store.
If they override the data, they only have to pay for the extra bytes that were added.
When they delete the data, they get the storage deposit back for the amount of released bytes.
And users then can reuse that deposit for new data or withdraw it from the contract.

### Permissions

SocialDB contract allows users to grant permissions to other accounts or other public keys to write into their data.
The permissions are stored in the contract state, and they are used to validate the write access.
By default, the SocialDB contract requires a payment of at least one yoctoNEAR to write into the data.
It prevents simple user's mistakes for adding an access key to the SocialDB contract by a random application, which would allow an application to write into any field of the user's data.
So instead the application should either request a permission from the user to whitelist their limited access key for a particular sub-tree of the user's data, or request a confirmation from the user to sign a transaction through the wallet every time.

Another type permission is to give write access to another account.
This should be used to give permission to other smart contracts to write into the user's data.
For example, a NFT marketplace smart contract that allows users to post an update on a newly minted NFT.
Or a social network smart contract that allows users to create a new edge in their social graph.

### SocialDB API

The SocialDB contract implements three data methods: `get`, `set` and `keys`.
It also has methods for working with permissions, see [SocialDB README](https://github.com/NearSocial/social-db#permissions) for details.

#### Storing data

The top level keys of the objects should be account IDs under which the data is stored. Those accounts are covering storage for the underlying data.

The predecessor_id or the signer public key should have permission to write under those keys.
If the predecessor_id matches the top level key, then it can write any data under that key, as long as it has a permission or at least 1 yoctoNEAR is attached.

The attached deposit will be transferred to the first key. If the account doesn't exist, it will be created (the predecessor_id should match).

```rust
#[payable]
pub fn set(&mut self, data: Value);
```

Arguments:
- `data` is an object to store. The leaf values should be strings or null values. String values will be added, while null values will be deleted.

Examples:

```js
set({
  data: {
    "alex.near": {
      "profile": {
        "name": "Alex",
        "image": {
          "url": "https://gkfjklgdfjkldfg"
        }
      },
    }
  }
})

set({
  data: {
    "alex.near": {
      "graph": {
        "follow": {
          "root.near": "",
          "bob.near": "",
        }
      }
    }
  }
})
```

#### Reading data

Returns the data for a list of given key patterns.
It takes one or more path patterns as arguments, and returns the matching data.
The path pattern is a string that can contain wildcards.
For example:
- `alice.near/profile/**` will match the entire profile data of account `alice.near`.
- `alice.near/profile/*` will match all the fields of the profile, but not the nested objects.
- `alice.near/profile/name` will match only the name field of the profile.
- `*/widget/*` will match all the components of all the accounts.

```rust
pub struct GetOptions {
    pub with_block_height: Option<bool>,
    pub with_node_id: Option<bool>,
    pub return_deleted: Option<bool>,
}

pub fn get(self, keys: Vec<String>, options: Option<GetOptions>) -> Value;
```

Arguments:
- `keys` - an array of key patterns to return.
- `options` - optional argument to specify options.

Options:
- `with_block_height` - if true, for every value and a node will add the block height of the data with the key `:block`.
- `with_node_id` - if true, for every node will add the node index with the key `:node`.
- `return_deleted` - if true, will include deleted keys with the value `null`.

Returns the aggregated JSON object.

Examples:

```js
get({keys: ["alex.near/profile/name"]})

get({keys: ["alex.near/profile/name", "root.near/profile/name"]})

get({keys: ["alex.near/profile/name", "alex.near/profile/description"]})

get({keys: ["alex.near/profile/tags/*"]})

get({keys: ["alex.near/profile/**"]})

get({keys: ["*/widget/*"]})

get({keys: ["alex.near/profile/tags/*"], options: {return_deleted: true}})
```

#### Reading keys

The `keys` method allows to get the list of keys that match the path pattern.
It's useful for querying the data without reading values.
It also has an additional `options` field that can be used to specify the return type and whether to return deleted keys.
For example:
- `alice.near/profile/*` will return the list of all the fields of the profile, but not the nested objects.
- `*/profile/image/nft` will return the list of all the accounts that have an NFT image in their profile.
- `alice.near/widget/*` with `return_deleted` option will return the list of all the component names of the account, including the deleted ones.
- `alice.near/widget/*` with `return_type` equal to `BlockHeight` will return the list of all the component names of the account and the value will be the block height when the widget was last updated.
- Note `**` is not supported by the `keys` method.

```rust
pub enum KeysReturnType {
    True,
    BlockHeight,
    NodeId,
}

pub struct KeysOptions {
    pub return_type: Option<KeysReturnType>,
    pub return_deleted: Option<bool>,
}

pub fn keys(self, keys: Vec<String>, options: Option<KeysOptions>) -> Value;
```

Arguments:
- `keys` - an array of key patterns to return.
- `options` - optional argument to specify options.

Options:
- `return_type` - if `BlockHeight`, will return the block height of the key instead of `true`, if `NodeId`, will return the node index of the key instead of `true`.
- `return_deleted` - if true, will include deleted keys.

Returns the aggregated JSON object.

Examples:

```js
keys({keys: ["alex.near/profile/*"]})

keys({keys: ["*/profile/image/nft"]})

keys({keys: ["alex.near/widget/*"], options: {return_deleted: true}})

keys({keys: ["alex.near/widget/*"], options: {return_type: "BlockHeight"}})
```

## Near Social

Now as you are familiar with the SocialDB contract, let's dive into [near.social](https://near.social)

### Near Social VM

The Near Social VM is a virtual machine that executes the components' code.
It's a sandboxed environment that allows to render components in a secure way.

I highly recommend getting yourself familiar with [ReactJS](https://reactjs.org/) and go through the [React tutorial](https://reactjs.org/tutorial/tutorial.html).
It will help you to understand how to use components better.

Components are like a React functional components, but with omitted function declaration.
For example, in a React you would write:
```jsx
function MyComponent(props) {
  return <div>Hello, {props.username}!</div>;
}
```

But in the Near Social VM you only need to write the body of the function:
```jsx
return <div>Hello, {props.username}!</div>;
```

Note, components are executed in a synchronous way, and the VM doesn't support await/async operations.
Instead, async operations like `fetch` or `Social.get` are internally handled by the VM, and the VM updates the component's state when the operation is finished.
It's similar to use React's `useEffect` combined with `useState`.

A common read-only component consists of the following parts:
- **Preparing input**. E.g. taking data from passed in properties or getting it from the context (e.g. the signed in account ID).
- **Fetching data**. E.g. fetching the data from the SocialDB contract.
- **Processing data**. E.g. filtering the data, sorting it, etc.
- **Rendering**. E.g. rendering the data using React components.

Not all components have to fetch data from the SocialDB contract. Some components can be completely static. Let's dive into each part.

#### Preparing input

Similar to a React component, the component receives the input in the object `props`.
If the component is a child of another component, the parent component can pass the data to the child component.
The props can contain: data, functions or React components.
The data will be a copy of the data passed to the component, so if the component changes the data, it won't affect the parent component.

Another object that is available to the component is `context`.
Currently, it only contains a single field `accountId` that contains the account ID of the signed-in user or `undefined` otherwise.

A common example preparing the input is the following:
```jsx
const accountId = props.accountId ?? context.accountId;
```

#### Fetching data

See Near Social VM APIs section for the list of available APIs.

Since the VM is synchronous, you should schedule all data that you need to fetch before processing it.
This will issue all promises in parallel and will update rerender the component whenever any of the promises is resolved.

You can build a component that either fetches the data or renders the given data.
For example, we want to fetch the profile for the `accountId` or use the given `profile` if it's passed in the props.
```jsx
const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}
```

Comparing to the React components, `Social.getr` is not a hook, so you can return the value from the component at any time.
Even if you have more fetches after this.

The value returned by `Social.getr` will be globally cached for the duration of the web session, and it's also cached by the component's VM.
So if you call `Social.getr` multiple times with the same key, it will return the same value immediately.

#### Processing data

Now you have the `profile` object fetched. Sometimes you need to process the data or just extract some data.

For example, we want to get the name and extract the list of tags from the profile:
```jsx
const name = profile.name || "No-name profile";
const tags = Object.keys(profile.tags ?? {});
```

If the data processing is expensive, you can wrap it in a function and call it only when the data is changed or cache it in the `state`. We'll discuss it later.

#### Rendering

Now you have the data ready to be rendered.
You can use most React components to render the data.
But also you can embed other components.
[near.social](https://near.social) doesn't allow specifying custom CSS classes, but provides a standard [Bootstrap 5](https://getbootstrap.com/docs/5.2/getting-started/introduction/) CSS classes.

We can render the profile object and also include a list of tags:
```jsx
return (
  <div className="d-inline-block">
    <a
      href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      className="text-decoration-none link-dark"
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          profile,
          accountId,
          className: "float-start d-inline-block me-2",
        }}
      />
      <div className="d-inline-block" style={{ maxWidth: "16em" }}>
        <div className="text-truncate">
          {name}
        </div>
        <div className="d-flex">
          <div className="d-inline-block text-secondary text-truncate">
            @{accountId}
          </div>
        </div>
        {tags.length > 0 && (
          <div className="text-truncate">
            {tags.map((tag) => (
              <span className="me-1 mb-1 badge bg-secondary">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </a>
  </div>
);
```

You can notice that we use the `Widget` component to embed another component:
```jsx
<Widget
  src="mob.near/widget/ProfileImage"
  props={{
    profile,
    accountId,
    className: "float-start d-inline-block me-2",
  }}
/>
```

The `Widget` component takes the `src` and `props` parameters.
- `src` is the component's name. It should be full path to the component, e.g. `mob.near/widget/ProfileImage`.
- `props` is the object with the props that will be passed to the component.

In our case we use `mob.near/widget/ProfileImage` component to render the profile image, and we pass the `profile` object, so that component doesn't need to fetch it again.

The full source is available in [mob.near/widget/ProfileDocsExample](https://near.social/#/mob.near/widget/WidgetSource?src=mob.near/widget/ProfileDocsExample)

### Component's state

Similar to React components, components have the state.
But instead of multiple state object that can be created using `useState` hooks, the component has a single state object called `state`.

By default, the `state` equals to `undefined` and needs to be initialized either with `State.init` or `State.update` functions.

The `State.init` function takes the initial state object, and will be no-op if the state is already initialized.

The `State.update` function will trigger the state update, and the component will be re-rendered.
It also has an optional argument, the object that will be added to the `state` object using `Object.assign`.

When state is initialized, you can change properties of the `state` object directly and then call `State.update()` to trigger re-rendering with the new values.

#### Controlled components

One of the reasons why you need the state is to have controlled input components.
For example, you want to have an input to enter an account ID.
The account ID can only contain certain characters (e.g. no uppercase), so when a user enters an uppercase character, you want to convert it to lowercase and remove all non-valid ones.

So you can create the following component:
```jsx
State.init({ accountId: "" });

return (
  <input
    type="text"
    className="form-control"
    value={state.accountId}
    onChange={(e) => {
      const accountId = e.target.value.toLowerCase().replace(/[^a-z0-9_.-]/g, "");
      State.update({ accountId });
    }}
  />
);
```

#### Caching data processing

Another reason why you need the state is to cache the data. For example, you want to fetch an expansive data, the process it, but don't do it on every re-render.
You can do it like this:
```jsx
if (!state) {
  // Fetch the data and process it.
  const tags = fetchAndComputeTags();
  
  if (tags !== null) {
    State.init({ tags });
  }
}
```

You can see a more complicated data processing example in [mob.near/widget/TagsEditor](https://near.social/#/mob.near/widget/WidgetSource?src=mob.near/widget/TagsEditor)

### Committing data

The components can commit data to SocialDB. To simplify the process a custom component `CommitButton` is provided.

The `CommitButton` component has three custom props:
- `data` - the data to commit. It can be any valid JSON-serializable object. The data doesn't have to start with the `accountId` prefix, it will be added automatically.
- `onClick` - the callback that will be called when the user clicks the button, but before the commit dialog is shown.
- `onCommit` - the callback that will be called when the user commits the data.

For example, we can create a notepad component. It will load the note from the `experimental/note` key, and will allow to edit it and then save it.
```jsx
const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const note = Social.get(`${accountId}/experimental/note`);

if (note === null) {
  return "Loading";
}

State.init({ note: note || "" });

return (
  <div>
    <div className="mb-2">
      <h4>Notepad</h4>
      <textarea
        type="text"
        rows={10}
        className="form-control"
        value={state.note}
        onChange={(e) => State.update({ note: e.target.value })}
      />
    </div>
    <CommitButton data={{ experimental: { note: state.note } }}>
      Save note
    </CommitButton>
  </div>
);
```

The `CommitButton` component just takes the `data` object and prompts the user to commit it to the SocialDB.

Notes:

- In the future a commit action will be available, so a user doesn't have to click on the `CommitButton` and the data can be committed automatically.
- Previously the commit action was always redirecting to the wallet for signing, so the cache was completely refreshed. But currently, the commit button doesn't always redirect to the wallet, so the cache is not always refreshed. We're working on the solution to automatically invalidate the affected cache, but it's not yet implemented.



