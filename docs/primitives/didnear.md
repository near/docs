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

This method supports two types of DIDs with different resolution strategies:

| Type               | Example                                | Description                          |
|--------------------|-----------------------------------------|--------------------------------------|
| Named Account      | `did:near:alice.testnet` or `did:near:alice.near` | Resolved directly from on-chain NEAR account keys (FullAccess keys) |
| Registry DID (Base58) | `did:near:CF5RiJYh4EVmEt8UADTjoP3XaZo1NPWxv6w5TmkLqjpR` | Resolved via smart contract registry using `identity_owner` method |

---

## DID Document Format

Example output from resolving a `did:near`:

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2018/v1"
  ],
  "id": "did:near:alice.testnet",
  "verificationMethod": [
    {
      "id": "did:near:alice.testnet#owner",
      "type": "Ed25519VerificationKey2018",
      "controller": "did:near:alice.testnet",
      "publicKeyBase58": "7WLUHT69sw5UpYK9xAY5cbdWKf4vSMruXzwfbL999zXo"
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

The resolver uses different strategies based on DID format:

### Named Account DIDs (`did:near:alice.testnet`)
1. Parse the account ID from the DID (e.g., `alice.testnet`).
2. Determine the network from the suffix (`.testnet` → testnet, `.near` → mainnet).
3. Query the NEAR RPC using `near-api-js` to fetch account access keys.
4. Filter for keys with `permission: "FullAccess"`.
5. Construct the DID document with all FullAccess public keys as verification methods.

### Registry DIDs (`did:near:CF5RiJYh4EVmEt8UADTjoP3XaZo1NPWxv6w5TmkLqjpR`)
1. Identify the DID as Base58 format (44-50 character string matching `[1-9A-HJ-NP-Za-km-z]+`).
2. Call the `identity_owner` view method on the configured registry contract.
3. Retrieve the owner DID registered for that Base58 identifier.
4. Construct the DID document with the public key from the registry.

---

## How to Use

### Create a DID

#### Named Account DID (Direct Resolution)
If using a NEAR wallet account, the DID is derived directly from the account name:
```ts
const did = "did:near:yourname.testnet";  // For testnet
const did = "did:near:yourname.near";     // For mainnet
```

#### Registry DID (Contract-Based)
If using a Base58-encoded identifier registered in a smart contract:
```ts
const did = "did:near:CF5RiJYh4EVmEt8UADTjoP3XaZo1NPWxv6w5TmkLqjpR";
```

#### Network-Specific DIDs
You can explicitly specify the network:
```ts
const did = "did:near:testnet:CF5RiJYh4EVmEt8UADTjoP3XaZo1NPWxv6w5TmkLqjpR";  // Explicitly targets testnet
const did = "did:near:near:CF5RiJYh4EVmEt8UADTjoP3XaZo1NPWxv6w5TmkLqjpR";     // Explicitly targets mainnet
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

#### Standalone Usage

```ts
import { NearDIDResolver } from '@kaytrust/did-near-resolver';

const resolver = new NearDIDResolver({
  networks: [
    {
      networkId: 'testnet',
      rpcUrl: 'https://rpc.testnet.near.org',
      contractId: 'neardidregistry.testnet' // Optional: only for Registry DIDs
    },
    {
      networkId: 'mainnet', // You can use 'near' for mainnet (or 'mainnet', both are equivalent)
      rpcUrl: 'https://rpc.mainnet.near.org',
      contractId: 'neardidregistry.near' // Optional
    }
  ]
});

const doc = await resolver.resolveDID("did:near:alice.testnet");
console.log(doc.id); // "did:near:alice.testnet"
```

#### Integration with `did-resolver`

```ts
import { Resolver } from 'did-resolver';
import { getResolver } from '@kaytrust/did-near-resolver';

const nearResolver = getResolver({
  networks: [
    {
      networkId: 'testnet',
      rpcUrl: 'https://rpc.testnet.near.org',
      contractId: 'neardidregistry.testnet'
    }
  ]
});

const resolver = new Resolver({
  ...nearResolver,
  // ... other DID methods
});

const result = await resolver.resolve('did:near:alice.testnet');
console.log(result.didDocument);
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
- **Key Security**: Only `FullAccess` keys are included in the DID document's `verificationMethod` array, ensuring that only keys with complete account authority are used for authentication.
- Public keys are handled securely via NEAR native accounts or custom registries.
- **Multi-Network Support**: The resolver automatically routes requests to the correct network (mainnet/testnet) based on the DID suffix.

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
