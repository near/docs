---
description: >-
  The easiest way to get started is to skip installing everything on your local
  machine and just use our fully hosted IDE environment. We have a number of
  pre-built templates which you can use.
---

# Beginner: Build your first application in the NEAR Studio IDE



![](https://github.com/nearprotocol/NEARStudio/raw/master/demos/guest_book.gif)

The easiest way to get started is to skip installing everything on your local machine and just use our fully hosted IDE environment. We have a number of pre-built templates which you can use as starter apps.

To do this:

1. Go to [NEAR Studio](https://studio.nearprotocol.com) and select the "ToDo MVC" template.
2. Click "Run" to see the app running!

The app will open in a new window.

_Environment: The smart contract for this are deployed to the main TestNet while the front end is deployed to our hosted app.near.ai site._

**A few notes:**

* The code that runs on blockchain is in `assembly/main.ts` file.
* The JavaScript frontend code is in the `src/main.js` file.
* The UI markup is in `src/main.html file`.

Try changing any of these files. To see your changes, click the "Save" button, and then "Run" button.

**Useful interactions with Studio:**

* The **"Test"** button will run the JavaScript tests that are described in the `src/test.js` file.
* The **"Run"** button will deploy your front end \(the stuff in the `src/` folder\) to our hosted service on `app.near.ai/YOUR_UNIQUE_URL/`.  It's sort of like Github Pages.
  * Share the URL with someone else and they will be able to interact with your application. Make sure to remember the trailing `/`
* The **"Fork"** button will duplicate the existing code in a new page with a new URL. If you don't want to lose the old URL, copy/paste it somewhere.

## Try the block explorer / debugger

Once you have tested out the NEAR Studio IDE, check out the Block Explorer \(aka Debugger\).

Navigate to [https://studio.nearprotocol.com/debugger/](https://studio.nearprotocol.com/debugger/) in your browser to see information on specific blocks and transactions from those blocks. This is a useful tool when you are trying to debug your contracts.

Another very useful tool is to open up your console's JavaScript console, where you will be able to print logs and errors.
