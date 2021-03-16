---
id: crud-app-delete
title: D - delete
sidebar_label: DELETE - Building a CRUD App
---

## Contract

### Test

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

### Model

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

### Smart Contract Method

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

### Deploy and Test

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

## Web App

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
