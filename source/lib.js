#!/usr/bin/env node
/**
# [lib.js](source/lib.js)
> Implements the backend for regex-translator.

Author: Anadian

Code license: MIT
```
	Copyright 2022 Anadian
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

*/

//# Dependencies
	//## Internal
	//## Standard
	import * as FSNS from 'node:fs';
	//## External
	import * as ALWI from 'application-log-winston-interface';
	import * as HJSON from 'hjson';
//# Constants
const FILENAME = 'lib.js';
//## Errors

//# Global Variables
/**## Functions*/
/**
### RegexTranslator
> RegexTranslator class constructor.
#### Parametres
| name | type | description |
| --- | --- | --- |
| options | object? | Additional options to pass to the smart constructor. |

##### Options Properties
| name | type | description |
| --- | --- | --- |
| packageMeta | PackageMeta? | An instance of [simple-package-meta](https://github.com/Anadian/simple-package-meta) to be used by this instance and any subclasses initialised along with it. |
| logger | object? | The logger to be used by this instance. |
| config | ConfigManager? | The [cno-config-manager] instance to be used by the created instance. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if `options` is neither an object nor `null` |

#### History
| version | change |
| --- | --- |
| 0.0.0 | Introduced |
*/
export default function RegexTranslator( options = {} ){
	if( !( this instanceof RegexTranslator ) ){
		return new RegexTranslator( options );
	}
	const FUNCTION_NAME = 'RegexTranslator';
	this.packageMeta = ( this.packageMeta || options.packageMeta ) ?? ( null );
	this.logger = ( this.logger || options.logger ) ?? ( ALWI.nullLogger );
	this.config = ( this.config || options.config ) ?? ( null );
	this.codecCache = ( this.codecCache || options.codecCache ) ?? ( {} );
	this.validator = ( this.validator || options.validator ) ?? ( null );
	return this;
}

/**
### loadCodecFromFilePath
> Loads a regex codec and adds it to the codec cache.

#### Parametres
| name | type | description |
| --- | --- | --- |
| filepath | string | The path to the regex codec JSON file to load.  |
| options | object? | [Reserved] Additional run-time options. \[default: {}\] |

#### Returns
| type | description |
| --- | --- |
| Promise | A promise which resolves with the codec ID when it's added to the cache. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
RegexTranslator.prototype.loadCodecFromFilePath = function( filepath, options = {} ){
	const FUNCTION_NAME = 'loadCodecFromFilePath';
	//Variables
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error = null;
	this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Parametre checks
	if( typeof(filepath) !== 'string' ){
		return_error = new TypeError('Param "filepath" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(options) !== 'object' ){
		return_error = new TypeError('Param "options" is not object?.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	//Function
	_return = FSNS.promises.readFile( filepath, 'utf8' ).then(
		( file_string ) => {
			var codec_object = {};
			try{
				codec_object = HJSON.parse( file_string );
			} catch(error){
				return_error = new Error(`HJSON.parse threw an error: ${error}`);
				throw return_error;
			}
			if( this.validator != null ){
				if( this.validator(codec_object) !== true ){
					return_error(`Invalid codec object. ${this.validator.errors}`);
					throw return_error;
				}
			}
			this.codecCache.push( codec_object );
			return Promise.resolve( codec_object );
		},
		( error ) => {
			return_error = new Error(`FSNS.promises.readFile threw an error: ${error}`);
			throw return_error;
		}
	);

	//Return
	this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}

/**
### getMultiPartObjectFromInputString
> Parses the given input string to identify its individual parts and returns said parts as an object.

Parametres:
| name | type | description |
| --- | --- | --- |
| input_string | {string} | The input string to be parsed.  |
| options | {?Object} | [Reserved] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {Object} | The multipart object with possible properties 'input_flavour', 'regex_string', 'replace_string', and 'output_flavour'. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if a given argument isn't of the correct type. |
| 'ERR_INVALID_ARG_VALUE' | {Error} | Thrown if given input string contains more than three regex seperators. |

Status:
| version | change |
| --- | --- |
| 0.0.1 | Introduced |
*/
RegexTranslator.prototype.getMultiPartObjectFromInputString = function( input_string, options = {},){
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error;
	const FUNCTION_NAME = 'getMultiPartObjectFromInputString';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	var super_string = input_string;
	var matches = null;
	var input_flavour = null;
	var regex_string = null;
	var replace_string = null;
	var output_flavour = null;
	//Parametre checks
	if( typeof(input_string) !== 'string' ){
		return_error = new TypeError('Param "input_string" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	//Function
	matches = super_string.match( /[^\\]\//g );
	if( matches != null ){
		if( matches.length <= 3 ){
			//Check if its denoting a flavour
			matches = super_string.match( /^((default)|(posix)|(extended)|(pcre)|(vim)|(ecma)|(re2))\// );
			if( matches != null ){
				input_flavour = matches[1];
				//Removes input flavour from super_string
				super_string = super_string.replace( /^((default)|(posix)|(extended)|(pcre)|(vim)|(ecma)|(re2))\//, '' );
			}
			matches = super_string.match( /([^\\])\/((default)|(posix)|(extended)|(pcre)|(vim)|(ecma)|(re2))$/ );
			if( matches != null ){
				output_flavour = matches[2];
				//Removes output falvour from super_string
				super_string = super_string.replace( /([^\\])\/((default)|(posix)|(extended)|(pcre)|(vim)|(ecma)|(re2))$/, '$1' );
			}
			//Gets the regex string and the replace string.
			matches = super_string.match( /([^\/]+?)([^\\])\/(.*)/ );
			if( matches != null ){
				regex_string = matches[1] + matches[2];
				replace_string = matches[3];
			}
			//Sets return object
			_return = {
				input_flavour: input_flavour,
				regex_string: regex_string,
				replace_string: replace_string,
				output_flavour: output_flavour
			};
		} else{
			return_error = new Error("More than 3 regex seperators '/' were found in the given input string.");
			return_error.code = 'ERR_INVALID_ARG_VALUE';
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			throw return_error;
		}
	} else{
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'warn', message: 'No regex seperators found in given input string.'});
		_return = {
			input_flavour: null,
			regex_string: input_string,
			replace_string: null,
			output_flavour: null
		};
	}

	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
/**
### getMediaryStringFromRegexString
> Returns an intermediary string with special characters converted to a flavour-agnostic syntax.

Parametres:
| name | type | description |
| --- | --- | --- |
| regex_string | {string} | A string of the regex to be converted.  |
| input_flavour_string | {string} | The flavour of the input string. \[default: 'pcre'\] |
| options | {?Object} | [Reserved] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {string} | The intermediary string after converting the input regex string. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if a given argument isn't of the correct type. |

Status:
| version | change |
| --- | --- |
| 0.2.1 | Stable |
| 0.0.1 | Introduced |
*/
RegexTranslator.prototype.getMediaryStringFromRegexString = function( regex_string, input_flavour_string = 'pcre', options = {} ){
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error;
	const FUNCTION_NAME = 'getMediaryStringFromRegexString';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	var to_object = {};
	var to_values_array = [];
	var character_classes_array = [];
	var character_class_codes = [];
	var intermediary_string = regex_string;
	//Parametre checks
	if( typeof(regex_string) !== 'string' ){
		return_error = new TypeError('Param "regex_string" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(input_flavour_string) !== 'string' ){
		return_error = new TypeError('Param "input_flavour_string" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	//Function
	to_object = MetaRegexObject[input_flavour_string];
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `to_object: ${to_object}`});
	to_values_array = Array.from(Object.values(to_object));
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `to_values_array: ${to_values_array}`});
	for( var i = 0; i < to_values_array.length; i++ ){
		intermediary_string = intermediary_string.replace( to_values_array[i].to.search_regex, to_values_array[i].to.replace_string );
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `intermediary string at ${i}: ${intermediary_string}`});
	}
	_return = intermediary_string;

	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
/**
### getMediaryObjectFromRegexString
> Returns a mediary object from the given regular expression string. This RegexTranslator.prototype.should = function be used instead of `getMediaryStringFromRegexString` as this properly handles chracter classes in a "round-trip" fashion.

Parametres:
| name | type | description |
| --- | --- | --- |
| regex_string | {string} | The regular expression string to be converted to a mediary object.  |
| flavour_string | {string} | The flavour of the regex string. \[default: \] |
| options | {?Object} | [Reserved] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {object} | A mediary object with the property `mediary_string` and, if necessary, a property `character_class_codes_array`. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if a given argument isn't of the correct type. |

Status:
| version | change |
| --- | --- |
| 0.2.3 | Introduced: Breaking change; RegexTranslator.prototype.now = function returns an object with an `intermediary_string` property and a `character_class_codes_array` property if necessary. |
*/
RegexTranslator.prototype.getMediaryObjectFromRegexString = function( regex_string, flavour_string = 'pcre', options = {},){
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error;
	const FUNCTION_NAME = 'getMediaryObjectFromRegexString';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	var i = 0;
	var length = 0;
	var to_object = {};
	var to_values_array = [];
	var character_class_code_matches = null;
	var character_classes_array = [];
	var character_class_codes = [];
	var intermediary_string = regex_string;
	//Parametre checks
	if( typeof(regex_string) !== 'string' ){
		return_error = new TypeError('Param "regex_string" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(flavour_string) !== 'string' ){
		return_error = new TypeError('Param "flavour_string" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	//Function
	to_object = MetaRegexObject[flavour_string];
	//console.log('to_object: %o', to_object);
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `to_object: ${to_object}`});
	to_values_array = Array.from(Object.values(to_object));
	//console.log('to_values_array: %o', to_values_array);
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `to_values_array: ${to_values_array}`});
	try{
		//LLT
		intermediary_string = intermediary_string.replace( to_object['LLT'].to.search_regex, to_object['LLT'].to.replace_string );
		//LGT
		intermediary_string = intermediary_string.replace( to_object['LGT'].to.search_regex, to_object['LGT'].to.replace_string );
		//CHARACTER_CLASS
		intermediary_string = intermediary_string.replace( to_object['CHARACTER_CLASS'].to.search_regex, to_object['CHARACTER_CLASS'].to.replace_string );
	} catch(error){
		return_error = new Error(`Caught an unexpected error processing the special meta-translational symbol: ${error}`);
		throw return_error;
	}
	try{
		character_class_code_matches = intermediary_string.matchAll( to_object['CHARACTER_CLASS_CODE'].to.search_regex );
		//console.log('character_class_code_matches: %o', character_class_code_matches);
		character_classes_array = Array.from( character_class_code_matches );
		//console.log('character_classes_array: %o', character_classes_array);
		for( i = 0; i < character_classes_array.length; i++ ){
			length = character_class_codes.push( character_classes_array[i][1] );
			intermediary_string = intermediary_string.replace( to_object['CHARACTER_CLASS'].from.search_regex, `<CHARACTER_CLASS_CODE_START:${(length-1)}:CHARACTER_CLASS_CODE_END>` );
		}
	} catch(error){
		return_error = new Error(`Caught an unexpected error when creating character classes code arrays: ${error}`);
		throw return_error;
	}
	for( i = 4; i < to_values_array.length; i++ ){
		intermediary_string = intermediary_string.replace( to_values_array[i].to.search_regex, to_values_array[i].to.replace_string );
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `intermediary string at ${i}: ${intermediary_string}`});
	}
	_return = {
		mediary_string: intermediary_string,
		character_class_codes_array: character_class_codes
	};	

	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
/**
### getRegexStringFromMediaryString
> Returns the given mediary string reformatted to the given regex flavour.

Parametres:
| name | type | description |
| --- | --- | --- |
| mediary_string | {string} | The mediary string to be converted to the given format.  |
| flavour_string | {string} | The regex flavour to convert the mediary string to. \[default: 'pcre'\] |
| options | {?Object} | [Reserved] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {string} | The output regex string. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if a given argument isn't of the correct type. |

Status:
| version | change |
| --- | --- |
| 0.2.1 | Stable |
| 0.0.1 | Introduced |
*/
RegexTranslator.prototype.getRegexStringFromMediaryString = function( mediary_string, flavour_string = 'pcre', options = {},){
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error;
	const FUNCTION_NAME = 'getRegexStringFromMediaryString';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	var from_object = {};
	var from_values_array = [];
	var intermediary_string = mediary_string;
	//Parametre checks
	if( typeof(mediary_string) !== 'string' ){
		return_error = new TypeError('Param "mediary_string" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(flavour_string) !== 'string' ){
		return_error = new TypeError('Param "flavour_string" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	//Function
	from_object = MetaRegexObject[flavour_string];
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `from_object: ${from_object}`});
	from_values_array = Array.from(Object.values(from_object));
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `from_values_array: ${from_values_array}`});
	for( var i = 0; i < from_values_array.length; i++ ){
		intermediary_string = intermediary_string.replace( from_values_array[i].from.search_regex, from_values_array[i].from.replace_string );
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `intermediary_string at ${i}: ${intermediary_string}`});
	}
	_return = intermediary_string;
	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
/**
### getRegexStringFromMediaryObject
> Returns a regex string from the given mediary object formatted to the given regex flavour.

Parametres:
| name | type | description |
| --- | --- | --- |
| mediary_object | {object} | A mediary object with a `mediary_string` and `character_class_codes_array` properties.  |
| flavour_string | {string} | A string repesenting the Regular Expression flavour to return the string in. \[default: 'pcre'\] |
| options | {?Object} | [Reserved] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {string} | The regex string translated from the mediary obejct. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if a given argument isn't of the correct type. |

Status:
| version | change |
| --- | --- |
| 0.2.7 | Updated to add improved error handling. |
| 0.2.3 | Introduced |
*/
RegexTranslator.prototype.getRegexStringFromMediaryObject = function( mediary_object, flavour_string = 'pcre', options = {} ){
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error;
	const FUNCTION_NAME = 'getRegexStringFromMediaryObject';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	var from_object = {};
	var from_values_array = [];
	var character_class_code_matches = [];
	//Parametre checks
	if( typeof(mediary_object) !== 'object' ){
		return_error = new TypeError('Param "mediary_object" is not object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(mediary_object.mediary_string) !== 'string' ){
		return_error = new TypeError('Property "mediary_string" of "mediary_object" is not a string.');
		return_error.code = 'ERR_INVALID_ARG_VALUE';
		throw return_error;
	}
	if( Array.isArray(mediary_object.character_class_codes_array) !== true ){
		return_error = new TypeError('Property "character_class_codes_array" of "mediary_object" is not an array.');
		return_error.code = 'ERR_INVALID_ARG_VALUE';
		throw return_error;
	}
	if( typeof(flavour_string) !== 'string' ){
		return_error = new TypeError('Param "flavour_string" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(options) !== 'object' ){
		return_error = new TypeError('Param "options" is not ?Object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	var intermediary_string = mediary_object.mediary_string;
	//Function
	from_object = MetaRegexObject[flavour_string];
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `from_object: ${from_object}`});
	from_values_array = Array.from(Object.values(from_object));
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `from_values_array: ${from_values_array}`});
	//NONCAPTURE_GROUP
	intermediary_string = intermediary_string.replace( from_object['NONCAPTURE_GROUP'].from.search_regex, from_object['NONCAPTURE_GROUP'].from.replace_string );
	//NAMED_CAPTURE_GROUP
	intermediary_string = intermediary_string.replace( from_object['NAMED_CAPTURE_GROUP'].from.search_regex, from_object['NAMED_CAPTURE_GROUP'].from.replace_string );
	//LLT
	intermediary_string = intermediary_string.replace( from_object['LLT'].from.search_regex, from_object['LLT'].from.replace_string );
	//LGT
	intermediary_string = intermediary_string.replace( from_object['LGT'].from.search_regex, from_object['LGT'].from.replace_string );
	//CHARACTER_CLASS_CODES
	character_class_code_matches = Array.from( intermediary_string.matchAll( from_object['CHARACTER_CLASS_CODE'].from.search_regex ) );
	for( var i = 0; i < character_class_code_matches.length; i++ ){
		intermediary_string = intermediary_string.replace( from_object['CHARACTER_CLASS_CODE'].from.search_regex, `<CHARACTER_CLASS_START:${mediary_object.character_class_codes_array[character_class_code_matches[i][1]]}:CHARACTER_CLASS_END>` );
	}
	for( i = 5; i < from_values_array.length; i++ ){
		intermediary_string = intermediary_string.replace( from_values_array[i].from.search_regex, from_values_array[i].from.replace_string );
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `intermediary_string at ${i}: ${intermediary_string}`});
	}
	_return = intermediary_string;

	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
