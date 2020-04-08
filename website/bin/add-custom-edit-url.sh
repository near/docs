#!/bin/bash

# this takes two arguments:
# arg1: directory to search through
# arg2: url to add as "custom_edit_url" in each markdown file in arg1
#
# TODO: use custom markdown theme in source repositories
# link directly to relevant files instead of root repository
# https://github.com/tom-grey/typedoc-plugin-markdown/blob/master/THEMES.md

for f in $1/**/*.md; do
  printf '%s\n' /---/a "custom_edit_url: $2" . w q | ex -s $f
done

for f in $1/*.md; do
  printf '%s\n' /---/a "custom_edit_url: $2" . w q | ex -s $f
done

exit 0
