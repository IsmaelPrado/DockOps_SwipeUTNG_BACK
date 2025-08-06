#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

until pg_isready -h "$host" -p 5432; do
  echo "Esperando a que PostgreSQL esté listo..."
  sleep 2
done

echo "PostgreSQL está listo. Ejecutando comando."
exec $cmd
