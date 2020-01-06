---
id: contribution-overview
title: Contributor Quickstart
sidebar_label: Orientation
---

Interested in contributing to NEAR?

From opening issues and improving our docs to building features, and writing tests, there are various ways to help!

We appreciate and value all contributions to NEAR.

## Ways to Contribute

If you happen to notice any bugs, open an issue. If you have a more involved suggestion for the NEAR Protocol standard, we encourage you to submit a [NEAR enhancement proposal](https://github.com/nearprotocol/NEPs) \(NEPs\).

Take a look at existing issues in our various repo's to see what you can work on. If you're interested in working on an issue, we recommend you comment on it so that a maintainer can bring you up to speed, and so that others know you are working on it.

If there's something you'd like to work on, but isn't captured by an existing issue, feel free to open an issue to start that discussion!

We'll always need help improving documentation, creating tutorials, and writing tests.

## Open Issues in NEAR repositories

There are various repo's you can contribute to. If you're looking to collaborate and want to find easy tasks to start, look at the issues we marked as "Good first issue".

[nearcore](https://github.com/nearprotocol/nearcore/issues) - Official NEAR Protocol client

[near-shell](https://github.com/nearprotocol/near-shell/issues) - General purpose command line tools for interacting with NEAR Protocol

[near-lib](https://github.com/nearprotocol/nearlib/issues) - JavaScript SDK to interact with NEAR Protocol

[near-studio](https://github.com/nearprotocol/NEARStudio/issues) - IDE for building smart contracts on NEAR Protocol

[near-wallet](https://github.com/nearprotocol/near-wallet/issues) - Web wallet for Near Protocol which stores keys in browser's localStorage

[near-explorer](https://github.com/nearprotocol/near-explorer/issues) - NEAR blockchain explorer

[docs](https://github.com/nearprotocol/docs/issues) - Documentation for Near

## Creating and submitting a Pull Request

As a contributor, you are expected to fork a repository, work on your own fork and then submit a pull request. The pull request will be reviewed and eventually merged into the main repo. See ["Fork-a-Repo"](https://help.github.com/articles/fork-a-repo/) for how this works.

## A typical workflow

Make sure your fork is up to date with the main repository:

```text
cd near-core
git remote add upstream https://github.com/nearprotocol/nearcore.git
git fetch upstream
git pull --rebase upstream master
```

**NOTE: The directory near-core represents your fork's local copy.**

Branch out from `master` into `fix/some-bug-#123`: \(Postfixing \#123 will associate your PR with the issue \#123 and make everyone's life easier =D\)

```text
git checkout -b fix/some-bug-#123
```

Make your changes, add your files, commit and push to your fork.

```text
git add SomeFile.js
git commit "Fix some bug #123"
git push origin fix/some-bug-#123
```

Go to [https://github.com/nearprotocol/nearcore](https://github.com/nearprotocol/nearcore) in your web browser and issue a new pull request.

Read the PR template very carefully and make sure to follow all the instructions. These instructions refer to some very important conditions that your PR must meet in order to be accepted, such as making sure that all tests pass, etc.

Maintainers will review your code and possibly ask for changes before your code is pulled in to the main repository. We'll check that all tests pass, review the coding style, and check for general code correctness. If everything is OK, we'll merge your pull request and your code will be part of the NEAR repo.

Please pay attention to the maintainer's feedback, since its a necessary step to keep up with the standards NEAR attains to.

## All set!

If you have any questions feel free to post them to our [discord channel](http://near.chat).

Thanks for your time and code!
