---
description: Let's walkthrough the NEAR Studio IDE to better understand its functionality.
---

# NEAR Studio IDE

The easiest way to get started is with our fully hosted IDE environment. We have a number of pre-built templates which you can use as starter apps.

## Create and run a project

1. Go to [NEAR Studio](https://studio.nearprotocol.com) and select the "Counter Smart Contract" template and then click "Create".
2. Click "Run" to see the app running!

The app will open in a new window.

_Environment: The smart contract for this are deployed to the main TestNet while the front end is deployed to our hosted app.near.ai site._

## Navigating the file structure

To better understand the project directory of a standard NEAR project, and to learn about the files you'll normally be editing, take a look at our [NEAR Project File Structure](file-structure.md) deep dive.

{% page-ref page="file-structure.md" %}

## Writing the smart contract

For documentation on how to get started writing and calling smart contract functions, take a look here:

{% page-ref page="../working-smart-contracts/" %}

## **Useful interactions with Studio**

* The **"Test"** button will run the JavaScript tests that are described in the `src/test.js` file.
* The **"Run"** button will deploy your front end \(everything in the `src/` folder\) to our hosted service on `app.near.ai/YOUR_UNIQUE_URL/`.  It's similar to Github Pages.
  * Share the URL with someone else and they will be able to interact with your application. Make sure to remember the trailing `/`
* The **"Fork"** button will duplicate the existing code in a new page with a new URL. If you don't want to lose the old URL, copy/paste it somewhere.

## Debugging your contract

Open up the JavaScript console to see print logs and errors.

**Coming Soon:** Our Block Explorer \(aka Debugger\) to help you debug your contracts.

