#!/bin/bash
set -e

echo "Building Workspace..."
npm install -g pnpm

echo "Installing dependencies..."
pnpm install

echo "Checks completed."
