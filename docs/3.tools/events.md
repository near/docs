---
id: realtime
title: Events
sidebar_label: Real Time Events
---

Events format [NEP-297](https://github.com/near/NEPs/blob/master/neps/nep-0297.md) is a standard interface for tracking contract activity.

Apps usually perform many similar actions.
Each app may have its own way of performing these actions, introducing inconsistency in capturing these events.

NEAR and third-party applications need to track these and similar events consistently.
If not, tracking state across many apps becomes infeasible.
Events address this issue, providing other applications with the needed standardized data.

:::note
The Events format is also used in other standards, such as [NEP-141](https://github.com/near/NEPs/blob/master/neps/nep-0141.md) or [NEP-171](https://github.com/near/NEPs/blob/master/neps/nep-0171.md).
:::

## Events

Many apps use different interfaces that represent the same action.
This interface standardizes that process by introducing event logs.

Events use the standard logs capability of NEAR.
Events are log entries that start with the `EVENT_JSON:` prefix followed by a single valid JSON string.  
JSON string may have any number of space characters in the beginning, the middle, or the end of the string.
It's guaranteed that space characters do not break its parsing.
All the examples below are pretty-formatted for better readability.

JSON string should have the following interface:

```ts
// Interface to capture data about an event
// Arguments
// * `standard`: name of standard, e.g. nep171
// * `version`: e.g. 1.0.0
// * `event`: type of the event, e.g. nft_mint
// * `data`: associate event data. Strictly typed for each set {standard, version, event} inside corresponding NEP
interface EventLogData {
    standard: string,
    version: string,
    event: string,
    data?: unknown,
}
```

Thus, to emit an event, you only need to log a string following the rules above. Here is a barebones example using Rust SDK `near_sdk::log!` macro.

:::tip Security tip
Prefer using `serde_json` or alternatives to serialize the JSON string to avoid potential injections and corrupted events.
:::

```rust
use near_sdk::log;

// ...
log!(
    r#"EVENT_JSON:{"standard": "nepXXX", "version": "1.0.0", "event": "YYY", "data": {"token_id": "{}"}}"#,
    token_id
);
// ...
```

### Valid event logs

```js
EVENT_JSON:{
    "standard": "nepXXX",
    "version": "1.0.0",
    "event": "xyz_is_triggered"
}
```

```js
EVENT_JSON:{
    "standard": "nepXXX",
    "version": "1.0.0",
    "event": "xyz_is_triggered",
    "data": {
        "triggered_by": "foundation.near"
    }
}
```

:::info Invalid event logs

* Two events in a single log entry (instead, call `log` for each individual event)
* Invalid JSON data
* Missing required fields `standard`, `version` or `event`

:::

## Drawbacks

:::warning limits
There is a known limitation of 16kb strings when capturing logs.
This impacts the amount of events that can be processed.
:::

## Examples

The following are examples of Events interfaces to log and capture token minting, burning, and transfers.

- [Fungible Token Event interface](https://nomicon.io/Standards/Tokens/FungibleToken/Event#interface)
- [Multi Token Event interface](https://nomicon.io/Standards/Tokens/MultiToken/Events#interface)
- [Non Fungible token Event interface](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event#interface)
