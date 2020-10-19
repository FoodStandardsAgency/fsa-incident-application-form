#!/usr/bin/env bash

# Set and check environment variables and secrets
for s in $(ls secrets/set_*); do
    echo " - $s"
    source $s
done

if [ -z "$GOV_NOTIFY_API_KEY" ]; then
    echo "WARNING: GOV NOTIFY API KEY NOT SET"
fi
