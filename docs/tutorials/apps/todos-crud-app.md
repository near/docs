---
id: todos-crud-app
title: Building a CRUD dApp
sidebar_label: Building a CRUD dApp
---

In this tutorial we will be building a standard [Create-Read-Update-Delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) (CRUD) application but on the blockchain. The application will consist of two distinct layers:

1. **[Smart contract](#smart-contract)** _(in web2 we may refer to this as server-side or back-end)_
2. **[Web app](#web-app)** _(in web2 we may refer to this as client-side or front-end)_

## Introduction

As we build our CRUD application we'll need to add smart 
contract methods that we can invoke for each of these operations. We can think of these 
smart contract methods as **endpoints**.

For example, if we were building a REST application, we may write an Express endpoint 
that takes an incoming `POST` request. That endpoint would then use a model to insert
a "todo" into our database.

**Example:**

```js
app.post('/todos', async(req, res) => {
  const todo = await Todo.insert(req.body.task);
  res.send(todo);
});
```

In our NEAR application, instead of HTTP endpoints, we'll have smart contract methods
which will store information on the blockchain. We'll explore how this in implemented shortly.

## Development notes

The development of this CRUD tutorial is based on test-driven development concepts. 
[Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD) is a software development process that relies on the repetition of a very short development cycle:

- first the developer writes an (initially failing) automated test case that defines a desired improvement or new function, 
- then produces the minimum amount of code to pass that test, 
- and finally refactors the new code to acceptable standards.

> **Tip:** If you're not familiar with TDD, you can read more about it [here](https://en.wikipedia.org/wiki/Test-driven_development).

## Setup

> **Tip:** you can find the complete source code of this CRUD example on [this GitHub repository](https://github.com/near-examples/crud-tutorial/).

### Pre-requisites

1. [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. [`near-cli`](/docs/tools/near-cli#installation)

### Smart Contract

For this example you will be writing the smart contract in [AssemblyScript](https://www.assemblyscript.org/introduction.html)
which is similar to TypeScript and complies to [WebAssembly](https://webassembly.org/).

Additionally, we'll use the [`near-sdk-as`](https://github.com/near/near-sdk-as) library to help us write our contract allowing us to interact with the blockchain.

#### AssemblyScript

Create a new directory for your smart contract and inside the newly created directory, [initialize an AssemblyScript application](https://www.assemblyscript.org/quick-start.html):

```bash
mkdir todos-crud-contract && cd todos-crud-contract
npm init -y
npm i @assemblyscript/loader@latest assemblyscript@latest asbuild near-cli near-sdk-as
npx asinit .
```

#### near-sdk-as

Replace the `asconfig.json` file with:

```json
{
  "extends": "near-sdk-as/asconfig.json"
}
```

Then create an `assembly/as_types.d.ts` file with:

```
/// <reference types="near-sdk-as/assembly/as_types" />
```

#### aspect testing

Create an `as-pect.config.js` file with:

```js
module.exports = require('near-sdk-as/imports')
```

and an `assembly/__tests__/as-pect.d.ts` file with:

```
/// <reference types="@as-pect/assembly/types/as-pect" />
```

Finally setup your tests in `assembly/__tests__/index.spec.ts` with:

```ts
describe('contract methods', () => {

});

```

### Web App

We'll use `create-react-app` to scaffold out our web app and the
[`near-api-js`](https://www.github.com/near/near-api-js) library to
integrate NEAR with React.

```bash
npx create-react-app todos-crud-web
cd todos-crud-web
npm i near-api-js
```

Then replace `src/index.js` with:

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getConfig from './config.js';
import * as nearAPI from 'near-api-js';

// Initializing contract
async function initContract() {
  const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');

  // Initializing connection to the NEAR TestNet
  const near = await nearAPI.connect({
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
    },
    ...nearConfig
  });

  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near);

  // Load in account data
  let currentUser;
  if(walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount
    };
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
    // View methods are read-only – they don't modify the state, but usually return some value
    viewMethods: ["get"],
    // Change methods can modify the state, but you don't receive the returned value when called
    changeMethods: ["create", "update", "del"],
    // Sender is the account ID to initialize transactions.
    // getAccountId() will return empty string if user is still unauthorized
    sender: walletConnection.getAccountId()
  });

  return { contract, currentUser, nearConfig, walletConnection };
}

window.nearInitPromise = initContract()
  .then(({ contract, currentUser, nearConfig, walletConnection }) => {
    ReactDOM.render(
      <App
        contract={contract}
        currentUser={currentUser}
        nearConfig={nearConfig}
        wallet={walletConnection}
      />,
      document.getElementById('root')
    );
  });
```

And replace `src/App.js` with:

```jsx
import 'regenerator-runtime/runtime';
import React from 'react';
import PropTypes from 'prop-types';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';

const App = ({ contract, currentUser, nearConfig, wallet }) => {

  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'NEAR ToDo List'
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
  return (
    <>
      <h1>NEAR Todos CRUD App</h1>
      { currentUser
          ? <div>
              <h2>
                Account ID: {currentUser.accountId}
                {" "}
                <button onClick={signOut}>Log out</button>
              </h2>
              
              <CreateTodo contract={contract} />
              <TodoList contract={contract} />
            </div>
          : 
          <div>
            Sign In To Use The App: 
            {" "}
            <button onClick={signIn}>Log in</button>
          </div>
        }
    </>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    create: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
```

Create `src/config.js` with:

```js
const CONTRACT_NAME = process.env.CONTRACT_NAME || 'dev-1631631317655-25327263281645';

function getConfig(env) {
  switch(env) {
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org'
      };
    // This is an example app so production is set to testnet.
    // You can move production to mainnet if that is applicable.
    case 'production':
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: CONTRACT_NAME,
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org'
      };
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
  }
}

module.exports = getConfig;
```

## Data Storage

With NEAR we can conveniently store information on the blockchain by using one of
the SDK-provided [collections](/docs/concepts/data-storage).
These collections will take the place of a traditional database for us and can be
thought of like database tables.

In our todo application we'll use a collection inside of our model code to persist
data to the blockchain.

In particular, our todo application will want to lookup a todo by its `id` and iterate through
our todos to get paginated results. The [`PersistentUnorderedMap`](https://near.github.io/near-sdk-as/classes/_sdk_core_assembly_collections_persistentunorderedmap_.persistentunorderedmap.html)
is perfect for this. It gives us the ability to lookup by key with the `get` and `getSome`
methods and allows us to iterate through all the values with the `values` method.

To properly separate concerns we are going to create a `model.ts` file to handle
all of our data persistance. In that file we are going to create our `PersistentUnorderedMap`
and a `Todo` model class.

```ts
// contract/assembly/model.ts
import { PersistentUnorderedMap, math } from "near-sdk-as";

// Think of this PersistentUnorderedMap like a database table.
// We'll use this to persist and retrieve data.
export const todos = new PersistentUnorderedMap<u32, Todo>("todos");

// Think of this like a model class in something like mongoose or
// sequelize. It defines the shape or schema for our data. It will
// also contain static methods to read and write data from and to
// the todos PersistentUnorderedMap.
@nearBindgen
export class Todo {
  id: u32;
  task: string;
  done: bool;

  constructor(task: string) {
    this.id = math.hash32<string>(task);
    this.task = task;
    this.done = false;
  }
}
```

## C - Create

### Contract

To start off we'll need to `create` new todos and store those todos on the blockchain.
In web2 this would often mean creating an HTTP `POST` endpoint. In web3, however, we'll
be creating a smart contract method.

#### Test

Let's begin by thinking how we want the `create` method to work. I imagine that
we'll want to be able to call the `create` method with a task string. Upon calling
the method, a new entry will be added to the `todos` `PersistentUnorderedMap`. We
should then be able to get a todo by its `id` from the `todos` `PersistentUnorderedMap`
and expect it to equal the todo returned from the `create` method.

```ts
// contract/assembly/__tests__/index.spec.ts

import { create } from "../index";
import { Todo, todos } from "../model";

describe("contract methods", () => {
  it("creates a todo", () => {
    // call the create method
    const todo = create("Drink water");

    // lookup in the PersistentUnorderedMap for our todo
    // expect the persisted todo to equal the todo returned
    // by the create method above.
    expect(todos.getSome(todo.id)).toStrictEqual(todo);
  });
});
```

#### Model

In order to store our todo in the `todos` `PersistentUnorderedMap` we are
going to add a `static insert` method to our `Todo` class. This method will
be responsible for persisting a todo into the `todos` `PersistentUnorderedMap`.

```ts
// contract/assembly/model.ts
import { PersistentUnorderedMap, math } from "near-sdk-as";

export const todos = new PersistentUnorderedMap<u32, Todo>("todos");

@nearBindgen
export class Todo {
  id: u32;
  task: string;
  done: bool;

  constructor(task: string) {
    this.id = math.hash32<string>(task);
    this.task = task;
    this.done = false;
  }

  static insert(task: string): Todo {
    // create a new Todo
    const todo = new Todo(task);

    // add the todo to the PersistentUnorderedMap
    // where the key is the todo's id and the value
    // is the todo itself. Think of this like an
    // INSERT statement in SQL.
    todos.set(todo.id, todo);

    return todo;
  }
}
```

#### Smart Contract Method

Smart contract methods act like endpoints that our web app will be able to
call. These methods define the public interface for our smart contract. Here
we define the `create` method which uses the `Todo` model to persist a new
todo to the blockchain.

```ts
// contract/assembly/index.ts
import { Todo } from "./model";

// export the create method. This acts like an endpoint
// that we'll be able to call from our web app.
export function create(task: string): Todo {
  // use the Todo class to persist the todo data
  return Todo.insert(task);
}
```

#### Deploy and Test

Now that the `create` method is finished we can run our as-pect tests by running:

```bash
npm run test
```

If all the tests pass we can build our smart contract and deploy it to a development
account.

Then add a few scripts to your `package.json`:

```json
"scripts": {
  "build": "asb",
  "deploy": "near dev-deploy build/release/todos-crud-contract.wasm",
  "dev": "npm run build && npm run deploy",
  "test": "asp",
}
```

The build step will compile the AssemblyScript code we wrote above to WebAssembly.
Then the deploy step will send and store the WebAssembly file to the blockchain.

```bash
npm run build
npm run deploy
```

And finally we can test our deployed smart contract:

```bash
npx near call $(cat neardev/dev-account) create '{"task":"Drink water"}' --accountId YOUR_ACCOUNT_ID.testnet
```

### Web App

In a web2 application we would create a form and on submitting that form we would make
an HTTP `POST` request to an endpoint defined on our back-end. This code may look
something like:

```js
const handleSubmit = async(event) => {
  event.preventDefault();

  const res = await fetch('http://api.my-backend.com/todos', {
    methods: 'POST',
    body: { task }
  });

  const todo = await res.json();

  console.log('my todo', todo);
}
```

To interact with the smart contract `create` method we are going to do something similar,
except instead of using fetch to interact with an HTTP endpoint we'll call a smart
contract function:

```js
const handleSubmit = async (event) => {
  event.preventDefault();

  setLoading(true);

  // invoke the smart contract's create method
  const todo = await contract.create({ task });

  // print the todo to the console
  console.log('my todo', todo)
};
```

To interact with the smart contract `create` method we are going to write a form component.

```jsx
// src/components/CreateTodo.js
import { useState } from "react";

const CreateTodo = ({ contract }) => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("CONTRACT - ", contract); 
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // invoke the smart contract's create method
    const todo = await contract.create({ task });
    setTask("");
    setLoading(false);

    // print the todo to the console
    console.log('my todo', todo);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buy Groceries"
        value={task}
        onChange={({ target }) => setTask(target.value)}
      />
      <button disabled={loading}>Create Task</button>
    </form>
  );
}

export default CreateTodo;
```

Now that we have a form component we'll add it to our `App.js` file:

```jsx
import 'regenerator-runtime/runtime';
import React from 'react';
import PropTypes from 'prop-types';
import CreateTodo from './components/CreateTodo';

const App = ({ contract, currentUser, nearConfig, wallet }) => {

  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'NEAR ToDo List'
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
  return (
    <>
      <h1>NEAR Todos CRUD App</h1>
      { currentUser
          ? <div>
              <h2>
                Account ID: {currentUser.accountId}
                {" "}
                <button onClick={signOut}>Log out</button>
              </h2>
              
              <CreateTodo contract={contract} />
            </div>
          : 
          <div>
            Sign In To Use The App: 
            {" "}
            <button onClick={signIn}>Log in</button>
          </div>
        }
    </>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    create: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
```

Finally let's run the web app with `npm start`. Once started we should be able to fill
out the form and see a todo log to the console. Make a note of your todos id, we'll need
that for the next step.

## R - Read by id

### Contract

Now that we've created a todo, let's retrieve the todo using a `getById` method.
In web2 this functionality might be accomplished with an express endpoint like this:

```js
app.get('/todos/:id', async(req, res) => {
  // Find a todo by its id. Maybe using a SQL query like:
  // SELECT * FROM todos WHERE id=?
  const todo = await Todo.findById(req.params.id);
  res.send(todo);
});
```

#### Test

To test our `getById` method we'll first need to create some test todos.
After our test todos are created we can attempt to get each todo by its
`id` and expect to get back the appropriate todo.

```ts
// contract/assembly/__tests__/index.spec.ts

import { create, getById } from "../index";
import { Todo, todos } from "../model";

describe("contract methods", () => {
  it("creates a todo", () => {...});

  it("gets a todo by id", () => {
    // create three todos
    const a = Todo.insert("Drink water");
    const b = Todo.insert("Get sleep");
    const c = Todo.insert("Exercise");

    // get each todo by its it
    expect(getById(a.id)).toStrictEqual(a);
    expect(getById(b.id)).toStrictEqual(b);
    expect(getById(c.id)).toStrictEqual(c);
  });
});
```

#### Model

In order to get our todos we'll add a `static findById` method that will
get a todo from the `todos` `PersistentUnorderedMap` using the `getSome`
method.

```ts
// contract/assembly/model.ts
import { PersistentUnorderedMap, math } from "near-sdk-as";

export const todos = new PersistentUnorderedMap<u32, Todo>("todos");

@nearBindgen
export class Todo {
  id: u32;
  task: string;
  done: bool;

  constructor(task: string) {
    this.id = math.hash32<string>(task);
    this.task = task;
    this.done = false;
  }

  static insert(task: string): Todo {...}

  static findById(id: u32): Todo {
    // Lookup a todo in the PersistentUnorderedMap by its id.
    // This is like a SELECT * FROM todos WHERE id=?
    return todos.getSome(id);
  }
}
```

#### Smart Contract Method

Now that we have a model method that will find a todo by `id`, we can
continue to define our smart contracts public interface by defining
and exporting a `getById` method.

```ts
// contract/assembly/index.ts
import { Todo } from "./model";

export function create(task: string): Todo {...}

export function getById(id: u32): Todo {
  return Todo.findById(id);
}
```

#### Deploy and Test

Now that the `getById` method is finished we can test it by running:

```bash
npm run test
```

If all the tests pass we can build our smart contract and deploy
it to a development account.

```bash
npm run dev
```

And finally we can test our deployed smart contract. Replace `SOME_ID_HERE` with the
id that was logged by the web app:

```bash
npx near view $(cat neardev/dev-account) getById '{"id":"SOME_ID_HERE"}' --accountId YOUR_ACCOUNT_ID.testnet
```

## R - Read list

### Contract

Next we'll want to get a paged list of results back from our smart contract.
We don't want to return all todos (there may be too many). Instead we want
to return a subset of todos. To do this we'll use the `offset` (how many to skip)
and `limit` (how many to get) pattern.

In web2 this may be accomplished with an express endpoint like this:

```js
app.get('/todos', async(req, res) => {
  // SELECT * FROM todos LIMIT ? OFFSET ?
  const todos = Todo.find(req.query.offset, req.query.limit);
  res.send(todos);
})
```

#### Test

```ts
// contract/assembly/__tests__/index.spec.ts
import { create, getById, get } from "../index";
import { Todo, todos } from "../model";

describe("contract methods", () => {
  it("creates a todo", () => {...});

  it("gets a todo by id", () => {...});

  it('gets a list of todos', () => {
    const todos = new Array<number>(100)
      .fill(0)
      .map<Todo>((_, i) => Todo.insert('todo' + i.toString()))

    expect(get(20)).toStrictEqual(todos.slice(20, 30));
    expect(get(0, 10)).toStrictEqual(todos.slice(0, 10));
    expect(get(10, 10)).toStrictEqual(todos.slice(10, 20));
    expect(get(50, 50)).toStrictEqual(todos.slice(50, 100));
  });
});
```

#### Model

```ts
// contract/assembly/model.ts
import { PersistentUnorderedMap, math } from "near-sdk-as";

export const todos = new PersistentUnorderedMap<u32, Todo>("todos");

@nearBindgen
export class Todo {
  id: u32;
  task: string;
  done: bool;

  constructor(task: string) {
    this.id = math.hash32<string>(task);
    this.task = task;
    this.done = false;
  }

  static insert(task: string): Todo {...}

  static findById(id: u32): Todo {...}

  static find(offset: u32, limit: u32): Todo[] {
    // the PersistentUnorderedMap values method will
    // takes two parameters: start and end. we'll start
    // at the offset (skipping all todos before the offset)
    // and collect all todos until we reach the offset + limit
    // todo. For example, if offset is 10 and limit is 3 then
    // this would return the 10th, 11th, and 12th todo.
    return todos.values(offset, offset + limit);
  }
}
```

#### Smart Contract Method

```ts
// contract/assembly/index.ts
import { Todo } from "./model";

export function create(task: string): Todo {...}

export function getById(id: u32): Todo {...}

export function get(offset: u32, limit: u32 = 10): Todo[] {
  return Todo.find(offset, limit);
}
```

#### Deploy and Test

Now that the `get` method is finished we can test it by running:

```bash
npm run test
```

If all the tests pass we can build our smart contract and deploy
it to a development account.

```bash
npm run dev
```

And finally we can test our deployed smart contract:

```bash
npx near view $(cat neardev/dev-account) get '{"offset":0}' --accountId YOUR_ACCOUNT_ID.testnet
```

### Web App

To present our todos we'll create a `TodoList` component which will use the `get` smart
contract method to fetch a list of todos. We'll then iterate over those todos and create
a list item for each.

```jsx
// src/components/Todo.js
import { useState } from "react";

export function Todo({ id, task, done }) {
  return (
    <>
      <p>{task}</p>
    </>
  );
}
```

```jsx
// src/components/TodoList.js
import { useEffect, useState } from "react";
import { Todo } from "./Todo";

const PER_PAGE_LIMIT = 3;

const TodoList = ({ contract }) => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let offset; 
    if(page < 1) {
      setPage(1);
      offset = 0;
    } else {
      offset = (page - 1) * PER_PAGE_LIMIT;
    }

    // every second after the component first mounts
    // update the list of todos by invoking the get
    // method on the smart contract
    const id = setInterval(() => {
      contract
        .get({ offset, limit: PER_PAGE_LIMIT })
        .then((todos) => setTodos(todos));
    }, 1000);

    return () => clearInterval(id);
  }, [page, contract]);

  return (
    <ul>
      <div className="flex">
      Current Page: {page}
      </div>
      <button onClick={() => setPage((page) => page - 1)}>&lt;</button>
      {" "}
      <button onClick={() => setPage((page) => page + 1)}>&gt;</button>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Todo contract={contract} {...todo} />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
```

And then:

```jsx
import 'regenerator-runtime/runtime';
import React from 'react';
import PropTypes from 'prop-types';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';

const App = ({ contract, currentUser, nearConfig, wallet }) => {

  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'NEAR ToDo List'
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };
  return (
    <>
      <h1>NEAR Todos CRUD App</h1>
      { currentUser
          ? <div>
              <h2>
                Account ID: {currentUser.accountId}
                {" "}
                <button onClick={signOut}>Log out</button>
              </h2>
              
              <CreateTodo contract={contract} />
              <TodoList contract={contract} />
            </div>
          : 
          <div>
            Sign In To Use The App: 
            {" "}
            <button onClick={signIn}>Log in</button>
          </div>
        }
    </>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    create: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
```

## U - Update

### Contract

Now that we've created a todo, let's update it using an `update` method.

#### Test

```ts
// contract/assembly/__tests__/index.spec.ts

import { create, getById, get, update } from "../index";
import { Todo, todos } from "../model";

describe("contract methods", () => {
  it("creates a todo", () => {...});

  it("gets a todo by id", () => {...});

  it('gets a list of todos', () => {...});

  it('updates a todo', () => {
    const todo = Todo.insert('Water drink');

    update(todo.id, { task: 'Drink water', done: true });

    const todoAfterUpdate = Todo.findById(todo.id);

    expect(todoAfterUpdate.id).toStrictEqual(todo.id);
    expect(todoAfterUpdate.task).toStrictEqual('Drink water');
    expect(todoAfterUpdate.done).toStrictEqual(true);
  });
});
```

#### Model

In order to update our todos we'll add a static `findByIdAndUpdate` method:

```ts
// contract/assembly/model.ts
import { PersistentUnorderedMap, math } from "near-sdk-as";

export const todos = new PersistentUnorderedMap<u32, Todo>("todos");

@nearBindgen
export class Todo {
  id: u32;
  task: string;
  done: bool;

  constructor(task: string) {
    this.id = math.hash32<string>(task);
    this.task = task;
    this.done = false;
  }

  static insert(task: string): Todo {...}

  static findById(id: u32): Todo {...}

  static find(offset: u32, limit: u32): Todo[] {...}

  static findByIdAndUpdate(id: u32, partial: PartialTodo): Todo {
    // find a todo by its id
    const todo = this.findById(id);

    // update the todo in-memory
    todo.task = partial.task;
    todo.done = partial.done;

    // persist the updated todo
    todos.set(id, todo);

    return todo;
  }
}
```

#### Smart Contract Method

Now that we have a model method, we can continue to define our smart contract's public interface by defining an `update` function.

```ts
// contract/assembly/index.ts
import { Todo } from "./model";

export function create(task: string): Todo {...}

export function getById(id: u32): Todo {...}

export function get(offset: u32, limit: u32 = 10): Todo[] {...}

export function update(id: u32, updates: PartialTodo): Todo {
  return Todo.findByIdAndUpdate(id, updates);
}
```

#### Deploy and Test

Now that the `update` method is finished we can test it by running:

```bash
npm run test
```

If all the tests pass we can build our smart contract and deploy
it to a development account.

```bash
npm run dev
```

And finally we can test our deployed smart contract:

```bash
npx near view $(cat neardev/dev-account) update '{"id":"SOME_ID_HERE", "updates":{"done":true, "task":"Drink nothing"} }' --accountId YOUR_ACCOUNT_ID.testnet
```

### Web App

Now that we can `update` a todo, let's refactor the `Todo.js` so that we can complete
tasks:

```jsx
// src/components/Todo.js
import { useState } from "react";

export function Todo({ contract, id, task, done }) {
  const [checked, setChecked] = useState(done);
  
  const complete = ({ target }) => {
    setChecked(target.checked);
    contract.update({ id, updates: { task, done: target.checked } });
  };

  return (
    <>
      <p>
        <input type="checkbox" checked={checked} onChange={complete} />
        {task}
      </p>
    </>
  );
}
```

## D - Delete

### Contract

Last but not least, let's delete a todo using a `del` method.

#### Test

```ts
// contract/assembly/__tests__/index.spec.ts

import { create } from "../index";
import { Todo, todos } from "../model";

describe("contract methods", () => {
  it("creates a todo", () => {...});

  it("gets a todo by id", () => {...});

  it('gets a list of todos', () => {...});

  it('updates a todo', () => {...});

  itThrows('deletes a todo', () => {
    const todo = Todo.insert('Drink water');

    del(todo.id)

    Todo.findById(todo.id)
  });
});
```

#### Model

In order to delete our todos we'll add a static `findByIdAndDelete` method:

```ts
// contract/assembly/model.ts
import { PersistentUnorderedMap, math } from "near-sdk-as";

export const todos = new PersistentUnorderedMap<u32, Todo>("todos");

@nearBindgen
export class Todo {
  id: u32;
  task: string;
  done: bool;

  constructor(task: string) {
    this.id = math.hash32<string>(task);
    this.task = task;
    this.done = false;
  }

  static insert(task: string): Todo {...}

  static findById(id: u32): Todo {...}

  static find(offset: u32, limit: u32): Todo[] {...}

  static findByIdAndUpdate(id: u32, partial: PartialTodo): Todo {...}

  static findByIdAndDelete(id: u32): void {
    todos.delete(id);
  }
}
```

#### Smart Contract Method

Now that we have a model method, we can continue to define our smart contract's public interface by defining a `del` function.

```ts
// contract/assembly/index.ts
import { Todo } from "./model";

export function create(task: string): Todo {...}

export function getById(id: u32): Todo {...}

export function get(offset: u32, limit: u32 = 10): Todo[] {...}

export function update(id: u32, updates: PartialTodo): Todo {...}

export function del(id: u32): void {
  Todo.findByIdAndDelete(id);
}
```

#### Deploy and Test

Now that the `del` method is finished we can test it by running:

```bash
npm run test
```

If all the tests pass we can build our smart contract and deploy
it to a development account.

```bash
npm run dev
```

And finally we can test our deployed smart contract:

```bash
npx near view $(cat neardev/dev-account) del '{"id":"SOME_ID_HERE" }' --accountId YOUR_ACCOUNT_ID.testnet
```

### Web App

Now that we can `delete` a todo, let's refactor the `Todo.js` component so that we can
delete a todo:

```jsx
// src/components/Todo.js
import { useState } from "react";

export function Todo({ contract, id, task, done }) {
  const [checked, setChecked] = useState(done);
  
  const complete = ({ target }) => {
    setChecked(target.checked);
    contract.update({ id, updates: { task, done: target.checked } });
  };

  const del = () => {
    // on clicking the delete button invoke the del method on
    // the smart contract
    contract.del({ id });
  };

  return (
    <>
      <p>
        <input type="checkbox" checked={checked} onChange={complete} />
        {task}
      </p>
      <button onClick={del}>delete</button>
    </>
  );
}
```

> **Tip:** check the complete source code of this CRUD example [on our GitHub repository](https://github.com/near-examples/crud-tutorial/).
