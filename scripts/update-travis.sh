#!/bin/bash

scripts_directory=$(dirname $0);
echo "scripts_directory: $scripts_directory";
project_directory="$scripts_directory/..";
echo "project_directory: $project_directory";

cd $project_directory;

json2yaml --preserve-key-order ci/travis.json .travis.yml;
