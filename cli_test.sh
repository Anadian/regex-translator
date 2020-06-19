#!/bin/bash
declare -A test_results;
all_test_passed=1;
# Test: HelpData
test_name='HelpData';
test_results[$test_name]=0;
echo 'node source/main.js -Vhc';
node source/main.js -Vhc 1>temp_stdout.txt 2>temp_stderr.txt;
test_code=$?;
test_stdout=`cat temp_stdout.txt`;
test_stderr=`cat temp_stderr.txt`;
rm temp_stdout.txt temp_stderr.txt;
if [[ $test_code ]]; then
	test_results[$test_name]=1;
else
	test_results[$test_name]=0;
	echo "Test: $test_name failed with erroneous exit code $test_code (stderr: '$test_stderr')";
fi

# Test: InputRegexStringToSTDOUT
test_name='InputRegexStringToSTDOUT';
test_results[$test_name]=0;
node source/main.js --input-regex-string 'pcre/(simple)? regex/replace/vim' -o 1>temp_stdout.txt 2>temp_stderr.txt;
test_code=$?;
test_stdout=`cat temp_stdout.txt`;
test_stderr=`cat temp_stderr.txt`;
rm temp_stdout.txt temp_stderr.txt;
expected_stdout='\(simple\)\= regex';
if [[ $test_code ]]; then
	echo $test_stdout;
	if [[ "$test_stdout" == "$expected_stdout" ]]; then
		test_results[$test_name]=1;
		echo "Test: $test_name passed.";
	else
		test_results[$test_name]=0;
		echo "Test: $test_name failed: actual stdout: '$test_stdout' didn't match expected stdout: '$expected_stdout' (stderr: '$test_stderr')";
	fi
else
	test_results[help_data]=0;
	echo "Test: $test_name returned an erroneous exit code: $test_code stderr: '$test_stderr'";
fi

# Test: InputFileToOutputFile
test_name='InputFileToOutputFile';
test_results[$test_name]=0;
echo ':([-0-9A-Za-z_ ]*)?:([0-9A-Za-z_]+)?:(([-0-9A-Za-z]+)(=([0-9A-Za-z]))?)?:(0|(([NIRBWAUFDnirbwaufd])[^!?=;]*([!?])(=(((\|)|(([-0-9A-Za-z_.\/\\ ]+)([!?])?)))+)?));' > temp_input.txt;
echo $'node source/main.js -vx --input temp_input.txt --input-flavour \'pcre\' --output-flavour \'vim\' --output \'temp_output.txt\'';
node source/main.js -vx --input temp_input.txt --input-flavour 'pcre' --output-flavour 'vim' --output 'temp_output.txt' 1>temp_stdout.txt 2>temp_stderr.txt;
test_code=$?;
test_stdout=`cat temp_stdout.txt`;
test_stderr=`cat temp_stderr.txt`;
rm temp_stdout.txt temp_stderr.txt;
if [[ $test_code ]]; then
	cat temp_output.txt;
else
	test_results[$test_name]=0;
	echo "Test: $test_name failed with erroneous exit code $test_code (stderr: '$test_stderr')";
fi

