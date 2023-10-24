---
id: bos-ethersjs-best-practices
title: BOS for Ethereum developers
---

import {WidgetEditor} from "@site/src/components/social-widget"

In this example, we will create an application on BOS that functions as a portfolio manager, displaying the current balances for a list of tokens. Additionally, we will display current market value of each asset in the portfolio.

We will be using several technologies:
- BOS for displaying the user interface (UI).
- Ethers.js for retrieving balance data from the blockchain.
- CoinGecko for fetching static content with information about tokens and their current prices.
- Social-DB for storing the list of tokens to be tracked.
- GitHub Actions for caching static content, speeding up loading, and circumventing rate limits.

## Step 1: Load balances from chain

Let's start with a simple example and consider an application where we want to display a user's balances for multiple tokens.

### Source code

```jsx
// Load current sender address if it was not loaded yet
if (state.sender == undefined && Ethers.provider()) {
  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length) {
        // save sender address to the state
        State.update({ sender: accounts[0] });
      }
    });
}

// Load ERC20 ABI JSON
const erc20Abi = fetch(
  "https://ipfs.near.social/ipfs/bafkreifgw34kutqcnusv4yyv7gjscshc5jhrzw7up7pdabsuoxfhlnckrq"
);
if (!erc20Abi.ok) {
  return "Loading";
}

// Create contract interface
const iface = new ethers.utils.Interface(erc20Abi.body);

// specify list of tokens
const tokens = [
  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
  "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
  "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // UNI
];

// load receiver's balance for a giver token
const getTokenBalance = (receiver, tokenId) => {
  // encode `balanceOf` request
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  // send request to the network
  return Ethers.provider()
    .call({
      to: tokenId,
      data: encodedData,
    })
    .then((rawBalance) => {
      // decode responce
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex).toFixed(0);
    });
};

const loadTokensData = () => {
  // load balances of all tokens
  tokens.map((tokenId) => {
    getTokenBalance(state.sender, tokenId).then((value) => {
      // save balance of every token to the state
      State.update({ [tokenId]: { balance: value, ...state[tokenId] } });
    });
  });
};

const renderToken = (tokenId) => (
  <li>
    {tokenId}: {state[tokenId].balance}
  </li>
);

if (state.sender) {
  loadTokensData();

  return (
    <>
      <ul>{tokens.map((tokenId) => renderToken(tokenId))}</ul>
      <p>Your account: {state.sender} </p>
    </>
  );
} else {
  // output connect button
  return <Web3Connect />;
}
```

You can see how it works here: [step_1](https://near.social/mob.near/widget/WidgetSource?src=zavodil.near/widget/token-balances-step-1).

After the web3 connection enabled, output will be like this:

```
0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599: 726220
0x6b175474e89094c44da98b954eedeac495271d0f: 140325040242585301886
0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984: 127732731780832810
```

## Step 2: Load static data


To format the list, we must determine the decimal precision for each asset. While it's possible to retrieve this information from the ERC-20 contract for each token, it's important to note that the ERC-20 contract lacks certain valuable data such as the token icon and description. As a solution, we can leverage the CoinGecko API to retrieve token details, including the current market price.

Let's add a function to load token data for a given token from the Coingecko:

```jsx
const loadCoingeckData = (tokenId) => {
    let dataUrl = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${tokenId}`;

    const data = fetch(dataUrl);
    if (data.ok) {
        return {
            name: data.body.name,
            icon: data.body.image.small,
            decimals: data.body.detail_platforms["ethereum"].decimal_place,
            price: Number(data.body.market_data.current_price.usd),
        };
    }
};
```

Other available API methods are listed in the [Coingecko API documentation](https://www.coingecko.com/en/api).

Now, when we have a data, lets update the `loadTokensData` function to store the token data in the state:

```jsx
const loadTokensData = () => {
  // load balances of all tokens
  tokens.map((tokenId) => {
    getTokenBalance(state.sender, tokenId).then((value) => {
      // save balance of every token to the state
      State.update({ [tokenId]: { balance: value, ...state[tokenId] } });
    });
  });

  tokens.map((tokenId) => {
    const tokenData = loadCoingeckData(tokenId);
    // save balance of every token to the state
    State.update({ [tokenId]: { ...tokenData, ...state[tokenId] } });
  });
};
```

And lets update the `renderToken` function to display data we just got:

```jsx 
const renderToken = (tokenId) => {
  const tokenBalance = Big(state[tokenId].balance ?? 0)
    .div(new Big(10).pow(state[tokenId].decimals ?? 1))
    .toFixed(4);
  const tokenBalanceUSD = (tokenBalance * state[tokenId].price).toFixed(2);
  return (
    <li>
      {state[tokenId].name}: {tokenBalance}{" "}
      <img src={state[tokenId].icon} width="16" alt={state[tokenId].symbol} />
      {`(${tokenBalanceUSD} USD)`}
    </li>
  );
};
```

You can see how it works here: [step_2](https://near.social/mob.near/widget/WidgetSource?src=zavodil.near/widget/token-balances-step-2).

Output will be like this:
```
Wrapped Bitcoin: 0.0073 wbtc (247.64 USD)
Dai: 140.3250 dai (140.21 USD)
Uniswap: 0.1277 uni (0.54 USD)
```

## Step 3. Save data in social-db

Now, let's move the list of tokens hardcoded in the application code to a dedicated onchain data storage called `social-db`. This way, we can modify the list of tokens available for tracking without the need to change the application code, adding flexibility for users to choose from existing token lists or create their own.

More about how key-value storage [social-db](https://github.com/NearSocial/social-db/blob/master/README.md) workd.

Here is an example of a simple application for [setting tokens list in social-db](https://near.social/mob.near/widget/WidgetSource?src=zavodil.near/widget/tokens-db). 

In this format, the data from the example will be stored in social-db.

```
{
"0x6b175474e89094c44da98b954eedeac495271d0f": "",
"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": "",
"0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": ""
}
```


Viewing this data from the blockchain is accessible, for example, through an [Explorer](https://near.social/zavodil.near/widget/Explorer?path=zavodil.near/tokens-db/**) application.

Let's add a function to our application that will read the list of tokens.

```jsx
// set list of tokens
if (!state.tokensLoaded) {
    // load tokens list from the Social DB
    const tokens = Social.get(`zavodil.near/tokens-db/*`, "final");

    if (tokens) {
        State.update({
            tokensLoaded: true,
            tokens,
        });
    }
}

const tokens = Object.keys(state.tokens ?? {});
```

You can see how it works here: [step_3](https://near.social/mob.near/widget/WidgetSource?src=zavodil.near/widget/token-balances-step-3). The output of the data in the application remains unchanged, but now it no longer contains hardcoded values.

## Step 4. Caching Data Through GitHub Actions

Applications for Ethereum often rely on sources of static content to display information about tokens or contracts. Many frontends fetch this data from services like CoinGecko or CoinMarketCap using API keys to increase the rate limit for data retrieval. Without API keys and with a large amount of data, loading from these services can take a long time or be interrupted. We will demonstrate a serverless example using GitHub Actions that won't compromise the decentralized structure of BOS gateways (where storing API keys is not possible) while still maintaining user convenience and data loading speed.

Let's create a Node.js application that will iterate through a list of tokens from `social-db` and display the retrieved data along with a timestamp of the operation.

```js
import * as nearAPI from "near-api-js";
import * as cg from "coingecko-api-v3";

const CONTRACT_ID = "social.near";
const ETHEREUM_NETWORK_ID = "ethereum";
const FETCH_TIMEOUT = 7000;

async function connect() {
    const config = {
        networkId: "mainnet",
        keyStore: new nearAPI.keyStores.InMemoryKeyStore(),
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
    };
    const near = await nearAPI.connect(config);
    const account = await near.account(CONTRACT_ID);

    const contract = new nearAPI.Contract(
        account, // the account object that is connecting
        CONTRACT_ID, // name of contract you're connecting to
        {
            viewMethods: ["get"], // view methods do not change state but usually return a value
            changeMethods: [], // change methods modify state
            sender: account, // account object to initialize and sign transactions.
        }
    );

    return contract;
}

// load data from the social-db
const contract = await connect();
const data = await contract.get({ keys: ["zavodil.near/tokens-db/*"] });
const tokens = data["zavodil.near"]["tokens-db"];

// init coingecko client
const client = new cg.CoinGeckoClient({
    timeout: 5000,
    autoRetry: false,
});

let res = {};
for (let i = 0; i < Object.keys(tokens).length; i++) {
    const tokenId = Object.keys(tokens)[i];

    try {
        // load data from coingecko
        const data = await client.contract({
            id: ETHEREUM_NETWORK_ID,
            contract_address: tokenId,
        });
        // format output
        const tokenData = {
            name: data["name"],
            symbol: data["symbol"],
            icon: data["image"]?.["thumb"],
            decimals: data["detail_platforms"]?.[ETHEREUM_NETWORK_ID]?.["decimal_place"],
            price: data["market_data"]?.["current_price"]?.["usd"],
        };
        // store output
        res[tokenId] = tokenData;

        // add timeout to avoid rate limits
        await new Promise((resolve) => {
            setTimeout(resolve, FETCH_TIMEOUT);
        });
    } catch (ex) {
        console.error(tokenId, ex)
    }
}

// output results
console.log(
    JSON.stringify({
        timestamp: Date.now(),
        data: res,
    })
);

```

Example [of this code on a github](https://github.com/zavodil/tokens-db/),  you can clone the repository and modify the data retrieval request as needed.

Now, we can create a GitHub worker that will execute this script and save the data to a file named `tokens-db.json`. Here are the instructions for the worker:

```yml
name: Tokens Data Updater
on:
  workflow_dispatch:
  schedule:
    - cron:  '*/15 * * * *'

jobs:
  updateStats:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Prepare        
        uses: actions/setup-node@v3
        with:
            node-version: 16
      - run: npm i      
      - name: Tokens Data
        run: node load > tokens-db.json              
        env:
          EXPORT_MODE: CS
      - uses: EndBug/add-and-commit@v9 
        with: 
          author_name: "Tokens Data Updater"
          add: 'tokens-db.json --force'
          message: "Tokens Data fetching"
```

Don't forget to grant the worker the necessary permissions to add files to your repository (Open GitHub Repository: Settings->Actions->General)

The output of this worker will be the [tokens-db.json](https://raw.githubusercontent.com/zavodil/tokens-db/main/tokens-db.json) file which will be regularly updated with current data. You can easily add any private API keys required for bypassing rate limits in the worker.

Now, let's get back to the BOS application. We need to modify the code to read data from the cached file created by GitHub Actions instead of fetching it from CoinGecko every time.

To do this, we'll make changes to the `loadTokensData` function:

```jsx
const loadTokensData = () => {
    let cacheTokenData = {};
    // load data generated by github action
    const cachedData = fetch(
        `https://raw.githubusercontent.com/zavodil/tokens-db/main/tokens-db.json`
    );
    if (cachedData.ok) {
        const cache = JSON.parse(cachedData.body);
        const cacheDate = new Date(cache.timestamp);
        const timeDifference = Date.now() - cacheDate.getTime();
        if (timeDifference <= 30 * 60 * 1000) {  // use cached data if it is not outdated (30 min)
            cacheTokenData = cache.data;
        }

        tokens.map((tokenId) => {
            const tokenData = cacheTokenData.hasOwnProperty(tokenId)
                ? cacheTokenData?.[tokenId]
                : // load data from coingecko if we don't have cached data only
                loadCoingeckData(tokenId);
            // save balance of every token to the state
            State.update({ [tokenId]: { ...tokenData, ...state[tokenId] } });
        });
    }
};

```

You can see how it works here: [step_4](https://near.social/mob.near/widget/WidgetSource?src=zavodil.near/widget/token-balances-step-1). The output of the data in the application remains the same, but now it operates more efficiently.

