#!/usr/bin/env bash

# Set and check environment variables and secrets
for s in $(ls secrets/set_*); do
    echo " - $s"
    source $s
done

if [ -z "$GOV_NOTIFY_API_KEY" ]; then
    echo "WARNING: GOV NOTIFY API KEY NOT SET"
fi

cd "$HERE" && docker-compose up -d --build

cd "$HERE" && cd test && npm install && npx cypress run
cypressResult=$?

docker-compose down
exit $cypressResult
