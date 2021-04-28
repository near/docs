---
id: guest-book
title: Build a Guest Book
sidebar_label: Build a Guest Book
---

[![Build Status](https://travis-ci.com/near-examples/guest-book.svg?branch=master)](https://travis-ci.com/near-examples/guest-book)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/near-examples/guest-book)

<!-- MAGIC COMMENT: DO NOT DELETE! Everything above this line is hidden on NEAR Examples page -->

Congratulations! If you've made it this far, you have not only learned how to issue a token, but have made cross contract calls as well. Now let's continue writing contracts, but this time with a front end! 

In this section we will create a starter app built with an [AssemblyScript] backend and a [React] frontend that allows users to sign in with [NEAR] and add a message to the guest book! 


A Few Notes Before We Start
===========================

We will be referencing branches of a NEAR project called guest-book. Each step will be it's own branch, so you can follow along or jump ahead and start playing around with the code.


You need near-cli installed globally. Here's how:

    npm install --global near-cli

This will give you the `near` [CLI] tool. Ensure that it's installed with:

    near --version


Next, clone the repo [here]. We will start with the `boilerplate` branch, and slowly progress towards the master branch with the completed code. 

Alternatively, you can create a basic NEAR React project with the package [create-near-app] using the command:

    yarn create near-app path/to/my-near-react-app

Just adjust the folder structure to match the branch we will be referencing.

Local Setup
-----------------

To run this project locally:

1. Prerequisites: Make sure you have Node.js ≥ 12 installed (https://nodejs.org), then use it to install [yarn]: `npm install --global yarn` (or just `npm i -g yarn`)
2. Install dependencies: `yarn install` (or just `yarn`)
3. Run the local development server: `yarn dev` (see `package.json` for a
   full list of `scripts` you can run with `yarn`)

Now you'll have a local development environment backed by the NEAR TestNet! Running `yarn dev` will tell you the URL you can visit in your browser to see the app.


Exploring The Code
------------------

1. The backend code lives in the `/assembly` folder. This code gets deployed to
   the NEAR blockchain when you run `yarn deploy:contract`. This sort of
   code-that-runs-on-a-blockchain is called a "smart contract" – [learn more
   about NEAR smart contracts][smart contract docs].
2. The frontend code lives in the `/src` folder.
   [/src/index.html](/src/index.html) is a great place to start exploring. Note
   that it loads in `/src/index.js`, where you can learn how the frontend
   connects to the NEAR blockchain.
3. Tests: there are different kinds of tests for the frontend and backend. The
   backend code gets tested with the [asp] command for running the backend
   AssemblyScript tests, and [jest] for running frontend tests. You can run
   both of these at once with `yarn test`.

Both contract and client-side code will auto-reload as you change source files.


Contract : Develop
------------

### View/Call methods

Now that you've found your bearings, let's start adding code to our `assembly/main.ts` file:

```ts
import { context, u128, PersistentVector } from "near-sdk-as";

@nearBindgen
class PostedMessage {
  premium: boolean;
  sender: string;
  constructor(public text: string) {
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
  }
}

/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */

const messages = new PersistentVector<PostedMessage>("m");
// --- contract code goes below

// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 10;

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(text: string): void {
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text);
  // Adding the message to end of the the persistent collection
  messages.push(message);
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getMessages(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = messages[i + startIndex];
  }
  return result;
}
```

There's a lot going on here so let's go section by section, starting at the top

```ts
import { context, u128, PersistentVector } from "near-sdk-as";
```
Here we are pulling several items from `near-sdk-as`:
* context
** This provides context (no surprise there) for our `PostedMessage` about the contract, including transaction sender, and the deposit they attached. 
* u128
** unsigned 128-bit integer to qualify the deposit referenced in the context mentioned above
* PersistentVector
** one of several storage collections allowing behavior similar to an Array in traditional javascript. 


```ts
@nearBindgen
class PostedMessage {
  premium: boolean;
  sender: string;
  constructor(public text: string) {
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
  }
}
```
Each message in our guest book will be an instance of our `PostedMessage` class. It will have information about the sender, their attached deposit, and, ofcourse, their message. `@nearBindgen` (pronounced, "Near Bind Gen") is a deocrator that serializes the class so it's compatible with the Near blockchain... I think.


```ts
const messages = new PersistentVector<PostedMessage>("m");
```
Here we simply instantiate our persitent storage so it's ready to receive new messages.

```ts
const MESSAGE_LIMIT = 10;
```
We set a limit on how big our array of messages can be. It's important to consider gas costs when working with transactions, so you should get acquainted with setting limits where appropriate.

```ts
export function addMessage(text: string): void {
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text);
  // Adding the message to end of the the persistent collection
  messages.push(message);
}
```
Our call function! This adds a message to our guestbook, thereby changing state. If it did not change state, it would simply be a view function as we will see next.

```ts
export function getMessages(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = messages[i + startIndex];
  }
  return result;
}
```
Speak of the devil! You can see, here, we simply create an output array, feed our messages to it, and return it.  Why not iterate over `messages` directly? We can certainly _try_, but iterating over a storage collection directly can rack up gas pretty quickly. If, instead, we "look up" each index like so -  `messages[i + startIndex]`, we keep O(1) time complexity and, hopefully, avoid the dreaded `GasLimitExceeded` error.


This looks great. You know, though, it seems like we can clean this up just a tad. We have that empty `model.ts` file. Let's put our `PostedMessage` and `messages` instance of it in there. Then we can import it into `main.ts`, which will now just have our contract methods; makes things easier to read, right?

With that we are ready to start testing! 

Contract : Test
----
Before we start, go ahead and switch to the `testing` branch of our project. We will be using AS-pect to test our smart contract on a locally mocked network.

### Unit Tests

In our `assembly` directory, you should see a `__tests__` folder with two files. `as-pect.d.ts` contains a reference to the as-pect default types for intellisense reasons. We will be coding in `guestbook.spec.ts`.

Go ahead and copy the following code into `__tests__/guestbook.spec.ts`:

```ts
import { addMessage, getMessages } from '../main';
import { PostedMessage, messages } from '../model';
import { VMContext, Context, u128 } from 'near-sdk-as';

function createMessage(text: string): PostedMessage {
  return new PostedMessage(text);
}

const message = createMessage('hello world');

describe('message tests', () => {
  afterEach(() => {
    while(messages.length > 0) {
      messages.pop();
    }
  });

  it('adds a message', () => {
    addMessage('hello world');
    expect(messages.length).toBe(
      1,
      'should only contain one message'
    );
    expect(messages[0]).toStrictEqual(
      message,
      'message should be "hello world"'
    );
  });

  it('adds a premium message', () => {
    VMContext.setAttached_deposit(u128.from('10000000000000000000000'));
    addMessage('hello world');
    const messageAR = getMessages();
    expect(messageAR[0].premium).toStrictEqual(true,
      'should be premium'
    );
  });

  it('retrieves messages', () => {
    addMessage('hello world');
    const messagesArr = getMessages();
    expect(messagesArr.length).toBe(
      1,
      'should be one message'
    );
    expect(messagesArr).toIncludeEqual(
      message,
      'messages should include:\n' + message.toJSON()
    );
  });

  it('only show the last 10 messages', () => {
    addMessage('hello world');
    const newMessages: PostedMessage[] = [];
    for(let i: i32 = 0; i < 10; i++) {
      const text = 'message #' + i.toString();
      newMessages.push(createMessage(text));
      addMessage(text);
    }
    const messages = getMessages();
    log(messages.slice(7, 10));
    expect(messages).toStrictEqual(
      newMessages,
      'should be the last ten messages'
    );
    expect(messages).not.toIncludeEqual(
      message,
      'shouldn\'t contain the first element'
    );
  });
});

describe('attached deposit tests', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(u128.fromString('0'));
    VMContext.setAccount_balance(u128.fromString('0'));
  });

  it('attaches a deposit to a contract call', () => {
    log('Initial account balance: ' + Context.accountBalance.toString());

    addMessage('hello world');
    VMContext.setAttached_deposit(u128.from('10'));

    log('Attached deposit: 10');
    log('Account balance after deposit: ' + Context.accountBalance.toString());

    expect(Context.accountBalance.toString()).toStrictEqual(
      '10',
      'balance should be 10'
    );
  });
});

```

You can see we are importing our contract methods, our `PostedMessage` class, the `messages` instance of it, and some new properties from `near-sdk-as` that you may not have seen before, well, really just one `VMContext`.

`VMContext` will help us in our mock context when testing such as attaching a deposit to a message.

Let's look at our first testing block: 

```ts
describe('message tests', () => {
  afterEach(() => {
    while(messages.length > 0) {
      messages.pop();
    }
  });
  it('adds a message', () => {
    addMessage('hello world');
    expect(messages.length).toBe(
      1,
      'should only contain one message'
    );
    expect(messages[0]).toStrictEqual(
      message,
      'message should be "hello world"'
    );
  });
  [...]
```
The "message tests" simply invokes the `addMessage` function, and checks that `messages` has the message with variations like checking that premium messages are stored at the beginning of `messages`. 
```ts 
  afterEach(() => {
    while(messages.length > 0) {
      messages.pop();
    }
  });
```
Our use of `afterEach` simply deletes the message we add in each subsequent test.

The second testing block, `attached deposit tests`, makes heavy use of `VMContext` to allow us to check that any attached deposits to a message get successfully added to our account.  

***Now run your tests!***

> In your testing terminal
> - type `yarn test`

Once finished, you should see passing tests that look like the following:

![Guest Book Contract Unit Test](/docs/assets/guest-book_as_unit-test.jpg)

Well done! We create another smart contract and tested it. Before we deploy to `TestNet`, why don't you write a few more simple tests, and see if we missed any edge cases.

Otherwise, let's deploy our smart contract and interact with it from the terminal.

Contract : Deploy
------

Every smart contract in NEAR has its [own associated account][NEAR accounts]. When you run `yarn dev`, your smart contracts get deployed to the live NEAR TestNet with a throwaway account. It also starts a dev server, which we will need when we fill out our front end.

If you want to start interacting with your contracts you can simply run `near dev-deploy`. It does pretty much the same thing as above, but without the dev server, so it will generate an account for your contract, `dev-some-autogenerated-account` , and you can start calling your contract methods like so:

```
 near call dev-some-autogenerated-account addMessage '{"text": "hello guestbook"}' --accountId someValidNEARAccount.testnet
 ```

then run:

```
 near call dev-some-autogenerated-account getMessages --accountId someValidNEARAccount.testnet
 ```

You should see something like this in the terminal:

```
[
  {
    premium: false,
    sender: 'someValidNEARAccount.testnet',
    text: 'hello guestbook'
  }
]
```

Fantastic! Our backend is ready to send and receive. Let's build our UI!


> When you're ready to switch over from a dev account to a permanent one, here's how:
> ### Step 1: Create an account for the contract
> Visit [NEAR Wallet] and make a new account. You'll be deploying these smart contracts to this new account.
> Now authorize NEAR CLI for this new account, and follow the instructions it gives you:
>    near login
> ### Step 2: set contract name in code
> Modify the line in `src/config.js` that sets the account name of the contract. Set it to the account id you used above.
>   const CONTRACT_NAME = process.env.CONTRACT_NAME || 'your-account-here!'
> ### Step 3: change remote URL if you cloned this repo 
> Unless you forked this repository you will need to change the remote URL to a repo that you have commit access to. This will allow auto deployment to Github Pages from the command line.
> 1) go to GitHub and create a new repository for this project
> 2) open your terminal and in the root of this project enter the following:
>    $ `git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git`
> ### Step 4: deploy!
> One command:
>    yarn deploy
> As you can see in `package.json`, this does two things:
> 1. builds & deploys smart contracts to NEAR TestNet
> 2. builds & deploys frontend code to GitHub using [gh-pages]. This will only work if the project already has a repository set up on GitHub. Feel free to modify the `deploy` script in `package.json` to deploy elsewhere.

FrontEnd : Develop
----------------

In this section we will not only build a way for the user to interact with our contract in the browser, we will allow them to go premium using their NEAR wallet, and we will build integration tests. Before we begin, though, take a few minutes to stretch, drink some water, and bring me back a snack.

FrontEnd : Test
---------------


FrontEnd : Deploy
-----------------

  [NEAR]: https://nearprotocol.com/
  [yarn]: https://yarnpkg.com/
  [AssemblyScript]: https://docs.assemblyscript.org/
  [React]: https://reactjs.org
  [smart contract docs]: https://docs.nearprotocol.com/docs/roles/developer/contracts/assemblyscript
  [asp]: https://www.npmjs.com/package/@as-pect/cli
  [jest]: https://jestjs.io/
  [NEAR accounts]: https://docs.nearprotocol.com/docs/concepts/account
  [NEAR Wallet]: https://wallet.nearprotocol.com
  [near-cli]: https://github.com/nearprotocol/near-cli
  [CLI]: https://www.w3schools.com/whatis/whatis_cli.asp
  [create-near-app]: https://github.com/nearprotocol/create-near-app
  [gh-pages]: https://github.com/tschaub/gh-pages
  [create-near-app]: https://www.npmjs.com/package/create-near-app
  [here]: https://github.com/humanman/guest-book.git


