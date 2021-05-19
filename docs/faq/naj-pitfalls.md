---
id: near-api-js-pitfalls
title: NEAR API JS Common Mistakes
sidebar_label: API JS Common Mistakes
---

## Missing contract method

```js

```

## Attaching Gas

## Attaching Deposit

## Window error using nodejs

Pitfall suggestion: Ack! I'm trying to do some basic NodeJS script and it's complaining about something something "window" what am I doing wrong?

It sounds like maybe you're using a KeyStore that's for the browser. Here is an example of using a keystore for the browser.

// your example here

and here is an example of a file system keystore, which is probably what you're wanting to do:

// other example here

## `regeneratorRuntime` is not defined

Pitfalls suggestion: Uh oh! I keep seeing this weird console error in my app that I based off of other examples:

regeneratorRuntime is not defined


What's going on?

Answer: ah yes, you are probably using Parcel like we do in other examples. Please make sure you have this line at the top of your main js file, likely index.js:

import 'regenerator-runtime/runtime'

and ensure the dependencies for this are also added to the project as dev dependencies by running… blah blah blah

## Jest Tests

Pitfalls suggestion: Gah! I feel like I'm so close with these Jest tests, but I just don't know what's happening behind the scenes? Where are these magic objects being set up?

Answer: We feel your pain. Check out the package.json file of some of our examples, particularly near the bottom where there's this block:

  "jest": {
    "testEnvironment": "near-cli/test_environment",
    "testPathIgnorePatterns": [
      "<rootDir>/contract/",
      "<rootDir>/node_modules/"
    ]
  }
This means we're using a custom environment, which may be something most web2 developers haven't had to do.
That's where you can see where the sausage is made.

Why did we do this in near-cli? I dunno! Please help contribute and fix this strangeness, friends.