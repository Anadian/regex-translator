#!/usr/local/bin/node
'use strict';
/**
# [main.test.js](source/main.test.js)
> The main test file for regex-translator.

Internal module name: `RegexTranslatorTest`

Author: Anadian

Code license: MIT
```
	Copyright 2020 Anadian
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
Documentation License: [![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)
> The source-code comments and documentation are written in [GitHub Flavored Markdown](https://github.github.com/gfm/).

> The type notation used in this documentation is based off of the [Google Closure type system](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System).

> The status and feature lifecycle keywords used in this documentation are based off of my own standard [defined here](https://github.com/Anadian/FeatureLifeCycleStateStandard).
*/

//#Dependencies
	//##Internal
	const RegexTranslator = require('./main.js');
	//##Standard
	const FileSystem = require('fs');
	const ChildProcess = require('child_process');
	//##External
	const AVA = require('ava');
	const Pify = require('pify');
//#Constants
const FILENAME = 'main.test.js';
const MODULE_NAME = 'RegexTranslatorTest';
var PACKAGE_JSON = {};
var PROCESS_NAME = '';
if(require.main === module){
	PROCESS_NAME = 'regex-translator';
} else{
	PROCESS_NAME = process.argv0;
}
//##Errors

//#Global Variables
AVA('getMediaryStringFromRegexString:InvalidRegexString', function(t){
	var params = {
		regex_string: {},
		flavour_string: 'pcre'
	};
	var error = t.throws( RegexTranslator.getMediaryStringFromRegexString.bind(null, params.regex_string, params.flavour_string), { instanceOf: TypeError, code: 'ERR_INVALID_ARG_TYPE' }, 'Is this shown?' );
});
AVA('getMediaryStringFromRegexString:InvalidFlavourString', function(t){
	var params = {
		regex_string: '^t*h+i?s{5,10} \\(is\\) [a] \\$+?i*?\\{m\\}\\[p\\].e\\^ \\| <pcre> (r|R)e{1,3}?\\{gex\\}\\.\\+\\*\\?=$\\/\\{[:digit:] \\d \\D \\w \\W [:alnum:] [:graph:] [:lower:] [:punct:] [:upper:] [:xdigit:] \\N [:blank:] \\h \\H [:space:] \\s \\v \\S \\V [:R:]\\\\/',
		flavour_string: {}
	};
	var error = t.throws( RegexTranslator.getMediaryStringFromRegexString.bind(null, params.regex_string, params.flavour_string), { instanceOf: TypeError, code: 'ERR_INVALID_ARG_TYPE' });
});
AVA('getMediaryStringFromRegexString:SuccessPCRE', function(t){
	var params = {
		regex_string: '^t*h+i?s{5,10} \\(is\\) [a] \\$+?i*?\\{m\\}\\[p\\].e\\^ \\| <pcre> (r|R)e{1,3}?\\{gex\\}\\.\\+\\*\\?=$\\/\\{[:digit:] \\d \\D \\w \\W [:alnum:] [:graph:] [:lower:] [:punct:] [:upper:] [:xdigit:] \\N [:blank:] \\h \\H [:space:] \\s \\v \\S \\V [:R:]\\\\/',
		flavour_string: 'pcre'
	};
	var expected = '<SL>t<ZMQ>h<OMQ>i<ZOQ>s<VRQ_START:5:10:VRQ_END> <LOP>is<LCP> <CHARACTER_CLASS_START:a:CHARACTER_CLASS_END> <LDS><LOMQ>i<LZMQ><%LOC%>m<%LCC%><%LOB%>p<%LCB%><MAC>e<LCS> <LPIPE> <%LLT%>pcre<%LGT%> <MOP>r<ORA>R<MCP>e<LVRQ_START:1:3:LVRQ_END><%LOC%>gex<%LCC%><LP><LPS><LAS><LQM><LES><EL><LFS><%LOC%><CC_DIGIT> <CC_DIGIT> <CC_NOTDIGIT> <CC_WORD> <CC_NOTWORD> <CC_alnum> <CC_graph> <CC_lower> <CC_punct> <CC_upper> <CC_xdigit> <CC_NOTNEWLINE> <CC_HORIZONTALSPACE> <CC_HORIZONTALSPACE> <CC_NOTHORIZONTALSPACE> <CC_VERTICALSPACE> <CC_VERTICALSPACE> <CC_VERTICALSPACE> <CC_NOTVERTICALSPACE> <CC_NOTVERTICALSPACE> <CC_R><LBS><RS>';
	t.is( RegexTranslator.getMediaryStringFromRegexString(params.regex_string, params.flavour_string), expected);
});
AVA('getMediaryStringFromRegexString:SuccessVim', function(t){
	var params = {
		regex_string: '^\\(\\t*\\)js\\\\tc(\\([A-Za-z0-9_]\\+ = \\)\\{,1}\\([A-Za-z0-9_.]\\+\\)(\\([^)]*\\)))$',
		flavour_string: 'vim'
	};
	var expected = '<SL><MOP>\\t<ZMQ><MCP>js<LBS>tc<LOP><MOP><CHARACTER_CLASS_START:A-Za-z0-9_:CHARACTER_CLASS_END><OMQ> <LES> <MCP><LVRQ_START::1:LVRQ_END><MOP><CHARACTER_CLASS_START:A-Za-z0-9_<MAC>:CHARACTER_CLASS_END><OMQ><MCP><LOP><MOP><CHARACTER_CLASS_START:<SL><LCP>:CHARACTER_CLASS_END><ZMQ><MCP><LCP><LCP><EL>';
	t.is( RegexTranslator.getMediaryStringFromRegexString(params.regex_string, params.flavour_string), expected);
});
AVA('getRegexStringFromMediaryString:InvalidMediaryString', function(t){
	var params = {
		mediary_string: {},
		flavour_string: 'pcre'
	};
	var error = t.throws( RegexTranslator.getRegexStringFromMediaryString.bind(null, params.mediary_string, params.flavour_string), { instanceOf: TypeError, code: 'ERR_INVALID_ARG_TYPE' }, 'Is this shown?' );
});
AVA('getRegexStringFromMediaryString:InvalidFlavourString', function(t){
	var params = {
		mediary_string: '<SL>t<ZMQ>h<OMQ>i<ZOQ>s<VRQ_START:5:10:VRQ_END> <LOP>is<LCP> <CHARACTER_CLASS_START:a:CHARACTER_CLASS_END> <LDS><LOMQ>i<LZMQ><%LOC%>m<%LCC%><%LOB%>p<%LCB%><MAC>e<LCS> <LPIPE> <%LLT%>pcre<%LGT%> <MOP>r<ORA>R<MCP>e<LVRQ_START:1:3:LVRQ_END><%LOC%>gex<%LCC%><LP><LPS><LAS><LQM><LES><EL><LFS><%LOC%><CC_DIGIT> <CC_DIGIT> <CC_NOTDIGIT> <CC_WORD> <CC_NOTWORD> <CC_alnum> <CC_graph> <CC_lower> <CC_punct> <CC_upper> <CC_xdigit> <CC_NOTNEWLINE> <CC_HORIZONTALSPACE> <CC_HORIZONTALSPACE> <CC_NOTHORIZONTALSPACE> <CC_VERTICALSPACE> <CC_VERTICALSPACE> <CC_VERTICALSPACE> <CC_NOTVERTICALSPACE> <CC_NOTVERTICALSPACE> <CC_R><LBS><RS>',
		flavour_string: {}
	};
	var error = t.throws( RegexTranslator.getRegexStringFromMediaryString.bind(null, params.mediary_string, params.flavour_string), { instanceOf: TypeError, code: 'ERR_INVALID_ARG_TYPE' });
});
AVA('getRegexStringFromMediaryString:SuccessPCRE', function(t){
	var params = {
		mediary_string: '<SL>t<ZMQ>h<OMQ>i<ZOQ>s<VRQ_START:5:10:VRQ_END> <LOP>is<LCP> <CHARACTER_CLASS_START:a:CHARACTER_CLASS_END> <LDS><LOMQ>i<LZMQ><%LOC%>m<%LCC%><%LOB%>p<%LCB%><MAC>e<LCS> <LPIPE> <%LLT%>pcre<%LGT%> <MOP>r<ORA>R<MCP>e<LVRQ_START:1:3:LVRQ_END><%LOC%>gex<%LCC%><LP><LPS><LAS><LQM><LES><EL><LFS><%LOC%><CC_DIGIT> <CC_DIGIT> <CC_NOTDIGIT> <CC_WORD> <CC_NOTWORD> <CC_alnum> <CC_graph> <CC_lower> <CC_punct> <CC_upper> <CC_xdigit> <CC_NOTNEWLINE> <CC_HORIZONTALSPACE> <CC_HORIZONTALSPACE> <CC_NOTHORIZONTALSPACE> <CC_VERTICALSPACE> <CC_VERTICALSPACE> <CC_VERTICALSPACE> <CC_NOTVERTICALSPACE> <CC_NOTVERTICALSPACE> <CC_R><LBS><RS>',
		flavour_string: 'pcre'
	};
	var expected = '^t*h+i?s{5,10} \\(is\\) [a] \\$+?i*?\\{m\\}\\[p\\].e\\^ \\| <pcre> (r|R)e{1,3}?\\{gex\\}\\.\\+\\*\\?\\=$\\/\\{[0-9] [0-9] [^0-9] [A-Za-z0-9_] [^A-Za-z0-9_] [A-Za-z0-9] [!-~] [a-z] [!-\\/:-@[-`{-~] [A-Z] [0-9A-Fa-f] [^\\r\\n] [ \\t] [ \\t] [^ \\t] [\\f\\n\\r\\t\\v] [\\f\\n\\r\\t\\v] [\\f\\n\\r\\t\\v] [^\\f\\n\\r\\t\\v] [^\\f\\n\\r\\t\\v] [\\r\\n\\f\\t\\v]\\\\/';
	t.is( RegexTranslator.getRegexStringFromMediaryString(params.mediary_string, params.flavour_string), expected);
});
AVA('getRegexStringFromMediaryString:SuccessVim', function(t){
	var params = {
		mediary_string: '<SL><MOP>\\t<ZMQ><MCP>js<LBS>tc<LOP><MOP><CHARACTER_CLASS_START:A-Za-z0-9_:CHARACTER_CLASS_END><OMQ> <LES> <MCP><LVRQ_START::1:LVRQ_END><MOP><CHARACTER_CLASS_START:A-Za-z0-9_<MAC>:CHARACTER_CLASS_END><OMQ><MCP><LOP><MOP><CHARACTER_CLASS_START:<SL><LCP>:CHARACTER_CLASS_END><ZMQ><MCP><LCP><LCP><EL>',
		flavour_string: 'vim'
	};
	var expected = '^\\(\\t*\\)js\\\\tc(\\([A-Za-z0-9_]\\+ = \\)\\{-,1}\\([A-Za-z0-9_.]\\+\\)(\\([^)]*\\)))$';
	t.is( RegexTranslator.getRegexStringFromMediaryString(params.mediary_string, params.flavour_string), expected);
});
AVA('getMultiPartObjectFromInputString:InvalidInputString', function(t){
	t.throws( RegexTranslator.getMultiPartObjectFromInputString.bind( null, {} ), { instanceOf: TypeError, code: 'ERR_INVALID_ARG_TYPE' } );
});
AVA('getMultiPartObjectFromInputString:TooManyRegexSeperators', function(t){
	t.throws( RegexTranslator.getMultiPartObjectFromInputString.bind( null, 'start/something/something else/ what the/end' ), { instanceOf: Error, code: 'ERR_INVALID_ARG_VALUE' } );
});
AVA('getMultiPartObjectFromInputString:MinimalInputString', function(t){
	var input_string = 'something';
	var expected_output = {
		input_flavour: null,
		regex_string: 'something',
		replace_string: null,
		output_flavour: null
	};
	var actual_output = RegexTranslator.getMultiPartObjectFromInputString( input_string );
	t.deepEqual( actual_output, expected_output );
});
AVA('getMultiPartObjectFromInputString:MaximalInputString', function(t){
	var input_string = 'pcre/something/else/vim';
	var expected_output = {
		input_flavour: 'pcre',
		regex_string: 'something',
		replace_string: 'else',
		output_flavour: 'vim'
	};
	var actual_output = RegexTranslator.getMultiPartObjectFromInputString( input_string );
	t.deepEqual( actual_output, expected_output );
});
AVA('CLI:HelpData', async function(t){
	//t.log(process.cwd());
	//t.log(process.env);
	var return_error = null;
	var process_object = ChildProcess.fork( 'source/main.js', ['-Vhc'], { silent: true } );
	var promisified_process_object = Pify( process_object, { multiArgs: true, errorFirst: false } );
	//t.log( process_object );
	var results = await promisified_process_object.on( 'exit' );
	t.log(results);
	if( results[0] === 0 ){
		t.pass();
	} else{
		return_error = new Error(`Erroneous exit code: ${results[0]}, signal: ${results[1]}`);
		t.fail(return_error);
	}
});
AVA('CLI:INPUT-REGEX-STRING-to-STDOUT', async function(t){
	//t.plan(2);
	var return_error = null;
	var process_object = ChildProcess.fork( 'source/main.js', ['--input-regex-string', '"pcre/(simple)? regex/replace/vim"', '-o'], { silent: true } );
	var promisified_process_object = Pify( process_object, { multiArgs: true, errorFirst: false } );
	//t.log(promisified_process_object);
	var promisified_stdio_object = Pify( promisified_process_object.stdio );
	var promisified_stdout_object = Pify( promisified_stdio_object[1] );
	var stdout_data = await promisified_stdout_object.on( 'data' );
	//var results = await promisified_process_object.on( 'exit' );
	//t.log(results);
	var expected_stdout_string = '\\(simple\\)\\= regex';
	var stdout_string = stdout_data.toString( 'utf8' );
	t.is(stdout_string,expected_stdout_string);
	/*if( results[0] === 0 ){
		t.pass();
	} else{
		return_error = new Error(`Erroneous exit code: ${results[0]}, signal: ${results[1]}`);
		t.fail(return_error.message);
	}*/
});
AVA.skip('CLI:INPUT-FILE-to-OUTPUT-FILE', function(t){
	var process_object = null;
	var exit_func = function( code, signal ){
		var expected_stdout_string = '\\(simple\\)\\= regex';
		var output_string = '';
		if( code === 0 ){
			try{
				output_string = FileSystem.readFileSync( 'temp_out2.txt', 'utf8' );
				try{
					FileSystem.unlinkSync( 'temp_out2.txt' );
					FileSystem.unlinkSync( 'temp_in.txt' );
					t.is(output_string,expected_stdout_string);
				} catch(error){
					return_error = new Error(`FileSystem.unlinkSync threw an error: ${error}`);
					t.fail(return_error);
				}
			} catch(error){
				return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
				t.fail(return_error);
			}
		} else{
			return_error = new Error(`Erroneous exit code: ${code} signal: ${signal}`);
			t.fail(return_error);
		}
		t.end();
	};
	//var true_exit_func = exit_func.bind( t );
	try{
		FileSystem.writeFileSync( 'temp_in.txt', '(simple)? regex', 'utf8' );
		process_object = ChildProcess.fork( 'source/main.js', ['-vx', '-I', 'temp_in.txt', '--input-flavour', 'pcre', '--output-flavour', 'vim', '-O', 'temp_out2.txt'], { silent: true } );
		t.log(process_object);
		exit_func.bind
		process_object.on('exit', exit_func);
	} catch(error){
		return_error = new Error(`FileSystem.writeFileSync threw an error: ${error}`);
		t.fail(return_error);
	}
});
