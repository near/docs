---
id: did
title: Decentralized Identifiers (DIDs)
description: "Learn about W3C-compliant identity resolution on NEAR." 
---

This document details how to use the `did:near` method for decentralized identifiers on the NEAR blockchain, how it complies with [W3C DID Core](https://www.w3.org/TR/did-core/), and how it integrates with verifiable credentials (VCs), proof registries, and resolution tooling.

---

## What is a DID?

A **Decentralized Identifier (DID)** is a persistent, unique identifier that does not require a centralized registry. On NEAR, DIDs are created based on either account names or raw public keys, and they are fully compatible with the W3C DID standard.

---

## The `did:near` Method

This method supports two types of DIDs:

| Type               | Example                                | Description                          |
|--------------------|----------------------------------------|--------------------------------------|
| Named Account      | `did:near:alice.testnet`               | Derived from an on-chain NEAR account |
| Base58 Public Key  | `did:near:7YzVXb8vKw3...`              | Directly represents an Ed25519 key   |

---

## DID Document Format

Example output from resolving a `did:near`:

```json
{
  "@context": "https://w3id.org/did/v1",
  "id": "did:near:alice.testnet",
  "verificationMethod": [
    {
      "id": "did:near:alice.testnet#owner",
      "type": "Ed25519VerificationKey2018",
      "controller": "did:near:alice.testnet",
      "publicKeyBase58": "3gfD2z7q..."
    }
  ],
  "authentication": ["did:near:alice.testnet#owner"],
  "assertionMethod": ["did:near:alice.testnet#owner"]
}
```

This structure follows the [W3C DID Core Spec](https://www.w3.org/TR/did-core/), including:

- A DID identifier (`id`)
- Key references (`verificationMethod`)
- Authentication and assertion capabilities
- Base58-encoded Ed25519 public keys

---

## ⚙️ Repositories

| Component       | Repository URL |
|----------------|----------------|
| DID Registry (contract) | https://github.com/DTI-web3/did-near |
| ProofType Contract       | https://github.com/DTI-web3/did-near-prooftype |
| ProofType SDK            | https://www.npmjs.com/package/@kaytrust/prooftypes |
| DID Resolver SDK         | https://github.com/DTI-web3/did-near-resolver |

---

## How Resolution Works

1. Extract `identifier` from the DID.
2. If `identifier` is a NEAR account ID, resolve via RPC `account.state()`.
3. If it's a base58 public key, resolve via the registry smart contract using `identity_owner`.
4. Construct the DID document with the correct public key.

---

## How to Use

### Create a DID

If using a NEAR wallet account:
```ts
const did = "did:near:yourname.testnet";
```

If using a raw Ed25519 key (base58 encoded):
```ts
const did = "did:near:7YzVXb8vKw3...";
```

---

## Issuing and Verifying Credentials

### Step 1 – Hash the Credential

```ts
const cid = SHA256(JSON.stringify(credential)).toString(CryptoJS.enc.Base64);
```

### Step 2 – Issue on NEAR

```ts
await proofType.generateProof(credential, {
  wallet,
  cid
});
```

This records the hash (`cid`) on-chain with the `subject_did`.

### Step 3 – Verify On-chain

```ts
const isValid = await proofType.verifyProof("did:near:subject|bafy..."); // returns true or false
```

---

## SDK Usage

### Resolver SDK

```ts
import { NearDidResolver } from '@your-org/did-near-resolver';

const resolver = new NearDidResolver();
const doc = await resolver.resolveDID("did:near:alice.testnet");
console.log(doc.id); // "did:near:alice.testnet"
```

### ProofType SDK

```ts
import { ProofTypeNear } from '@kaytrust/prooftypes';

const proofType = new ProofTypeNear();
const proof = await proofType.generateProof(vcPayload, { wallet, cid });
const isValid = await proofType.verifyProof(proof);
```

---

## Security & Compliance

- Each `(did, cid)` pair can only be registered once.
- Issuer is linked to the signer account via NEAR transaction.
- DID resolution and structure is fully W3C-compliant.
- `cid` is always a Base64-encoded SHA-256 hash of the VC content.
- Public keys are handled securely via NEAR native accounts or custom registries.

---

## Testnet Deployment

- Registry Contract: `neardidregistry.testnet`
- ProofType Contract: `neardtiprooftype.testnet`
- Network: `testnet`
- Language: Rust (`near-sdk`)

---

## Conclusion

The `did:near` method enables full-stack decentralized identity flows on NEAR, including:

- Account- and key-based identifiers
- W3C-compliant DID documents
- Smart contract-backed credential proofs
- SDKs for resolution and attestation

Use this stack to build portable, verifiable, and secure Web3 identity solutions on NEAR.
