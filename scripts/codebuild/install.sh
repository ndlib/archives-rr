#!/bin/bash

echo "----- INSTALL -------"

# build the react app
npm install -g yarn || { echo "Npm install failed" ;exit 1; }

yarn install || { echo "yarn install failed" ;exit 1; }
