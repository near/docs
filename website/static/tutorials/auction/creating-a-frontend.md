---
id: creating-a-frontend
title: Creating a Frontend
---




Now that we have successfully created a contract, it's time to build a frontend to provide a user-friendly interface for interacting with it. Up until now, we have been using the CLI to send transactions and view the contract's state. However, frontends offer a more intuitive way for end users to interact with the contract. They can display all the relevant information in one place, allow users to make calls with a simple button click, and only require a wallet as a prerequisite.

---

## Frontend structure

Navigate to the auction frontend.

```bash
cd frotends/01-frontend
```

Here we have a simple Next.js frontend that we'll walk through to understand the basics of creating a frontend for a NEAR smart contract.

For starters, let's take a look at how the code in the frontend is structured by doing a quick overview of the important files.

| File                             | Description                                                                     |
|----------------------------------|---------------------------------------------------------------------------------|
| **_app.js**           | Responsible for rending the page, initiates the wallet object and adds it to global context  |
| **index.js**          | The main page where the project's components are loaded into and contains most of the logic for the application like viewing the state of the contract and logic for placing a bid |
| **near.js**           | Contains the wallet class that has methods to interact with the wallet and blockchain |
| **context.js**        | Holds the global context - the wallet object and the signed-in account ID - that can be accessed anywhere |
| **config.js**         | Specifies the account ID of the auction contract |
| **Navigation.jsx**    | A component that contains a button to sign users in and out of wallets |
| **Bid.jsx**           | A component allowing a user to make a bid |
| **LastBid.jsx**       | A component that displays the highest bid and when the highest bid will next refresh |
| **Timer.jsx**         | A component that shows how long till the auction is over, or, if over, displays a button to claim the auction and then states the auction is over 

---

## Specifying the contract

We have a config file that specifies the contract name of the auction that the frontend will interact with. There has been an example auction contract deployed and specified already but feel free to change the contract to your own auction contract you deployed.

<Language value="javascript" language="javascript" showSingleFName={true}>
    ```
export const AUCTION_CONTRACT = "basic-auction-example.testnet"; // Replace with your contract name
export const NetworkId = "testnet";
```
</Language>

---

## Setting up wallets

To be able to fully interact with the contract - send bids and claim the auction - you'll need a `wallet` to sign transactions. Wallets securely store your private keys and allow you to sign transactions without exposing your private key to the frontend. The wallet selector allows users to choose between a selection of wallets.

We abstract the wallet selector in our `near.js` file by exposing methods to complete various tasks. Feel free to [explore the file](https://github.com/near-examples/auctions-tutorial/blob/main/frontends/01-frontend/src/wallets/near.js) to understand fully how the wallet selector is implemented. 

The wallet object is initiated in the `app.js` file and its added to the global context along with the account that is signed in to make it easier to access anywhere in the application.

<Language value="javascript" language="javascript">
    ```
const wallet = new Wallet({ networkId: NetworkId });

export default function MyApp({ Component, pageProps }) {
  const [signedAccountId, setSignedAccountId] = useState('');

  useEffect(() => { wallet.startUp(setSignedAccountId) }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <Navigation />
      <Component {...pageProps} />
      <ToastContainer />
    </NearContext.Provider>
  );
}

```
    ```
import { createContext } from 'react';

/**
 * @typedef NearContext
 * @property {import('./wallets/near').Wallet} wallet Current wallet
 * @property {string} signedAccountId The AccountId of the signed user
 */

/** @type {import ('react').Context<NearContext>} */
export const NearContext = createContext({
  wallet: undefined,
  signedAccountId: ''
});
```
</Language>

:::tip Access keys

On NEAR, in additional to normal full access keys, we have `function-call access keys` that are given to applications to allow them to sign `non-payable` transactions on behalf of the user. This is so the wallet doesn't have to pop up for each non-critical transaction, improving the user experience. When creating the wallet object you can decide to create an access key for the application to use. However, in this example we opt out since the main function - `bid` - we'll be calling is `payable`.

You can read further about NEAR's key model [here](../../protocol/access-keys.md).

:::

We add a sign-in and sign-out button in the `navigation` component to call the respective methods in the `near.js` file.

<Language value="javascript" language="javascript">
    ```
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import { NearContext } from '@/context';
import NearLogo from '/public/near-logo.svg';

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => wallet.signIn);
      setLabel('Login');
    }
  }, [signedAccountId, wallet]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link href="/" passHref legacyBehavior>
          <Image priority src={NearLogo} alt="NEAR" width="30" height="24" className="d-inline-block align-text-top" />
        </Link>
        <div className='navbar-nav pt-1'>
          <button className="btn btn-secondary" onClick={action} > {label} </button>
        </div>
      </div>
    </nav>
  );
};
```
    ```
  /**
   * Displays a modal to login the user
   */
  signIn = async () => {
    const modal = setupModal(await this.selector, { contractId: this.createAccessKeyFor });
    modal.show();
  };

  /**
   * Logout the user
   */
  signOut = async () => {
    const selectedWallet = await (await this.selector).wallet();
    selectedWallet.signOut();
  };

```
</Language>

---

## Displaying the highest bid

To get the highest bid from the auction and who made it we call `get_highest_bid`. Since this function returns the highest bid in `yoctoNEAR` we divide by `10^24` to get the amount in NEAR. 

<Language value="javascript" language="javascript">
    ```
      const highestBidData = await wallet.viewMethod({
        contractId: AUCTION_CONTRACT,
        method: "get_highest_bid",
      });
      setHighestBid(highestBidData.bid / nearMultiplier)
      setHighestBidder(highestBidData.bidder)

```
    ```
  viewMethod = async ({ contractId, method, args = {} }) => {
    const url = `https://rpc.${this.networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url });

    let res = await provider.query({
      request_type: 'call_function',
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
      finality: 'optimistic',
    });
    return JSON.parse(Buffer.from(res.result).toString());
  };

```
</Language>

In the wallet file, you'll see that we make a query to the RPC provider, since we are not signing a transaction the wallet isn't required here. Here we are using https://rpc.testnet.near.org but note there are [many different providers available](../../api/rpc/providers.md). We are querying the RPC with optimistic finality, which queries the latest block recorded on the node. Alternatively, one could use final finality where the block has been validated by at least 66% of the validators on the network but this will provide slightly delayed information (only by a couple of seconds).

We then pass the information about the highest bidder into the `LastBid` component to display the bid amount and the bidder's account Id.

<Language value="javascript" language="javascript">
    ```
        {!highestBidder ? <SkeletonBid /> : <LastBid lastBid={highestBid} highestBidder={highestBidder} lastUpdate={secondsRemaining}/>} 
      </div>
```
    ```
import styles from './LastBid.module.css';

const LastBid = ({lastBid, highestBidder, lastUpdate}) => {
  return (
    <div className={styles.priceSection}>
        <div className={styles.detail}>       
          <span className={styles.currentPrice}>The last bid was {lastBid} $NEAR </span>
        </div>
        <span>Made by {highestBidder} </span>
        <span>Refresh page in {lastUpdate}</span>
    </div>
  )
}

export default LastBid
```
</Language>

---

## Updating the highest bid

We want to know the highest bid at all times, someone else could have placed a higher bid since the page was loaded. To solve this we fetch the contract information every 20 seconds using `setInterval` and update the highest bid if it has changed. In reality you would want to refresh the bid amount more requently but for the sake of saving on RPC calls we are doing it every 20 seconds.

<Language value="javascript" language="javascript" showSingleFName={true}>
    ```
    const intervalId = setInterval(() => {
      getInfo();
      setSecondsRemaining(20);
    }, 20000);
    
    const countdownIntervalId = setInterval(() => {
      setSecondsRemaining(prev => (prev === 1 ? 20 : prev - 1));
    }, 1000);

  
    return () => {
      clearInterval(intervalId);
      clearInterval(countdownIntervalId);
    };
  }, []);
```
</Language>

---

## Auction end time

The contract stores the end time of the auction in the number of nanoseconds since the Unix epoch (1 January 1970 00:00:00 UTC). In our frontend we will display the time left in days, hours, minutes, and seconds.

<Language value="javascript" language="javascript" showSingleFName={true}>
    ```
  const [time, setTime] = useState((Number(endTime) / 10 ** 6) - Date.now());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const allSeconds = Math.floor(time / 1000);
    const days = Math.floor(allSeconds / (3600 * 24));
    const hours = Math.floor((allSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((allSeconds % 3600) / 60);
    const seconds = allSeconds % 60;

    return { allSeconds, days, hours, minutes, seconds };
  };

```
</Language>

---

## Making a bid

To make a bid we make a call to the contract using the `bid` function. We specify the deposit amount in `yoctoNEAR` which will be the bid amount. The input box will take the bid amount in NEAR so we multiply by `10^24` to get the correct amount to send. We also specify the amount of gas to attach to the transaction, here we are attaching 30Tgas which is more than enough for the transaction to go through, we are refunded any unused gas anyway.

Here, since the user is changing the state of the contract, not just viewing it, the user needs to sign the transaction. Thus the wallet will pop up displaying the transaction details.

<Language value="javascript" language="javascript">
    ```
    <main className={styles.main}>
      <div className={styles.leftPanel}>
      {!highestBid ? <SkeletonBid /> : <Bid pastBids={pastBids} lastBid={highestBid} action={bid}/>}
      </div>
      <div className={styles.rightPanel}>
        {!auctionEndTime ? <SkeletonTimer /> : <Timer endTime={auctionEndTime} claimed={claimed} action={claim}/>}
        {!highestBidder ? <SkeletonBid /> : <LastBid lastBid={highestBid} highestBidder={highestBidder} lastUpdate={secondsRemaining}/>} 
      </div>
    </main>

  );
}
```
    ```
  callMethod = async ({ contractId, method, args = {}, gas = THIRTY_TGAS, deposit = NO_DEPOSIT }) => {
    // Sign a transaction with the "FunctionCall" action
    const selectedWallet = await (await this.selector).wallet();
    const outcome = await selectedWallet.signAndSendTransaction({
      receiverId: contractId,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });

    return providers.getTransactionLastResult(outcome);
  };

```
</Language>

---

## Claiming the auction

Once the auction is over (the current time is greater than the end time) the auction can be claimed. At this point, the timer will be hidden and a button to claim the auction will be displayed. Once clicked the `claim` function will be called on the auction contract to send the highest bidder the NFT and the auctioneer the FTs.

<Language value="javascript" language="javascript" showSingleFName={true}>
    ```
  const claim = async () => {
    let response = await wallet.callMethod({
      contractId: AUCTION_CONTRACT,
      method: "claim",
      gas:"300000000000000"
    })
    return response
  }

```
</Language>

---

## Conclusion

In this part of the tutorial, we have implemented a simple frontend for a NEAR contract. Along the way, you have learned how to use the wallet selector to sign the user in and out, how to view the contract’s state, how to sign and send transactions.

While we can see the highest bid, we may want to see the auction's bidding history. Since the contract only stores the most recent bid (to reduce storage costs), we need to use an indexer to pull historical data. In the [next part](./2.2-indexing.md) of the tutorial, we'll look at querying historical data using an API endpoint.
