# Contributing to NEAR

NEAR welcomes help in many forms including development, code review, documentation improvements, and outreach.
Please visit [the contribution overview](https://docs.near.org/docs/community/contribute/contribute-overview) for more information.

## Using GitHub issues and pull requests

Some repositories (including this one) have specific issue templates that will be helpful for maintainers and community contributors. Please use the templates whenever available.

Please include steps to reproduction, if reporting an error. Information on all applicable versions is quite helpful. Some versions can be found using the command line. (For example: `node --version` or `rustc --version`.) Other version information may be packaged as dependencies. (For example: in `package.json` or `Cargo.toml`.)

If there are verbosity flags available, please include those to offer as much information as possible.

When opening a pull request, please use the typical open-source flow of forking the desired repository and opening a pull request from your forked repository. (More information on [technical contributions here](https://docs.near.org/docs/community/contribute/how-to-contribute).)

## Testing

Please note that for technical contributions, NEAR runs a battery of continuous integration tools and tests for each pull request.

It's encouraged to write unit tests on new features. Many NEAR repositories have built-in scripts that run tests locally. Tests may check linting and must be addressed.

For example, a repository might have `yarn test` available. It's a good idea to run tests locally before submitting a pull request, as these will be caught during the CI process.

### Thank you

NEAR values all contributors to the projects in the ecosystem and invites public discussion on the tech and vision. Please feel free to join the conversation using the links offered at [near.help](https://near.help).
