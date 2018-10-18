#!/bin/bash

echo "---- BUILD ----"

# build
yarn build || { echo "React Build failed" ;exit 1; }
