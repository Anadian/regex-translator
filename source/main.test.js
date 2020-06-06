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
	//##External
	const AVA = require('ava');
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
AVA('ExampleTest', function(t){
	console.log('This is an example test.');
	t.pass();
});
AVA('getMediaryStringFromRegexString:InvalidRegexString', function(t){
	var function_variable = function(){
		var params = {
			regex_string: {},
			flavour_string: 'pcre'
		}
		RegexTranslator.getMediaryStringFromRegexString( params.regex_string, params.flavour_string );
	}
	var error = t.throws( function_variable, { instanceOf: TypeError, code: 'ERR_INVALID_ARG_TYPE' }, 'Is this shown?' );
});

