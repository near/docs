---
id: crud-app-create
title: C - create
sidebar_label: CREATE - Building a CRUD App
---

## Contract

To start off we'll need to `create` new todos and store those todos on the blockchain.

### Test

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

### Model

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

### Smart Contract Method

```ts
// contract/assembly/index.ts
import { Todo } from "./model";

// export the create method
export function create(task: string): Todo {
  // use the Todo class to persist the todo data
  return Todo.insert(task);
}
```

### Deploy and Test

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

## Web App

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
