---
id: realtime
title: Realtime Events (WebSocket)
---

While developing a decentralized app you might want track specific events in real time. For example, you could want
to be informed each time a specific NFT marketplace makes a sell. For this to be possible you need:

1. A way for the contract to inform that an event took place.
2. A way to track such events in real time.

To tackle these challenges is that the [standard events format (NEP-297)](https://nomicon.io/Standards/EventsFormat) was created.
[NEP-297](https://nomicon.io/Standards/EventsFormat) defines a standard way for contracts to inform about an event. Since these
events are public, a service can then be built to track them in real time through the use of websocket.

---

## NEP-297 - Events
In NEAR, `Events` use the standard logs capability of contracts, since every log is forever stored in the blockchain. In this way,
Events are normal log entries that start with the `EVENT_JSON:` prefix, followed by a single valid JSON string. The JSON string
must codify an object with the following interface:

```ts
interface EventLogData {
    standard: string, // name of standard, e.g. nep171
    version: string, // e.g. 1.0.0
    event: string, // type of the event, e.g. nft_mint
    data?: unknown, // event data defined in the nep171
}
```

See the [NEP-297 page](https://nomicon.io/Standards/EventsFormat) for examples.

:::warning
There is a known limitation of 16kb strings when capturing logs
:::

---

## Listening to Events (Mainnet)

To listen to events in the `mainnet` simply connect to the secure websocket `wss://events.near.stream/ws`. There is no websocket **for `testnet`**.

As first message you will need to pass an object stating the type of events you want to filter for, and a limit if necessary. For example, here we filter for the `nft_mint` event in the `nft.nearapps.near` account.

```json
{
  secret: "ohyeahnftsss",
  filter: [{
    "account_id": "nft.nearapps.near",
    "status": "SUCCESS",
    "event": {
      "standard": "nep171",
      "event": "nft_mint",
    }
  }],
  fetch_past_events: 20,
}
```

:::caution
There is no websocket implemented for `testnet`, but you can run your own using this [modified indexer](https://github.com/evgenykuzyakov/indexer-tutorials/tree/master/example-indexer) to
populate a database with events, and then serve them using the [event-api project](https://github.com/evgenykuzyakov/event-api). 
:::

:::tip Reference implementation
If you need a reference implementation, [here is a project from Evgeny Kuzyakov](https://github.com/evgenykuzyakov/nft-mints)
that listens for **all** `nft_mint` and `nft_transfer` events in the NEAR network.
:::

---
