---
id: post-processing
title: "Post Processing Tools"
---

# Post Processing Tools

The size of the contract is a critical characteristic. The best way to keep it small is a well-designed minimalistic code with a reduced number of dependencies. It is especially important for large contracts and huge multi-contract dApps that can take a fortune to deploy.

When you have done your best with the code optimization it is worth reducing the size of the contract by minifying it. 

## Ready to use script

We have prepared a simple `bash` script that can be used to minify `.wasm` contract file. You can find it [here](https://github.com/near/near-sdk-rs/blob/master/minifier/minify.sh).

The current approach to minification is the following:

1. Snip (i.e. just replace with unreachable instruction) few known fat functions from the standard library (such as float formatting and panic-related) with `wasm-snip`.
2. Run `wasm-gc` to eliminate all functions reachable from the snipped functions.
3. Strip unneeded sections, such as names with `wasm-strip`.
4. Run `binaryen wasm-opt`, which cleans up the rest.

### Requirements to run the script:

- install [wasm-snip](https://docs.rs/wasm-snip/0.4.0/wasm_snip/) and [wasm-gc](https://docs.rs/crate/wasm-gc/0.1.6) with Cargo:

```bash
cargo install wasm-snip wasm-gc
```

- install [binaryen](https://github.com/WebAssembly/binaryen) and [wabt](https://github.com/WebAssembly/wabt) on your system. For Ubuntu and other Debian based Linux distributions run:

```bash
apt install binaryen wabt
```

## WARNING

Minification could be rather aggressive, so you must test the contract after minification. Standalone NEAR runtime could be helpful [here](https://github.com/nearprotocol/nearcore/tree/master/runtime/near-vm-runner).