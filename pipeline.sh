#!/usr/bin/env bash

source ./start.sh

cd test && npm install && npx cypress run
cypressResult=$?

cd .. ^^ source ./stop.sh
exit $cypressResult
