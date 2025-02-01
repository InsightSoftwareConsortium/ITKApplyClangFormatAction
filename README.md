# ITK Apply clang-format Action

This GitHub Action applies clang-format on a PR when requested by adding the
label *action:ApplyClangFormat*.

The bot will run `clang-format` on the current topic branch with ITK's
configuration, force-push the result, and remove the label.

*Note*: As of 2020-01-08, this action [currently does not work from forked
repositories](https://github.community/t5/GitHub-Actions/Token-permissions-for-forks-once-again/td-p/33839)
because the [*GITHUB_TOKEN* has limited
permissions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#permissions-for-the-github_token). Branches need to be created on the upstream repository.

## Usage

Add the following configuration to your project's repository at, e.g.,  *.github/workflows/apply-clang-format.yml*.

```yml
name: Apply clang-format to PR

on:
  pull_request:
    types: [labeled]

jobs:
  clang-format:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4.2.2
    - uses: InsightSoftwareConsortium/ITKApplyClangFormatAction@testing
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
```

To change the name of the label used to trigger the formatting, set the
*label-name* input. For example:

```yml
    - uses: InsightSoftwareConsortium/ITKApplyClangFormatAction@testing
      with:
        label-name: 'action:MakeItStylish'
        github-token: ${{ secrets.GITHUB_TOKEN }}
```

## See Also

[ITKClangFormatLinterAction](https://github.com/InsightSoftwareConsortium/ITKClangFormatLinterAction)
