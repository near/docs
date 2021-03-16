---
id: crud-app
title: Building a CRUD App
sidebar_label: Building a CRUD App
---

In this tutorial we'll relate and translate common web2 principles to to web3.
In order to facilitate this we'll build a todo application with NEAR.

## Overview

In our application we'll have two distinct layers:

1. smart contract (in web2 we may refer to this as server-side or back-end)
1. web app (in web2 we may refer to this as client-side or front-end)

## Building the app

We're building Create-Read-Update-Delete (CRUD) application.

### Setup

Create a new directory for your smart contract:

```bash
mkdir todos-crud-contract
```

Inside the new directory [initialize an AssemblyScript application](https://www.assemblyscript.org/quick-start.html):

```bash
npm init -y
npm i @assemblyscript/loader@latest
npm i -D assemblyscript@latest
npx asinit .
```

### Data Storage

With NEAR we can conveniently store information on the blockchain by using one of
the sdk provided [collections](https://docs.near.org/docs/concepts/data-storage).

For our todo application we'll want to lookup a todo by its id and iterate through
our todos to get paginated results. The [PersistentUnorderedMap](https://near.github.io/near-sdk-as/classes/_sdk_core_assembly_collections_persistentunorderedmap_.persistentunorderedmap.html)
is perfect for this. It gives us the ability to lookup by key with the `get` and `getSome`
methods and allows us to iterate through all the values with the `values` method.

To properly separate concerns we are going to create a `model.ts` file to handle
all our data persistance. In that file we are going to create our `PersistentUnorderedMap`
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

### C - create

To start off we'll need to `create` new todos and store those todos on the blockchain.

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

### R - read by id

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

#### Deploy and test

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

### R - read list

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

### U - update

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
    const todo = todos.getSome(id);
    todo.task = partial.task;
    todo.done = partial.done;
    todos.set(id, todo);

    return todo;
  }
}
```

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

### D - delete

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
