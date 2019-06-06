# NEAR Studio IDE Walkthrough

The easiest way to get started is with our fully hosted IDE environment. We have a number of pre-built templates which you can use as starter apps.

## Create and run a project

1. Go to [NEAR Studio](https://studio.nearprotocol.com) and select the "Counter Smart Contract" template and then click "Create".
2. Click "Run" to see the app running!

The app will open in a new window.

_Environment: The smart contract for this are deployed to the main TestNet while the front end is deployed to our hosted app.near.ai site._

## **Project Directory**

Let's look over the directory and introduce you to the main files you'll normally be interacting with. You can see a deep dive on the file structure [here](../working-smart-contracts/tour-of-a-near-dapp.md).

`assembly/main.ts` - This is where the smart contract code goes. Smart contracts are written in Typescript.

`assembly/near.ts` - If you're curious to learn how some of the internal functions work, look over this file. Most importantly, it defines the functions for reading + writing to global storage, as well as the context / information available to you for contract execution \(e.g. transaction sender, etc.\)

`assembly/model.ts` - Define the types you want to use in your smart contract here. _This file doesn't exist in this template, but you can see it in the other templates._

`src/index.html` - Basic layout for your front end

`src/main.js` - Wire the logic for your app here

`src/test.js` - For you to write tests

Try changing any of these files. To see your changes, click the "Save" button, and then "Run" button.

## **Useful interactions with Studio**

* The **"Test"** button will run the JavaScript tests that are described in the `src/test.js` file.
* The **"Run"** button will deploy your front end \(the stuff in the `src/` folder\) to our hosted service on `app.near.ai/YOUR_UNIQUE_URL/`.  It's sort of like Github Pages.
  * Share the URL with someone else and they will be able to interact with your application. Make sure to remember the trailing `/`
* The **"Fork"** button will duplicate the existing code in a new page with a new URL. If you don't want to lose the old URL, copy/paste it somewhere.

## Try the block explorer / debugger

Once you have tested out the NEAR Studio IDE, check out the Block Explorer \(aka Debugger\).

Navigate to [https://studio.nearprotocol.com/debugger/](https://studio.nearprotocol.com/debugger/) in your browser to see information on specific blocks and transactions from those blocks. This is a useful tool when you are trying to debug your contracts.

Another very useful tool is to open up your console's JavaScript console, where you will be able to print logs and errors.

