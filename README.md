# ITK Apply clang-format Action

This GitHub Action applies clang-format on a PR when requested by adding the
label *action:ApplyClangFormat*.

The bot will run `clang-format` on the current topic branch with ITK's
configuration, force-push the result, and remove the label.

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
    - uses: actions/checkout@v1
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
