#!/bin/bash
rm temp_stderr.txt;
node -p 'const FileSystem = require("fs"); const TTY = require("tty"); console.log("%o", process, process.stdout.isTTY); FileSystem.writeSync(2, "something");' 2>temp_stderr.txt;
echo "stdout:  stderr: $(cat temp_stderr.txt)";
#  env;
# echo $0 $SHELL;
# # which node;
# # tty;
# # uname -a;
# # whoami;
# declare -A test_results;
# all_test_passed=1;
# # Test: HelpData
# test_name='HelpData';
# test_results[$test_name]=0;
# echo 'node source/main.js -Vhc';
# node source/main.js -Vhc 1>temp_stdout.txt 2>temp_stderr.txt;
# test_code=$?;
# test_stdout=`cat temp_stdout.txt`;
# test_stderr=`cat temp_stderr.txt`;
# # rm temp_stdout.txt temp_stderr.txt;
# if [[ $test_code ]]; then
# 	test_results[$test_name]=1;
# 	echo "Test: $test_name passed. (stdout: '$test_stdout' stderr: '$test_stderr')"; 
# else
# 	test_results[$test_name]=0;
# 	echo "Test: $test_name failed with erroneous exit code $test_code (stderr: '$test_stderr')";
# fi

# Test: InputRegexStringToSTDOUT
# $1est_name='InputRegexStringToSTDOUT';
# $1est_results[$test_name]=0;
# $1ode source/main.js --input-regex-string 'pcre/(simple)? regex/replace/vim' -o 1>temp_stdout.txt 2>temp_stderr.txt;
# $1est_code=$?;
# $1est_stdout=`cat temp_stdout.txt`;
# $1est_stderr=`cat temp_stderr.txt`;
# $1 rm temp_stdout.txt temp_stderr.txt;
# $1xpected_stdout='\(simple\)\= regex';
# $1f [[ $test_code ]]; then
# $1echo $test_stdout;
# $1if [[ "$test_stdout" == "$expected_stdout" ]]; then
# $1	test_results[$test_name]=1;
# $1	echo "Test: $test_name passed.";
# $1else
# $1	test_results[$test_name]=0;
# $1	echo "Test: $test_name failed: actual stdout: '$test_stdout' didn't match expected stdout: '$expected_stdout' (stderr: '$test_stderr')";
# $1fi
# $1lse
# $1test_results[help_data]=0;
# $1echo "Test: $test_name returned an erroneous exit code: $test_code stderr: '$test_stderr'";
# $1i

# Test: InputFileToOutputFile
# $1est_name='InputFileToOutputFile';
# $1est_results[$test_name]=0;
# $1cho ':([-0-9A-Za-z_ ]*)?:([0-9A-Za-z_]+)?:(([-0-9A-Za-z]+)(=([0-9A-Za-z]))?)?:(0|(([NIRBWAUFDnirbwaufd])[^!?=;]*([!?])(=(((\|)|(([-0-9A-Za-z_.\/\\ ]+)([!?])?)))+)?));' > temp_input.txt;
# $1cho $'node source/main.js -vx --input temp_input.txt --input-flavour \'pcre\' --output-flavour \'vim\' --output \'temp_output.txt\'';
# $1ode source/main.js -vx --input temp_input.txt --input-flavour 'pcre' --output-flavour 'vim' --output 'temp_output.txt' 1>temp_stdout.txt 2>temp_stderr.txt;
# $1est_code=$?;
# $1est_stdout=`cat temp_stdout.txt`;
# $1est_stderr=`cat temp_stderr.txt`;
# $1xpected_output_data=':\([-0-9A-Za-z_ ]*\)\=:\([0-9A-Za-z_]\+\)\=:\(\([-0-9A-Za-z]\+\)\(=\([0-9A-Za-z]\)\)\=\)\=:\(0\|\(\([NIRBWAUFDnirbwaufd]\)[^!\==;]*\([!\=]\)\(=\(\(\(|\)\|\(\([-0-9A-Za-z_.\/\\ ]\+\)\([!\=]\)\=\)\)\)\+\)\=\)\);\r';
# $1m temp_stdout.txt temp_stderr.txt;
# $1f [[ $test_code ]]; then
# $1output_data=`cat temp_output.txt`;

# $1lse
# $1test_results[$test_name]=0;
# $1echo "Test: $test_name failed with erroneous exit code $test_code (stderr: '$test_stderr')";
# $1i

