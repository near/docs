---
sidebar_position: 6
sidebar_label: "Base64 params, wrap up"
title: "Using base64-encoded arguments when we create a new crossword puzzle"
---
import {Github} from "@site/src/components/codetabs"

# Final modifications

import base64Encode from '/docs/assets/crosswords/boop-base64-encode.gif';

Let's modify our `new_puzzle` method a bit, and demonstrate how a smart contract author might use base64-encoded arguments.

In the previous chapter we had a fairly long NEAR CLI command that called the `new_puzzle`, providing it the parameters for all the clues. Having these lengthy parameters on the CLI might get cumbersome. There may be issues needing to escape single or double quotes, and each operating system may wish for a different format on the Terminal or Command Prompt.

We're going to send all the arguments as a base64-encoded string, and make this a bit simpler. For this, we're going to use [`Base64VecU8` from the SDK](https://docs.rs/near-sdk/latest/near_sdk/json_types/struct.Base64VecU8.html).

:::note `Base64VecU8` is great for binary payloads
What we're doing makes sense, but it's worth noting that it's perhaps more common to use `Base64VecU8` when sending binary parameters.

Read more [about it here](../../../2.build/2.smart-contracts/anatomy/serialization-interface.md).
:::

First we'll set up a struct for the arguments we're expecting:

<Github language="rust" start="103" end="108" url="https://github.com/near-examples/crossword-tutorial-chapter-3/blob/master/contract/src/lib.rs" />

Then we modify our `new_puzzle` method like so:

<Github language="rust" start="281" end="289" url="https://github.com/near-examples/crossword-tutorial-chapter-3/blob/master/contract/src/lib.rs" />

We can take our original arguments and base64 encode them, using whatever method you prefer. There are plenty of online tool, Terminal commands, and open source applications like [Boop](https://boop.okat.best).

We'll copy this:

```js
{
  "answer_pk": "ed25519:7PkKPmVUXcupA5oU8d6TbgyMwzFe8tPV6eV1KGwgo9xg",
  "dimensions": {
   "x": 11,
   "y": 10
  },
  "answers": [
   {
     "num": 1,
     "start": {
       "x": 0,
       "y": 1
     },
     "direction": "Across",
     "length": 12,
     "clue": "NEAR transactions are more ______ instead of atomic."
   },
   {
     "num": 2,
     "start": {
       "x": 6,
       "y": 0
     },
     "direction": "Down",
     "length": 7,
     "clue": "In a smart contract, when performing an Action, you use this in Rust."
   },
   {
     "num": 3,
     "start": {
       "x": 9,
       "y": 0
     },
     "direction": "Down",
     "length": 6,
     "clue": "In docs.rs when you search for the near-sdk crate, these items a considered a what: collections, env, json_types."
   },
   {
     "num": 4,
     "start": {
       "x": 1,
       "y": 1
     },
     "direction": "Down",
     "length": 10,
     "clue": "A series of words that can deterministically generate a private key."
   },
   {
     "num": 5,
     "start": {
       "x": 1,
       "y": 3
     },
     "direction": "Across",
     "length": 3,
     "clue": "When doing high-level cross-contract calls, we import this that ends in _contract. When calling ourselves in a callback, it is convention to call it THIS_self."
   },
   {
     "num": 6,
     "start": {
       "x": 0,
       "y": 8
     },
     "direction": "Across",
     "length": 8,
     "clue": "Use this to determine the execution outcome of a cross-contract call or Action."
   },
   {
     "num": 7,
     "start": {
       "x": 4,
       "y": 6
     },
     "direction": "Across",
     "length": 4,
     "clue": "You chain this syntax onto a promise in order to schedule a callback afterward."
   }
  ]
}
```

and base64 encode it:

<figure>
    <img src={base64Encode} alt="Animated gif of parameters getting base64 encoded with the program Boop" width="600"/>
</figure>
<br/>

Now we can build and run the new crossword puzzle contract as we have before:

```bash
cargo near build

export NEAR_ACCT=crossword.friend.testnet
export PARENT_ACCT=friend.testnet

near account delete-account $NEAR_ACCT beneficiary $PARENT_ACCT network-config testnet sign-with-legacy-keychain send

near account create-account fund-myself $NEAR_ACCT '1 NEAR' autogenerate-new-keypair save-to-legacy-keychain sign-as $PARENT_ACCT network-config testnet sign-with-legacy-keychain send

cargo near deploy $NEAR_ACCT with-init-call new json-args '{"owner_id": "'$NEAR_ACCT'", "creator_account": "testnet"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-legacy-keychain send

near contract call-function as-transaction $NEAR_ACCT new_puzzle json-args '{
  "args": "ewogICJhbnN3ZXJfcGsiOiAiZWQyNTUxOTo3UGtLUG1WVVhjdXBBNW9VOGQ2VGJneU13ekZlOHRQVjZlVjFLR3dnbzl4ZyIsCiAgImRpbWVuc2lvbnMiOiB7CiAgICJ4IjogMTEsCiAgICJ5IjogMTAKICB9LAogICJhbnN3ZXJzIjogWwogICB7CiAgICAgIm51bSI6IDEsCiAgICAgInN0YXJ0IjogewogICAgICAgIngiOiAwLAogICAgICAgInkiOiAxCiAgICAgfSwKICAgICAiZGlyZWN0aW9uIjogIkFjcm9zcyIsCiAgICAgImxlbmd0aCI6IDEyLAogICAgICJjbHVlIjogIk5FQVIgdHJhbnNhY3Rpb25zIGFyZSBtb3JlIF9fX19fXyBpbnN0ZWFkIG9mIGF0b21pYy4iCiAgIH0sCiAgIHsKICAgICAibnVtIjogMiwKICAgICAic3RhcnQiOiB7CiAgICAgICAieCI6IDYsCiAgICAgICAieSI6IDAKICAgICB9LAogICAgICJkaXJlY3Rpb24iOiAiRG93biIsCiAgICAgImxlbmd0aCI6IDcsCiAgICAgImNsdWUiOiAiSW4gYSBzbWFydCBjb250cmFjdCwgd2hlbiBwZXJmb3JtaW5nIGFuIEFjdGlvbiwgeW91IHVzZSB0aGlzIGluIFJ1c3QuIgogICB9LAogICB7CiAgICAgIm51bSI6IDMsCiAgICAgInN0YXJ0IjogewogICAgICAgIngiOiA5LAogICAgICAgInkiOiAwCiAgICAgfSwKICAgICAiZGlyZWN0aW9uIjogIkRvd24iLAogICAgICJsZW5ndGgiOiA2LAogICAgICJjbHVlIjogIkluIGRvY3MucnMgd2hlbiB5b3Ugc2VhcmNoIGZvciB0aGUgbmVhci1zZGsgY3JhdGUsIHRoZXNlIGl0ZW1zIGEgY29uc2lkZXJlZCBhIHdoYXQ6IGNvbGxlY3Rpb25zLCBlbnYsIGpzb25fdHlwZXMuIgogICB9LAogICB7CiAgICAgIm51bSI6IDQsCiAgICAgInN0YXJ0IjogewogICAgICAgIngiOiAxLAogICAgICAgInkiOiAxCiAgICAgfSwKICAgICAiZGlyZWN0aW9uIjogIkRvd24iLAogICAgICJsZW5ndGgiOiAxMCwKICAgICAiY2x1ZSI6ICJBIHNlcmllcyBvZiB3b3JkcyB0aGF0IGNhbiBkZXRlcm1pbmlzdGljYWxseSBnZW5lcmF0ZSBhIHByaXZhdGUga2V5LiIKICAgfSwKICAgewogICAgICJudW0iOiA1LAogICAgICJzdGFydCI6IHsKICAgICAgICJ4IjogMSwKICAgICAgICJ5IjogMwogICAgIH0sCiAgICAgImRpcmVjdGlvbiI6ICJBY3Jvc3MiLAogICAgICJsZW5ndGgiOiAzLAogICAgICJjbHVlIjogIldoZW4gZG9pbmcgaGlnaC1sZXZlbCBjcm9zcy1jb250cmFjdCBjYWxscywgd2UgaW1wb3J0IHRoaXMgdGhhdCBlbmRzIGluIF9jb250cmFjdC4gV2hlbiBjYWxsaW5nIG91cnNlbHZlcyBpbiBhIGNhbGxiYWNrLCBpdCBpcyBjb252ZW50aW9uIHRvIGNhbGwgaXQgVEhJU19zZWxmLiIKICAgfSwKICAgewogICAgICJudW0iOiA2LAogICAgICJzdGFydCI6IHsKICAgICAgICJ4IjogMCwKICAgICAgICJ5IjogOAogICAgIH0sCiAgICAgImRpcmVjdGlvbiI6ICJBY3Jvc3MiLAogICAgICJsZW5ndGgiOiA4LAogICAgICJjbHVlIjogIlVzZSB0aGlzIHRvIGRldGVybWluZSB0aGUgZXhlY3V0aW9uIG91dGNvbWUgb2YgYSBjcm9zcy1jb250cmFjdCBjYWxsIG9yIEFjdGlvbi4iCiAgIH0sCiAgIHsKICAgICAibnVtIjogNywKICAgICAic3RhcnQiOiB7CiAgICAgICAieCI6IDQsCiAgICAgICAieSI6IDYKICAgICB9LAogICAgICJkaXJlY3Rpb24iOiAiQWNyb3NzIiwKICAgICAibGVuZ3RoIjogNCwKICAgICAiY2x1ZSI6ICJZb3UgY2hhaW4gdGhpcyBzeW50YXggb250byBhIHByb21pc2UgaW4gb3JkZXIgdG8gc2NoZWR1bGUgYSBjYWxsYmFjayBhZnRlcndhcmQuIgogICB9CiAgXQp9"
}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as $NEAR_ACCT network-config testnet sign-with-legacy-keychain send
```

Back at the project root (not in the `contract` directory) we can run our app and see the new crossword puzzle:

```bash
CONTRACT_NAME=crossword.friend.testnet npm run start
```

## Wrapping up

Once you understand cross-contract calls and callbacks and where the logic should go, you can build just about anything on NEAR.

This might be a good time for a reminder that this crossword puzzle, which checks permissions to methods based on a public key, is a bit unusual. It's more common to have simple collections or mappings for allowed users, or utilize the `owner_id` field we set up. The account and access key system in NEAR is quite powerful, and hopefully this tutorial helps stretch the limits of what's possible, like the seamless onboarding we have with the crossword puzzle.

Again, the final code for this chapter:

https://github.com/near-examples/crossword-tutorial-chapter-3

Happy hacking!
