#!/bin/bash
if [[ './source/main.js -Vhc' ]]; then
	cli_test_stdout=`./source/main.js --input-regex-string 'pcre/(simple)? regex/replace/vim' -o`;
	echo $cli_test_stdout
	if [[ $cli_test_stdout == '\(simple\)\= regex' ]]; then
		exit 0;
	else
		exit 1;
	fi
else
	exit 1;
fi
