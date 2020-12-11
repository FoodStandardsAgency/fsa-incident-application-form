# add secrets here...
files of the format `set_<xxx>.sh` are executed when the app is run locally to prime any environment variables we need.

Note that all .sh files in this folder are AND SHOULD BE .gitignored as no values from these files should ever go near the repository!

# example:
## set_API_dependencies.sh
```
export LOOKUP_API_BASE_URL="http://test-hooks:3069"
export LOOKUP_API_PATH="/sims-lookups"
export PAYLOAD_SUBMISSION_API_BASE_URL="http://test-hooks:3069"
export PAYLOAD_SUBMISSION_API_PATH="/incident-payload"
```

## set_gov_notify_key.sh
```
export GOV_NOTIFY_API_KEY=<get key from gov notify..>
export NOTIFICATION_EMAIL=<an email registered with the gov notify key provided, preferably yours...>
```
## set_session_key.sh
```
export SESSION_KEY=03978Xjb19nh6mR9kQ6B
```
note- this session key is unique per environment, so using this for your local development work is fine, and allowing it to be shared in this manner doesn't compromise anything as we do not use this value outside our (ephemeral) CI servers.
