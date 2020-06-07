#!/usr/local/bin/node
'use strict';
/**
# [extract-documentation-comments.js](source/main.js)
> Simply extract documentation comments from a source file.

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
> The status and feature lifecycle keywords used in this documentation are based off of my own standard [defined here]().
*/

//#Dependencies
	//##Internal
	//##Standard
	const FileSystem = require('fs');
	//##External
	const GetStream = require('get-stream');

//#Constants
const FILENAME = 'extract-documentation-comments.js';
const MODULE_NAME = 'ExtractDocumentationComments';
var PACKAGE_JSON = {};
var PROCESS_NAME = '';
/* istanbul ignore else */
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

/**
### getDocumentationStringFromSourceString
> Returns a string containing only the contents of `\/** ... *\/` style documentation strings from the given source-file string.

Parametres:
| name | type | description |
| --- | --- | --- |
| source_string | {string} | The source file, as a string, to parse for `\/** ... *\/` style documentation strings. |
| options | {?object} | \[Reserved\] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {string} | A string containing all of the documentation style comments, with the comment markers themselves remove, concatenated together. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if `source_string` isn't a string. |

Status:
| version | change |
| --- | --- |
| 0.0.1 | Introduced |
*/
function getDocumentationStringFromSourceString( source_string, options = {} ){
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error;
	var regex = null;
	var matches_iterator = null;
	var matches_array = [];
	var documentation = '';
	const FUNCTION_NAME = 'getDocumentationStringFromSourceString';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	//Parametre checks
	if( typeof(source_string) !== 'string' ){
		return_error = new TypeError('Param "source_string" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	//Function
	regex = new RegExp('/\\*\\*\\n([\\t\\n\\r -~]*?)\\*/', 'gs');
	matches_iterator = source_string.matchAll(regex);
	matches_array = Array.from(matches_iterator);
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `matches: ${matches_array}`});
	for( var index = 0; index < matches_array.length; index++ ){
		documentation += matches_array[index][1];
	}
	_return = documentation;

	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}

/**
### getDocumentationStringFromSourceString_Test (private)
> Tests [getDocumentationStringFromSourceString](#getDocumentationStringFromSourceString); this function is not exported and should only be used internally by this module. 
 
Returns:
| type | description |
| --- | --- |
| {boolean} | Returns `true` if all tests pass successfully. |

Throws:
| code | type | condition |
| --- | --- | --- |
| any | {Error} | Thrown if a test fails. |

Status:
| version | change |
| --- | --- |
| 0.0.1 | Introduced |
*/
/* istanbul ignore next */
function getDocumentationStringFromSourceString_Test(){
	const FUNCTION_NAME = 'getDocumentationStringFromSourceString_Test';
	//Variables
	var _return = false;
	var return_error = null;
	var arg_test = false;
	var success_test = false;
	var sample_input = 'something\n/**\n* should appear\nalso should appear\n*/\nshould not appear\n/**\nshould appear round two\n*/\nshould not appear\n';
	var expected_output = '* should appear\nalso should appear\nshould appear round two\n';
	var actual_output = '';
	//Tests
	///Invalid arg test
	try{
		getDocumentationStringFromSourceString( {} );
		arg_test = new Error(`Failure: invalid arg test: didn't throw an error when it received an invalid argument.`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: arg_test.message});
	} catch(error){
		if( error.code === 'ERR_INVALID_ARG_TYPE' ){
			arg_test = true;
		} else{
			arg_test = error;
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Failure: invalid arg test: received an unexpected error: ${error}\n`});
		}
	}
	///success test
	try{
		actual_output = getDocumentationStringFromSourceString( sample_input );
		if( actual_output === expected_output ){
			success_test = true;
		} else{
			success_test = new Error(`success test failed: actual output: '${actual_output}' didn't match expected output '${expected_output}'`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: success_test.message});
		}
	} catch(error){
		success_test = error;
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Failure: success test caught an unexpected error: ${error}\n`});
	}
	if( (arg_test === true) && (success_test === true) ){
		_return = true;
	} else{
		_return = false;
		return_error = new Error(`Test failed: invalid arg test: '${arg_test}' success test: '${success_test}'\n`);
		throw return_error;
	}
	//Return
	return _return;
}

/**
### getDocumentationStringFromSourceBuffer
> Returns a string containing only the contents of `\/** ... *\/` style documentation strings from the given source-file buffer.

Parametres:
| name | type | description |
| --- | --- | --- |
| source_buffer | {Buffer} | The source file, as a Node Buffer, to parse for `\/** ... *\/` style documentation strings. |
| options | {?object} | \[Reserved\] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {string} | A string containing all of the documentation style comments, with the comment markers themselves remove, concatenated together. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if `source_buffer` isn't a Buffer. |
| 'ERR_INVALID_RETURN_VALUE' | {Error} | Thrown if `source_buffer.toString()` returns an empty string or a non-string. |

Status:
| version | change |
| --- | --- |
| 0.0.1 | Introduced |
*/
function getDocumentationStringFromSourceBuffer( source_buffer , options = {} ){
	var _return = '';
	var return_error;
	var buffer_string = '';
	const FUNCTION_NAME = 'getDocumentationStringFromSourceBuffer';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments}`});
	//Variables
	//Parametre checks
	if( Buffer.isBuffer(source_buffer) === false ){
		return_error = new TypeError('Param "source_buffer" is not Buffer.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Throwing error: ${return_error}`});
		throw return_error;
	}
	//Function
	buffer_string = source_buffer.toString( 'utf8' );
	if( buffer_string !== '' ){
		/* istanbul ignore next */
		try{
			_return = getDocumentationStringFromSourceString( buffer_string, options );
		} catch(error){
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Received and throwing error: ${error}`});
			throw error;
		}
	} else{
		return_error = new Error(`'source_buffer.toString()' returned an empty string or a non-string: ${buffer_string}`);
		return_error.code = 'ERR_INVALID_RETURN_VALUE';
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Throwing error: ${return_error}`});
		throw return_error;
	}
	

	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}

/**
### getDocumentationStringFromSourceBuffer_Test (private)
> Tests [getDocumentationStringFromSourceBuffer](#getDocumentationStringFromSourceBuffer); this function is not exported and should only be used internally by this module. 
 
Returns:
| type | description |
| --- | --- |
| {boolean} | Returns `true` if all tests pass successfully. |

Throws:
| code | type | condition |
| --- | --- | --- |
| any | {Error} | Thrown if a test fails. |

Status:
| version | change |
| --- | --- |
| 0.0.1 | Introduced |
*/
/* istanbul ignore next */
function getDocumentationStringFromSourceBuffer_Test(){
	const FUNCTION_NAME = 'getDocumentationStringFromSourceBuffer_Test';
	//Variables
	var _return = false;
	var return_error = null;
	var test_name = '';
	var arg_test = false;
	var null_buffer_test = false;
	var success_test = false;
	var input = null;
	var expected_output = '* should appear\nalso should appear\nshould appear round two\n';
	var actual_output = '';
	//Tests
	test_name = 'invalid arg test';
	try{
		getDocumentationStringFromSourceBuffer( 'something' );
		arg_test = new Error(`Failure: ${test_name}: failed to return an error even when arguments were invalid.`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: arg_test.message});
	} catch(error){
		if( error.code === 'ERR_INVALID_ARG_TYPE' ){
			arg_test = true;
		} else{
			arg_test = new Error(`Failure: ${test_name}: received an unexpected error: '${error}'`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: arg_test.message});
		}
	}
	test_name = 'null buffer test';
	try{
		input = Buffer.from('', 'utf8');
		getDocumentationStringFromSourceBuffer( input );
		null_buffer_test = new Error(`Failure: ${test_name}: failed to return an error when sent an empty buffer.`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: null_buffer_test.message});
	} catch(error){
		if( error.code === 'ERR_INVALID_RETURN_VALUE' ){
			null_buffer_test = true;
		} else{
			null_buffer_test = new Error(`Failure: ${test_name}: received an unexpected error: ${error}`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: null_buffer_test.message});
		}
	}
	test_name = 'success test';
	try{
		input = Buffer.from('something\n/**\n* should appear\nalso should appear\n*/\nshould not appear\n/**\nshould appear round two\n*/\nshould not appear\n', 'utf8');
		actual_output = getDocumentationStringFromSourceBuffer( input );
		if( actual_output === expected_output ){
			success_test = true;
		} else{
			success_test = new Error(`Failure: ${test_name}: actual output '${actual_output}' didn't match expected output '${expected_output}'`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: success_test.message});
		}
	} catch(error){
		success_test = new Error(`Failure: ${test_name}: caught unexpected exception: ${error}`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: success_test.message});
	}
	//Return
	if( (arg_test === true) && (null_buffer_test === true) && (success_test === true) ){
		_return = true;
	} else{
		return_error = new Error(`Test failed: invalid arg test: '${arg_test}' null buffer test: '${null_buffer_test}' success test: '${success_test}'`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		throw return_error;
	}
	return _return;
}

/**
### main_Async (private)
> The main function when the script is run as an executable without the `--test` command-line option. Not exported and should never be manually called.

Parametres:
| name | type | description |
| --- | --- | --- |
| options | {?options} | An object representing the command-line options. \[default: {}\] |

Status:
| version | change |
| --- | --- |
| 0.0.1 | Introduced |
*/
/* istanbul ignore next */
async function main_Async( options = {} ){
	var arguments_array = Array.from(arguments);
	var return_error = null;
	const FUNCTION_NAME = 'main_Async';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	var input_string = '';
	var output_string = '';
	//Parametre checks
	//Function
	///Input
	if( options.stdin === true ){
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'info', message: 'Reading input from STDIN.'});
		try{
			input_string = await GetStream( process.stdin, 'utf8' );
		} catch(error){
			return_error = new Error(`GetStream threw an error: ${error}`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		}
	} else if( options.input != null ){
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'info', message: 'Reading input from a file.'});
		if( typeof(options.input) === 'string' ){
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `options.input: '${options.input}'`});
			try{
				input_string = FileSystem.readFileSync( options.input, 'utf8' );
			} catch(error){
				return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			}
		} else{
			return_error = new Error('"options.input" is not a string.');
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		}
	} else{
		return_error = new Error('No input options specified.');
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
	}
	///Transform
	if( return_error === null ){
		if( input_string !== '' && typeof(input_string) === 'string' ){
			try{
				output_string = getDocumentationStringFromSourceString( input_string, options );
			} catch(error){
				return_error = new Error(`getDocumentationStringFromSourceString threw an error: ${error}`);
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			}
		} else{
			return_error = new Error('input_string is either null or not a string.');
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		}
	}
	///Output
	if( return_error === null ){
		if( output_string !== '' && typeof(output_string) === 'string' ){
			if( options.output != null && typeof(output_string) === 'string' ){
				try{
					FileSystem.writeFileSync( options.output, output_string, 'utf8' );
				} catch(error){
					return_error = new Error(`FileSystem.writeFileSync threw an error: ${error}`);
					Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
				}
			} else{
				if( options.stdout !== true ){
					Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'warn', message: 'No output options specified; defaulting to STDOUT.'});
				}
				console.log(output_string);
			}
		} else{
			return_error = new Error('"output_string" is either null or not a string.');
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		}
	}

	//Return
	if( return_error !== null ){
		process.exitCode = 1;
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'crit', message: return_error.message});
	}
}

/**
### main_Async_Test (private)
> The main function when the script is run as an executable **with** the `--test` command-line option. Runs all of the other `*_Test()`-type unit-test functions in this module. Not exported and should never be manually called.

Parametres:
| name | type | description |
| --- | --- | --- |
| options | {?options} | An object representing the command-line options. \[default: {}\] |

Status:
| version | change |
| --- | --- |
| 0.0.1 | Introduced |
*/
/* istanbul ignore next */
async function main_Async_Test(){
	const FUNCTION_NAME = 'main_Async_Test';
	//Variables
	var _return = false;
	var return_error = null;
	//Tests
	try{
		getDocumentationStringFromSourceString_Test();
		getDocumentationStringFromSourceBuffer_Test();
	} catch(error){
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'crit', message: `Test failed with error: '${error}'`});
		process.exitCode = 4;
	}
	//Return
	return _return;
}

//#Exports and Execution
/* istanbul ignore else */
if(require.main === module){
	var _return = [1,null];
	const FUNCTION_NAME = 'MainExecutionFunction';
	//##Dependencies
		//###Internal
		//###Standard
		const Path = require('path');
		//###External
		const MakeDir = require('make-dir');
		const ApplicationLogWinstonInterface = require('application-log-winston-interface');
		const EnvPaths = require('env-paths');
		const CommandLineArgs = require('command-line-args');
		const CommandLineUsage = require('command-line-usage');
	//Constants
	const EnvironmentPaths = EnvPaths( PROCESS_NAME );
	const OptionDefinitions = [
		//UI
		{ name: 'help', alias: 'h', type: Boolean, description: 'Writes this help text to stdout.' },
		{ name: 'noop', alias: 'n', type: Boolean, description: '[Reserved] Show what would be done without actually doing it.' },
		{ name: 'verbose', alias: 'v', type: Boolean, description: 'Verbose output to stderr.' },
		{ name: 'version', alias: 'V', type: Boolean, description: 'Writes version information to stdout.' },
		{ name: 'no-quick-exit', alias: 'x', type: Boolean, description: 'Don\'t immediately exit after printing help, version, and/or config information.' },
		//Input
		{ name: 'stdin', alias: 'i', type: Boolean, description: 'Read input from stdin.' },
		{ name: 'input', alias: 'I', type: String, description: 'The path to the file to read input from.' },
		{ name: 'test', alias: 't', type: Boolean, description: 'Run unit tests and exit.' },
		//Output
		{ name: 'stdout', alias: 'o', type: Boolean, description: 'Write output to stdout.' },
		{ name: 'output', alias: 'O', type: String, description: 'The name of the file to write output to.' },
		{ name: 'pasteboard', alias: 'p', type: Boolean, description: '[Reserved] Copy output to pasteboard (clipboard).' },
		//Config
		{ name: 'config', alias: 'c', type: Boolean, description: '[Reserved] Print configuration values and information to stdout.' },
		{ name: 'config-file', alias: 'C', type: String, description: '[Reserved] Use the given config file instead of the default.' },
	];
	//Variables
	var function_return = [1,null];
	var quick_exit = false;
	var source_dirname = '';
	var parent_dirname = '';
	var package_path = '';
	//Logger
	/* istanbul ignore next */
	try{ 
		MakeDir.sync( EnvironmentPaths.log );
	} catch(error){
		console.error('MakeDir.sync threw: %s', error);
	}
	function_return = ApplicationLogWinstonInterface.InitLogger('debug.log', EnvironmentPaths.log);
	if( function_return[0] === 0 ){
		setLogger( function_return[1] );
	}
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: 'Start of execution block.'});
	//Options
	var Options = CommandLineArgs( OptionDefinitions );
	//Config
	/* istanbul ignore next */
	if( Options.verbose === true ){
		Logger.real_transports.console_stderr.level = 'debug';
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: `Logger: console_stderr transport log level set to: ${Logger.real_transports.console_stderr.level}`});
	}
	///Load package.json
	/* istanbul ignore next */
	try{
		source_dirname = Path.dirname( module.filename );
		package_path = Path.join( source_dirname, 'package.json' );
		PACKAGE_JSON = require(package_path);
	} catch(error){
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `Soft error: ${error}`});
		try{
			parent_dirname = Path.dirname( source_dirname );
			package_path = Path.join( parent_dirname, 'package.json' );
			PACKAGE_JSON = require(package_path);
		} catch(error){
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `Soft error: ${error}`});
		}
	}
	//Main
	/* istanbul ignore next */
	if( Options.version === true ){
		console.log(PACKAGE_JSON.version);
		quick_exit = true;
	}
	/* istanbul ignore next */
	if( Options.help === true ){
		const help_sections_array = [
			{
				header: 'extract-documentation-comments',
				content: 'Simply extract documentation comments from a source file.',
			},
			{
				header: 'Options',
				optionList: OptionDefinitions
			}
		]
		const help_message = CommandLineUsage(help_sections_array);
		console.log(help_message);
		quick_exit = true;
	}
	/* istanbul ignore next */
	if( Options.config === true ){
		quick_exit = true;
	}
	if( quick_exit === false || Options['no-quick-exit'] === true ){
		/* istanbul ignore else */
		if( Options.test === true ){
			main_Async_Test();
		} else{
			main_Async( Options );
		}
	}
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: 'End of execution block.'});
} else{
	exports.setLogger = setLogger;
	exports.getDocumentationFromSourceString = getDocumentationFromSourceString;
	exports.getDocumentationFromSourceBuffer = getDocumentationFromSourceBuffer;
}

