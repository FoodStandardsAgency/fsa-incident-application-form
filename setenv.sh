#!/usr/bin/env bash

# Set and check environment variables and secrets
for s in $(ls secrets/set_*); do
    echo " - $s"
    source $s
done

if [ -z "$GOV_NOTIFY_API_KEY" ]; then
    echo "warning, unset environment variable: GOV_NOTIFY_API_KEY"
fi

if [ -z "$NOTIFICATION_EMAIL" ]; then
    echo "warning, unset environment variable: NOTIFICATION_EMAIL"
fi

if [ -z "$SESSION_KEY" ]; then
    echo "warning, unset environment variable: SESSION_KEY"
fi
