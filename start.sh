#!/bin/bash
set -e

echo "Starting server..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Verificar se tsx está instalado
if [ ! -f "node_modules/.bin/tsx" ]; then
  echo "tsx not found, installing..."
  npm install
fi

echo "Starting with tsx..."
exec npx tsx main.ts

