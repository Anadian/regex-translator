#!/usr/local/bin/node
'use strict';
/**
# [extract-documentation-comments-test.js](source/extract-documentation-comments-test.js)
> TAP tests for `extract-documentation-comments`.

Internal module name: `ExtractDocumentationComments`

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
	const ExtractDocumentationComments = require('./main.js');
	//##Standard
	const ChildProcess = require('child_process');
	//##External
	const AVA = require('ava');
//#Constants
const FILENAME = 'extract-documentation-comments-test.js';
const MODULE_NAME = 'ExtractDocumentationComments';
var PACKAGE_JSON = {};
var PROCESS_NAME = '';
if(require.main === module){
	PROCESS_NAME = 'extract-documentation-comments';
} else{
	PROCESS_NAME = process.argv0;
}
//##Errors

//#Global Variables
/* istanbul ignore next */
var Logger = { 
	log: () => {
		return null;
	}
};
//#Functions
/**
## Functions
*/
/**
### setLogger
> Allows this module's functions to log the given logger object.

Parametres:
| name | type | description |
| --- | --- | --- |
| logger | {?object} | The logger to be used for logging or `null` to disable logging. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if `logger` is neither an object nor `null` |

Status:
| version | change |
| --- | --- |
| 0.0.0 | Introduced |
*/
function setLogger( logger ){
	var return_error = null;
	//const FUNCTION_NAME = 'setLogger';
	//Variables
	//Parametre checks
	/* istanbul ignore else */
	if( typeof(logger) === 'object' ){
		/* istanbul ignore next */
		if( logger === null ){
			logger = { 
				log: () => {
					return null;
				}
			};
		}
	} else{
		return_error = new TypeError('Param "logger" is not an object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	//Function
	Logger = logger;
	//Return
}
//Unit tests
AVA('getDocumentationStringFromFilePathSync:invalid_file_path', function(t){
	var test_name = 'getDocumentationStringFromFilePathSync:invalid_file_path';
	t.throws( ExtractDocumentationComments.getDocumentationStringFromFilePathSync.bind( null, {}, {} ), { instanceOf: TypeError, code: 'ERR_INVALID_ARG_TYPE' } );
});
AVA('getDocumentationStringFromFilePathSync:invalid_options', function(t){
	var test_name = 'getDocumentationStringFromFilePathSync:invalid_options';
	t.throws( ExtractDocumentationComments.getDocumentationStringFromFilePathSync.bind( null, 'string', 'something' ), { instanceOf: TypeError, code: 'ERR_INVALID_ARG_TYPE' } );
});
//CLI test
AVA.cb('CLI:HelpData', function(t){
	var test_name = 'CLI:HelpData';
	var process_object = ChildProcess.fork( 'source/main.js', ['-vVhc'], { silent: true } );
	var actual_stdout = '';
	var actual_stderr = '';
	t.plan(1);
	process_object.stdio[1].on('data', function( chunk ){
		console.log(`Test: ${test_name} received stdout chunk: ${chunk.toString('utf8')}`);
		actual_stdout += chunk.toString('utf8');
	});
	process_object.stdio[2].on('data', function( chunk ){
		console.log(` Test: ${test_name} received stderr chunk: ${chunk.toString('utf8')}`);
		actual_stderr += chunk.toString('utf8');
	});
	process_object.on('exit', function( code, signal ){
		console.log(`Test: ${test_name}: process exited with code: ${code} signal: ${signal} stdout: ${actual_stdout} stderr: ${actual_stderr}`);
		if( code === 0 ){
			t.pass();
		} else{
			t.fail();
		}
		t.end();
	});
});
AVA.cb('CLI:ClassicUnitTests', function(t){
	var test_name = 'CLI:ClassicUnitTests';
	var process_object = ChildProcess.fork( 'source/main.js', ['-vx', '--test'], { silent: true } );
	var actual_stdout = '';
	var actual_stderr = '';
	t.plan(1);
	process_object.stdio[1].on('data', function( chunk ){
		console.log(`Test: ${test_name} received stdout chunk: ${chunk.toString('utf8')}`);
		actual_stdout += chunk.toString('utf8');
	});
	process_object.stdio[2].on('data', function( chunk ){
		console.log(` Test: ${test_name} received stderr chunk: ${chunk.toString('utf8')}`);
		actual_stderr += chunk.toString('utf8');
	});
	process_object.on('exit', function( code, signal ){
		console.log(`Test: ${test_name}: process exited with code: ${code} signal: ${signal} stdout: ${actual_stdout} stderr: ${actual_stderr}`);
		if( code === 0 ){
			t.pass();
		} else{
			t.fail();
		}
		t.end();
	});
});
AVA.cb('CLI:MultiFileShellGlob', function(t){
	var test_name = 'CLI:MultiFileShellGlob';
	var process_object = ChildProcess.fork( './source/main.js', ['-v', '-I', 'test/example-source-file.js', 'test/another-test-file.js', '-O', 'temp_docs'], { silent: true } );
	var actual_stdout = '';
	var actual_stderr = '';
	process_object.stdio[1].on('data', function( chunk ){
		console.log(`Test: ${test_name} received stdout chunk: ${chunk.toString('utf8')}`);
		actual_stdout += chunk.toString('utf8');
	});
	process_object.stdio[2].on('data', function( chunk ){
		console.log(` Test: ${test_name} received stderr chunk: ${chunk.toString('utf8')}`);
		actual_stderr += chunk.toString('utf8');
	});
	process_object.on('exit', function( code, signal ){
		console.log(`Test: ${test_name}: process exited with code: ${code} signal: ${signal} stdout: ${actual_stdout} stderr: ${actual_stderr}`);
		if( code === 0 ){
			t.pass();
		} else{
			t.fail();
		}
		t.end();
	});
});
//#Exports and Execution
if(require.main === module){
} else{
	exports.setLogger = setLogger;
}

