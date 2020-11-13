---
id: technical-contribution
title: Developer
sidebar_label: Developer
---

## Ways to Contribute to the code

If you happen to notice any bugs, open an issue. If you have a more involved suggestion for the NEAR Protocol standard, we encourage you to submit a [NEAR enhancement proposal](https://github.com/nearprotocol/NEPs) \(NEPs\).

Take a look at existing issues in our various repo's to see what you can work on. If you're interested in working on an issue, we recommend you comment on it so that a maintainer can bring you up to speed, and so that others know you are working on it.

If there's something you'd like to work on, but isn't captured by an existing issue, feel free to open an issue to start that discussion!

We'll always need help improving documentation, creating tutorials, and writing tests.

## Open Issues in NEAR repositories

There are [various repo's](https://github.com/near) you can contribute to. If you're looking to collaborate and want to find easy tasks to start, look at the issues we marked as ["Good first issue"](https://github.com/search?q=org%3Anearprotocol+is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22&unscoped_q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

## Creating and submitting a Pull Request

As a contributor, you are expected to fork a repository, work on your own fork and then submit a pull request. The pull request will be reviewed and eventually merged into the main repo. See ["Fork-a-Repo"](https://help.github.com/articles/fork-a-repo/) for how this works.

## A typical workflow

Make sure your fork is up to date with the main repository:

```text
cd near-core
git remote add upstream https://github.com/near/nearcore.git
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

Go to [https://github.com/near/nearcore](https://github.com/near/nearcore) in your web browser and issue a new pull request.

Read the PR template very carefully and make sure to follow all the instructions. These instructions refer to some very important conditions that your PR must meet in order to be accepted, such as making sure that all tests pass, etc.

Maintainers will review your code and possibly ask for changes before your code is pulled in to the main repository. We'll check that all tests pass, review the coding style, and check for general code correctness. If everything is OK, we'll merge your pull request and your code will be part of the NEAR repo.

Please pay attention to the maintainer's feedback, since its a necessary step to keep up with the standards NEAR attains to.

## All set!

If you have any questions feel free to post them to our [discord channel](http://near.chat).

Thanks for your time and code!

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8> Ask it on stack overflow! </h8>
</a>
