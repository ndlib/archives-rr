#!/bin/bash

echo "----- PRE-BUILD -----"

echo -e "\nFetching application configuration..."
node ./scripts/buildConfig.js stage=$STAGE || { echo "Building config file failed"; exit 1; }
