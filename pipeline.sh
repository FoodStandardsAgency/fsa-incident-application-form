#!/usr/bin/env bash

source ./start.sh

cd test && npm install && npx cypress run
cypressResult=$?

docker-compose down
exit $cypressResult
