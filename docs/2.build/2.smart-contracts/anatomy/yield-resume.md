---
id: yield-resume
title: Yield and Resume
---
import {CodeTabs, Language, Github} from '@site/src/components/codetabs'

NEAR smart contracts can **yield** execution, until an **external** service **resumes** them. The way it works is that the contract yields a **cross-contract call** to itself, until a external service provides some information, and the contract decides that it can resume the execution.

This is a powerful feature that allows contracts to wait for external events, such as a response from an oracle, before continuing execution (read our [blog post](/blog/yield-resume)!).

:::info

If the contract does not resume after 200 blocks - around 4 minutes - the yielded function will resume receiving a "timeout error" as input

:::

---

## Yielding a Promise

Let's look at an example that takes a prompt from a user (e.g. "What is 2+2"), and yields the execution until an external service provides a response for the prompt.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/yield-resume/blob/main/contract/src/lib.rs"
            start="43" end="70" />
  </Language>
</CodeTabs>

#### Creating a Yielded Promise
In the example above, we are creating a [`Promise`](./crosscontract.md#promises) to call our method `return_external_response`. Notice that we create the `Promise` using `env::promise_yield_create`, which will create an identifier for this yielded promise in the `YIELD_REGISTER`.

#### Retrieving the Yielded Promise ID
We then read the `YIELD_REGISTER` to retrieve the `ID` of our yielded promise. We save this value alongside the user's `prompt` in the state, so the external service can easily query the existing prompts.

#### Returning the Promise
Finally, we return the `Promise`, which will **not execute immediately**, but will be **yielded** until the external service provides a response.

<details>

<summary> What is that `self.request_id` in the code? </summary>

The `self.request_id` is an internal unique identifier that we use to keep track of stored requests. This way, we can delete the request once the external service provides a response (or the waiting times out).

Using it is optional, as it only simplifies us the process of keeping track of the requests, and could be removed if you have a different way of tracking them (e.g. an indexer).

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

In the example above, the `respond` function is called by a NEAR account, passing which promise should be resume (`yield_id`), and the response to the prompt. 

:::warning Gatekeeping the Resume

Since the function used to signal the resume is public, developers must make sure to guard it properly to avoid unwanted calls. This can be done by simply checking the caller of the function.

:::

---

## The Function to Resume

The function that will be executed will have access to the parameters passed when creating the yield, as well as the parameters passed when resuming the yield.

<CodeTabs>
  <Language value="rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/yield-resume/blob/main/contract/src/lib.rs"
            start="77" end="89" />
  </Language>
</CodeTabs>

In the example above, the `return_external_response` receives the `request_id` - passed when [creating the yield](#creating-a-yielded-promise) - and the `response` to the prompt - passed when [signaling to resume](#signaling-the-resume).

The `response` will contain a `String` if the external service provided an answer on time, or a `PromiseError` if the contract timed out while waiting.

:::tip There's plenty of time

The contract will be able to wait for 200 blocks - around 4 minutes - before timing out

:::

:::info

In this particular example, we choose to always return a value (i.e. to not raise an error, even during time out) since raising an error would revert the function execution, and thus not remove the request from the state (line `#7` above).

:::