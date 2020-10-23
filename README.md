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
