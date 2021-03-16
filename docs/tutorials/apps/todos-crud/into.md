---
id: crud-app-intro
title: Intro - Building a CRUD App
sidebar_label: Intro - Building a CRUD App
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
