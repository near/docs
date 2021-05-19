---
id: naj-faq
title: FAQs for NEAR-API-JS
sidebar_label: JS Library FAQ
---

## Overview

## Contracts

### How do I attach gas?

### How do I attach deposit?

## Testing

### How are Jest Tests Configured?

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

## Common Errors

### Missing contract method

### `regeneratorRuntime` is not defined

> Ah yes, you are probably using [Parcel](https://parceljs.org/) like we do in other examples. Please make sure you have this line at the top of your main js file, likely index.js:

```js
import 'regenerator-runtime/runtime'
```

Also, ensure the dependencies for this are added to the project by checking the dev dependencies in your `package.json`. If not found you can install this by running the following in your terminal:

```bash
npm install regenerator-runtime --save-dev
```

### Window error using Node.js

> Trying to do some basic NodeJS script and it's complaining about something something "window"? what am I doing wrong?

It sounds like maybe you're using a KeyStore that's for the browser. Here is an example of using a keystore for the browser.

// your example here

and here is an example of a file system keystore, which is probably what you're wanting to do:

// other example here

