---
id: yield-resume
title: Yield and Resume
---
import {CodeTabs, Language, Github} from '@site/src/components/codetabs'

NEAR smart contracts can **yield** execution, until an **external** service **resumes** them. In practice, the contract yields a **cross-contract call** to itself, until an external service executes a function and the contract decides to resume.

This is a powerful feature that allows contracts to wait for external events, such as a response from an oracle, before continuing execution (read our [blog post](/blog/yield-resume)!).

:::info

Contract can wait for 200 blocks - around 4 minutes - after which the yielded function will execute, receiving a "timeout error" as input

:::

---

## Yielding a Promise

Let's look at an example that takes a prompt from a user (e.g. "What is 2+2"), and yields the execution until an external service provides a response.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/yield-resume/blob/main/contract/src/lib.rs"
            start="43" end="70" />
  </Language>
</CodeTabs>

#### Creating a Yielded Promise
In the example above, we are creating a [`Promise`](./crosscontract.md#promises) to call the contract's function `return_external_response`.

Notice that we create the `Promise` using `env::promise_yield_create`, which will create an **identifier** for the yielded promise in the `YIELD_REGISTER`.

#### Retrieving the Yielded Promise ID
We read the `YIELD_REGISTER` to retrieve the `ID` of our yielded promise. We store the `yield_id` and the user's `prompt` so the external service query them (the contract exposes has a function to list all requests).

#### Returning the Promise
Finally, we return the `Promise`, which will **not execute immediately**, but will be **yielded** until the external service provides a response.

<details>

<summary> What is that `self.request_id` in the code? </summary>

The `self.request_id` is an internal unique identifier that we use to keep track of stored requests. This way, we can delete the request once the external service provides a response (or the waiting times out)

Since we only use it to simplify the process of keeping track of the requests, you can remove it if you have a different way of tracking requests (e.g. an indexer)

</details>

---

## Signaling the Resume

The `env::promise_yield_resume` function allows us to signal which yielded promise should execute, as well as which parameters to pass to the resumed function.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/yield-resume/blob/main/contract/src/lib.rs"
            start="72" end="75" />
  </Language>
</CodeTabs>

In the example above, the `respond` function would be called by an external service, passing which promise should be resume (`yield_id`), and the response to the prompt. 

:::warning Gatekeeping the Resume

Since the function used to signal the resume is public, developers must make sure to guard it properly to avoid unwanted calls. This can be done by simply checking the caller of the function

:::

---

## The Function that Resumes

The function being resumed will have access to all parameters passed to it, including those passed during the yield creation, or the external service response.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/yield-resume/blob/main/contract/src/lib.rs"
            start="77" end="89" />
  </Language>
</CodeTabs>

In the example above, the `return_external_response` receives two parameters:

1. A `request_id` - passed on [creation](#creating-a-yielded-promise) - which is used to remove the request from the state
2. A `response` - passed when [signaling to resume](#signaling-the-resume) - which contains the external response, or a `PromiseError` if the contract timed out while waiting

:::tip There's plenty of time

The contract will be able to wait for 200 blocks - around 4 minutes - before timing out

:::

:::info

Notice that, in this particular example, we choose to return a value both if there is a response or a time out

The reason to not raise an error, is because we are changing the state (removing the request in line `#7`), and raising an error would revert this state change

:::