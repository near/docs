---
id: blockvote-js
sidebar_label: BlockVote JS
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"


# BlockVote JS Edition

BlockVote JS Edition is a blockchain-based voting application built using JavaScript on the Near Protocol blockchain. The application allows users to securely cast their votes in an election and have them recorded on the blockchain, ensuring that the results are transparent and cannot be altered.

![image](/docs/assets/blockvote.png)

## Installation

To install BlockVote JS Edition, follow these steps please:

1. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/doriancrutcher/BlockVote-JS-Edition-Tutorial.git
```

2. Navigate to the project directory:

```bash
cd BlockVote-JS-Edition-Tutorial
```

3. Install the required dependencies using the following command:

```bash
yarn install-deps
```

4. Start the application:

```bash
yarn start
```

:::note

If you don't have `yarn` installed, you can install it by running `npm install -g yarn`.

:::

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

That's it! If you have any questions or issues while using the BlockVote JS Edition, feel free to open an issue on the [project's GitHub page](https://github.com/doriancrutcher/BlockVote-JS-Edition-Tutorial).

## Smart Contract

The contract contains several view and call methods that allow users to interact with the contract, including:

### View Methods

- `getUrl`: retrieves the URL link for a specific candidate based on the candidate's name and prompt.
- `didParticipate`: checks whether a specific user has participated in a given prompt.
- `participateArray`: retrieves the list of users who have participated in a given prompt.
- `getAllPrompts`: retrieves a list of all prompts currently available in the contract.
- `getVotes`: retrieves the vote tallies for a specific prompt.
- `getCandidatePair`: retrieves the names of the two candidates for a specific prompt.

<CodeTabs>
<Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts" 
            url="https://github.com/doriancrutcher/BlockVote-JS-Edition-Tutorial/blob/main/contract/src/contract.ts"
            start="20" end="60" />
  </Language>
</CodeTabs>

### Call Methods

- `addCandidatePair`: adds a candidate pair for a specific prompt to the contract's unordered map of candidate pairs.
- `initializeVotes`: initializes the vote tallies for a specific prompt
- `addToPromptArray`: adds a prompt to the contract's unordered set of prompts
- `clearPromptArray`: clears all prompts and associated data from the contract (candidate pairs, vote tallies, and user participation)
- `addVote`: casts a vote for a specific candidate in a prompt by updating the vote tally for that candidate in the contract's unordered map of vote tallies. The method takes in the prompt and the index of the candidate
- `recordUser`: records the participation of a user in a specific prompt by adding the user's account ID to an array in the contract's unordered map of user participation

<CodeTabs>
<Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts" 
            url="https://github.com/doriancrutcher/BlockVote-JS-Edition-Tutorial/blob/main/contract/src/contract.ts"
            start="61" end="110" />
  </Language>
</CodeTabs>

## Testing

When writing smart contracts, it is very important to test all methods exhaustively. In this project, you have two types of tests: unit tests and integration tests. Before digging into them, it's important to run the tests present in the dApp through the command `yarn test`.

### Unit Tests

Unit tests are designed to test individual functions and methods in the smart contract. These tests are run in isolation, meaning that they do not interact with other components of the system. The purpose of unit tests is to ensure that each individual function or method behaves as expected.

In this project, you can run the unit tests by executing the command `yarn test:unit`.

### Integration Tests

These tests are run to ensure that the different components of the system work together as expected. In the context of a smart contract, integration tests are used to test the interactions between the contract and the blockchain.

In this project, you can run the integration tests by executing the command `yarn test`.

These tests use a combination of `ava` and `near-workspaces`

<CodeTabs>
<Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts" 
            url="https://github.com/doriancrutcher/BlockVote-JS-Edition-Tutorial/blob/main/integration-tests/src/main.ava.ts"
            start="6" end="92" />
  </Language>
</CodeTabs>
