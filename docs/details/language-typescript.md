# Smart Contract: TypeScript

## TypeScript

NEAR contracts are written in [TypeScript](https://www.typescriptlang.org/), a "typed superset" of JavaScript which can be compiled to plain JavaScript. If you know JavaScript, you will have little problem working with TypeScript. If you have also worked with statically typed languages like C\# or Java before, even better.

You don't even _technically_ need to know JavaScript to learn TypeScript but you probably should. TypeScript is sort of like JavaScript with training wheels.

## **Why TypeScript?**

TypeScript is the most developer-friendly language which compiles easily into Web Assembly \(WASM\), which is how we run code on each of the nodes which make up the network. You could compile JavaScript the same way but it is quite inefficient.

Ultimately, this is the easiest way to write blockchain-based contracts that you'll find.

Note that only the contracts themselves are written in TypeScript -- the web pages which serve them will use the same HTML, CSS and JavaScript \(possibly with [React](https://reactjs.org/)\) that they always have. Test files can be written using a normal JavaScript testing library like [Jasmine](https://jasmine.github.io/).

## **TypeScript References**

If you want a rapid primer on TypeScript, check out the [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) tutorial from their documentation.

Your best ongoing reference is the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html), which is cited often below.

Here are the rapid-fire basics for the seasoned vets:

* File extensions use `.ts`
* You can write any valid JavaScript inside a TypeScript file.
* Add "type annotations" \(force the function argument to be a particular type\) with a colon, eg. `function foo(bar: string){...}`
* Use `public` in a class constructor signature to automatically create properties of that name, eg. `constructor(public foo: string, public bar: string){...}`

