#!/usr/bin/env node
// Apply NEAR docs patches to the upstream openapi.json.
//
// The upstream spec at near/nearcore is regenerated from the Rust types and
// is not aware of how Mintify renders the "Try It" panel. We re-apply these
// docs-specific tweaks every time the workflow refreshes openapi.json so they
// do not get clobbered.
//
// Patches:
// 1. On every JsonRpcRequest_for_* schema, drop `id` and `jsonrpc` from the
//    `required` array and give them defaults so the playground auto-populates
//    them instead of forcing manual user input.
// 2. Flatten TxExecutionStatus from a oneOf-of-single-value-enums into a
//    single string enum so Mintify renders one dropdown with all six options.
// 3. Inline the wait_until $ref on RpcSendTransactionRequest and
//    RpcTransactionStatusRequest so the playground picks up the description.
//
// Run from the repo root: `node scripts/patch-openapi.js`.

const fs = require("node:fs");
const path = require("node:path");

const REPO_ROOT = path.resolve(__dirname, "..");
const SPEC_PATH = path.join(REPO_ROOT, "openapi.json");

const TX_EXECUTION_STATUS_DESCRIPTION = [
  "How long the RPC should wait before returning a transaction result. Each value waits for a stricter execution milestone than the previous one. Defaults to `EXECUTED_OPTIMISTIC`.",
  "",
  "- `NONE`: Transaction is waiting to be included into a block.",
  "- `INCLUDED`: Transaction is included in a block (block may not be finalized).",
  "- `EXECUTED_OPTIMISTIC` (default): Included + all non-refund receipts executed (blocks may not be finalized).",
  "- `INCLUDED_FINAL`: Transaction is included in a finalized block.",
  "- `EXECUTED`: Included in a finalized block + all non-refund receipts executed.",
  "- `FINAL`: Included in a finalized block + all receipts (including refunds) finalized.",
].join("\n");

const WAIT_UNTIL_DESCRIPTION =
  "Optional. Tells the RPC how long to wait before returning the transaction status. See the TxExecutionStatus enum for the six available milestones. Defaults to `EXECUTED_OPTIMISTIC`.";

function patch(spec) {
  const schemas = spec.components.schemas;

  let fixedRequestSchemas = 0;
  for (const [name, schema] of Object.entries(schemas)) {
    if (!name.startsWith("JsonRpcRequest_for_")) continue;
    const props = schema.properties ?? {};

    if (props.id) {
      props.id.default = "dontcare";
      props.id.description ??=
        "JSON-RPC request id. Auto-populated; can be any string.";
    }
    if (props.jsonrpc) {
      props.jsonrpc.default = "2.0";
      props.jsonrpc.enum = ["2.0"];
      props.jsonrpc.description ??=
        "JSON-RPC protocol version. Always `2.0`.";
    }

    const required = schema.required ?? [];
    const newRequired = required.filter(
      (r) => r !== "id" && r !== "jsonrpc",
    );
    if (newRequired.length !== required.length) {
      schema.required = newRequired;
    }
    fixedRequestSchemas += 1;
  }

  let flattened = false;
  if (schemas.TxExecutionStatus) {
    schemas.TxExecutionStatus = {
      type: "string",
      title: "TxExecutionStatus",
      description: TX_EXECUTION_STATUS_DESCRIPTION,
      enum: [
        "NONE",
        "INCLUDED",
        "EXECUTED_OPTIMISTIC",
        "INCLUDED_FINAL",
        "EXECUTED",
        "FINAL",
      ],
      default: "EXECUTED_OPTIMISTIC",
    };
    flattened = true;
  }

  let inlined = 0;
  for (const reqName of [
    "RpcSendTransactionRequest",
    "RpcTransactionStatusRequest",
  ]) {
    const req = schemas[reqName];
    if (!req) continue;
    const props = req.properties ?? {};
    if (props.wait_until) {
      props.wait_until = {
        $ref: "#/components/schemas/TxExecutionStatus",
        description: WAIT_UNTIL_DESCRIPTION,
      };
      inlined += 1;
    }
  }

  return { fixedRequestSchemas, flattened, inlined };
}

function main() {
  if (!fs.existsSync(SPEC_PATH)) {
    console.error(`error: ${SPEC_PATH} not found`);
    process.exit(1);
  }

  const spec = JSON.parse(fs.readFileSync(SPEC_PATH, "utf8"));
  const { fixedRequestSchemas, flattened, inlined } = patch(spec);
  fs.writeFileSync(SPEC_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(`Patched ${fixedRequestSchemas} JsonRpcRequest_for_* schemas`);
  console.log(`TxExecutionStatus flattened: ${flattened}`);
  console.log(`wait_until $refs inlined: ${inlined}`);
}

main();
