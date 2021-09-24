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

> The status and feature lifecycle keywords used in this documentation are based off of my own standard [defined here](https://github.com/Anadian/FeatureLifeCycleStateStandard).
*/

//#Dependencies
	//##Internal
	//##Standard
	const FileSystem = require('fs');
	const Path = require('path')
	const Utility = require('util');
	//const Assert = require('assert');
	const OperatingSystem = require('os');
	//##External
	const GetStream = require('get-stream');
	const MakeDir = require('make-dir');
	//const Leven = require('leven');
	//const Globby = require('globby');
	//const TAP = require('tap');

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
	},
	setConsoleLogLevel: () => {
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

/*function readFileSyncBinaryMode( file_path, encoding = null ){
	var file_descriptor = FileSystem.openSync( file_path, 'rb' );
	var file_string = FileSystem.readFileSync( file_descriptor, encoding );
	FileSystem.closeSync( file_descriptor );
	return file_string;
}*/
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
| 0.2.9 | Added Latin-1 Supplemental character support. |
| 0.1.6 | Revamped the parsing logic. |
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
	regex = new RegExp('/\\*\\*([\\t\\n\\r -~\u00A1-\u00AC\u00AE-\u00FF]*?)\\*/', 'gsu');
	//regex = new RegExp('/\\*\\*([\\t\\n\\r -~\241-\254\256-\377]*?)\\*/', 'gsu');
	matches_iterator = source_string.matchAll(regex);
	matches_array = Array.from(matches_iterator);
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `matches: ${matches_array}`});
	for( var index = 0; index < matches_array.length; index++ ){
		documentation += (matches_array[index][1])+OperatingSystem.EOL; //Crude and will be polished up soon.
	}
	_return = documentation;
  /*regex = new RegExp(/\/\*\*[\W\w\s\r\n*]*?\*\//, 'gs');
  matches_iterator = source_string.matchAll(regex);
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `matches: ${matches_array}`});
  _return = Array.from(matches_iterator).join('\n').replace(/\/\*\*|\*\/|(?:\r?\n|\r){2,}/g, '')*/ 

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
| 0.1.7 | Cleaned up. |
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
	var sample_input_path = '';
	var sample_input_string = '';//FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testInput.js')).toString()
	var expected_output_path = '';
	var expected_output_string = '';//FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testOutput.txt')).toString()
	var actual_output_string = '';
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
	try {
		try{
			sample_input_path = Path.resolve( __dirname, '../test/example-source-file.js' );
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `sample_input_path: ${sample_input_path}`});
		} catch(error){
			return_error = new Error(`Path.resolve threw an error: ${error}`);
			throw return_error;
		}
		try{
			sample_input_string = FileSystem.readFileSync( sample_input_path, { encoding: 'utf8', flag: 'r' } );
			//sample_input_string = readFileSyncBinaryMode( sample_input_path, 'utf8' );
		} catch(error){
			return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
			throw return_error;
		}
		try{
			expected_output_path = Path.resolve( __dirname, '../test/example-source-file-output.txt' );
		} catch(error){
			return_error = new Error(`Path.resolve threw an error: ${error}`);
			throw return_error;
		}
		try{
			expected_output_string = FileSystem.readFileSync( expected_output_path, { encoding: 'utf8', flag: 'r' } );
			//expected_output_string = readFileSyncBinaryMode( expected_output_path, 'utf8' );
		} catch(error){
			return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
			throw return_error;
		}
		actual_output_string = getDocumentationStringFromSourceString( sample_input_string );
		if( actual_output_string === expected_output_string ){
			success_test = true;
		} else{
			success_test = new Error(`success test failed: actual output: '${actual_output_string}' didn't match expected output '${expected_output_string}'`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: success_test.message});
			//Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Leven difference ${Leven(actual_output_string, expected_output_string)}`});
			//Assert.equal(actual_output_string, expected_output_string);
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
| 0.1.7 | Cleaned up. |
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
	var input_buffer = null;
	var sample_input_path = '';
	var sample_input_buffer = null;
	var expected_output_path = '';
	var expected_output_string = '';//FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testOutput.txt'), 'utf8');
	var actual_output_string = '';
	//Tests
	test_name = 'invalid arg test';
	try{
		getDocumentationStringFromSourceBuffer( 'something' );
		arg_test = new Error(`Failure: ${test_name}: failed to return an error even when arguments were invalid.`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: arg_test.message});
	} catch(error){
		if( error.code === 'ERR_INVALID_ARG_TYPE' ){
			arg_test = true;
			//console.log('arg_test passed.');
		} else{
			arg_test = new Error(`Failure: ${test_name}: received an unexpected error: '${error}'`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: arg_test.message});
		}
	}
	test_name = 'null buffer test';
	try{
		input_buffer = Buffer.from('', 'utf8');
		getDocumentationStringFromSourceBuffer( input_buffer );
		null_buffer_test = new Error(`Failure: ${test_name}: failed to return an error when sent an empty buffer.`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: null_buffer_test.message});
	} catch(error){
		if( error.code === 'ERR_INVALID_RETURN_VALUE' ){
			null_buffer_test = true;
			//console.log('null_buffer_test passed.');
		} else{
			null_buffer_test = new Error(`Failure: ${test_name}: received an unexpected error: ${error}`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: null_buffer_test.message});
		}
	}
	test_name = 'success test';
	try {
		try{
			sample_input_path = Path.resolve( __dirname, '../test/example-source-file.js' );
		} catch(error){
			return_error = new Error(`Path.resolve threw an error: ${error}`);
			throw return_error;
		}
		try{
			sample_input_buffer = FileSystem.readFileSync( sample_input_path );
		} catch(error){
			return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
			throw return_error;
		}
		try{
			expected_output_path = Path.resolve( __dirname, '../test/example-source-file-output.txt' );
		} catch(error){
			return_error = new Error(`Path.resolve threw an error: ${error}`);
			throw return_error;
		}
		try{
			expected_output_string = FileSystem.readFileSync( expected_output_path, 'utf8' );
		} catch(error){
			return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
			throw return_error;
		}
		//input = new Buffer.from(FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testInput.js')), 'utf8')
		actual_output_string = getDocumentationStringFromSourceBuffer( sample_input_buffer );
		if( actual_output_string === expected_output_string ){
			success_test = true;
			//console.log('success_test passed');
		} else{
			success_test = new Error(`Failure: ${test_name}: actual output '${actual_output_string}' didn't match expected output '${expected_output_string}'`);
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
### getDocumentationStringFromFilePathSync
> Generates a documentation String from the source-code comments in the file at the given filepath.

Parametres:
| name | type | description |
| --- | --- | --- |
| file_path | {string} | The file path as a string to read and parse for documentation comments.  |
| options | {?Object} | [Reserved] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {string} | The documentation string for the given file. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if a given argument isn't of the correct type. |

Status:
| version | change |
| --- | --- |
| 0.2.2 | Introduced |
*/
function getDocumentationStringFromFilePathSync( file_path, options = {} ){
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error;
	const FUNCTION_NAME = 'getDocumentationStringFromFilePathSync';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	var file_buffer = null;
	var documentation_string = '';
	//Parametre checks
	if( typeof(file_path) !== 'string' ){
		return_error = new TypeError('Param "file_path" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(options) !== 'object' ){
		return_error = new TypeError('Param "options" is not ?Object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	//Function
	try{
		file_buffer = FileSystem.readFileSync( file_path );
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `file_buffer: ${file_buffer.toString('utf8')}`});
	} catch(error)/* istanbul ignore next */{
		return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
		throw return_error;
	}
	if( file_buffer != null ){
		try{
			documentation_string = getDocumentationStringFromSourceBuffer( file_buffer, options );
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `documentation_string: ${documentation_string}`});
		} catch(error)/* istanbul ignore next */{
			return_error = new Error(`getDocumentationStringFromSourceString threw an error: ${error}`);
			throw return_error;
		}
	}
	if( documentation_string != null ){
		_return = documentation_string;
	}
	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
/*
### generateDocumentationDirectoryFromFileGlobSync
> Creates a documentation directory mirroring the structure of the file paths matching the given glob.

Parametres:
| name | type | description |
| --- | --- | --- |
| file_glob | {string} | The POSIX-y glob of files to be read and parsed to generate the documentation files in the given output directory.  |
| output_directory | {?string} | The name of the output directory to create and place the documentation files in. If `null` or not specified, the value of `options.output` will be used; if neither are specified, an error will be thrown.  |
| options | {?Object} | Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {Object} | A report detailing what actions succeeded and what failed. The `success` property will be true if everything is good. The `steps` property is a hiearchical breakdown of what files were created and any failures that occured. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if a given argument isn't of the correct type. |
| 'ERR_INVALID_ARG_VALUE' | {Error} | Thrown if no output directory is specified in either the `output_directory` parametre or `options.output`. |
| 'ERR_INVALID_RETURN_VALUE' | {Error} | Thrown if the glob doesn't produce a valid array of file paths. |

Status:
| version | change |
| --- | --- |
| 0.2.8 | Obsolete |
| 0.2.2 | Introduced |
*
/* istanbul ignore next *
function generateDocumentationDirectoryFromFileGlobSync( file_glob, output_directory, options = {} ){
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error;
	const FUNCTION_NAME = 'generateDocumentationDirectoryFromFileGlobSync';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	var real_options = {};
	var prefix_output_directory = '';
	var report = {
		success: true,
		documentation_directory: '',
		files: []
	};
	var report_file_object = {};
	var file_paths_array = [];
	var output_path = '';
	var output_file_dirname = '';
	var documentation_string = '';
	//Parametre checks
	if( typeof(file_glob) !== 'string' ){
		return_error = new TypeError('Param "file_glob" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(output_directory) !== 'object' ){ //If `output_directory` is an object we assume it's actually the options object.
		if( typeof(output_directory) !== 'string' ){
			return_error = new TypeError('Param "output_directory" is not ?string.');
			return_error.code = 'ERR_INVALID_ARG_TYPE';
			throw return_error;
		} else{
			prefix_output_directory = output_directory;
		}
	} else{
		real_options = output_directory;
	}
	if( typeof(options) !== 'object' ){
		return_error = new TypeError('Param "options" is not ?Object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	} else{
		real_options = options;
	}

	//Function
	if( prefix_output_directory === '' && real_options != null ){
		try{
			prefix_output_director = real_options.output;
		} catch(error){
			return_error = new Error(`Caught an error when attempting to use "options.output" as the output directory: ${error}`);
			throw return_error;
		}
	}
	if( prefix_output_directory !== '' ){
		try{
			MakeDir.sync(prefix_output_directory);
			report.documentation_directory = prefix_output_directory;
		} catch(error){
			return_error = new Error(`MakeDir.sync threw an error: ${error}`);
			throw return_error;
		}
		try{
			file_paths_array = Globby.sync( file_glob );
		} catch(error){
			return_error = new Error(`Globby.sync threw an error: ${error}`);
			throw return_error;
		}
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `file_paths_Array: ${file_paths_array.toString('utf8')}`});
		if( file_paths_array !== [] ){
			for( var i = 0; i < file_paths_array; i++ ){
				report_file_object = {
					path: file_paths_array[i],
					success: false,
					error: null
				};
				try{
					documentation_string = getDocumentationStringFromFilePathSync( file_paths_array[i] );
					try{
						output_path = Path.join( prefix_output_directory, file_paths_array[i] );
						try{
							output_file_dirname = Path.dirname( file_paths_array[i] );
							try{
								MakeDir.sync( output_file_dirname );
								try{
									FileSystem.writeFileSync( output_path, documentation_string, 'utf8' );
									report_file_object.success = true;
									report.files.push( report_file_object );
								} catch(error){
									return_error = new Error(`FileSystem.writeFileSync threw an error: ${error}`);
									throw return_error;
								}
							} catch(error){
								report_file_object.error = new Error(`MakeDir.sync threw an error: ${error}`);
								report.files.push( report_file_object );
							}
						} catch(error){
							report_file_object.error = new Error(`Path.dirname threw an error: ${error}`);
							report.files.push( report_file_object );
						}
					} catch(error){
						report_file_object.error = new Error(`Path.join threw an error: ${error}`);
						report.files.push( report_file_object );
					}
				} catch(error){
					report_file_object.error = new Error(`getDocumentationStringFromFilePathSync threw an error: ${error}`);
					report.files.push( report_file_object );
				}
			}
			_return = report;
		} else{
			return_error = new Error(`Globby.sync didn't return an array: ${file_paths_array}`);
			return_error.code = 'ERR_INVALID_RETURN_VALUE';
			throw return_error;
		}
	} else{
		return_error = new Error('No output directory specified in either in "output_diriectory" parametre or "options.output" property.');
		return_error.code = 'ERR_INVALID_ARG_VALUE';
		throw return_error;
	}

	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}*/
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
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${Utility.inspect( arguments_array, true, null, true )}`});
	//Variables
	var input_string = '';
	var output_string = '';
	//var glob_report = {};
	var output_path = '';
	var output_directory = '';
	var report = {
		files: []
	};
	var report_file_object = {};
	var multi_file_mode = false;
	//Parametre checks
	//Function
	//Multi-file mode
	if( options.input != null && typeof(options.input) === 'object' && Array.isArray(options.input) === true ){
		if( options.input.length > 1 ){
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `options.input: ${options.input.toString('utf8')}`});
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: 'Multi-file mode activated.'});
			multi_file_mode = true;
			if( options.output != null && typeof(options.output) === 'string' ){
				for( var i = 0; i < options.input.length; i++ ){
					report_file_object = {
						path: options.input[i],
						success: false,
						error: null
					};
					try{
						output_string = getDocumentationStringFromFilePathSync( options.input[i], options );
						try{
							output_path = Path.join( options.output, options.input[i] );
							try{
								output_directory = Path.dirname( output_path );
								try{
									MakeDir.sync( output_directory );
									try{
										FileSystem.writeFileSync( output_path, output_string, 'utf8' );
										report_file_object.success = true;
										report.files.push( report_file_object );
									} catch(error){
										report_file_object.error = new Error(`FileSystem.writeFileSync threw an error: ${error}`);
										report.files.push( report_file_object );
									}
								} catch(error){
									report_file_object.error = new Error(`MakeDir.sync threw an error: ${error}`);
									report.files.push( report_file_object );
								}
							} catch(error){
								report_file_object.error = new Error(`Path.dirname threw an error: ${error}`);
								report.files.push( report_file_object );
							}
						} catch(error){
							report_file_object.error = new Error(`Path.join threw an error: ${error}`);
							report.files.push( report_file_object );
						}
					} catch(error){
						report_file_object.error = new Error(`getDocumentationStringFromFilePathSync threw an error: ${error}`);
						report.files.push( report_file_object );
					}
				}
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `Multi-file report: ${Utility.inspect( report, false, null, true )}`});
			} else{
				return_error = new Error('"options.output" (`--output`) must be specified when using multi-file mode.');
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			}
		} 
	} //Single-file mode
	if( multi_file_mode === false ){
		///Input
		if( return_error === null ){
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
				if( typeof(options.input[0]) === 'string' ){
					Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `options.input: '${options.input[0]}'`});
					try{
						input_string = FileSystem.readFileSync( options.input[0], 'utf8' );
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
	try {
		console.log('string');
		getDocumentationStringFromSourceString_Test();
		console.log('buffer');
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
		const ApplicationLogWinstonInterface = require('application-log-winston-interface');
		const EnvPaths = require('env-paths');
		const CommandLineArgs = require('command-line-args');
		const CommandLineUsage = require('command-line-usage');
	//Constants
	const EnvironmentPaths = EnvPaths( PROCESS_NAME );
	const OptionDefinitions = [
		//UI
		{ name: 'help', alias: 'h', type: Boolean, description: 'Writes this help text to STDOUT.' },
		{ name: 'noop', alias: 'n', type: Boolean, description: '[Reserved] Show what would be done without actually doing it.' },
		{ name: 'verbose', alias: 'v', type: Boolean, description: 'Verbose output to STDERR.' },
		{ name: 'version', alias: 'V', type: Boolean, description: 'Writes version information to STDOUT.' },
		{ name: 'no-quick-exit', alias: 'x', type: Boolean, description: 'Don\'t immediately exit after printing help, version, and/or config information.' },
		//Input
		{ name: 'stdin', alias: 'i', type: Boolean, description: 'Read input from STDIN.' },
		{ name: 'input', alias: 'I', type: String, multiple: true, defaultOption: true, description: 'The path to the file to read input from. Multiple paths can be specified with this option, doing so will activate multi-file mode: in this mode, `--output` must also be used and given the name of the directory place the extracted documentation for each input file.' },
		//{ name: 'input-glob', alias: 'G', type: String, description: '[wip] A glob literal as a string: will generate a documentation file for all source files matching this glob; the files will be place in the output directory named in `--output`. Remember to properly escape the string for your shell.' }, 
		{ name: 'test', alias: 't', type: Boolean, description: 'Run unit tests and exit.' },
		//Output
		{ name: 'stdout', alias: 'o', type: Boolean, description: 'Write output to STDOUT.' },
		{ name: 'output', alias: 'O', type: String, description: 'The name of the file to write output to or, in the case of us passing multiple paths to `--input`, the name of the directory to place the generated documentation files.' },
		{ name: 'pasteboard', alias: 'p', type: Boolean, description: '[Reserved] Copy output to pasteboard (clipboard).' },
		//Config
		{ name: 'config', alias: 'c', type: Boolean, description: 'Print search paths and configuration values to STDOUT.' },
		{ name: 'config-file', alias: 'C', type: String, description: '[Reserved] Use the given config file instead of the default.' },
	];
	//Variables
	var function_return = [1,null];
	var quick_exit = false;
	var source_dirname = '';
	var parent_dirname = '';
	var package_path = '';
	var logger = null;
	//Logger
	try{ 
		MakeDir.sync( EnvironmentPaths.log );
	} catch(error)/* istanbul ignore next */{
		console.error('MakeDir.sync threw: %s', error);
	}
	try{
		logger = ApplicationLogWinstonInterface.initWinstonLogger('debug.log', EnvironmentPaths.log);
		try{
			setLogger( logger );
		} catch(error)/* istanbul ignore next */{
			return_error = new Error(`setLogger threw an error: ${error}`);
			console.error(return_error);
		}
	} catch(error)/* istanbul ignore next */{
		return_error = new Error(`ApplicationLogWinstonInterface.initWinstonLogger threw an error: ${error}`);
		console.error(return_error);
		//throw return_error;
	}
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: 'Start of execution block.'});
	//Options
	var Options = CommandLineArgs( OptionDefinitions );
	//Config
	/* istanbul ignore next */
	if( Options.verbose === true ){
		//Logger.real_transports.console_stderr.level = 'debug';
		Logger.setConsoleLogLevel( 'debug' );
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
		console.log('Paths: ', EnvironmentPaths);
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
	exports.getDocumentationStringFromSourceString = getDocumentationStringFromSourceString;
	exports.getDocumentationStringFromSourceBuffer = getDocumentationStringFromSourceBuffer;
	exports.getDocumentationStringFromFilePathSync = getDocumentationStringFromFilePathSync;
}

