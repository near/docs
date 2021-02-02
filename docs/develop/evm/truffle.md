---
id: truffle
title: Using Truffle with the EVM
sidebar_label: Using Truffle
---

[Truffle](https://trufflesuite.com/truffle) is a popular tool for EVM-based smart contract development and testing. A typical dApp using Truffle will have a file called `truffle-config.js` in the project root specifying details on connection, compilation, networks, and so on.

NEAR has a custom provider called [`near-web3-provider`](https://github.com/near/near-web3-provider) that can be specified in Truffle configuration. It's published as an [NPM package](https://npmjs.com/package/near-web3-provider) and can be added with:

    npm install near-web3-provider --save-dev

**Note**: you may also use `near-web3-provider` as the provider on the frontend, in which case the proper flag is `--save` instead of `--save-dev`.

## Example `truffle-config.js` for NEAR

```js
const { NearProvider } = require('near-web3-provider');

module.exports = {
  networks: {
    near_local: {
      network_id: "*",
      skipDryRun: true,
      provider: () => new NearProvider({
        networkId: 'local',
        masterAccountId: 'test.near',
      }),
    },
    near_betanet: {
      network_id: "*",
      skipDryRun: true,
      provider: () => new NearProvider({
        networkId: 'betanet',
        masterAccountId: process.env.NEAR_MASTER_ACCOUNT
      }),
    },
    near_testnet: {
      network_id: "*",
      skipDryRun: true,
      provider: () => new NearProvider({
        networkId: 'testnet',
        masterAccountId: process.env.NEAR_MASTER_ACCOUNT
      }),
    },
    near_mainnet: {
      network_id: 1313161554, // See https://chainid.network
      skipDryRun: true,
      provider: () => new NearProvider({
        networkId: 'mainnet',
        masterAccountId: process.env.NEAR_MASTER_ACCOUNT
      }),
    },
    develop: {
      host: "127.0.0.1",
      network_id: "*",
      port: 8545
    }
  }
};
```

To see an example of this in a project, see the [NEAR Pet Shop example](https://github.com/near-examples/near-pet-shop/blob/master/truffle-config.js).

## Testing

At this time, tests run using an existing account on the network. For example, if a user is going to test on betanet, they would first create a betanet account at:

https://wallet.betanet.near.org

Then use [NEAR CLI](/docs/development/near-cli) to login to that account, which creates a full-access key file in their home directory. (Specifically `~/.near-credentials`.) Now tools and libraries like NEAR CLI and [`near-api-js`](https://github.com/near/near-api-js) can utilize these keys for actions including deploying contracts, transferring Ⓝ, creating subaccounts, etc. (See all available [Actions here](https://nomicon.io/RuntimeSpec/Actions.html).) The accounts created for testing are subaccounts (ex. `subaccount.yourname.betanet` created from `yourname.betanet`)

With the account stored in a file locally, we will first create the necessary test accounts, then run the tests.
 
Create test accounts (on betanet in the following example) with:

    NEAR_ENV=betanet near evm-dev-init yourname.betanet
    
This will create (a default of 5) test subaccounts that will be located in `~/.near-credentials/betanet`.

**Note**: at the time of this writing, the number of test accounts created will be just enough such that there are a total of 5 accounts if there are less than that.

Then run the tests with:

    env NEAR_MASTER_ACCOUNT=yourname.betanet npx truffle test --network near_betanet

## Build and deploy

Truffle's [`migrate`](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations#command) command will build the contracts and deploy them to the specified network. The migration files are typically stored in a directory named `migrations` in the project root. To build and deploy a project to betanet, the command would be:

    env NEAR_MASTER_ACCOUNT=yourname.betanet npx truffle migrate --network near_betanet

This will output logs including a table like this:

```shell script
Deploying 'Adoption'
--------------------
> transaction hash:    FHo73dk5n1LujaGwHchrXMHzRBHz88aCNWex1kiLrC57:mike.betanet
> Blocks: 0            Seconds: 0
> contract address:    0xAdf11a39283CEB00DEB90a5cE9220F89c6C27E67
> block number:        3689031
> block timestamp:     1607882742969
> account:             0xb948c53cBA274D77e54109061068512e92d1249d
> balance:             0
> gas used:            2293234665220 (0x215ef700704)
> gas price:           0.1 gwei
> value sent:          0 ETH
> total cost:          229.323466522 ETH
```

Three things to note:
1. The **contract address** is the Ethereum address where this contract is deployed.
2. The **total cost** is not accurate at this time.
3. The **account** is an Ethereum address based on a NEAR account. In this case, it's the result of `near-web3-provider`'s utility function `nearAccountToEvmAddress()`.

Using the [REPL of NodeJS](https://nodejs.dev/learn/how-to-use-the-nodejs-repl), we can see this:

```shell script
mike@near ~/near-web3-provider/src $ node
Welcome to Node.js v12.18.4.
Type ".help" for more information.
> const utils = require('./utils');
> utils.nearAccountToEvmAddress('mike.betanet');
'0xb948c53cba274d77e54109061068512e92d1249d'
```

## Troubleshooting

If the NEAR CLI commands give the message:

`Found account <yourname>.<network> is not available on the network`

Please check that all the files located in `~/.near-credentials/<network>` are associated with working accounts. 

To check if an account exists on the network, use the `state` command on NEAR CLI.

    near state mightexist.betanet
    
If it doesn't exist (anymore or ever) it will output:

>Account **yourname.network** is not found in **network** 

Errant or outdated key files can be safely deleted.
