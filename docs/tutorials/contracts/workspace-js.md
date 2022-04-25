---
id: workspaces-js
title: Workspaces-JS tutorial
sidebar_label: Workspace-JS Tutorial
---

## Adding On-Chain Tests to near-examples/nft-tutorial

I've been looking into way to implement simulation/integration tests into the nft-tutorial repository from near-examples and was told to have a look at near/workspaces-js. I'm very happy I came across it as it's been manageable to implement and intuitive in its syntax. For the readers interested in the code feel free to browse around this PR.

I'll share some takeaways from my experience implementing this testing framework which I hope can help people reading (and me too since I'm sure there's plenty that can be done better!):

-    Mistakes I Made - configuring the project, assuming tests would run by default on testnet, discovering tests would run unreliably on testnet and data types/comparisons for amounts & gas fees. 

-   Code Structure - initializing the on-chain environment for your smart contracts and some test accounts for use in test cases, developing tests and some helper functions for redundant code. 

-    Fetching Data from Returned Promises - refactoring as more test cases are implemented and using call, call_raw and the test functions to assert output.

My Mistakes - Hope This Saves You Some Time! 

:::note
This post runs through an implementation of near-workspaces-ava which was a supported part of workspaces-js until its latest 2.0.0 release  
:::

## Configuring the Execution

I started by reading through the READMEs for workspaces-js and figured I could become acquainted with the testing folder/file structure by running npx near-workspaces-init on a blank project and browsing around the created files. This layout helped me understand how to structure my tests and it also came along with some handy READMEs. 

These READMEs advised a default config with a ava.config.cjs file, a ava.testnet.config.cjs file, a tsconfig.json file and of course a package.json. The package.json default would look like: 

```json
 {
  "private": true,
  "scripts": {
    "test": "near-workspaces-ava",
    "test:testnet": "near-workspaces-ava --config ./ava.testnet.config.cjs"
  },
  "devDependencies": {
    "near-workspaces-ava": "1.0.0"
  }
}
```

Although the second script above hints at tests running in testnet, running yarn test  will only run tests in sandbox (meaning locally on the machine executing this code). 😅

In order for the code to run as desired, I adapted the file to contain the following instead: 

```json
{
  "scripts": {
    "test:sandbox": "near-workspaces-ava --config ./ava.config.cjs --verbose --timeout=10m",
    "test:testnet": "near-workspaces-ava --config ./ava.testnet.config.cjs --verbose --timeout=10m",
    "test": "yarn test:sandbox && yarn test:testnet"
  },
  "devDependencies": {
    "near-workspaces-ava": "1.0.0",
    "ts-node": "^10.7.0"
  }
}
```

## Unreliable Testnet Runs

After running yarn test, I soon found out my sandbox tests were running as expected but every new run would yield different errors messages for testnet tests. This would depend on whether the tests had already run once or whether there were an arbitrary number of tests being run! 

You can read further about this topic in this issue here: Bug: KeyNotFound, but it's there · Issue #128 · near/workspaces-js (github.com). 

I decided to leave tesnet runs out of the CI pipeline in the meantime because of this unpredictable nature. 
Data Types/Comparisons for Amounts & Gas Fees

Amounts and fees are passed in general as yoctoNEAR to functions. I would pass my amounts in NEAR also as yoctoNEAR strings in the code as: 

```js
const ask_price = "300000000000000000000000";
```

However, a better approach for this would be to use the helpers present in the main JS libraries from near that allow you to perform these conversions easily. 

Also, I roughly compared balance changes after purchase/selling actions in these tests. I did this by comparing the first 3 significant figures of the yoctoNEAR balance_before and balance_after for the respective accounts. Not very neat! 

A better approach here would be to take the gas transaction costs into account and perform an exact comparison. 
Code Structure - Organizing the Project
General Layout 

```
/
/other_project_folders
/onchain_tests
  /__tests__
    utils.ava.ts <-- helper functions 
    tests.ava.ts <-- 
    workspace.ava.ts <-- init function
  ava.config.cjs
  ava.testnet.config.cjs
  tsconfig.json
  package.json
other_project_files...
```

The onchain_tests folder contains all integration tests triggered by JS code. It could also be included within a broader /tests folder with other JS unit tests to keep related things in one place.  
Workspace.init()

As nft-tutorial had two smart contracts, my initialization function would need to deploy both smart contracts to the chain to setup the testing environment. While coding this, I looked at the lib.rs files for both contract folders to see what function needed to be called (and with parameters) to initialize the contract once it is deployed. Here's what I ended up with:

```js
 import { Workspace } from "near-workspaces-ava";

export const workspace = Workspace.init(async ({ root }) => {
  const alice = await root.createAccount("alice");
  const bob = await root.createAccount("bob");
  const charlie = await root.createAccount("charlie");

  const nft_contract = await root.createAndDeploy(
    "nft-contract",
    "../out/main.wasm",
    {
      method: "new_default_meta",
      args: { owner_id: root },
    }
  );

  const market_contract = await root.createAndDeploy(
    "nft-market",
    "../out/market.wasm",
    {
      method: "new",
      args: { owner_id: root },
    }
  );

  return { alice, bob, charlie, nft_contract, market_contract };
});
workspace.test()
```

I started with the simple use cases of accounts `<>` single contract calls, like here this one (in test_contract.ava.ts):

```js
workspace.test(
  "nft contract: nft mint call",
  async (test, { nft_contract, alice }) => {
    const request_payload = {
      token_id: "TEST123",
      metadata: {
        title: "LEEROYYYMMMJENKINSSS",
        description: "Alright time's up, let's do this.",
        media:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Fhp4lHufCdTzTeGCAblOdgHaF7%26pid%3DApi&f=1",
      },
      receiver_id: alice,
    };
    await alice.call(
      nft_contract,
      "nft_mint",
      request_payload,
      defaultCallOptions()
    );

    const tokens = await nft_contract.view("nft_tokens");
    const expected = [
      {
        approved_account_ids: {},
        metadata: {
          copies: null,
          description: "Alright time's up, let's do this.",
          expires_at: null,
          extra: null,
          issued_at: null,
          media:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Fhp4lHufCdTzTeGCAblOdgHaF7%26pid%3DApi&f=1",
          media_hash: null,
          reference: null,
          reference_hash: null,
          starts_at: null,
          title: "LEEROYYYMMMJENKINSSS",
          updated_at: null,
        },
        owner_id: alice.accountId,
        royalty: {},
        token_id: "TEST123",
      },
    ];
    test.deepEqual(tokens, expected, "Expected to find one minted NFT");
  }
);
```

And coding further, I realized I'd use the same code repeatedly to mint an NFT so I refactored that piece and sent it to a utils.ts folder and imported to my testing module. I was able to use it in a more involved failing test for cross contract transfers (in test_cross_contract.ava.ts) like here:

```js
workspace.test(
  "cross contract: transfer NFT when listed on marketplace",
  async (test, { nft_contract, market_contract, alice, bob, charlie }) => {
    await mintNFT(alice, nft_contract);
    await payForStorage(alice, market_contract);

    const sale_price = "300000000000000000000000"; // sale price string in yoctoNEAR is 0.3 NEAR
    await placeNFTForSale(market_contract, alice, nft_contract, sale_price);

    await transferNFT(bob, market_contract, nft_contract);

    // purchase NFT
    const offer_payload = {
      nft_contract_id: nft_contract,
      token_id: "TEST123",
    };
    const result = await charlie.call_raw(
      market_contract,
      "offer",
      offer_payload,
      defaultCallOptions(
        DEFAULT_GAS + "0", // 10X default amount for XCC
        sale_price // Attached deposit must be greater than or equal to the current price
      )
    );

    // assert expectations
    // NFT has same owner
    const view_payload = {
      token_id: "TEST123",
    };
    const token_info = await nft_contract.view("nft_token", view_payload);
    test.is(
      token_info["owner_id"],
      bob.accountId, // NFT was transferred to bob
      "NFT should have bob as owner"
    );
    // Unauthorized error should be found
    test.regex(result.promiseErrorMessages.join("\n"), /Unauthorized+/);
  }
);
```

These helper functions such as mintNFT() ended up utils.ava.ts. 
Fetching Data from Returned Promises - Helpful for Failing Tests!

You can fetch data from smart contract calls in tests by using .call_raw() when performing the smart contract call instead of call - which is a wrapper around call_raw anyway. This should return a nested object which you can log with test.log(). call_raw is particularly helpful when seeking to extract errors from erroneous smart contract calls with message strings included! Here’s an example of a failing test I wrote making use of call_raw:

```js
workspace.test(
  "cross contract: transfer NFT when listed on marketplace",
  async (test, { nft_contract, market_contract, alice, bob, charlie }) => {
    await mintNFT(alice, nft_contract);
    await payForStorage(alice, market_contract);

    const sale_price = "300000000000000000000000"; // sale price string in yoctoNEAR is 0.3 NEAR
    await placeNFTForSale(market_contract, alice, nft_contract, sale_price);

    await transferNFT(bob, market_contract, nft_contract);

    // purchase NFT
    const offer_payload = {
      nft_contract_id: nft_contract,
      token_id: "TEST123",
    };
    const result = await charlie.call_raw(
      market_contract,
      "offer",
      offer_payload,
      defaultCallOptions(
        DEFAULT_GAS + "0", // 10X default amount for XCC
        sale_price // Attached deposit must be greater than or equal to the current price
      )
    );

    // assert expectations
    // NFT has same owner
    const view_payload = {
      token_id: "TEST123",
    };
    const token_info = await nft_contract.view("nft_token", view_payload);
    test.is(
      token_info["owner_id"],
      bob.accountId, // NFT was transferred to bob
      "NFT should have bob as owner"
    );
    // Unauthorized error should be found
    test.regex(result.promiseErrorMessages.join("\n"), /Unauthorized+/);
  }
);
```

## Wrapping Up

This walkthrough highlights how I’ve implemented workspaces-js with ava. The second major release of workspaces-js seeks to simplify the dependency tree of the repository, and become a pure JavaScript library. If you’re interested in how the syntax for this implementation looks like please check out the examples there: near/workspaces-js: Write tests once, run them both on NEAR TestNet and a controlled NEAR Sandbox local environment (github.com). 

Happy to hear anybody’s thoughts! You can find me and the DevRel team at Pagoda on NEAR’s Discord server in the #dev-support chat :wink: 

