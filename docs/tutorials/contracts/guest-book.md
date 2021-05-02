---
id: guest-book
title: Build a Guest Book
sidebar_label: Build a Guest Book
---

[![Build Status](https://travis-ci.com/near-examples/guest-book.svg?branch=master)](https://travis-ci.com/near-examples/guest-book)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/near-examples/guest-book)

<!-- MAGIC COMMENT: DO NOT DELETE! Everything above this line is hidden on NEAR Examples page -->

In this section we will create a starter app built with an [AssemblyScript] backend and a [React] frontend that allows users to sign in with [NEAR] and add a message to the guest book.

- [A Few Notes Before We Start](#a-few-notes-before-we-start)
  - [Local Setup](#local-setup)
  - [Exploring The Code](#exploring-the-code)
- [Contract](#contract)
  - [Contract : Develop](#contract--develop)
    - [View/Call methods](#viewcall-methods)
      - [`assembly/main.ts`](#assemblymaints)
  - [Contract : Test](#contract--test)
    - [Unit Tests](#unit-tests)
      - [`__tests__/guestbook.spec.ts`](#__tests__guestbookspects)
    - [Running Your Tests](#running-your-tests)
  - [Contract : Deploy](#contract--deploy)
    - [Dev Deploy](#dev-deploy)
    - [Prod Deploy](#prod-deploy)
    - [Invoking Contract Methods](#invoking-contract-methods)
- [FrontEnd](#frontend)
  - [FrontEnd : Develop](#frontend--develop)
    - [`src/index.js`](#srcindexjs)
    - [`App.js`](#appjs)
  - [FrontEnd : Test](#frontend--test)
    - [`tests/App-integration.test.js`](#testsapp-integrationtestjs)
    - [`tests/ui/App-ui.test.js`](#testsuiapp-uitestjs)
  - [FrontEnd : Deploy](#frontend--deploy)
    - [Successful Output](#successful-output)
    - [Troubleshooting Deployment](#troubleshooting-deployment)
      - [Failed To Deploy](#failed-to-deploy)
      - [No Matching Key Pair Found](#no-matching-key-pair-found)


# A Few Notes Before We Start 


We will be referencing branches of a NEAR project called "guest-book". 

Each step will be it's own branch, so you can follow along or jump ahead to see the complete code.

You need `near-cli` installed globally. Here's how:

    npm install --global near-cli

This will give you the `near` [CLI] tool. Ensure that it's installed with:

    near --version

Next, clone the repo [here]. We will start with the `boilerplate` branch, and slowly progress towards the master branch with the completed code. 

Alternatively, create a basic NEAR React project with package [create-near-app] using the command:

    yarn create near-app path/to/my-near-react-app

Just adjust the folder structure to match the branch we will be referencing.


## Local Setup

To run this project locally:

1. Prerequisites: Make sure you have Node.js ≥ 12 installed (https://nodejs.org), then use it to install [yarn]: `npm install --global yarn` (or just `npm i -g yarn`)
2. Install dependencies: `yarn install` (or just `yarn`)
3. Run the local development server: `yarn dev` (see `package.json` for a
   full list of `scripts` you can run with `yarn`)

Now you'll have a local development environment backed by the NEAR _TestNet_. Running `yarn dev` will tell you the URL you can visit in your browser to see the app.


## Exploring The Code

1. The backend code (smart contract) lives in the `/assembly` folder. This code deploys to
   the NEAR blockchain when you run `yarn deploy:contract`  – [learn more
   about NEAR smart contracts][smart contract docs].
2. The frontend code lives in the `/src` folder. A great place to start exploring UI code 
   is in `/src/index.js`, where you can see how the frontend connects to the NEAR blockchain.
3. Tests: there are different kinds of tests for the frontend and backend. The
   backend code gets tested with the [asp] command for running the backend
   AssemblyScript tests, and [jest] for running frontend tests. You can run
   both of these at once with `yarn test`.

Both contract and client-side code will auto-reload as you update source files.



# Contract

If we imagine the blockchain to be a sort of database, then smart contracts function like an ORM or api with read/write access to the blockchain. 

The methods that do _NOT_ update the state of your application are called _view_ methods. Those that do are called _call_ or _change_ methods.


## Contract : Develop 

For this section we will be working in the `assembly/` folder of your project, and all code is written in TypeScript.

### View/Call methods


#### `assembly/main.ts`

Let's add code to our `assembly/main.ts` file:

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

Here we pull several items from `near-sdk-as`:
* context
    * provides context for our `PostedMessage` about the contract, including transaction sender, and the deposit they attached. 
* u128
    * unsigned 128-bit integer to qualify the deposit.
* PersistentVector
    * one of several storage collections allowing behavior similar to an Array in traditional javascript. 

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

Each message in our guest book will be an instance of our `PostedMessage` class. It will have information about the sender, their attached deposit, and their message. `@nearBindgen` (pronounced, "Near Bind Gen") is a decorator that serializes the class so it's compatible with the Near blockchain.

```ts
const messages = new PersistentVector<PostedMessage>("m");
```

We instantiate our persistent storage so it's ready to receive new messages.

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

Our call function adds a message to our guestbook, thereby changing state. If it did not change state, it would be a view function.

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

You can see, here, we simply create an output array, feed our messages to it, and return it.  

> Why not iterate over `messages` directly? We can certainly _try_, but iterating over a storage collection directly can rack up gas pretty quickly. If, instead, we "look up" each index like so -  `messages[i + startIndex]`, we keep O(1) time complexity and, hopefully, avoid any `GasLimitExceeded` errors.

We can refactor a bit by putting our `PostedMessage` and `messages` instance of it in  `model.ts`. Then we can import it into `main.ts`, which will now just have our contract methods, and be easier to read.


## Contract : Test

Before we start, switch to the `testing` branch of our project. We will be using AS-pect to test our smart contract on a locally mocked network.


### Unit Tests

In our `assembly` directory, you should see a `__tests__` folder with two files. `as-pect.d.ts` contains a reference to the as-pect default types for intellisense reasons. We will be coding in `guestbook.spec.ts`.


#### `__tests__/guestbook.spec.ts`

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

You can see we are importing our contract methods, our `PostedMessage` class, the `messages` instance of it, and a new property from `near-sdk-as` that you may not have seen before, `VMContext`.

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

The "message tests" simply invokes the `addMessage` function, and checks that `messages` contains the appropriate data in the correct order.

```ts 
  afterEach(() => {
    while(messages.length > 0) {
      messages.pop();
    }
  });
```

Our use of `afterEach` deletes the message we add in each subsequent test.

The second testing block, `attached deposit tests`, makes heavy use of `VMContext` to allow us to check that any attached deposits to a message get successfully added to our account.  


### Running Your Tests

In your testing terminal type:

```
  yarn test
```

Once finished, you should see passing tests that look like the following:

![Guest Book Contract Unit Test](/docs/assets/guest-book_as_unit-test.jpg)

Well done! We created a smart contract and tested it. 

Write a few more simple tests of your own, and see if we missed any edge cases.

Otherwise, let's deploy our smart contract and interact with it from the terminal.


## Contract : Deploy

We deploy our smart contract to NEAR _TestNet_, with either an auto-generated account id (dev deploy) or a permanent one we've already set up. 


### Dev Deploy

Every smart contract in NEAR has its [own associated account][NEAR accounts].

```
  yarn dev
```

The above deploys your smart contract to NEAR _TestNet_ with a throwaway account. It also starts a dev server, which we will need when we work on our front end. 

If you want to start interacting with your contracts without starting a local server, you can simply run:

```
  near dev-deploy
```

It does pretty much the same thing as `yarn dev`, but without the dev server.  So it will generate an account for your contract, `dev-some-autogenerated-account`.

If you have already configured permanent account for your contract, you can deploy it with the following command: 


### Prod Deploy 

``` 
  near deploy \
  --contractName=permanent-contract-accountid-you-set-up.testnet \
  --keyPath=./path-to/testnet/permanent-contract-accountid-you-set-up.testnet.json \
  --wasmFile=./out/main.wasm
```


### Invoking Contract Methods


The following command calls our main change methos, `addMessage`.

```
 near call dev-some-autogenerated-account addMessage '{"text": "hello guestbook"}' --accountId someValidNEARAccount.testnet
```

then run:

```
 near call dev-some-autogenerated-account getMessages --accountId someValidNEARAccount.testnet
```

Your terminal output should resemble this:

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
> #### Step 1: Create an account for the contract
> Visit [NEAR Wallet] and make a new account. You'll be deploying these smart contracts to this new account.
> Now authorize NEAR CLI for this new account, and follow the instructions it gives you:
>    near login
> #### Step 2: set contract name in code
> Modify the line in `src/config.js` that sets the account name of the contract. Set it to the account id you used above.
>   const CONTRACT_NAME = process.env.CONTRACT_NAME || 'your-account-here!'
> #### Step 3: change remote URL if you cloned this repo 
> Unless you forked this repository you will need to change the remote URL to a repo that you have commit access to. This will allow auto deployment to Github Pages from the command line.
> 1) go to GitHub and create a new repository for this project
> 2) open your terminal and in the root of this project enter the following:
>    $ `git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git`
> #### Step 4: deploy!
> One command: `yarn deploy`.
>
> As you can see in `package.json`, this does two things:
> 1. builds & deploys smart contracts to NEAR TestNet
> 2. builds & deploys frontend code to GitHub using [gh-pages]. This will only work if the project already has a repository set up on GitHub. Feel free to modify the `deploy` script in `package.json` to deploy elsewhere.




# FrontEnd

In this section we will not only build a way for the user to interact with our contract in the browser, we will allow them to go premium using their NEAR wallet, and we will build integration tests. 


## FrontEnd : Develop

Before we begin, if you are new to [React], you may want to spend some time reviewing the docs before proceeding. This tutorial focuses on ramping up your smart contract skills, so we won't be spending too much time on the intricacies of MVC, etc. Also, if you are not familiar with _functional (stateless) components_ and _hooks_, definitely, take some time to get acquainted with them.

First, navigate to our `src` directory. We will be dealing exclusively with:
* `src/index.js`
* `src/App.js`
* `src/tests/`

We will mostly just copy/paste the code snippets below while covering the parts that call our contract methods. So, if you want to skip ahead to the FrontEnd : Test section, simply switch to the `frontend-test` branch of the project. Otherwise, you should be in the `frontend-develop` branch.

Copy the following code and paste it into `src/index.js`:


### `src/index.js`

```js
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
    viewMethods: ['getMessages'],
    // Change methods can modify the state, but you don't receive the returned value when called
    changeMethods: ['addMessage'],
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

You can immediately see the `near-api-js` at work abstracting all of the interactions we had with our contracts from the terminal into easy-to-read blocks.

Our main function here, `initContract`, initializes our app. 

It checks our dev environment then grabs our account credentials from browser storage. Finally, it connects our wallet. 

Now we can interact with our smart contract, and spend (or earn) funds doing it. 

Now that we have connected the user to NEAR, we can initialize the smart contract with: 

```js
  const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
    // View methods are read-only – they don't modify the state, but usually return some value
    viewMethods: ['getMessages'],
    // Change methods can modify the state, but you don't receive the returned value when called
    changeMethods: ['addMessage'],
    // Sender is the account ID to initialize transactions.
    // getAccountId() will return empty string if user is still unauthorized
    sender: walletConnection.getAccountId()
  });
    return { contract, currentUser, nearConfig, walletConnection };
  }
```

All the configurations are returned in an object assigned to our `contract` variable. 

We set most of our api configurations as props we pass to `App.js`, which we will populate next.

Copy and paste the following snippet into `src/App.js`. Where `index.js` wired our logic to our main components, `App.js` will translate that into a simple yet elegant UI.


### `App.js`

```js
import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract.getMessages().then(setMessages);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    contract.addMessage(
      { text: message.value },
      BOATLOAD_OF_GAS,
      Big(donation.value || '0').times(10 ** 24).toFixed()
    ).then(() => {
      contract.getMessages().then(messages => {
        setMessages(messages);
        message.value = '';
        donation.value = SUGGESTED_DONATION;
        fieldset.disabled = false;
        message.focus();
      });
    });
  };

  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'NEAR Guest Book'
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main>
      <header>
        <h1>NEAR Guest Book</h1>
        { currentUser
          ? <button onClick={signOut}>Log out</button>
          : <button onClick={signIn}>Log in</button>
        }
      </header>
      { currentUser
        ? <Form onSubmit={onSubmit} currentUser={currentUser} />
        : <SignIn/>
      }
      { !!currentUser && !!messages.length && <Messages messages={messages}/> }
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired
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

So, a couple of things to point out:

```js
const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
```

We set some constants. The first being a default donation amount,`SUGGESTED_DONATION`. The user has the option to attach a deposit to their message. It will look like this in the browser:

![Guest Book UI Donation Field](/docs/assets/guest-book_fe_form_donation.jpg)

We also set our max allowed prepaid gas at 30000000000000.

Even with minimal understanding of React, it's not hard to guess what the bulk of the code is doing here. 

`App.js` mainly serves as conduit between our backend (smart contracts), and our front end (what the user sees and interacts with), handling the events and "controlling" how data is passed to and from our smart contracts. Some of the main features wired to our controller are:

* User can log in/out.
* User can submit a message.
* Messages are retrieved once a user has logged in.
* User can add a donation with their message.

That's it! Go ahead and run `yarn dev` in the terminal. You should see something like this:

![Guest Book Logged In](/docs/assets/guest-book_fe_logged-in.jpg)

Try logging out then back in again. NEAR explorer will check for your wallet credentials stored locally in the browser, and will ask you to authorize this app. You can try some of the other features our app offers, and it will all happen in our dev environment.

Let's switch over to our `frontend-test` branch, and build some integration tests for our app.


## FrontEnd : Test

We've built some pretty cool unit tests for our smart contracts, and you may have already done some informal _ui testing_ in the last section when you interacted with our app a bit.  However, we need to dive a bit deeper in testing our UI, and confirm that all the parts are working together, efficiently, when running in the browser. 

This type of testing is called _integration testing_, and will save us time debugging further down the line. 

First, let's write our _integration test_. Paste the following snippet into `tests/App-integration.test.js`


### `tests/App-integration.test.js`

```js
// these are made available by near-cli/test_environment
// note: do not remove the line below as it is needed for these tests
/* global nearlib, nearConfig */

import 'regenerator-runtime/runtime';

let near;
let contract;
let accountId;

beforeAll(async function() {
  near = await nearlib.connect(nearConfig);
  accountId = nearConfig.contractName;
  contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ['getMessages'],
    changeMethods: ['addMessage'],
    sender: accountId
  });
});

it('send one message and retrieve it', async() => {
  await contract.addMessage({ text: 'aloha' });
  const msgs = await contract.getMessages();
  const expectedMessagesResult = [{
    premium: false,
    sender: accountId,
    text: 'aloha'
  }];
  expect(msgs).toEqual(expectedMessagesResult);
});

it('send two more messages and expect three total', async() => {
  await contract.addMessage({ text: 'foo' });
  await contract.addMessage({ text: 'bar' });
  const msgs = await contract.getMessages();
  expect(msgs.length).toEqual(3);
});

```
This should look familiar to our unit tests we did when writing our smart contracts, except we use _async/await_ functions since we are consuming our smart contract as an api rather than calling its methods directly. This is the "integration" part of _integration testing_.

Feel free to play around with the code, and add your own tests like some that attach a donation to the message.

Next, we move into our UI test. These tests are mainly focused on how React renders our components, and is arguably out of scope of this tutorial, but since `yarn test` includes it, we should at least mention it:

Paste the snippet below into `tests/ui/App-ui.test.js`:


### `tests/ui/App-ui.test.js`

```js
import 'regenerator-runtime/runtime';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from '../../App';
const { act } = TestRenderer;

// Declare stubs for contract, walletConnection, and nearConfig
const contract = {
  account: {
    connection: {},
    accountId: 'test.near'
  },
  contractId: 'test.near',
  getMessages: () => new Promise(() => {}),
  addMessage: () => ''
};
const walletConnection = {
  account: () => ({ _state: { amount: '1' + '0'.repeat(25) } }),
  requestSignIn: () => null,
  signOut: () => null,
  isSignedIn: () => false,
  getAccountId: () => 'test.near'
};
const nearConfig = {
  networkId: 'default',
  nodeUrl: 'https://rpc.nearprotocol.com',
  contractName: 'test.near',
  walletUrl: 'https://wallet.nearprotocol.com',
  helperUrl: 'https://near-contract-helper.onrender.com'
};

// For UI tests, use pattern from: https://reactjs.org/docs/test-renderer.html
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders with proper title', () => {
  let testRenderer;

  act(() => {
    testRenderer = TestRenderer.create(
      <App contract={contract} wallet={walletConnection} nearConfig={nearConfig} />
    );
  });

  const testInstance = testRenderer.root;

  expect(testInstance.findByType('h1').children).toEqual(['NEAR Guest Book']);
});
```

The test to focus on here is the _testRenderer_ which is provided by React:

```js 
  act(() => {
    testRenderer = TestRenderer.create(
      <App contract={contract} wallet={walletConnection} nearConfig={nearConfig} />
    );
  });
```

`act()` is a helper that makes sure all updates related to user events, fetching, etc., have been processed and applied to the DOM before we make any assertions. It guarantees that our tests will run closer to what real users would experience when using our application. 

We assign our Near configurations to our App props and check that things are properly rendered on the DOM, like the title, for instance. What other units can we test? How would we check that the default donation value matches what we assigned to `SUGGESTED_DONATION` in `App.js`?

Now that we have all our testing code. Let's run:

 ```
 `yarn test` 
 ```
again, and see what new information the terminal has in store for us.

![Complete Unit Tests Result](/docs/assets/guest-book_fe_tests_complete.jpg)

Our amazing guest book app is now ready to deploy, and forever live on the blockchain.


## FrontEnd : Deploy


### Successful Output

Let's get right to it and run:

``` 
`yarn deploy` 
```

in the terminal. You should see something like this:

![Successful Build](/docs/assets/https://share.getcloudapp.com/kpuKA6JJjpg)

If everything has gone right so far, which is hardly ever the case, deployment should be pretty simple. In fact, a lot of companies like to schedule their deployments on a Friday afternoon just before a three-day weekend, because deployments always go really smoothly?


### Troubleshooting Deployment

Truth be told, there are as many ways for a deployment to fail, and error logs are sometimes too vague to help us immediately see the issue. 


#### Failed To Deploy

Generally, the most common error is that your project fails to compile, and you see this in the terminal: 

![Failed To Compile](/docs/assets/guest-book_fe_deployment_fail_compile.jpg)

There may be some tips in there like running `...try to 'npm install source-map-support' ...`, but that's most likely not the issue. Before we go down any rabbit holes, let's first see what `yarn dev` actually does.

Open your `package.json` file. Now let's review the scripts section: 

```json
  "scripts": {
    "build": "yarn build:contract && yarn build:web",
    "build:contract": "asb",
    "build:contract:debug": "asb --target debug",
    "build:web": "parcel build src/index.html --public-url ./",
    "deploy": "yarn build && near deploy && gh-pages -d dist/",
    "dev": "yarn build:contract:debug && near dev-deploy && nodemon --watch assembly -e ts --exec yarn dev:start",
    "lint": "eslint \"./**/*.js\" \"./**/*.jsx\"",
    "start": "yarn deploy && parcel src/index.html",
    "dev:start": "env-cmd -f ./neardev/dev-account.env parcel src/index.html",
    "test": "yarn build:contract:debug && asp && jest"
  },
```

Let's focus on the one we've been using:

```json
   "dev": "yarn build:contract:debug && near dev-deploy && nodemon --watch assembly 
```

It Looks like our `yarn dev` command deploys our app in a dev environment so we can engage with our app on `localhost`. 

We use `nodemon` to reflect any ui updates we make while the server is live, and we put `assembly` in watch mode so that any changes we make in our contract code will also update in the server. 

Take a minute to see how all these commands cascade into our other scripts. 

`build:contract` runs `yarn asb`, which creates our WASM file allowing it to run on the NEAR blockchain. 

We can run those individual commands in the terminal to help get a better idea of why our build keeps failing.

> If you can't figure it out, don't worry. You can switch to the `master`, which contains the complete code. Try running the deployment steps again, and you should be good to go. 


#### No Matching Key Pair Found

```
Error: Can not sign transactions for account guest-book.testnet on network default, no matching key pair found in InMemorySigner(MergeKeyStore(UnencryptedFileSystemKeyStore...
```

So, here we _almost_ got our app to deploy. Since we are trying to push to a non-local dev environment, we can no longer rely on `yarn dev` to create a dev account for our smart contract to use. 

Don't stress. This is a pretty easy fix. We just need to create a real life account for our app. We actually have steps to do that above in our `Contract : Deploy` section. 

Once you set up your _TestNet_ account head over to `src/config.js` and make sure the top line:

```js
const CONTRACT_NAME = process.env.CONTRACT_NAME || 'guest-book.testnet';
``` 

is pointing to your newly minted key pair. 

Make sure that you have read/write/commit access to where you are deploying this project, otherwise those errors will keep appearing. 

Check your root directory for your key pairs. 
They should be in `~/.near-credentials/default/guest-book.testnet.json`.

Try running `yarn deploy` again.  Ideally, you will see a something like this in your terminal after successful deployment:


```
 Starting deployment. Account id: guest-book.testnet, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, file: ./contract.wasm
Loaded master account guest-book.testnet key from ./credentials/testnet/guest-book.testnet.json with public key = ed25asdjfkeiejBUUFLSKKNekjkdsoIII
Transaction Id 78h3ThdioekwkIMmbCzmgaAvQUwWP11za58dhlldmueoaIKDemnk087
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/78h3ThdioekwkIMmbCzmgaAvQUwWP11za58dhlldmueoaIKDemnk087
Done deploying to guest-book.testnet
```

We did it!
Pat yourself on the back. You not only delved a bit deeper into writing smart contracts, you also built a clean, simple UI to go along with it. You wrote unit tests, and you deployed your guest book application to _TestNet_. 


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


