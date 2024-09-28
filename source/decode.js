#!/usr/bin/env node
/**
# [decode.js](source/decode.js)
> The regular expression decoding function.

Author: Anadian

Code license: MIT
```
	Copyright 2023 Anadian
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
	//## External
//# Constants
const FILENAME = 'decode.js';
//## Errors

//# Global Variables
/**## Functions*/
/**
### decodeSearchExpression
> Decode a search expression.

#### Parametres
| name | type | description |
| --- | --- | --- |
| construct_object | object | The primordial search expression object.  |
| options | object? | [Reserved] Additional run-time options. \[default: {}\] |

#### Returns
| type | description |
| --- | --- |
| Promise | A promise which resolves to the final construct object when all of the children constructs are settled. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function decodeSearchExpression( construct_object, options = {} ){
	const FUNCTION_NAME = 'decodeSearchExpression';
	//Variables
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error = null;
	this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Parametre checks
	if( typeof(construct_object) !== 'object' ){
		return_error = new TypeError('Param "construct_object" is not object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(options) !== 'object' ){
		return_error = new TypeError('Param "options" is not object?.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	const search_expression_regex = /(?<control_verbs_expression>(?:\(\*[^)]*\))*)?(?<expressions>.+)/;
	var match_object = construct_object.sourceExpression.match( search_expression_regex );
	//Function
	if( match_object != null ){
		construct_object.children = 0;
		construct_object.child = [];
		construct_object.specialIndexes = {
			controlVerbsExpressions = 0,
			expressions = 0
		};
		if( match_object?.groups.control_verbs_expression != null ){
			child_index = construct_object.child.push( {
				construct: 'CONTROL_VERB_EXPRESSIONS',
				sourceExpression: match_object.groups.control_verbs_expression
			} );
			construct_object.specialIndexes.controlVerbsExpressions = child_index;
			construct_object.children++;
		} else{
			this.logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'warn', message: 'No control verb(s) expression in search expression.'});
		}
		if( match_object?.groups.expressions != null ){
			child_index = construct_object.child.push( {
				construct: 'EXPRESSIONS',
				sourceExpression: match_object.groups.expressions
			} );
			construct_object.specialIndexes.expressions = child_index;
			construct_object.children++;
		} else{
			return_error = new Error('No expressions found in search expression.');
			return_error.code = 'ERR_INVALID_RETURN_VALUE';
			throw return_error;
		}
		for( var i = 0; i < construct_object.children; i++ ){
			promises.push( decodeConstruct( construct_object.child[i], construct_object, i ) );
		}
	}
	//Return
	this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
/**
### decodeConstruct
> Decode a primordial construct object.

#### Parametres
| name | type | description |
| --- | --- | --- |
| construct_object | object | The construct object to be decoded.  |
| parent_object | object | The parent object to the construct object.  |
| sibling_index | number | Which number is the consruct object known to as by its parent.  |
| options | object? | [Reserved] Additional run-time options. \[default: {}\] |

#### Returns
| type | description |
| --- | --- |
| Promise | A Promise which resolves when all of the construct object's children have resolved. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function decodeConstruct( construct_object, parent_object, sibling_index, options = {} ){
	const FUNCTION_NAME = 'decodeConstruct';
	//Variables
	var arguments_array = Array.from(arguments);
	var _return = Promise.resolve();
	var return_error = null;
	this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Parametre checks
	if( typeof(construct_object) !== 'object' ){
		return_error = new TypeError('Param "construct_object" is not object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(parent_object) !== 'object' ){
		return_error = new TypeError('Param "parent_object" is not object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(sibling_index) !== 'number' ){
		return_error = new TypeError('Param "sibling_index" is not number.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(options) !== 'object' ){
		return_error = new TypeError('Param "options" is not object?.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	//Function
	construct_object.node = parent_object.node+'.'+sibling_index;
	switch( construct_object.construct ){
		case 'SEARCH_EXPRESSION': _return = decodeSearchExpression( construct_object ); break;
		default: return_error = new Error(`Unrecognised construct: ${construct_object.construct} at ${construct_object.node}`); throw return_error;
	}
	//Return
	this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
/**
### decodePattern
> Decode the given regular expression string into a RegularExpressionAST object.

#### Parametres
| name | type | description |
| --- | --- | --- |
| expression | string | The regular expression string to decode.  |
| grammar | object | The regular grammar (or "codec" in our case) to use when interpreting symbols.  |
| options | object? | [Reserved] Additional run-time options. \[default: {}\] |

#### Returns
| type | description |
| --- | --- |
| RegularExpressionAST | The abstract syntax tree objecting describing the given regular expression. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
function decodePattern( expression, grammar, options = {} ){
	const FUNCTION_NAME = 'decode';
	//Variables
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error = null;
	this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Parametre checks
	if( typeof(expression) !== 'string' ){
		return_error = new TypeError('Param "expression" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(grammar) !== 'object' ){
		return_error = new TypeError('Param "grammar" is not object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(options) !== 'object' ){
		return_error = new TypeError('Param "options" is not object?.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	const multipart_pattern_regex = /\/?(?<search_expression>[^\/]*)((\/(?<replace_expression>[^\/]*))?\/(?<modifier_expression>[^\/]*)?)?/;
	var ast_object = {
		construct: 'REGULAR_EXPRESSION_AST',
		sourceExpression: expression,
		codec: '',
		version: '0.0.0',
		node: '0',
		children: 0,
		child: [],
		specialIndexes: {
			searchExpression: null,
			replaceExpression: null,
			modifierExpression: null
		},
	};
	var promises = [];
	var child_index = 0;

	//Function
	var match_object = expression.match( multipart_pattern_regex );
	if( match_object != null ){
		if( match_object?.groups.search_expression != null ){
			child_index = ast_object.child.push( { 
				construct: 'SEARCH_EXPRESSION';
				sourceExpression: match_object.groups.search_expression 
			} );
			ast_object.specialIndexes.searchExpression = child_index;
			ast_object.children++;
		} else{
			return_error = new Error('No search expression found in regular expression.');
			return_error.code = 'ERR_INVALID_RETURN_VALUE';
			throw return_error;
		}
		if( match_object?.groups.replace_expression != null ){
			child_index = ast_object.child.push( { 
				construct: 'REPLACE_EXPRESSION';
				sourceExpression: match_object.groups.replace_expression 
			} );
			ast_object.specialIndexes.replaceExpression = child_index;
			ast_object.children++;
		} else{
			this.logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'warn', message: 'No replace expression found in regular expression.'});
		}
		if( match_object?.groups.modifier_expression != null ){
			child_index = ast_object.child.push( { 
				construct: 'MODIFIER_EXPRESSION';
				sourceExpression: match_object.groups.modifier_expression 
			} );
			ast_object.specialIndexes.modifierExpression = child_index;
			ast_object.children++;
		} else{
			this.logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'warn', message: 'No modifier expression found in regular expression.'});
		}
		for( var i = 0; i < ast_object.children; i++ ){
			promises.push( decodeConstruct( ast_object.child[i], ast_object, i ) );
		}
	}
	//Return
	this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}

function tokeniseSearchExpression( input_string = '', base_state = {}, options = {} ){
	const FUNCTION_NAME = 'parseSearchExpression';
	var _return = null;
	var return_error = null;
	var processing_state = base_state;
	var token_array = [];
	var input_character = '';
	var token = {};
	processing_state.scope = '/';
	processing_state.previous_scopes = 0;
	for( var i = 0; i < input_string.length; i++ ){
		input_character = input_string[i];
		if( p-s.escape_sequence ){
			token.construct = getConstructFromSymbolTable( symbol_table.escapeCharacter+input_character );
			token_array.push( token );
		} else{ //Not an escape sequence
			token.contruct = getConstructFromSymbolTable( input_character );
			if( token.construct = 'literal/escape' )
				p-s.escape_sequence = true;
				token.source_index = i;
				token.scope = p-s.scope;
				token.scope_index = p-s.previous_scopes;
			} else{
				switch( token.construct ){
					case 'group/start': {
						token.source_index = i;
						token.scope = p-s.scope;
						token.scope_index = p-s.previous_scopes;
						p-s.group_expression = true;
						p-s.group = {
							path: p-s.scope+'/'+p-s.previous_scopes
						}
						p-s.scope += '/'+p-s.previous_scopes;
						p-s.previous_scopes++;
				}

