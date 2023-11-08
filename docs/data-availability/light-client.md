---
id: light-client
title: Light Client
---

A trustless off-chain light client for NEAR with DA-enabled features, such as KZG commitments, Reed-Solomon erasure coding & storage connectors.

The light client provides easy access to transaction and receipt inclusion proofs within a block or chunk.
This is useful for checking any dubious blobs which may not have been submitted or validating that a blob has been submitted to NEAR.

A blob submission can be verified by:

- taking the NEAR transaction ID from Ethereum for the blob commitment.
- Ask the light client for an inclusion proof for the transaction ID or the receipt ID if you're feeling specific; this will give you a Merkle inclusion proof for the transaction/receipt.
- once you have the inclusion proof, you can ask the light client to verify the proof for you, or advanced users can manually verify it themselves.
- armed with this knowledge, rollup providers can have advanced integration with light clients and build proving systems around it.

In the future, we will provide extensions to light clients such that non-interactive proofs can be supplied for blob commitments and other data availability features.

It's also possible that the light client may be on-chain for the header syncing and inclusion proof verification, but this is a low priority right now.