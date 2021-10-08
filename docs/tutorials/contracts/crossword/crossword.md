---
id: tutorial
sidebar_label: "Overview"
title: "Basics overview laying out what will be accomplished in this first section."
---

# Overview

This crossword puzzle tutorial will introduce fundamental concepts to smart contract development in a beginner-friendly way. By the end of this article you'll have a proof-of-concept contract that can be interacted with via [NEAR CLI](https://docs.near.org/docs/tools/near-cli) and a simple frontend that uses the [`near-api-js` library](https://www.npmjs.com/package/near-api-js).

## Assumptions on what we're building

- There will be only one crossword puzzle with one solution.
- The user solving the crossword puzzle will not be able to know the solution.
- Only the author of the crossword puzzle smart contract can set the solution.

## How it works

![Example banner](./basics-crossword.jpg)

We'll have a rule about how to get the words in the proper order. We collect words in ascending order by number, and if there's both an across and a down for a number, the across goes first.

So in the image above, the solution will be **near nomicon ref finance**.

Let's begin!

---

# Getting started

In this section we'll get a `testnet` account, use NEAR CLI to add a key to our computer's file system, and set up the basic skeleton of an AssemblyScript smart contract.

## Getting a testnet account

Visit [NEAR Wallet for testnet](https://wallet.testnet.near.org) and register for a free account. For the purposes of this tutorial, you may skip the option to add two-factor authentication if you wish.

## Creating a new key on your computer

We'll want to use a command-line interface (CLI) tool to deploy a contract, but currently, the private key only exists in the browser. Next we'll _add a new key_ to the `testnet` account and have this stored locally on our computer as a JSON file.

> **Tip:** Yes, you can have multiple keys on your NEAR account, which is quite powerful!

Let's install NEAR CLI. (Please ensure you [have NodeJS](https://nodejs.org/en/download/package-manager) > 12.)

    npm install -g near-cli

You may now run:

    near

to see various commands, which are covered [in detail here](https://docs.near.org/docs/tools/near-cli).

We'll start by "logging in" with this command:

    near login

This will bring you to NEAR Wallet again where you can confirm the creation of a [**full-access** key](http://docs.near.org/docs/concepts/account#access-keys). Follow the instructions from the login command to create a key on your hard drive. This will be located in your operating system's home directory in a folder called `.near-credentials`.

You can see the keys associated with your account by running following command, replacing `friend.testnet` with your account name:

    near keys friend.testnet

## About AssemblyScript

AssemblyScript is a dialect of TypeScript that compiles to Wasm. See the [official AssemblyScript docs](https://assemblyscript.org/introduction.html) for more details.
If you are not familiar with TypeScript then [this introduction](https://learnxinyminutes.com/docs/typescript/) will be worth a quick look but do keep in mind that AssemblyScript is a dialect of TypeScript so not all of the features of TypeScript are supported.

## Check out the contract

To jump right away into this Crossword example, we have a basic [smart contract repository](https://github.com/near-examples/crossword-tutorial-chapter-1-AS) that's helpful to clone or download. For now, we'll be working off the `skeleton` branch and as the tutorial progresses, we'll fill in parts of the missing code.

```bash
git clone -b skeleton https://github.com/near-examples/crossword-tutorial-chapter-1-AS
```

:::tip Finished Code
To view the finished code, checkout the main branch:

    git checkout main

:::

Next, let's modify this contract little by little.

---

# Modifying the contract

This section will modify the smart contract skeleton from the previous section. We'll start by writing a contract in a somewhat useless way in order to learn the basics. Once we've got a solid understanding, we'll iterate until we have a crossword puzzle.

## Add a const, a field, and

The first thing you wanna do is download the dependencies.

```bash
cd contract && npm install
```

Let's add to the contract's code which is found in `/contract/assembly/index.ts`:

```ts title="/contract/assembly/index.ts"
const PUZZLE_NUMBER: number = 1;

@nearBindgen
export class Contract {
  solution: string;

  get_puzzle_number(): number {
    return PUZZLE_NUMBER;
  }

  @mutateState()
  set_solution(solution: string): void {
    this.solution = solution;
  }

  guess_solution(solution: string): void {
    if (solution == this.solution) {
      logging.log("You guessed right!");
    } else {
      logging.log("try again");
    }
  }
}
```

:::tip Compiler Errors
If there are compiler errors try restarting your TS server. Using VSCode, this can be done by opening the command pallette, and typing:
`>TypeScript: Restart TS Server`
:::

We've done a few things here:

1. Set a constant for the puzzle number.
2. Added the field `solution` to our main class.
3. Implemented three functions: one that's view-only and two that are mutable, meaning they have the ability to change state.

Before moving on, let's talk about these changes and how to think about them, beginning with the constant:

`const PUZZLE_NUMBER: number = 1; `

This is an in-memory value, meaning that when the smart contract is spun up and executed in the virtual machine, the value `1` is contained in the contract code. This differs from the next change, where a field is added to the struct containing the `@nearBindgen` macro. The field `solution` has the type of `String` and, like any other fields added to this struct, the value will live in **persistent storage**. With NEAR, storage is "paid for" via the native NEAR token (Ⓝ). It is not "state rent" but storage staking, paid once, and returned when storage is deleted. This helps incentivize users to keep their state clean, allowing for a more healthy chain. Read more about [storage staking here](https://docs.near.org/docs/concepts/storage-staking).

Let's now look at the three new functions:

```ts
get_puzzle_number(): number {
    return PUZZLE_NUMBER;
}
```

In the function above, the `PUZZLE_NUMBER` is returned. A user may call this method using the proper RPC endpoint without signing any transaction, since it's read-only. Think of it like a GET request, but using RPC endpoints that are [documented here](https://docs.near.org/docs/api/rpc/contracts#call-a-contract-function).

Mutable functions, on the other hand, require a signed transaction. The first example is a typical approach where the user supplies a parameter that's assigned to a field:

```ts
@mutateState()
set_solution(solution): string {
    this.solution = solution;
}
```

The next time the smart contract is called, the contract's `solution` field will have changed.

The second example is provided for demonstration purposes:

```ts
guess_solution(solution: string): void {
    if (solution == this.solution) {
        logging.log("You guessed right!");
    } else {
        logging.log("try again");
    }
}
```

Notice how we're not saving anything to state and only logging. Why does this need to be signed?

Well, logging is ultimately captured inside blocks added to the blockchain. (More accurately, transactions are contained in chunks and chunks are contained in blocks. More info in the [Nomicon spec](https://nomicon.io/Architecture.html?highlight=chunk#blockchain-layer-concepts).) So while it is not changing the data in the fields of the struct, it does cost some amount of gas to log, requiring a signed transaction by an account that pays for this gas.

## Create a subaccount

If you've followed from the previous section, you have NEAR CLI installed and a full-access key on your machine. While developing, it's a best practice to create a subaccount and deploy the contract to it. This makes it easy to quickly delete and recreate the subaccount, which wipes the state swiftly and starts from scratch. Let's use NEAR CLI to create a subaccount:

    near create-account crossword.friend.testnet --masterAccount friend.testnet

If you look again in your home directory's `.near-credentials`, you'll see a new key for the subaccount with its own key pair. This new account is, for all intents and purposes, completely distinct from the account that created it. It might as well be `alice.testnet`, as it has, by default, no special relationship with the parent account.

:::info Subaccount nesting
It's possible to have the account `another.crossword.friend.testnet`, but this account must be created by `crossword.friend.testnet`.

`friend.testnet` **cannot** create `another.crossword.friend.testnet` because accounts may only create a subaccount that's "one level deeper."
:::

We won't get into top-level accounts or implicit accounts, but you may read more [about that here](https://docs.near.org/docs/concepts/account).

Now that we have a key pair for our subaccount, we can deploy the contract to testnet and interact with it!

## Build the contract

To build the contract, make sure you are in the `/contract/` folder and then run the following:

    yarn build

This will build the contract and you will be able to see the compiled Wasm file copied to the `build/release` folder.

We're almost ready to deploy the smart contract to the account, but first let's take a look at the account we're going to deploy to. Remember, this is the subaccount we created earlier. To view the state easily with NEAR CLI, you may run this command:

    near state crossword.friend.testnet

What you'll see is something like this:

```js
{
  amount: '6273260568737488799170194446',
  block_hash: 'CMFVLYy6UP6c6vrWiSf1atWviayfZF2fgPoqKeUVtLhi',
  block_height: 61764892,
  code_hash: '11111111111111111111111111111111',
  locked: '0',
  storage_paid_at: 0,
  storage_usage: 4236,
  formattedAmount: '6,273.260568737488799170194446'
}
```

Note the `code_hash` here is all ones. This indicates that there is no contract deployed to this account.

Let's deploy the contact and then check this again.

## Deploy the contract

Ensure that in your command line application, you're in the `/contract/build/release` directory, then run:

    near deploy crossword.friend.testnet --wasmFile crossword-tutorial-chapter-1-as.wasm

Congratulations, you've deployed the smart contract! Note that NEAR CLI will output a link to [NEAR Explorer](https://docs.near.org/docs/tools/near-explorer) where you can inspect details of the transaction.

Lastly, let's run this command again and notice that the `code_hash` is no longer all ones. This is the hash of the smart contract deployed to the account.

    near state crossword.friend.testnet

**Note**: deploying a contract is often done on the command line. While it may be _technically_ possible to deploy via a frontend, the CLI is likely the best approach. If you're aiming to use a factory model, (where a smart contract deploys contract code to a subaccount) this isn't covered in the tutorial, but you may reference the [contracts in SputnikDAO](https://github.com/near-daos/sputnik-dao-contract).

## Call the contract methods

Now that our contract has been deployed, let's call the method that's view-only:

    near view crossword.friend.testnet get_puzzle_number

Your command prompt will show the result is `1`. Since this method doesn't take any arguments, we don't pass any. We could have added `'{}'` to the end of the command as well.

Note that we used NEAR CLI's [`view` command](https://docs.near.org/docs/tools/near-cli#near-view), and didn't include an `--accountId` flag. As mentioned earlier, this is because we are not signing a transaction.

Next, we'll add a crossword solution as a string (later we'll do this in a better way) argument:

    near call crossword.friend.testnet set_solution '{"solution": "near nomicon ref finance"}' --accountId friend.testnet

:::info Windows users
Windows users will have to modify these commands a bit as the Command Prompt doesn't like single quotes as we have above. The command must use escaped quotes like so:

    near call crossword.friend.testnet set_solution "{\"solution\": \"near nomicon ref finance\"}" --accountId friend.testnet

:::

This second method uses the NEAR CLI [`call` command](https://docs.near.org/docs/tools/near-cli#near-call) which does sign a transaction and requires the user to specify a NEAR account that will sign it, using the credentials files we looked at.

The last method we have will check the argument against what is stored in state and write a log about whether the crossword solution is correct or incorrect.

Correct:

    near call crossword.friend.testnet guess_solution '{"solution": "near nomicon ref finance"}' --accountId friend.testnet

You'll see something like this:

![Command line shows log for successful solution guess](./cli-guess-solution.png)

Notice the log we wrote is output as well as a link to NEAR Explorer.

Incorrect:

    near call crossword.friend.testnet guess_solution '{"solution": "wrong answers here"}' --accountId friend.testnet

As you can imagine, the above command will show something similar, except the logs will indicate that you've given the wrong solution.

## Reset the account's contract and state

We'll be iterating on this smart contract during this tutorial, and in some cases it's best to start fresh with the NEAR subaccount we created. The pattern to follow is to **delete** the account (sending all remaining testnet Ⓝ to a recipient) and the **create the account** again.

Using NEAR CLI, the commands will look like this:

    near delete crossword.friend.testnet friend.testnet
    near create-account crossword.friend.testnet --masterAccount friend.testnet

The first command deletes `crossword.friend.testnet` and sends the rest of its NEAR to `friend.testnet`.

## Wrapping up

So far, we're writing a simplified version of the smart contract and we're approaching the crossword puzzle in a novice way. Remember that blockchain is an open ledger, meaning everyone can see the state of smart contracts and transactions taking place.

In this section, we saved the crossword solution as plain text, which is likely not a great idea if we want to hide the solution to players of this crossword puzzle. Even though we don't have a function called `show_solution` that returns the contract's `solution` field, the value is stored transparently in state. We won't get into viewing contract state at this moment, but know it's rather easy [and documented here](https://docs.near.org/docs/api/rpc/contracts#view-contract-state).

The next section will explore hiding the answer from end users playing the crossword puzzle.

---

## Get ready for our frontend

In the next section we'll add a simple frontend for our single, hardcoded crossword puzzle. We'll want to modify our contract to hash the solution. We can also use this opportunity to remove the function `get_puzzle_number` and the constant it returns, as these were used for informative purposes.

In addition, we'll modify our `guess_solution` to return a boolean value, which will also make things easier for our frontend.

```ts
import { Context, logging, storage, env, util, math } from "near-sdk-as";

function toHexString(byteArray: Uint8Array): string {
  let output: string = "";

  for (let i = 0; i < byteArray.length; i++) {
    logging.log(byteArray[i]);
    output += (byteArray[i] & 0xff).toString(16).slice(-2).padStart(2, "0");
  }

  return output;
}

@nearBindgen
export class Contract {
  solution: string;
  constructor(solution: string) {
    this.solution = solution;
  }

  get_solution(): string {
    return this.solution;
  }

  guess_solution(solution: string): boolean {
    logging.log("bytes are");
    let hashed_input = math.sha256(util.stringToBytes(solution));
    let hex_hashed_input = toHexString(hashed_input);

    logging.log("hex output:");
    logging.log(hex_hashed_input);
    if (
      hex_hashed_input == storage.get<String>("crosswordSoluton", "nothing")
    ) {
      logging.log("You guessed right!");
      return true;
    } else {
      ("try again");
      return false;
    }
  }
}
```

The `get_solution` method can be called with:

    near view crossword.friend.testnet get_solution

We've added a constructor to the code which we haven't looked at before. This will replace our old `set_solution` method:

```ts
constructor(solution: string) {
    this.solution = solution;
}
```

The function above is what is used to create a new instance of our `Contract` class. Since we didn't explicitly have one before, AssemblyScript used a default constructor. We will use this method to set the solution of our crossword. It can only be called once and the contract must be initialized before using any other methods.

In the next section we'll add a simple frontend.

---

# Add a simple frontend

This will be the final section in this tutorial, where we'll add a simple frontend using React and [`near-api-js`](https://docs.near.org/docs/api/javascript-library) to communicate with the smart contract.

There will be three main files we'll be working with:

1. `src/index.js` will be the entry point, where NEAR network configuration will be set up, and the view-only call to `get_solution` will happen.
2. `src/App.js` is then called and sets up the crossword table and checks to see if a solution has been found.
3. `src/utils.js` is used to make a view-only call to the blockchain to get the solution, and other helper functions.

## Entry point

We'll go over a pattern that may look familiar to folks who have surveyed the [NEAR examples site](https://near.dev). We'll start with an asynchronous JavaScript function that sets up desired logic, then pass that to the React app.

```js title="/src/index.js"
import App from "./App";
import getConfig from "./config.js";
import { viewMethodOnContract } from "./utils";
import { data } from "./hardcoded-data";

async function initCrossword() {
  const nearConfig = getConfig(process.env.NEAR_ENV || "testnet");
  const solutionHash = await viewMethodOnContract(nearConfig, "get_solution");
  return { data, solutionHash };
}

initCrossword().then(({ data, solutionHash }) => {
  ReactDOM.render(
    <App data={data} solutionHash={solutionHash} />,
    document.getElementById("root")
  );
});
```

Let's talk through the code above, starting with the imports.

We import from:

- `config.js` which, at the moment, is a common pattern. This file contains details on the different networks. (Which RPC endpoint to hit, which NEAR Wallet site to redirect to, which NEAR Explorer as well…)
- `utils.js` for that view-only function call that will call `get_solution` to retrieve the correct solution hash when a person has completed the crossword puzzle correctly.
- `hardcoded-data.js` is a file containing info on the crossword puzzle clues. This article has covered the crossword puzzle where the solution is **near nomicon ref finance**, and according to the initial overview we've committed to serving _one_ puzzle. We can improve our smart contract later, allowing for multiple crossword puzzles, but for now it's hardcoded here.

Next, we define an asynchronous function called `initCrossword` that will be called before passing data to the React app. It's often useful to set up a connection with the blockchain here, but in our case all we need to do is retrieve the crossword puzzle solution as a hash. Note that we're attempting to pass this environment variable `NEAR_ENV` into our configuration file. `NEAR_ENV` is used to designate the blockchain network (testnet, betanet, mainnet) and is also [used in NEAR CLI](https://docs.near.org/docs/tutorials/contracts/general/deploy-to-mainnet).

Finally, we'll call `initCrossword` and, when everything is complete, pass data to the React app contained in `App.js`.

## React app

Here's a large portion of the `App.js` file, which will make use of a fork of a React crossword library by Jared Reisinger.

```js title="/src/App.js"
import Crossword from "react-crossword-near";
import { parseSolutionSeedPhrase } from "./utils";
import { createGridData, loadGuesses } from "react-crossword-near/dist/es/util";
import sha256 from "js-sha256";

const App = ({ data, solutionHash }) => {
  const crossword = useRef();
  const [solutionFound, setSolutionFound] = useState("Not correct yet");

  const onCrosswordComplete = useCallback(async (completeCount) => {
    if (completeCount !== false) {
      let gridData = createGridData(data).gridData;
      loadGuesses(gridData, "guesses");
      await checkSolution(gridData);
    }
  }, []);

  // This function is called when all entries are filled
  async function checkSolution(gridData) {
    let seedPhrase = parseSolutionSeedPhrase(data, gridData);
    let answerHash = sha256.sha256(seedPhrase);
    // Compare crossword solution's public key with the known public key for this puzzle
    // (It was given to us when we first fetched the puzzle in index.js)
    if (answerHash === solutionHash) {
      console.log("You're correct!");
      setSolutionFound("Correct!");
    } else {
      console.log("That's not the correct solution. :/");
      setSolutionFound("Not correct yet");
    }
  }

  return (
    <div id="page">
      <h1>NEAR Crossword Puzzle</h1>
      <div id="crossword-wrapper">
        <h3>Status: {solutionFound}</h3>
        <Crossword
          data={data}
          ref={crossword}
          onCrosswordComplete={onCrosswordComplete}
        />
      </div>
      <footer>
        <p>
          Thank you{" "}
          <a
            href="https://github.com/JaredReisinger/react-crossword"
            target="_blank"
            rel="noreferrer"
          >
            @jaredreisinger/react-crossword
          </a>
          !
        </p>
      </footer>
    </div>
  );
};
```

We'll discuss a few key points in the code above, but seeing as we're here to focus on a frontend connection to the blockchain, will brush over other parts that are library-specific.

The two imports worth highlighting are:

- `parseSolutionSeedPhrase` from the utility file we'll cover shortly. This will take the solution entered by the user and put it in the correct order according to the rules discussed in [the chapter overview](#how-it-works).
- `sha256` will take the ordered solution from above and hash it. Then we'll compare that hash with the one retrieved from the smart contract.

```js
const [solutionFound, setSolutionFound] = useState(false);
```

We're using [React Hooks](https://reactjs.org/docs/hooks-state.html) here, setting up the variable `solutionFound` that will be changed when the player of the crossword puzzle enters the final letter of the crossword puzzle, having entries for all the letters on the board.

The `onCrosswordComplete` and `checkSolution` blocks of code fire events to check the final solution entered by the user, hash it, and compare it to the `solutionHash` that was passed in from the view-only call in `index.js` earlier.

Finally, we return the [JSX](https://reactjs.org/docs/introducing-jsx.html) for our app and render the crossword puzzle! In this basic case we'll change this heading to indicate when the user has completed the puzzle successfully:

```html
<h3>Status: { solutionFound }</h3>
```

## Utility functions

We'll be using two utility functions here:

- `parseSolutionSeedPhrase` which will take a completed crossword puzzle and place the answers in the proper order. (Ascending by number, across answers come before down ones.)
- `viewMethodOnContract` makes the view-only call to the smart contract to retrieve the solution hash.

We'll only focus on the second method:

```js
export async function viewMethodOnContract(nearConfig, method) {
  const provider = new nearAPI.providers.JsonRpcProvider(nearConfig.nodeUrl);
  const rawResult = await provider.query(
    `call/${nearConfig.contractName}/${method}`,
    "AQ4"
  ); // Base 58 of '{}'
  return JSON.parse(
    rawResult.result.map((x) => String.fromCharCode(x)).join("")
  );
}
```

This API doesn't look warm and friendly yet. You caught us! We'd love some help to improve our API as [detailed in this issue](https://github.com/near/near-api-js/issues/612), but for now, this is a concise way to get data from a view-only method.

We haven't had the frontend call a mutable method for our project yet. We'll get into that in the coming chapters when we'll want to have a prize sent to the first person to solve the puzzle.

## Run the React app

Let's run our frontend on `testnet`! We won't add any new concepts at this point in the article, but note that the [near examples](https://near.dev) typically create an account for you automatically with a NodeJS command. We covered the important pattern of creating a subaccount and deploying the smart contract to it, so let's stick with that pattern as we start up our frontend.

```bash
# Go into the directory containing the AssemblyScript smart contract we've been working on
cd contract

# Build (for Windows it's build.bat)
yarn build

# Create fresh account if you wish, which is good practice
near delete crossword.friend.testnet friend.testnet
near create-account crossword.friend.testnet --masterAccount friend.testnet

# Deploy
near deploy crossword.friend.testnet --wasmFile contract/build/release/crossword-tutorial-chapter-1-as.wasm \
  --initFunction 'new' \
  --initArgs '{"solution": "69c2feb084439956193f4c21936025f14a5a5a78979d67ae34762e18a7206a0f"}'

# Return to the project root and start the React app
cd ..
env CONTRACT_NAME=crossword.friend.testnet npm run start
```

The last line sends the environment variable `CONTRACT_NAME` into the NodeJS script. This is picked up in the `config.js` file that's used to set up the contract account and network configuration:

```js
const CONTRACT_NAME =
  process.env.CONTRACT_NAME || "your-crossword-account.testnet";
```

After running the last command to start the React app, you'll be given a link to a local website, like `https://localhost:1234`. When you visit the site you'll see the simple frontend that interacts with our smart contract:

![Crossword puzzle frontend showing a filled out puzzle with clues on the right sidebar](./basics-final-frontend.png)

## Completed project

Here's the final code for this chapter:

> https://github.com/near-examples/crossword-tutorial-chapter-1-AS
