# BlockVote JS Edition

BlockVote JS Edition is a blockchain-based voting application built using JavaScript on the Near Protocol blockchain. The application allows users to securely cast their votes in an election and have them recorded on the blockchain, ensuring that the results are transparent and cannot be altered.

<p align="center"><img src="https://i.imgur.com/spJWhBf.png"></p>

## Installation

To install BlockVote JS Edition, follow these steps please:

1. Clone the repository to your local machine using the following command:

```bash=
git clone https://github.com/doriancrutcher/BlockVote-JS-Edition-Tutorial.git
```

2. Navigate to the project directory:

```bash=
cd BlockVote-JS-Edition-Tutorial
```

3. Install the required dependencies using the following command:

```bash=
yarn install-deps
```

4. Start the application:

```bash=
yarn start
```

Note: If you don't have yarn installed, you can install it by running npm install -g yarn.

## Usage

This application allows users to create a poll with two candidates, and each user can only vote in a poll once. Results are shown after the vote is cast.

To create a poll, follow these steps:

1. Enter the names and URL links for the two candidates in the input fields.
2. Click on the "Create Poll" button to create the poll.
3. Share the poll link with others to allow them to vote.

To vote in a poll, follow these steps:

1. Click on the name of the candidate you want to vote for.
2. You will only be able to vote once in each poll.
3. After you vote, the poll results will be displayed on the screen.

That's it! If you have any questions or issues while using the BlockVote JS Edition, feel free to open an issue on the project's GitHub page.

## Smart Contract

# Smart Contract for Voting Application

The contract contains several view and call methods that allow users to interact with the contract, including:

View Methods:

- `getUrl`: retrieves the URL link for a specific candidate based on the candidate's name and prompt.
- `didParticipate`: checks whether a specific user has participated in a given prompt.
- `participateArray`: retrieves the list of users who have participated in a given prompt.
- `getAllPrompts`: retrieves a list of all prompts currently available in the contract.
- `getVotes`: retrieves the vote tallies for a specific prompt.
- `getCandidatePair`: retrieves the names of the two candidates for a specific prompt.

Call Methods:

- `addCandidatePair`: adds a candidate pair for a specific prompt
- `initializeVotes`: initializes the vote tallies for a specific prompt
- `addToPromptArray`: adds a prompt to the contract
- `clearPromptArray`: clears all prompts and associated data from the contract
- `addVote`: casts a vote for a specific candidate in a prompt
- `recordUser`: records the participation of a user in a specific prompt

```javascript
{
  NearBindgen,
  near,
  call,
  view,
  LookupMap,
  UnorderedSet,
  UnorderedMap,
} from "near-sdk-js";

@NearBindgen({})
class VotingContract {
  // Candidate Pair Used to store Candidate Names and URL links
  candidatePair = new UnorderedMap<string[]>("candidate_pair");
  // Prompt Set Was used to in an effort to keep track of keys for the candidatePair Unordered Map
  promptSet = new UnorderedSet<string>("promptArray");
  voteArray = new UnorderedMap<number[]>("voteArray");
  userParticipation = new UnorderedMap<string[]>("user Participation ");

  // Writing View Methods

// retrieves the URL link for a specific candidate based on the candidate's name and prompt.
  @view({})
  getUrl({ prompt, name }: { prompt: string; name: string }): string {
    near.log(prompt);
    let candidateUrlArray = this.candidatePair.get(prompt);
    return candidateUrlArray[candidateUrlArray.indexOf(name) + 1];
  }

// checks whether a specific user has participated in a given prompt.
  @view({})
  didParticipate({ prompt, user }: { prompt: string; user: string }): boolean {
    let promptUserList: string[] = this.userParticipation.get(prompt, {
      defaultValue: [],
    });
    near.log(promptUserList);
    return promptUserList.includes(user);
  }

//retrieves the list of users who have participated in a given prompt.
  @view({})
  participateArray({ prompt }: { prompt: string }): string[] {
    return this.userParticipation.get(prompt);
  }

//retrieves a list of all prompts currently available in the contract.

  @view({})
  getAllPrompts(): string[] {
    return this.promptSet.toArray();
  }

//retrieves the vote tallies for a specific prompt.
  @view({})
  getVotes({ prompt }: { prompt: string }): number[] {
    return this.voteArray.get(prompt, { defaultValue: [] });
  }

//retrieves the names of the two candidates for a specific prompt.
  @view({})
  getCandidatePair({ prompt }: { prompt: string }): string[] {
    let candidateUrlArray = this.candidatePair.get(prompt, {
      defaultValue: ["n/a,n/a"],
    });
    return [candidateUrlArray[0], candidateUrlArray[2]];
  }


// Call Methods

// Adds a candidate pair with their Urls for a specific prompt to the contract's unordered map of candidate pairs.
  @call({})
  addCandidatePair({
    prompt,
    name1,
    name2,
    url1,
    url2,
  }: {
    prompt: string;
    name1: string;
    name2: string;
    url1: string;
    url2: string;
  }) {
    this.candidatePair.set(prompt, [name1, url1, name2, url2]);
  }

// initializes the vote tallies for a specific prompt
  @call({})
  initializeVotes({ prompt }: { prompt: string }) {
    this.voteArray.set(prompt, [0, 0]);
  }

// Adds a prompt to the contract's unordered set of prompts.
  @call({})
  addToPromptArray({ prompt }: { prompt: string }) {
    this.promptSet.set(prompt);
  }

//clears all prompts and associated data (candidate pairs, vote tallies, and user participation)
  @call({})
  clearPromptArray() {
    this.promptSet.clear();
    this.candidatePair.clear();
    this.userParticipation.clear();
    this.voteArray.clear();
    near.log("clearing polls");
  }


// casts a vote for a specific candidate in a prompt by updating the vote tally for that candidate in the contract's unordered map of vote tallies. The method takes in the prompt and the index of the candidate being voted for.
  @call({})
  addVote({ prompt, index }: { prompt: string; index: number }) {
    let currentVotes = this.voteArray.get(prompt, { defaultValue: [0, 0] });
    currentVotes[index] = currentVotes[index] + 1;
    this.voteArray.set(prompt, currentVotes);
  }


records the participation of a user in a specific prompt by adding the user's account ID to an array in the contract's unordered map of user participation.
  @call({})
  recordUser({ prompt, user }: { prompt: string; user: string }) {
    let currentArray = this.userParticipation.get(prompt, { defaultValue: [] });
    currentArray.includes(user) ? null : currentArray.push(user);
    this.userParticipation.set(prompt, currentArray);
  }
}

```

# Testing

When writing smart contracts, it is very important to test all methods exhaustively. In this project, you have two types of tests: unit tests and integration tests. Before digging into them, it's important to run the tests present in the dApp through the command `yarn test`.

## Unit Tests

Unit tests are designed to test individual functions and methods in the smart contract. These tests are run in isolation, meaning that they do not interact with other components of the system. The purpose of unit tests is to ensure that each individual function or method behaves as expected.

In this project, you can run the unit tests by executing the command `yarn test:unit`.

## Integration Tests

These tests are run to ensure that the different components of the system work together as expected. In the context of a smart contract, integration tests are used to test the interactions between the contract and the blockchain.

In this project, you can run the integration tests by executing the command `yarn test`.

These tests use a combination of `ava` and `near-workspaces`

```javascript
// imports
// worker - lets me make a sandbox instance for deployment and testing operations
// nearAccount - lets me create and manage test accounts

// anyTest and TestFn let me define  and run test in ava
import { Worker, NearAccount } from "near-workspaces";
import anyTest, { TestFn } from "ava";

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

let promptVal: string;
let can1: string;
let can2: string;
let url1: string;
let url2: string;

// things to be done before the test begin
test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  //Set Variable Values
  promptVal = "testPoll";
  can1 = "Pencil";
  can2 = "Pen";
  url1 = "url1";
  url2 = "url2";

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount("test-account");
  // Get wasm file path from package.json test script in folder above
  await contract.deploy(process.argv[2]);

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to stop the Sandbox:", error);
  });
});

test("initializes new vote array for a given prompt", async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, "initializeVotes", { prompt: promptVal });
  const poll = await contract.view("getVotes", { prompt: promptVal });
  t.deepEqual(poll, [0, 0], "Vote array not initialized properly");
});

test("add candidate pair for the given prompt ", async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, "addCandidatePair", {
    prompt: promptVal,
    name1: can1,
    name2: can2,
    url1: url1,
    url2: url2,
  });
  const candidatePairVal = await contract.view("getCandidatePair", {
    prompt: promptVal,
  });
  t.deepEqual(
    candidatePairVal,
    [can1, can2],
    "Incorrect Candidate Pair retreived"
  );
});

test("add a vote to the given prompt and check user participation", async (t) => {
  const { root, contract } = t.context.accounts;

  // Add vote
  await root.call(contract, "addVote", { prompt: promptVal, index: 0 });
  const votes = await contract.view("getVotes", { prompt: promptVal });
  t.deepEqual(votes, [1, 0], "Vote not added properly");

  // Check user participation
  const user = "user1";
  await root.call(contract, "recordUser", { prompt: promptVal, user });
  const participated = await contract.view("didParticipate", {
    prompt: promptVal,
    user,
  });
  t.true(participated, "User participation not recorded properly");
});

```
