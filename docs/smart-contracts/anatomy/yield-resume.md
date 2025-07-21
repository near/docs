---
id: yield-resume
title: Yield and Resume
description: "NEAR smart contracts can yield execution, until an external service resumes them. In practice, the contract yields a cross-contract call to itself, until an external service executes a function and the contract decides to resume."
---
import {CodeTabs, Language, Github} from '@site/src/components/codetabs'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

NEAR smart contracts can **yield** execution, until an **external** service **resumes** them. In practice, the contract yields a **cross-contract call** to itself, until an external service executes a function and the contract decides to resume.

This is a powerful feature that allows contracts to wait for external events, such as a response from an oracle, before continuing execution (read our [blog post](/blog/yield-resume)!).

:::info

Contract can wait for 200 blocks - around 4 minutes - after which the yielded function will execute, receiving a "timeout error" as input

:::

---

## Yielding a Promise

Let's look at an example that takes a prompt from a user (e.g. "What is 2+2"), and yields the execution until an external service provides a response.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/yield-resume/blob/main/contract/src/lib.rs"
            start="43" end="70" />
  </TabItem>
  
  <TabItem value="python" label="🐍 Python">
```python
from near_sdk_py import call, view, near, Context
from near_sdk_py.collections import UnorderedMap
import json

class YieldResumeContract:
    def __init__(self):
        # Store pending requests
        self.requests = UnorderedMap("r")
        self.request_id = 0
    
    @call
    def ask_assistant(self, prompt):
        """
        Creates a yielded promise that will be resumed when an external service responds
        
        Args:
            prompt: The question to ask the assistant
        """
        # Create a new request ID
        request_id = self.request_id
        self.request_id += 1
        
        # Create arguments for the callback function
        callback_args = json.dumps({"request_id": request_id})
        
        # Create a yielded promise to call return_external_response on this contract
        yield_id = near.promise_create(
            Context.current_account_id(),
            "return_external_response",
            callback_args,
            0,  # No deposit
            30000000000000  # Gas
        )
        
        # Store the yield ID and prompt for the external service to find
        self.requests[str(request_id)] = {
            "yield_id": yield_id,
            "prompt": prompt
        }
        
        # Return the yield_id and request_id for tracking
        return {
            "yield_id": yield_id,
            "request_id": request_id
        }
```
  </TabItem>
</Tabs>

#### Creating a Yielded Promise
In the example above, we are creating a [`Promise`](./crosscontract.md#promises) to call the contract's function `return_external_response`.

Notice that we create the `Promise` using `env::promise_yield_create` in Rust or `near.promise_create` in Python (the Python SDK uses standard promises for yielding), which will create an **identifier** for the yielded promise in the `YIELD_REGISTER`.

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

The `env::promise_yield_resume` function in Rust or `near.promise_yield_resume` in Python allows us to signal which yielded promise should execute, as well as which parameters to pass to the resumed function.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/yield-resume/blob/main/contract/src/lib.rs"
            start="72" end="75" />
  </TabItem>
  
  <TabItem value="python" label="🐍 Python">
```python
@call
def respond(self, yield_id, response):
    """Called by the external service to provide a response to a prompt"""
    return near.promise_yield_resume(yield_id, json.dumps({"response": response}))
```
  </TabItem>
</Tabs>

In the example above, the `respond` function would be called by an external service, passing which promise should be resume (`yield_id`), and the response to the prompt. 

:::warning Gatekeeping the Resume

Since the function used to signal the resume is public, developers must make sure to guard it properly to avoid unwanted calls. This can be done by simply checking the caller of the function

:::

---

## The Function that Resumes

The function being resumed will have access to all parameters passed to it, including those passed during the yield creation, or the external service response.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="rust" label="🦀 Rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/yield-resume/blob/main/contract/src/lib.rs"
            start="77" end="89" />
  </TabItem>
  
  <TabItem value="python" label="🐍 Python">
```python
@call
def return_external_response(self, request_id, response=None):
    """
    Function that gets called when the yielded promise resumes
    
    Args:
        request_id: The ID of the request (passed when promise was created)
        response: The response from the external service (or None if timed out)
    """
    # Remove the request from our tracking
    request_data = self.requests.get(str(request_id))
    if request_data:
        del self.requests[str(request_id)]
    
    # Handle timeout case
    if response is None:
        return {"error": "Timeout waiting for external service", "request_id": request_id}
    
    # Return the response from the external service
    return {
        "request_id": request_id,
        "response": response,
        "success": True
    }
```
  </TabItem>
</Tabs>

In the example above, the `return_external_response` receives parameters:

1. A `request_id` - passed on [creation](#creating-a-yielded-promise) - which is used to remove the request from the state
2. A `response` - passed when [signaling to resume](#signaling-the-resume) - which contains the external response, or `None` if the contract timed out while waiting

:::tip There's plenty of time

The contract will be able to wait for 200 blocks - around 4 minutes - before timing out

:::

:::info

Notice that, in this particular example, we choose to return a value both if there is a response or a time out

The reason to not raise an error, is because we are changing the state (removing the request in line `#7`), and raising an error would revert this state change

:::

---

## Complete Example

Here's a more complete implementation of a yield-resume pattern in Python:

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="python" label="🐍 Python">
```python
from near_sdk_py import view, call, near, Context
from near_sdk_py.collections import UnorderedMap
import json

class AIAssistantContract:
    def __init__(self):
        # Track all pending requests
        self.requests = UnorderedMap("r")
        self.request_counter = 0
    
    @call
    def ask_question(self, question):
        """
        Ask a question to the AI assistant
        
        The execution will yield until an external AI service responds
        """
        # Create a unique ID for this request
        request_id = self.request_counter
        self.request_counter += 1
        
        # Create callback args - will be passed to our callback function
        callback_args = json.dumps({
            "request_id": request_id
        })
        
        # Create the promise - this will yield until resumed
        promise_id = near.promise_create(
            Context.current_account_id(),  # Call this contract
            "process_ai_response",         # Call this method when resumed
            callback_args,                 # Pass these arguments
            0,                             # No attached deposit
            30000000000000                 # Gas for execution (30 TGas)
        )
        
        # Store the request for the external service to find
        self.requests[str(request_id)] = {
            "prompt": question,
            "promise_id": promise_id,
            "user": Context.predecessor_account_id(),
            "timestamp": Context.block_timestamp()
        }
        
        return {
            "request_id": request_id,
            "status": "processing"
        }
    
    @view
    def get_pending_requests(self):
        """Returns all pending requests for the AI service to process"""
        return [
            {
                "request_id": int(req_id), 
                "data": self.requests[req_id]
            } 
            for req_id in self.requests.keys()
        ]
    
    @call
    def provide_ai_response(self, request_id, response):
        """
        Called by the AI service to provide a response
        
        Args:
            request_id: ID of the request being answered
            response: The AI's response to the question
        """
        request_id_str = str(request_id)
        
        # Verify the request exists
        if request_id_str not in self.requests:
            raise Exception(f"No pending request with ID {request_id}")
        
        # Get the request data
        request = self.requests[request_id_str]
        
        # Resume the promise with the AI's response
        result = near.promise_yield_resume(
            request["promise_id"],
            json.dumps({"ai_response": response})
        )
        
        return {"success": result}
    
    @call
    def process_ai_response(self, request_id, ai_response=None):
        """
        Called when a yielded promise resumes
        
        This is either called by provide_ai_response or by a timeout
        
        Args:
            request_id: ID of the request
            ai_response: The AI's response or None if timed out
        """
        request_id_str = str(request_id)
        
        # Cleanup - remove from pending requests
        if request_id_str in self.requests:
            request = self.requests[request_id_str]
            del self.requests[request_id_str]
        else:
            request = None
        
        # Handle timeout case
        if ai_response is None:
            return {
                "request_id": request_id,
                "status": "timeout",
                "message": "The AI service did not respond in time"
            }
        
        # Return the AI's response
        return {
            "request_id": request_id,
            "status": "complete",
            "question": request["prompt"] if request else "Unknown",
            "answer": ai_response,
            "user": request["user"] if request else "Unknown"
        }
```
  </TabItem>
</Tabs>

This example demonstrates a complete yield-resume pattern for an AI assistant contract where:

1. A user asks a question through `ask_question`
2. The contract creates a yielded promise and stores the question
3. An external AI service periodically checks for new questions using `get_pending_requests`
4. When the AI has an answer, it calls `provide_ai_response` to resume the yielded promise
5. The `process_ai_response` function executes with the AI's answer (or timeout) and returns the result
