---
id: crud-app-read-by-id
title: R - read by id
sidebar_label: READ by id - Building a CRUD App
---

## Contract

Now that we've created a todo, let's retrieve the todo using a `getById` method.

### Test

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

### Model

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

### Smart Contract Method

```ts
// contract/assembly/index.ts
import { Todo } from "./model";

export function create(task: string): Todo {...}

export function getById(id: u32): Todo {
  return Todo.findById(id);
}
```

### Deploy and Test

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
