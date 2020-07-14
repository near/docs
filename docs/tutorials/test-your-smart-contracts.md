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

![space shuttle against starry sky](/docs/assets/spaceship-2.png)

**Let's get started!**

## Step 1 - Create a new Token Contract Project in Gitpod

> In a new browser tab or window
> - Open a new Token Contract Project in [Gitpod](https://gitpod.io/#https://github.com/near-examples/token-contract-as)

When this opens in GitPod, the code will generate a unique NEAR account for this project and build then deploy the template files. You can take a look at what we're starting with by clicking "Open Browser" to see the token example running.

This sample project has a token smart contract and also some JavaScript tests that invoke smart contract functions. There are two testing suites that perform these tests, AS-pect and Jest. 
  * Jest allows us to perform integration tests on NEAR's testnet network. 
  * AS-pect allows us to test our smart contract on a locally mocked network.

You can try running these tests right away to see the code interacting with the blockchain.

To run these tests...

> In Gitpod
> - click **Terminal** >> **New Terminal** 
>
> In the new tab that opens at the bottom of Gitpod
> - type `yarn test` in the command prompt

This will run both testing suites and log the results to your console. If you would like to run just one of the testing suites, you can type the following in your terminal.

- `yarn asp` to run only AS-pect tests
- `yarn jest` to run only Jest tests

Please explore the code in these tests to get a better understanding of the actions they perform. 
* AS-pect test files are located in `assembly/__tests__/example.spec.ts` & `token.spec.ts`

- The Jest test file is located in `src/test.js`

Once the testing suites are complete, your test results should look like this:

**AS-pect Test**
![Token Contract AS-pect test](/docs/assets/token-contract-aspect-test.png)

**Jest Test**
![Default Token Contract Test ](/docs/assets/default-token-contract-test.png)

Note that `test-account-XXXXXXXXX_tTIMESTAMP-XXXXXXX` is an automatically generated NEAR account for this particular project. Don't be distracted by these details, just compare the developer log output with the statements in the file `src/test.js`.

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

Next we'll need a `getMap` function, which returns the full state of the game \(we don't want to be making a separate call for every coordinate!\)

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

> - Click **File** >> **Save All** to save your changes


This smart contract is now ready to be re-deployed to the NEAR network, but before we do that, let's test it locally to be sure everything behaves as expected. This is where AS-pect comes in handy!

## Step 3 - Write a couple of tests for the contract

Lets test our code to make sure our smart contract works as expected by writing an AS-pect test in JavaScript.

First lets delete one of the old test files that will no longer work with our new smart contract.

> In Gitpod's explorer 
> - navigate to `assembly/__tests__/`
> - right click on `token.spec.ts` and click **Delete**
> - now click on `example.spec.ts` 
> - Replace the **entire contents of the file** with the following code

```js
import { getMap, setCoords } from "../main";

  describe("getMap", () => {
    it('gets the board state', () => {
       const viewResult = getMap();
       expect(viewResult.length).toBe(100); // board is 10 by 10
    })

  describe("setCoords", () => {
    it("modifies the board state", () => {
      
       setCoords("0,0", "111111")
       const viewResult = getMap();
       //you can send a log to the console by invoking the log() method 
       //log(viewResult[0]);
       expect(viewResult.length).toBe(100); 
       // entry 0,0 should be 111111!
       expect(viewResult[0]).toBe("111111");
    });
  });
});

```
> - Click **File** >> **Save** to save your changes

The "getMap" test simply invokes the `getMap` function of the contract and returns the current state. Our "setCoords" test will modify the game state by updating a coordinate of the map based on parameters we passed to the `setCoords` function.

***Now run your tests!***

> In your testing terminal
> - type `yarn asp`

Once finished, you should see passing tests that look like this:

![AS-pect tests for smart contract game](/docs/assets/token-contract-aspect-game-test.png)

## Step 4 - Make a simple UI

Congratulations! All of your blockchain work is done!

Now, lets make a very simple JavaScript user interface (UI). First, we'll need to initialize the pieces we will need so we can interact with the smart contract. Then we'll write a few functions that will allow us to interact with a canvas to save coordinates to the blockchain using the smart contract we wrote above.

> In the file `src/main.js`
> - Replace the values of `viewMethods` and `changeMethods` (lines 17 & 18) with our new smart contract methods.

```js
window.contract = await near.loadContract(nearConfig.contractName, {
  viewMethods: ["getMap"],        // <-- find this line and change it to match
  changeMethods: ["setCoords"],   // <-- find this line and change it to match
  sender: window.walletAccount.getAccountId()
});
```

Lets rename the sample application to match what we're working on. That way, when we log in via NEAR Wallet, we see a meaningful authentication request.

> In the file `src/main.js`
> - Change the name of the application on line 33

```js
// find this line and change it to match
walletAccount.requestSignIn(nearConfig.contractName, 'NEAR Place');
```

Next, lets add the NEAR Place application code.

> In the same file `src/main.js`
> - Append the following code to the bottom of the file
> - Review the code and comments to help you understand what's going on

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
Next, update the following block of code so our `loadBoardAndDraw` method gets invoked.

> In the same file `src/main.js`
> - Chain `.then(loadBoardAndDraw)` on line 43 and a half to hook into the application launch process

```js
window.nearInitPromise = connect()
  .then(updateUI)
  .then(loadBoardAndDraw)         // <-- insert this line in this location
  .catch(console.error);
```

Finally, we will need to add an event listener that will call our `handleCanvasClick` function when we interact with the canvas. Copy the code below and insert it right after the other two `document.querySelector` code blocks (line 41 and a half).

```js
document.querySelector('#myCanvas').addEventListener('click', (event) => {
  handleCanvasClick(event);
});
```

Almost done!  All we have left is to update our HTML file to render everything as expected.

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

Alright!  Let's launch our app and start drawing on the blockchain!

> In Gitpod
> - go to the first terminal tab that has your running server
> - `CMD + click` on `http://localhost:1234`

**See the screenshots below as a preview**

This is what the app looks like as soon as it launches
![NEAR Place webpage on launch](/docs/assets/near-place-webpage-on-launch.png)

And if you open the JavaScript developer console you'll see this (open before the page loads, or refresh the page to see this)
![NEAR Place JavaScript developer console on launch](/docs/assets/near-place-console-on-launch.png)

And finally drawing after you sign in to the NEAR Wallet
![NEAR Place drawing after sign in](/docs/assets/near-place-drawing-after-sign-in.png)
