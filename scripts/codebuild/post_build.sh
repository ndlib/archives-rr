#!/bin/bash

echo "----- POST-BUILD -----"

# This isn't really necessary in the pipeline so don't waste time bothering unless it's a local deploy
# After deploying, it's kind of annoying and confusing if the configuration is not set to dev.
# Therefore, rebuild dev config if not already using it.
if [ ${LOCAL_DEPLOY:=false} = true ] && [ $STAGE != 'dev' ]
then
  node ./scripts/buildConfig.js stage=dev
fi

echo -e "\nBuild completed successfully.\n"
