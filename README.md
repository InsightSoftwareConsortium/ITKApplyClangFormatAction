# ITK apply clang-format action

This GitHub Action applies clang-format on a PR when requested with a label.

## Usage

Add the following configuration to your project's repository at, e.g.,  *.github/workflows/apply-clang-format.yml*.

```yml
on: [push]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
      with:
        fetch-depth: 1
    - uses: InsightSoftwareConsortium/ITKApplyClangFormatAction@master
```
