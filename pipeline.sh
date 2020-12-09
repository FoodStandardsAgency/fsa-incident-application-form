#!/usr/bin/env bash

source ./start.sh

cd test && npm install && npx cypress run
cypressResult=$?

source ./stop.sh
exit $cypressResult
