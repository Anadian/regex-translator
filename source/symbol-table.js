#!/usr/bin/env node
/**
# [symbol-table.js](source/symbol-table.js)
> A table of constructs and the possible symbol forms they can have.

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
	//## External
	import * as ApplicationLogWinstonIterface from 'application-log-winston-interface';
//# Constants
const FILENAME = 'symbol-table.js';
//## Errors

//# Global Variables
/**## Functions*/
/**
### SymbolTable
> A table of constructs and the possible symbol forms they can have.
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
export default function SymbolTable( options = {} ){
	if( !( this instanceof SymbolTable ) ){
		return new SymbolTable( options );
	}
	const FUNCTION_NAME = 'SymbolTable';
	this.packageMeta = ( this.packageMeta || options.packageMeta ) ?? ( null );
	this.logger = ( this.logger || options.logger ) ?? ( ApplicationLogWinstonInterface.nullLogger );
	this.config = ( this.config || options.config ) ?? ( null );
	return this;
}

/**
### SymbolTable.prototype.getConstruct
> Brief description.

#### Parametres
| name | type | description |
| --- | --- | --- |
| symbol | string | The symbol with which the construct should be returned dependent on the given `state`.  |
| state | object | The current processing state of the parser; alters which construct is returned for the given `symbol`. \[default: {}\] |
| options | object? | [Reserved] Additional run-time options. \[default: {}\] |

#### Returns
| type | description |
| --- | --- |
| string | A string containing the construct ID in the form of '<category>/<construct>[+<variant>]' |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |
*/
.prototype. = function ( symbol, state = {}, options = {} ){
	const FUNCTION_NAME = 'getConstruct';
	//Variables
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error = null;
	this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Parametre checks
	if( typeof(symbol) !== 'string' ){
		return_error = new TypeError('Param "symbol" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(state) !== 'object' ){
		return_error = new TypeError('Param "state" is not object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(options) !== 'object' ){
		return_error = new TypeError('Param "options" is not object?.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	//Function

	//Return
	this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
