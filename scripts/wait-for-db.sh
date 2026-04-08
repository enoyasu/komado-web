#!/usr/bin/env bash
set -euo pipefail

host="${1:-localhost}"
port="${2:-5432}"

echo "waiting for postgres at ${host}:${port} ..."
until nc -z "${host}" "${port}"; do
  sleep 1
done

echo "postgres is ready"
