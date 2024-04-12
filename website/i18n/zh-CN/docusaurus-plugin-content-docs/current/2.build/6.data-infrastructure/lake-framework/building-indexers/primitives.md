---
id: primitives
title: NEAR Lake Primitive Types
sidebar_label: Lake Primitive Types
---

# NEAR Lake Primitive Types

This article contains the primitive types used by the [NEAR Lake Framework package](https://www.npmjs.com/package/@near-lake/framework). These types are used to define the data structures used by the framework as well as provide some popular helper functions.

## `Block`

:::info Important Notes on `Block`

- All the entities located on different shards were merged into one single list without differentiation.
- `Block` is not the fairest name for this structure either. NEAR Protocol is a sharded blockchain, so its block is actually an ephemeral structure that represents a collection of real blocks called chunks in NEAR Protocol.

:::

### `Block` Structure Definition

The `Block` type is used to represent a block in the NEAR Lake Framework. It is comprised by the following structure:

```ts
export class Block {
    constructor(
        readonly streamerMessage: StreamerMessage,
        private executedReceipts: Receipt[],
        readonly postponedReceipts: Receipt[],
        readonly transactions: Transaction[],
        private _actions: Map<string, Action>,
        private _events: Map<string, Event[]>,
        private _stateChanges: StateChange[]) { 

        }
    ... // helper methods and getters omitted for brevity
}
```

#### `streamerMessage`

Low-level structure for backward compatibility. As implemented in previous versions of [`near-lake-framework`](https://www.npmjs.com/package/near-lake-framework).

#### `postponedReceipts`

Receipts included on the chain but not executed yet marked as “postponed”: they are represented by the same structure `Receipt` (see the corresponding section in this doc for more details).

#### `transactions`

List of included `Transactions`, converted into `Receipts`.

:::info Heads up!

**Note:**  You might want to know about `Transactions` to know where the action chain has begun. Unlike Ethereum, where a Transaction contains everything you may want to know about a particular interaction on  the Ethereum blockchain, Near Protocol because of its asynchronous nature converts a `Transaction` into a `Receipt` before executing it. Thus, On NEAR, `Receipts` are more important for figuring out what happened on-chain as a result of a Transaction signed by a user. Read more about [Transactions on Near](https://nomicon.io/RuntimeSpec/Transactions) here.

:::

### `Block` Helper Methods

```ts
export class Block {
    ... // constructor omitted for brevity
    get blockHash(): string {}
    get prevBlockHash(): string {}
    get blockHeight(): number {}

    header(): BlockHeader {}
    receipts(): Receipt[] {}
    actions(): Action[] {}
    events(): Event[] {}
    stateChanges(): StateChange[] {}

    actionByReceiptId(receipt_id: string): Action | undefined {}
    eventsByReceiptId(receipt_id: string): Event[] {}
    eventsByAccountId(account_id: string): Event[] {}

    private buildActionsHashmap() {}
    private buildEventsHashmap(): Map<string, Event[]> {}

    static fromStreamerMessage(streamerMessage: StreamerMessage): Block {}
}
```

#### `blockHash`

Returns the block hash. A shortcut to get the data from the block header.

#### `prevBlockHash`

Returns the previous block hash. A shortcut to get the data from the block header.

#### `blockHeight`

Returns the block height. A shortcut to get the data from the block header.

#### `header(): BlockHeader`

Returns a `BlockHeader` structure of the block

See `BlockHeader` structure sections for details.

#### `receipts(): Receipt[]`

Returns a slice of `Receipts` executed in the block.

Basically is a getter for the `executedReceipts` field.

#### `actions(): Action[]`

Returns an Array of `Actions` executed in the block.

#### `events(): Event[]`

Returns `Events` emitted in the block.

#### `stateChanges(): StateChange[]`

Returns an Array of `StateChange` occurred in the block.

#### `actionByReceiptId(receipt_id: string): Action | undefined`

Returns `Action`s of the provided `receipt_id` from the block if any. Returns `undefined` if there is no corresponding `Action`.

This method uses the internal `Block` `action` field which is empty by default and will be filled with the block’s actions on the first call to optimize memory usage.

The result is either `Action | undefined` since there might be a request for an `Action` by `receipt_id` from another block, in which case this method will be unable to find the `Action` in the current block. In the other case, the request might be for an `Action` for a `receipt_id` that belongs to a `DataReceipt` where an action does not exist.

#### `eventsByReceiptId(receipt_id: string): Event[]`

Returns an Array of Events emitted by `ExecutionOutcome` for the given `receipt_id`. There might be more than one `Event` for the `Receipt` or there might be none of them. In the latter case, this method returns an empty Array.

#### `eventsByAccountId(account_id: string): Event[]`

Returns an Array of Events emitted by `ExecutionOutcome` for the given `account_id`. There might be more than one `Event` for the `Receipt` or there might be none of them. In the latter case, this method returns an empty Array.

---

## `BlockHeader`

Replacement for `BlockHeaderView` from `near-primitives`. Shrunken and simplified.

:::note
The original `BlockHeaderView` is still accessible via the `.streamerMessage` attribute.
:::

### `BlockHeader` Structure Definition

```ts
export class BlockHeader {
    constructor(
        readonly height: number,
        readonly hash: string,
        readonly prevHash: string,
        readonly author: string,
        readonly timestampNanosec: string,
        readonly epochId: string,
        readonly nextEpochId: string,
        readonly gasPrice: string,
        readonly totalSupply: string,
        readonly latestProtocolVersion: number,
        readonly randomValue: string,
        readonly chunksIncluded: number,
        readonly validatorProposals: ValidatorStakeView[]) { 
        }
    ... // helper method omitted for brevity
}
```

---

## `Receipt`

This field is a simplified representation of the `ReceiptView` structure from `near-primitives`.

### `Receipt` Structure Definition

```ts
export class Receipt implements Events {
  constructor(
    readonly receiptKind: ReceiptKind, 
    readonly receiptId: string, 
    readonly receiverId: string, 
    readonly predecessorId: string, 
    readonly status: ExecutionStatus, 
    readonly executionOutcomeId?: string | undefined, 
    readonly logs: string[] = []) {
    }
  ... // helper methods omitted for brevity
}
```

### `Receipt` Fields

#### `receiptKind`

Defined the type of the `Receipt`: `Action` or `Data` representing the `ActionReceipt` and `DataReceipt`.

#### `receiptId`

The ID of the `Receipt` of the `CryptoHash` type.

#### `receiverId`

The receiver account id of the `Receipt`.

#### `predecessorId`

The predecessor account id of the `Receipt`.

#### `status`

Represents the status of `ExecutionOutcome` of the `Receipt`.

See the `ExecutionStatus` enum section for the details.

#### `executionOutcomeId`

The id of the `ExecutionOutcome` for the `Receipt`. Returns `null` if the `Receipt` isn’t executed yet and has a postponed status.

#### `logs`

The original logs of the corresponding `ExecutionOutcome` of the `Receipt`.

Note: not all of the logs might be parsed as JSON Events (`Events`).

### `Receipt` Helper Methods

```ts
export class Receipt {
    ... // constructor omitted for brevity
    get events(): Event[] {}

    static fromOutcomeWithReceipt(outcomeWithReceipt: OutcomeWithReceipt): Receipt {}
}
```

#### `Receipt.events(): Events[]`

Returns an Array of `Events` for the `Receipt`, if any. This might be empty if the `logs` field is empty or doesn’t contain JSON Events compatible log records.

---

## `Event`

This structure is an ephemeral entity to provide access to the [Events Standard](https://github.com/near/NEPs/blob/master/neps/nep-0297.md) structure and keep data about the related `Receipt` for convenience.

### Interface for Capturing Data About an Event in `handleStreamerMessage()`

The interface to capture data about an event has the following arguments:

- `standard`: name of standard, e.g. nep171
- `version`: e.g. 1.0.0
- `event`: type of the event, e.g. nft_mint
- `data`: associate event data. Strictly typed for each set `{standard, version, event}` inside corresponding NEP

### `Event` Structure Definition

```ts
export class Event {
    constructor(
      readonly relatedReceiptId: string, 
      readonly rawEvent: RawEvent) {
      }
    ... // helper methods omitted for brevity
}
```

### `Event` Methods

```ts
export class Event {
    ... // constructor omitted for brevity
    static fromLog(log: string): Event {}
}
```

---

## `Transaction`

A representation of the `IndexerTransactionWithOutcome` from `near-indexer-primitives` which is an ephemeral structure combining `SignedTransactionView` from `near-primitives` and `IndexerExecutionOutcomeWithOptionalReceipt` from `near-indexer-primitives`.

This structure is very similar to `Receipt`. Unlike `Receipt`, a `Transaction` has a few additional fields like `signerId`, `signature`, and `operations`.

### `Transaction` Structure Definition

```ts
export class Transaction {
    constructor(
      readonly transactionHash: string, 
      readonly signerId: string, 
      readonly signerPublicKey: string, 
      readonly signature: string, 
      readonly receiverId: string, 
      readonly status: ExecutionStatus, 
      readonly executionOutcomeId: string, 
      readonly operations: Operation[]) { 
      }
}
```

#### `Transaction.transactionHash`

Returns the hash of the `Transaction` in `CryptoHash`.

#### `Transaction.signerId`

Returns the signer account id of the `Transaction`.

#### `Transaction.signerPublicKey`

Returns the `PublicKey` of the signer of the `Transaction`.

#### `Transaction.signature`

Returns the `Signature` the `Transaction` was signed with.

#### `Transaction.receiverId`

Returns the receiver account id of the `Transaction`.

#### `Transaction.status`

Returns the status of the `Transaction` as `ExecutionStatus`.

#### `Transaction.executionOutcomeId`

Returns the id of the `ExecutionOutcome` for the `Transaction`.

#### `Transaction.operations`

Returns an Array of `Operation` for the `Transaction`.

---

## `StateChange`

This structure is almost an identical copy of the `StateChangeWithCauseView` from `near-primitives` with a propagated additional field `affectedAccountId`.

### `StateChange` Structure Definition

```ts
export class StateChange {
    constructor(
      readonly cause: StateChangeCause, 
      readonly value: StateChangeValue
    ) {}

    get affectedAccountId(): string {}

    static fromStateChangeView(stateChangeView: StateChangeWithCauseView) {}
}
```

#### `StateChange.cause`

Returns the `cause` of the `StateChange`.

#### `StateChange.value`

Returns the `value` of the `StateChange`.

#### `StateChange.affectedAccountId(): string`

Returns the account id of the `StateChange`.

#### `StateChange.fromStateChangeView(stateChangeView: StateChangeWithCauseView): StateChange`

Returns the `StateChange` from the `StateChangeWithCauseView`. Created for backward compatibility.
