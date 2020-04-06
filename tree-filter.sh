#!/bin/bash

if ! test -f ./.clang-format; then
  cp /ITK.clang-format ./.clang-format
fi
/clang-format.bash --tracked
