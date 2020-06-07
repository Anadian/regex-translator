#!/bin/bash
scripts_directory=$(dirname $0);
echo "scripts_directory: $scripts_directory";
project_directory="$scripts_directory/..";
echo "project_directory: $project_directory";
cd $project_directory;
ln Documents/README.md README.md;
ln Documents/LICENSE LICENSE;
ln Documents/CHANGES.md CHANGES.md;
