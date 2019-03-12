---
name: A multiplayer "Place" game
route: /tutorials/multiplayergame
menu: Tutorials
---

# A multiplayer "Place" game with shared world state.

Multiplayer games share a single world that all players can affect. Let's build one!

This is commonly implemented by setting up a coordinate system which represents locations within the world. A simple key-value mapping stores the state of the world at a particular coordinate.

In this tutorial, we will write a very simple game with a shared world state. The world is represented as a square playing field and the only property that is available at each location is its 'color'. Some of you may recognize this as "place", which made its way around the Internet a while ago.

See and play with a working solution here: [https://studio.nearprotocol.com/?f=fnpeopb37&quickstart](https://studio.nearprotocol.com/?f=fnpeopb37&quickstart)

You can see a screenshot of this \(which has obviously been contributed to by many people\) below:

![](../.gitbook/assets/near_place_screenshot.png)

## Step 1 - Start a new project in NEARstudio

Go to [https://studio.nearprotocol.com/](https://studio.nearprotocol.com/) and start a new project by selecting "Token Smart Contract" and click "Create".

![](../.gitbook/assets/screen-shot-2019-03-11-at-4.36.34-pm.png)

This sample project has a token smart contract \(i.e. code that runs on blockchain\) and also some JavaScript tests that invoke smart contract functions.

You can try running these tests right away to see the code interacting with the blockchain by clicking "Test". It should open a new window and show the test results using the standard Jasmine browser UI.

**We are not going to keep any of the code from this template.** It's just there as a starting point.

## Step 2 - Write a smart contract

In this simple game, we need to create only two actions:

1. View the world state: `getCoords`
2. Make changes to the state at particular coordinates: `setCoords`

In a more complex game with a large world, it is optimal to avoid returning the state of the entire world at once. Because our game is small and simple, we don't have to worry about this.

* Navigate to `assembly/main.ts`
* Delete everything that is there underneath the comment:  `// --- contract code goes below` 
* Implement the `setCoords` and `getCoords` functions using the `globalStorage` object's `setItem` and `getItem` functions:

```typescript
// assembly/main.ts
...
// --- contract code goes below
export function setCoords(coords: string, value: string): void {
  globalStorage.setItem(coords, value);
}

export function getCoords(coords: string): string {
  return globalStorage.getItem(coords);
}
```

* Finally, we'll need a `getMap` function, which returns the full state of the game \(we don't want to be making a separate call for every coordinate!\) Write this in underneath the previous block of code:

```typescript
// assembly/main.ts
...
export function getMap(): string[] {
  let num_rows = 10;
  let num_cols = 10;
  let total_cells = num_rows * num_cols;
  var arrResult:string[] = new Array(total_cells);
  let i = 0;
  for (let row=0; row<num_rows; row++) {
    for (let col=0; col<num_cols; col++) {
      let cellEntry = globalStorage.getItem(near.str(row) + "," + near.str(col));
      arrResult[i] = cellEntry;
      i++;
    }
  }
  return arrResult;
}
```

* Don't forget to save `main.ts` before moving on.

## Step 3 - Write a couple of tests for the contract

Before we do anything else we should test our code to make sure our smart contract works as expected.

We can test the contract right away by writing some code in JavaScript. Open `src/main.js` and modify it to call the functions that we just wrote.

* First, let's call `getMap`. It's a function which does not modify the state, so we can call it through a `callViewFunction` interface. 
* Replace the contents of `test.js` with the following, and then try running it by clicking "test".

```typescript
// src/test.js
...
function sleep(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  });
}

describe("NearPlace", function() {
  let contract;
  let accountId;

  // Contains all the steps that are necessary to
  //    establish a connection with a dev instance
  //    of the blockchain.
  beforeAll(async function() {
      const config = await nearlib.dev.getConfig();
      near = await nearlib.dev.connect();
      accountId = nearlib.dev.myAccountId;
      const url = new URL(window.location.href);
      config.contractName = url.searchParams.get("contractName");
      console.log("nearConfig", config);
      await sleep(1000);
      contract = await near.loadContract(config.contractName, {
        // NOTE: This configuration only needed while NEAR is still in development
        viewMethods: ["getMap"],
        changeMethods: ["setCoords"],
        sender: accountId
      });
  });

  describe("getMap", function() {
    it("can get the board state", async function() {
      const viewResult = await contract.getMap({});
      expect(viewResult.length).toBe(100); // board is 10 by 10
    });
  });
});
```

The getMap test simply invokes the getMap function of the contract. 

Note the syntax: `contract.getMap(args)`, where `args` is a JavaScript object containing the arguments. In this case, our function has no parameters, so we are passing an empty object.

Next, let's try to modify the game state! 

* Add this to `test.js` inside of the "NearPlace" test block somewhere underneath `beforeAll`, and run it by clicking "Test".

```typescript
  // src/test.js
describe("NearPlace", function() {
  ...
  describe("setCoords", function() {
    it("modifies the board state", async function() {
      const setResult = await contract.setCoords({
        coords: "0,0",
        value: "111111"});
      console.log(setResult);
      const viewResult = await contract.getMap({});
      expect(viewResult.length).toBe(100); // board is 10 by 10
      // entry 0,0 should be 111111!
      expect(viewResult[0]).toBe("111111")
    });
  });
});
```

## Step 4 - Make a simple UI

All the blockchain work is done! Congratulations!

Let's make a very simple JavaScript user interface \(UI\). We'll initialize the pieces we need to interact with the smart contract, then we'll write a few functions that will allow us to interact with a canvas to save coordinates to the blockchain using the smart contract we wrote above!

* We need to make some tweaks to `main.js`. Add the following to the file:

```typescript
// src/main.js

// Loads nearlib and this contract into nearplace scope.
nearplace = {};
let initPromise;
initContract = function () {
  if (nearplace.contract) {
    return Promise.resolve();
  }
  if (!initPromise) {
    initPromise = doInitContract();
  }
  return initPromise;
}

async function doInitContract() {
  const config = await nearlib.dev.getConfig();
  console.log("nearConfig", config);
  nearplace.near = await nearlib.dev.connect();
  nearplace.contract = await nearplace.near.loadContract(config.contractName, {
    viewMethods: ["getMap"],
    changeMethods: ["setCoords"],
    sender: nearlib.dev.myAccountId
  });

  loadBoardAndDraw();
  nearplace.timedOut = false;
  const timeOutPeriod = 10 * 60 * 1000; // 10 min
  setInterval(() => { nearplace.timedOut = true; }, timeOutPeriod);
}

function sleep(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  });
}

initContract().catch(console.error);

function loadBoardAndDraw() {
  if (nearplace.timedOut) {
    console.log("Please reload to continue");
    return;
  }
  const board = getBoard().then((fullMap) => {
    console.log(fullMap);
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var i = 0;
    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {
        var color = fullMap[i];
        if (!color) {
          color = "000000";
        }
        ctx.fillStyle = "#" + color;
        ctx.fillRect(x*10, y*10, 10, 10);
        i++;
      }
    }
  });
}

function getMousepos(canvas, evt){
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function myCanvasClick(e) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const position = getMousepos(canvas, e);
  const x = Math.floor(position.x/10);
  const y = Math.floor(position.y/10);

  const coords = x + "," + y;
  const rgb = document.getElementById('picker').value;
  ctx.fillStyle = "#" + rgb;
  ctx.fillRect(x*10, y*10, 10, 10);

  var readMethodName = "setCoords";
  
  nearplace.contract.setCoords(coords, rgb);
}

async function getBoard() {
  const result = await nearplace.contract.getMap({})
  console.log(result);
  return result;
}
```

For a little pizazz, we are going to integrate a third party library. 

We'll use ["jscolor picker"](http://jscolor.com/) to pick colors from a palette. Remember, this is loaded in just like any frontend third party library.

To implement this:

* Download the jscolor .zip file using the instructions at: [http://jscolor.com/](http://jscolor.com/)
* Unzip the file and copy it into the `src/` directory in the Studio window
  * Right click on the `src/` folder and select upload files
  * Click on the files  icon
  * Select the `jscolor.js` file

![jscolor in action](../.gitbook/assets/screenshot-2019-03-11-21.31.48.png)

After the previous steps, your file tree should look something like this:

![Notice it&apos;s just the js file we need, not the entire contents of the zip folder](../.gitbook/assets/screenshot-2019-03-11-21.35.48.png)

\(_If you want to skip this step, simply load the script from_ [_the CDN_](https://cdnjs.com/libraries/jscolor) _by replacing the src="jscolor.js" with the CDN link in the &lt;head&gt;&lt;/head&gt;_\)

Finally, all we have to do is add a little bit of HTML and CSS to finish our application!

* Replace the content of the `main.html` file with the following: 

```markup
<!-- src/main.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <script src="https://cdn.jsdelivr.net/npm/nearlib@0.1.1/dist/nearlib.js"></script>
    <script src="./main.js"></script>
    <script src="./jscolor.js"></script>
    <!-- Uncomment the line below to use the CDN for jscolor -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.0.4/jscolor.min.js"></script> -->
    <title>NEAR PLACE</title>
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
    <style>
      .glyphicon-refresh-animate {
              -animation: spin .7s infinite linear;
              -webkit-animation: spin2 .7s infinite linear;
      }
  
      @-webkit-keyframes spin2 {
              from { -webkit-transform: rotate(0deg);}
              to { -webkit-transform: rotate(360deg);}
      }
  
      @keyframes spin {
              from { transform: scale(1) rotate(0deg);}
              to { transform: scale(1) rotate(360deg);}
      }
    </style>
  </head>
  <body style="padding-top: 70px; padding-bottom: 30px;">
    <!-- Fixed navbar -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
              <a class="navbar-brand" href="#">NEAR PLACE</a>
          </div>
        </div>
    </nav>

    <div class="container" role="main">
        <div class="jumbotron">
            <h1>PLACE</h1>
            <p>Imagine drawing <b>forever</b> on the blockchain.</p>
        </div>
        <div align="center">
          <canvas
            id="myCanvas"
            class="drawingboard",
            width="500"
            height="500"
            onclick="myCanvasClick(event);"
            style="border:1px solid #000000;"></canvas>
          </canvas>
        </div>
        <div align="center">
          <input class="jscolor" id="picker" value="ab2567"/>
        </div>
    </div>
  </body>
</html>
```

The game should now work and show the UI in NEAR Studio. To run the UI, use the "Run" button.

Happy gaming!

