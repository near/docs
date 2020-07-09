---
id: test-your-smart-contracts
title: Test your smart contracts
sidebar_label: Testing smart contracts
---

## A multiplayer "Place" game with shared world state.

Multiplayer games share a single world that all players can affect. Let's build one!

This is commonly implemented by setting up a coordinate system which represents locations within the world. A simple key-value mapping stores the state of the world at a particular coordinate.

In this tutorial, we will write a very simple game with a shared world state. The world is represented as a square playing field and the only property that is available at each location is its 'color'. Some of you may recognize this as "place", which made its way around the Internet a while ago.

You can see
- a screenshot of a bigger version of this (contributed to by multiple people) below:

![spaceshuttle against starry sky](/docs/assets/spaceship-2.png)

**Let's get started!**

## Step 1 - Start a new project in NEAR Studio

> In a new browser tab or window
> - Open [NEAR Studio](https://near.dev)
>
> In the *Create New Project* screen that appears
> - Select **Token Smart Contract**
> - Click **Create**

![NEAR Studio launch screen with Token Smart Contract selected](/docs/assets/near-studio-launch-screen-token-smart-contract.png)

This sample project has a token smart contract and also some JavaScript tests that invoke smart contract functions. You can try running these tests right away to see the code interacting with the blockchain.

> In NEAR Studio
> - click **Test** to run the smart contract unit tests
>
> In the new tab that opens
> - open the JavaScript developer console to see the log output while the unit tests run

A new tab will open as the tests run using the typical Jasmine browser UI. Once finished, the tests running in your browser will appear like this:

![Jasmine tests running for Token Smart Contract](/docs/assets/jasmine-tests-for-token-smart-contract.png)

Note that `studio-XXXXXXXXX` here is an automatically generated NEAR account for this particular project in NEAR Studio and `studio-XXXXXXXXX_tTIMESTAMP` is another NEAR account generated for running the tests of this particular project.  Don't be distracted by these details, just compare the developer log output with the statements in the file `src/tests.js`.


```text
initialOwner: studio-XXXXXXXXX_tTIMESTAMP
balanceOf: studio-XXXXXXXXX
balanceOf: bob.near

transfer from: studio-XXXXXXXXX_tTIMESTAMP to: bob.near tokens: 100
balanceOf: studio-XXXXXXXXX_tTIMESTAMP
balanceOf: bob.near
balanceOf: studio-XXXXXXXXX_tTIMESTAMP
balanceOf: bob.near
balanceOf: eve.near

approve: eve.near tokens: 100
balanceOf: studio-XXXXXXXXX_tTIMESTAMP
balanceOf: bob.near
balanceOf: eve.near
balanceOf: studio-XXXXXXXXX_tTIMESTAMP
balanceOf: bob.near
balanceOf: eve.near
```

<blockquote class="warning">
<strong>heads up</strong><br><br>

We are not going to keep any of the code from this template. It's just there as a starting point.

</blockquote>

## Step 2 - Write a smart contract

In this simple game, we need to create only two actions:

1. View the world state: `getCoords`
2. Make changes to the state at particular coordinates: `setCoords`

In a more complex game with a large world, it is optimal to avoid returning the state of the entire world at once. Because our game is small and simple, we don't have to worry about this.

> In the file `assembly/main.ts`
> - Replace the **entire contents of the file** with the following code

```ts
//@nearfile
import { storage } from "near-sdk-as";

export function setCoords(coords: string, value: string): void {
  storage.setString(coords, value);
}

export function getCoords(coords: string): string {
  let result = storage.getString(coords);
  if(result) {
    return result;
  }

  return "";
}
```

*The single line comment //@nearfile is **necessary as the first line** as part of our build process.*



Next we'll need a `getMap` function, which returns the full state of the game \(we don't want to be making a separate call for every coordinate!\) Write this in underneath the previous block of code:

> In the file `assembly/main.ts`
> - Append the following code to the bottom

```ts
export function getMap(): string[] {
  let num_rows = 10;
  let num_cols = 10;
  let total_cells = num_rows * num_cols;
  var arrResult:string[] = new Array(total_cells);
  let i = 0;
  for (let row = 0; row < num_rows; row++) {
    for (let col = 0; col < num_cols; col++) {
      let cellEntry = storage.getString(row.toString() + "," + col.toString());
      if(cellEntry) {
        arrResult[i] = cellEntry;
      } else {
        arrResult[i] = "";
      }

      i++;
    }
  }
  return arrResult;
}
```

## Step 3 - Write a couple of tests for the contract

Before we do anything else we should test our code to make sure our smart contract works as expected.

We can test the contract right away by writing some code in JavaScript.

> In the file `src/test.js`
> - Replace the **entire contents of the file** with the following code
> - click **Test** to run and verify everything is working

```js
describe("NearPlace", function() {
  let contract;
  let accountId;

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  // Contains all the steps that are necessary to
  //    establish a connection with a dev instance
  //    of the blockchain.
  beforeAll(async function() {
    near = await nearApi.connect(nearConfig);
    accountId = nearConfig.contractName;
    contract = await near.loadContract(accountId, {
      // NOTE: This configuration only needed while NEAR is still in development
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: ["getMap"],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["setCoords"],
      sender: nearConfig.contractName
    });
    window.near = near;
  });

  describe("getMap", function() {
    it("can get the board state", async function() {
      const viewResult = await contract.getMap();
      expect(viewResult.length).toBe(100); // board is 10 by 10
    });
  });

  // ---> in the next step INSERT the setCoords "describe block" here <---
});
```

The getMap test simply invokes the getMap function of the contract.

Next, let's try to modify the game state.

> In the file `src/test.js`
> - Append the following `setCoords` "describe block" just after the `getMap` "block"
> - click **Test** to run and verify everything is working

```js
describe("setCoords", function() {
  it("modifies the board state", async function() {
    const setResult = await contract.setCoords({
      coords: "0,0",
      value: "111111"
    });
    console.log(setResult);
    const viewResult = await contract.getMap();
    expect(viewResult.length).toBe(100); // board is 10 by 10
    // entry 0,0 should be 111111!
    expect(viewResult[0]).toBe("111111")
  });
});
```

## Step 4 - Make a simple UI

All the blockchain work is done. Congratulations!

Let's make a very simple JavaScript user interface (UI). We'll initialize the pieces we need to interact with the smart contract, then we'll write a few functions that will allow us to interact with a canvas to save coordinates to the blockchain using the smart contract we wrote above.

> In the file `src/main.js`
> - Replace the values of `viewMethods` and `changeMethods` with our new smart contract methods.

```js
window.contract = await near.loadContract(nearConfig.contractName, {
  viewMethods: ["getMap"],        // <-- find this line and change it to match
  changeMethods: ["setCoords"],   // <-- find this line and change it to match
  sender: window.walletAccount.getAccountId()
});
```

Now let's rename the sample application to match what we're working on so that when we log in via NEAR Wallet we see a meaningful authentication request .


> In the file `src/main.js`
> - Change the name of the application

```js
// find this line and change it to match
walletAccount.requestSignIn(nearConfig.contractName, 'NEAR Place');
```

Almost done, we can add the NEAR Place application code.

> Also in the same file `src/main.js`
> - Insert the line indicated by comment below to hook into the application launch process

```js
window.nearInitPromise = connect()
  .then(updateUI)
  .then(loadBoardAndDraw)         // <-- insert this line in this location
  .catch(console.error);
```

> Also in the same file `src/nain.js`
> - Append the following code to the bottom of the file
> - Review the code and comments to make sure you understand what's going on

```js
// NEAR Place application Code

/**
 * initialize the board with empty colors
 */
function loadBoardAndDraw() {
  const board = getBoard().then(fullMap => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let i = 0;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let color = fullMap[i] || "000000";
        ctx.fillStyle = "#" + color;
        ctx.fillRect(x * 10, y * 10, 10, 10);
        i++;
      }
    }
  });
}

/**
 * handle a mouse click event on the canvas element
 * @param event the event raised by mouse click on the canvas
 */
function handleCanvasClick(event) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const position = getMousePosition(canvas, event);
  const x = Math.floor(position.x / 10);
  const y = Math.floor(position.y / 10);

  const coords = x + "," + y;
  const rgb = document.getElementById("picker").value;
  ctx.fillStyle = "#" + rgb;
  ctx.fillRect(x * 10, y * 10, 10, 10);

  console.log(`The point (${coords}) was set to color #${rgb}`);
  let args = {
    coords,
    value: rgb
  };
  window.contract.setCoords(args);
}

/**
 * capture the mouse position
 * @param canvas the canvas element on the page
 * @param event the event raised by mouse click on the canvas (see handleCanvasClick)
 */
function getMousePosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}


/**
 * get the map from the blockchain
 */
async function getBoard() {
  const result = await window.contract.getMap();

  renderBoard(result)
  return result;
}

/**
 * helper function to render the board to the developer console
 */
function renderBoard(board){

  console.log("\n\nThe NEAR Place board is currently stored on the blockchain as ...");
  console.table(array_chunks(board, 10)); // assuming rows are 10 wide

  // src: https://stackoverflow.com/questions/8495687/split-array-into-chunks#comment84212474_8495740
  function array_chunks(array, chunk_size){
    return Array(Math.ceil(array.length / chunk_size))
              .fill().map((_, index) => index * chunk_size)
              .map(begin => array.slice(begin, begin + chunk_size))
  }
}
```

As a last step, let's add the HTML to render everything as expected

> In the file `src/index.html`
> - Replace the **entire contents of the file** with the following code

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.0.4/jscolor.min.js"></script>
  <title>NEAR PLACE</title>
</head>
<body style="background: #fff">
  <div class="container">
    <div class="jumbotron">
      <h1>NEAR PLACE</h1>
      <p>Imagine drawing <b>forever</b> on the blockchain.</p>
    </div>

    <div class="sign-in" style="display: none;">
      <p>You'll need to sign in to call contract methods</p>
      <button class="btn btn-primary">Sign In</button>
    </div>

    <div class="after-sign-in" style="display: none;">
      <div align="center">
        <canvas
          id="myCanvas"
          width="100"
          height="100"
          onclick="handleCanvasClick(event)"
          style="border:1px solid #000000"></canvas>
        </canvas>
      </div>
      <div align="center">
        <input class="jscolor" id="picker" value="ab2567"/>
      </div>
    </div>
    <div class="after-sign-in sign-out" style="display: none;">
      <button class="btn btn-primary">Sign Out</button>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/gh/nearprotocol/near-api-js/dist/near-api-js.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
  <script src="./config.js"></script>
  <script src="./main.js"></script>
</body>
</html>
```

That's it.

> In NEAR Studio
> - click the **Run** button to see your new application

**See the screenshots below as a preview**

This is what the app looks like as soon as it launches
![NEAR Place webpage on launch](/docs/assets/near-place-webpage-on-launch.png)

And if you open the JavaScript developer console you'll see this (open before the page loads, or refresh the page to see this)
![NEAR Place JavaScript developer console on launch](/docs/assets/near-place-console-on-launch.png)

And finally drawing after you sign in to the NEAR Wallet
![NEAR Place drawing after sign in](/docs/assets/near-place-drawing-after-sign-in.png)
