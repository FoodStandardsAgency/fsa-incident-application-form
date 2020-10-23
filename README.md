# fsa-incident-application-form

# pre-requisites:
* node.js ^13.8.0
* docker

# getting started
```
git clone https://github.com/foundry4/fsa-incident-application-form.git
cd fsa-incident-application-form
npm test
```

# making changes
make sure you're on the latest code
```
git fetch
git checkout dev
git pull
```

create a branch for your work
```
git checkout -b 'my_work_spaces_not_allowed'
```

do your work...
add + commit + push your changes..
```
git add .
git commit -m '[WHY] thing you are changing'
git push
```
note; the first time you do this on a new branch git prompts you to run a more complicated push command.. you can just copy+paste+run the command it offers.

Go to https://github.com/foundry4/fsa-incident-application-form
you should see an alert that your branch has been created; raise a PR to merge that branch into dev

Raising the PR will cause the automated tests to run. You will not be able to merge until they are green.
Once everything is green; do a squash+merge. Note- make sure your PR has a nice name because this will be what people see...

Once you have merged; be a good citizen and click 'delete branch'.. keep the campsite tidy..

Merging the change into dev will cause the app to be deployed into the development environment.

# releasing to production

merges into the 'production' branch are released to production.

get everything up to date locally:
```
git fetch

git checkout dev
git pull
git status

git checkout production
git pull
git status
```
(note the `git status` - it's always worth checking that you've not got local changes floating around if you're a developer.. if this shows that your local 'dev' or 'production' branch isn't in perfect sync with origin you'll want to make it so before you do any merging.. google is your friend.)

and from the production branch, merge dev.. + push the changes..

```
git checkout production
git merge dev
git push
```

# environments:

dev environment (should always contain the content of 'dev' branch): https://fsa-incident-report-form-dev.azurewebsites.net/

production environment (should always contain the content of 'production' branch): https://fsa-incident-report-form-prd.azurewebsites.net/

# secrets:

secrets are maintained in github: https://github.com/foundry4/fsa-incident-application-form/settings/secrets

these secrets are read by the github actions scripts under ./github/workflows/*.yml

It should be obvious that all secrets prefixed with DEV_ correspond to the dev environment; those prefixed with PROD are for the production environment.

## [ENV]_AZURE_CREDENTIALS
must contain the json descriptor given when you generate a service-principal for the job. (Paul Layton set this up for us in dev+production, but the basic process is described here: https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli). Note; once this is in place and working there should be no reason for it to change unless someone deletes the service-principal in which case it would need re-generating + this field would need repopulating

## [ENV]_CONTAINER_REGISTRTY_NAME,  [ENV]_CONTAINER_REGISTRTY_USERNAME, [ENV]_CONTAINER_REGISTRTY_PASSWORD

details of the container registry we store things in.
if you create a new environment this is unfortunately a 2-step process; 1: provide the [ENV]_CONTAINER_REGISTRY_NAME; 2: get your build script to run which will create that CR for you; it will then fail because it can't interact with the CR it just created. 3: go into azure console and find the container registry; get the username+password fields from the azure console and apply them to the appropriate secrets ^

## [ENV]_GOV_NOTIFY_API_KEY
this is the key we use when sending emails. At time of writing everything is using the same 'dev' key. When the site is ready to go live a production key should be created, applied to the PROD field + the service redeployed.

## [ENV]_NOTIFICATION_EMAIL
this is the field that all notification emails are going to be sent to. At time of writing this is set to <my email> because it needed to point somewhere for testing.
Note - the way gov notify keys work is: dev keys can only send to registered email addresses. Someone at fsa will need to register their address (speak to os) and then we can configure this to point elsewhere.
In production, once we've swapped to a production notify key: this restriction will no longer apply and any address will work in here.

## [ENV]_SESSION_KEY
any unique string. This is theoretically a key for decrypting our session data, and the only reason any human would ever need to see this value is to do so. This field should hold a random string of nonsense.
