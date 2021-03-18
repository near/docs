---
id: todos-crud-app
title: Building a CRUD App
sidebar_label: Building a CRUD App
---

## Overview

In our application we'll have two distinct layers:

1. smart contract (in web2 we may refer to this as server-side or back-end)
2. web app (in web2 we may refer to this as client-side or front-end)

## Building the app

We're building a Create-Read-Update-Delete (CRUD) application. We'll need to add
smart contract methods for each of these operations. We can think of these smart
contract methods as **endpoints**.

For example, if we were building a REST application we may write an express endpoint
that takes an incoming `POST` request. That endpoint would then use a model to insert
a todo into our database.

```js
app.post('/create', async(req, res) => {
  const todo = await Todo.insert(req.body.task);
  res.send(todo);
});
```

In our NEAR application, instead of HTTP endpoints we'll have smart contract methods
which will store information on the blockchain.

## Setup

### Smart Contract

We'll be writing our smart contract in [AssemblyScript](https://www.assemblyscript.org/introduction.html)
which is a variant of TypeScript that complies to WebAssembly.

Additionally, we'll use `near-sdk-as` to interact with the blockchain.

#### AssemblyScript

Create a new directory for your smart contract:

```bash
mkdir todos-crud-contract
```

Inside the new directory [initialize an AssemblyScript application](https://www.assemblyscript.org/quick-start.html):

```bash
npm init -y
npm i @assemblyscript/loader@latest assemblyscript@latest asbuild near-cli near-sdk-as
npx asinit .
```

Then add a few scripts to your `package.json`:

```json
"scripts": {
  "build": "asb",
  "deploy": "near dev-deploy build/release/todos-crud-contract.wasm",
  "test": "asp"
}
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
[near-react-hooks](https://www.npmjs.com/package/near-react-hooks) library to
integrate NEAR with React.

```bash
npx create-react-app todos-crud-web
cd todos-crud-web
npm i near-react-hooks
```

Then replace `src/index.js` with:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { NearProvider, NearEnvironment } from 'near-react-hooks';
import App from './components/app/App';

ReactDOM.render(
  <NearProvider environment={NearEnvironment.TestNet}>
    <App />
  </NearProvider>,
  document.getElementById('root')
);
```

## Data Storage

With NEAR we can conveniently store information on the blockchain by using one of
the sdk provided [collections](https://docs.near.org/docs/concepts/data-storage).
These collections will take the place of a traditional database for us and can be
thought of like database tables.

In our todo application we'll use a collection inside of our model code to persist
data to the blockchain.

In particular our todo application will want to lookup a todo by its id and iterate through
our todos to get paginated results. The [PersistentUnorderedMap](https://near.github.io/near-sdk-as/classes/_sdk_core_assembly_collections_persistentunorderedmap_.persistentunorderedmap.html)
is perfect for this. It gives us the ability to lookup by key with the `get` and `getSome`
methods and allows us to iterate through all the values with the `values` method.

To properly separate concerns we are going to create a `model.ts` file to handle
all of our data persistance. In that file we are going to create our `PersistentUnorderedMap`
and a `Todo` model class.

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
}
```

## C - Create

### Contract

To start off we'll need to `create` new todos and store those todos on the blockchain.
In web2 this would often mean creating an HTTP `POST` endpoint. In web3, however, we'll
be creating a smart contract method.

#### Test

Let's begin by imagining how we want the `create` method to work. I imagine that
we'll want to be able to call the `create` method with a task string. Upon calling
the method a new entry will be added to the `todos` `PersistentUnorderedMap`. We
should then be able to get a todo by its id from the `todos` `PersistentUnorderedMap`
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
    // is the todo itself.
    todos.set(todo.id, todo);

    return todo;
  }
}
```

#### Smart Contract Method

```ts
// contract/assembly/index.ts
import { Todo } from "./model";

// export the create method
export function create(task: string): Todo {
  // use the Todo class to persist the todo data
  return Todo.insert(task);
}
```

#### Deploy and Test

Now that the `create` method is finish we can test it by running:

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
npx near call $(cat neardev/dev-account) create '{"task":"Drink water"}' --accountId YOUR_ACCOUNT_ID.testnet
```

### Web App

To interact with the smart contract `create` method we are going to create a form component.

```jsx
import { useNearContract } from "near-react-hooks";
import { useState } from "react";

export default function CreateTodo() {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  // define a smart contract on NEAR with a create method
  const contract = useNearContract(process.env.REACT_APP_CONTRACT_ID, {
    changeMethods: ["create"],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // invoke the smart contract's create method
    await contract.create({ task });
    setTask("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={({ target }) => setTask(target.value)}
      />
      <button disabled={loading}>Create</button>
    </form>
  );
}
```

## R - Read by id
### Contract

Now that we've created a todo, let's retrieve the todo using a `getById` method.

#### Test

To test our `getById` method we'll first need to create some test todos.
After our test todos are created we can attempt to get each todo by its
id and expect to get back the appropriate todo.

```ts
// contract/assembly/__tests__/index.spec.ts

import { create } from "../index";
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
    return todos.getSome(id);
  }
}
```

#### Smart Contract Method

```ts
// contract/assembly/index.ts
import { Todo } from "./model";

export function create(task: string): Todo {...}

export function getById(id: u32): Todo {
  return Todo.findById(id);
}
```

#### Deploy and Test

Now that the `getById` method is finish we can test it by running:

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
npx near view $(cat neardev/dev-account) getById '{"id":"SOME_ID_HERE"}' --accountId YOUR_ACCOUNT_ID.testnet
```

## R - Read list

### Contract

Next we'll want to get a paged list of results back from our smart contract.
We don't want to return all todos (there could be too many). Instead we want
to return a subset of todos. To do this we'll use the `offset` (how many to skip)
and `limit` (how many to get) pattern.
#### Test

```ts
// contract/assembly/__tests__/index.spec.ts

import { create } from "../index";
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

Now that the `get` method is finish we can test it by running:

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

```jsx
import { useNearContract } from "near-react-hooks";
import { useEffect, useState } from "react";
import { Todo } from "./Todo";

const PER_PAGE_LIMIT = 3;

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);

  // define a smart contract on NEAR with a get method
  const contract = useNearContract(process.env.REACT_APP_CONTRACT_ID, {
    viewMethods: ["get"],
  });

  useEffect(() => {
    const offset = (page - 1) * PER_PAGE_LIMIT;
    // every second after the component first mounts
    // update the list of todos by invoking the get
    // method on the smart contract
    const id = setInterval(() => {
      contract
        .get({ offset, limit: PER_PAGE_LIMIT })
        .then((todos) => setTodos(todos));
    }, 1000);

    return () => clearInterval(id);
  }, [page]);

  return (
    <ul>
      <button onClick={() => setPage((page) => page - 1)}>&lt;</button>
      {page}
      <button onClick={() => setPage((page) => page + 1)}>&gt;</button>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Todo {...todo} />
        </li>
      ))}
    </ul>
  );
}
```

## U - Update

### Contract

#### Test

```ts
// contract/assembly/__tests__/index.spec.ts

import { create } from "../index";
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

Now that the `update` method is finish we can test it by running:

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

```jsx
import { useNearContract } from "near-react-hooks";
import { useState } from "react";

export function Todo({ id, task, done }) {
  const [checked, setChecked] = useState(done);

  // define a smart contract on NEAR with an update method
  const contract = useNearContract(process.env.REACT_APP_CONTRACT_ID, {
    changeMethods: ["update"],
  });

  const complete = ({ target }) => {
    setChecked(target.checked);

    // on checking the complete box invoke the update method on
    // the smart contract.
    contract.update({ id, updates: { task, done: target.checked } });
  };

  return (
    <>
      <p>{task}</p>
      <input type="checkbox" checked={checked} onChange={complete} />
    </>
  );
}
```

## D - Delete

### Contract

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

Now that the `del` method is finish we can test it by running:

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

```jsx
import { useNearContract } from "near-react-hooks";
import { useState } from "react";

export function Todo({ id, task, done }) {
  const [checked, setChecked] = useState(done);

  // define a smart contract on NEAR with an update and del method
  const contract = useNearContract(process.env.REACT_APP_CONTRACT_ID, {
    changeMethods: ["update", "del"],
  });

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
      <p>{task}</p>
      <input type="checkbox" checked={checked} onChange={complete} />
      <button onClick={del}>delete</button>
    </>
  );
}
```
