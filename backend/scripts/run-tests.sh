#!/usr/bin/bash

set -e
set -x

docker compose build ../docker/docker-compose.yml
docker compose down -v --remove-orphans
docker compose up -d
docker compose exec -T go test ../src/tests/
docker compose down -v --remove-orphans
