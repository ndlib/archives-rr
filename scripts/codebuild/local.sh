#!/bin/bash

export LOCAL_DEPLOY=true

# provide some friendly defaults so the user does not need to assuming they are deploying a dev build
export STAGE=${STAGE:="dev"}

./scripts/codebuild/install.sh || { exit 1; }
./scripts/codebuild/pre_build.sh || { exit 1; }
./scripts/codebuild/build.sh || { exit 1; }
./scripts/codebuild/post_build.sh || { exit 1; }
