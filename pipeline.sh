#!/usr/bin/env bash

source ./start.sh

cd test && npm install && npx cypress run
cypressResult=$?

echo "Exiting tests; docker-compose is still running with suitable test-data in it, you can use 'npm stop' to stop it."

exit $cypressResult