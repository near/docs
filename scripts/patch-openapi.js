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
// 4. Normalize JSON Schema 2020-12 constructs that nearcore's Rust generator
//    emits but that Mintlify rejects, since the spec self-declares
//    `openapi: 3.0.0`. Without this the docs deployment fails to validate:
//      - tuple-style `items` (an array of schemas, e.g. GasKeyFunctionCall and
//        BlockHeaderView.shard_split) -> a single schema, with the original
//        positional order recorded in the description.
//      - `patternProperties` (e.g. CatchupStatusView.shard_sync_status) ->
//        `additionalProperties`, with the key pattern recorded in the
//        description.
//      - pure metadata keywords `$schema`/`$comment` (e.g. on AccountId) ->
//        dropped.
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

// Pure JSON Schema metadata keywords that carry no structural meaning and are
// safe to delete from an OpenAPI 3.0 Schema Object. Reference-bearing keywords
// such as `$ref`, `$defs`, `$id` and `$anchor` are deliberately excluded: a
// `$ref` can resolve into them, so dropping them could silently break the
// spec. If nearcore ever emits those, validation should fail loudly instead.
const DROP_KEYWORDS = ["$schema", "$comment"];

// Collapse a list of schemas to a single schema: identical members collapse to
// that one member, differing members become a `oneOf`.
function collapseSchemas(schemas) {
  const unique = [];
  for (const schema of schemas) {
    if (!unique.some((u) => JSON.stringify(u) === JSON.stringify(schema))) {
      unique.push(schema);
    }
  }
  return unique.length === 1 ? unique[0] : { oneOf: unique };
}

// Short human-readable label for a schema, used in generated descriptions.
function schemaLabel(schema) {
  if (schema && typeof schema.$ref === "string") {
    return schema.$ref.split("/").pop();
  }
  if (schema && typeof schema.type === "string") return schema.type;
  return "schema";
}

// Append a note to a schema's `description`, keeping anything already there.
function appendDescription(node, note) {
  node.description = node.description ? `${node.description}\n\n${note}` : note;
}

// Walk a schema subtree and rewrite the JSON Schema 2020-12 constructs that
// OpenAPI 3.0 does not accept (see patch 4 in the header) so Mintlify can
// validate the spec. OAS 3.0 cannot express tuple ordering or key-name
// patterns structurally, so that information is preserved in the description.
function normalizeForOas30(node) {
  const counts = { tupleItems: 0, patternProps: 0, droppedKeywords: 0 };
  const visit = (n) => {
    if (Array.isArray(n)) {
      n.forEach(visit);
      return;
    }
    if (!n || typeof n !== "object") return;

    for (const keyword of DROP_KEYWORDS) {
      if (keyword in n) {
        delete n[keyword];
        counts.droppedKeywords += 1;
      }
    }

    // tuple-style `items` (an array of schemas) -> a single schema. The
    // collapsed form no longer encodes which schema goes in which position,
    // so record the original order before rewriting.
    if (Array.isArray(n.items)) {
      const order = n.items.map(schemaLabel);
      appendDescription(
        n,
        `Positional tuple of ${order.length}: [${order.join(", ")}].`,
      );
      n.items = collapseSchemas(n.items);
      counts.tupleItems += 1;
    }

    // `patternProperties` -> `additionalProperties`. OAS 3.0 cannot constrain
    // key names, so record the required key pattern(s) before rewriting.
    if (n.patternProperties && typeof n.patternProperties === "object") {
      const patterns = Object.keys(n.patternProperties);
      const valueSchemas = Object.values(n.patternProperties);
      if (valueSchemas.length > 0) {
        n.additionalProperties = collapseSchemas(valueSchemas);
      }
      delete n.patternProperties;
      if (patterns.length > 0) {
        appendDescription(
          n,
          `Object keys must match: ${patterns
            .map((p) => `\`${p}\``)
            .join(", ")}.`,
        );
      }
      counts.patternProps += 1;
    }

    for (const value of Object.values(n)) visit(value);
  };
  visit(node);
  return counts;
}

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

  const oas30 = normalizeForOas30(schemas);

  return { fixedRequestSchemas, flattened, inlined, oas30 };
}

function main() {
  if (!fs.existsSync(SPEC_PATH)) {
    console.error(`error: ${SPEC_PATH} not found`);
    process.exit(1);
  }

  const spec = JSON.parse(fs.readFileSync(SPEC_PATH, "utf8"));
  const { fixedRequestSchemas, flattened, inlined, oas30 } = patch(spec);
  fs.writeFileSync(SPEC_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(`Patched ${fixedRequestSchemas} JsonRpcRequest_for_* schemas`);
  console.log(`TxExecutionStatus flattened: ${flattened}`);
  console.log(`wait_until $refs inlined: ${inlined}`);
  console.log(`tuple items collapsed: ${oas30.tupleItems}`);
  console.log(`patternProperties rewritten: ${oas30.patternProps}`);
  console.log(`metadata keywords dropped: ${oas30.droppedKeywords}`);
}

main();
