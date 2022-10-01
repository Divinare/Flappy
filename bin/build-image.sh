#!/bin/bash

set -euo pipefail

docker build -t divinare/flappy:latest ../

echo "Please enter Dockerhub password for Divinare:"
docker login

docker push divinare/flappy:latest
