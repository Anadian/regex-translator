#!/usr/local/bin/node
'use strict';
/**
# [regex-translator.js](source/regex-translator.js)
> Convert a Regular Expression from one flavour to another.

Internal module name: `RegexTranslator`

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
	const Utility = require('util');
	//##External
	const GetStream = require('get-stream');
//#Constants
const FILENAME = 'regex-translator.js';
const MODULE_NAME = 'RegexTranslator';
var PACKAGE_JSON = {};
var PROCESS_NAME = '';
if(require.main === module){
	PROCESS_NAME = 'regex-translator';
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
var MetaRegexObject = {
	"default": {
		"LLT": {
			to: {
				search_regex: /<([^%])/g,
				replace_string: '<%LLT%>$1'
			}, 
			from: {
				search_regex: /<%LLT%>/g,
				replace_string: '<' 
			}
		},
		"LGT": {
			to: {
				search_regex: /([^%])>/g,
				replace_string: '$1<%LGT%>'
			}, 
			from: {
				search_regex: /<%LGT%>/g,
				replace_string: '>' 
			}
		},
		"CHARACTER_CLASS": { 
			to: {
				search_regex: /([^\\])\[(([^\]]{1,2})|[^:]([^\]]*?)[^:])\]/g,
				replace_string: '$1<CHARACTER_CLASS_START:$2:CHARACTER_CLASS_END>'
			}, 
			from: {
				search_regex: /<CHARACTER_CLASS_START:(.*?):CHARACTER_CLASS_END>/g,
				replace_string: '[$1]' 
			}
		},
		"LVRQ": {
			to: {
				search_regex: /([^\\])\{(\d*),(\d*)\}\?/g,
				replace_string: '$1<LVRQ_START:$2:$3:LVRQ_END>'
			},
			from: {
				search_regex: /<LVRQ_START:(\d*):(\d*):LVRQ_END>/g,
				replace_string: '{$1,$2}?'
			}
		},
		"VRQ": {
			to: {
				search_regex: /([^\\])\{(\d*),(\d*)\}/g,
				replace_string: '$1<VRQ_START:$2:$3:VRQ_END>'
			},
			from: {
				search_regex: /<VRQ_START:(\d*):(\d*):VRQ_END>/g,
				replace_string: '{$1,$2}'
			}
		},
		"LOMQ": {
			to: {
				search_regex: /\+\?/g,
				replace_string: '<LOMQ>'
			},
			from: {
				search_regex: /<LOMQ>/g,
				replace_string: '+?'
			}
		},
		"LZMQ": {
			to: {
				search_regex: /\*\?/g,
				replace_string: '<LZMQ>'
			},
			from: {
				search_regex: /<LZMQ>/g,
				replace_string: '*?'
			}
		},
		"LOP": {
			to: {
				search_regex: /\\\(/g,
				replace_string: '<LOP>'
			},
			from: {
				search_regex: /<LOP>/g,
				replace_string: '\\('
			}
		},
		"LCP": {
			to: {
				search_regex: /\\\)/g,
				replace_string: '<LCP>'
			},
			from: {
				search_regex: /<LCP>/g,
				replace_string: '\\)'
			}
		},
		"LOB": {
			to: {
				search_regex: /\\\[/g,
				replace_string: '<%LOB%>'
			},
			from: {
				search_regex: /<%LOB%>/g,
				replace_string: '\\['
			}
		},
		"LCB": {
			to: {
				search_regex: /\\\]/g,
				replace_string: '<%LCB%>'
			},
			from: {
				search_regex: /<%LCB%>/g,
				replace_string: '\\]'
			}
		},
		"LOC": {
			to: {
				search_regex: /\\\{/g,
				replace_string: '<%LOC%>'
			},
			from: {
				search_regex: /<%LOC%>/g,
				replace_string: '\\{'
			}
		},
		"LCC": {
			to: {
				search_regex: /\\\}/g,
				replace_string: '<%LCC%>'
			},
			from: {
				search_regex: /<%LCC%>/g,
				replace_string: '\\}'
			}
		},
		"MOP": {
			to: {
				search_regex: /\(/g,
				replace_string: '<MOP>'
			},
			from: {
				search_regex: /<MOP>/g,
				replace_string: '('
			}
		},
		"MCP": {
			to: {
				search_regex: /\)/g,
				replace_string: '<MCP>'
			},
			from: {
				search_regex: /<MCP>/g,
				replace_string: ')'
			}
		},
		"LB": {
			to: {
				search_regex: /\n/g,
				replace_string: '<LB>'
			},
			from: {
				search_regex: /<LB>/g,
				replace_string: '\\n'
			}
		},
		"LBS": {
			to: {
				search_regex: /\\\\/g,
				replace_string: '<LBS>'
			},
			from: {
				search_regex: /<LBS>/g,
				replace_string: '\\\\'
			}
		},
		"LPS": {
			to: {
				search_regex: /\\\+/g,
				replace_string: '<LPS>'
			},
			from: {
				search_regex: /<LPS>/g,
				replace_string: '\\+'
			}
		},
		"LP": {
			to: {
				search_regex: /\\\./g,
				replace_string: '<LP>'
			},
			from: {
				search_regex: /<LP>/g,
				replace_string: '\\.'
			}
		},
		"LCS": {
			to: {
				search_regex: /\\\^/g,
				replace_string: '<LCS>'
			},
			from: {
				search_regex: /<LCS>/g,
				replace_string: '\\^'
			}
		},
		"LDS": {
			to: {
				search_regex: /\\\$/g,
				replace_string: '<LDS>'
			},
			from: {
				search_regex: /<LDS>/g,
				replace_string: '\\$'
			}
		},
		"LES": {
			to: {
				search_regex: /\=/g,
				replace_string: '<LES>'
			},
			from: {
				search_regex: /<LES>/g,
				replace_string: '\\='
			}
		},
		"LQM": {
			to: {
				search_regex: /\\\?/g,
				replace_string: '<LQM>'
			},
			from: {
				search_regex: /<LQM>/g,
				replace_string: '\\?'
			}
		},
		"LAS": {
			to: {
				search_regex: /\\\*/g,
				replace_string: '<LAS>'
			},
			from: {
				search_regex: /<LAS>/g,
				replace_string: '\\*'
			}
		},
		"LPIPE": {
			to: {
				search_regex: /\\\|/g,
				replace_string: '<LPIPE>'
			},
			from: {
				search_regex: /<LPIPE>/g,
				replace_string: '\\|'
			}
		},
		"ORA": {
			to: {
				search_regex: /\|/g,
				replace_string: '<ORA>'
			},
			from: {
				search_regex: /<ORA>/g,
				replace_string: '|'
			}
		},
		"LFS": {
			to: {
				search_regex: /\\\//g,
				replace_string: '<LFS>'
			},
			from: {
				search_regex: /<LFS>/g,
				replace_string: '\\\/'
			}
		},
		"OMQ": {
			to: {
				search_regex: /\+/g,
				replace_string: '<OMQ>'
			},
			from: {
				search_regex: /<OMQ>/g,
				replace_string: '+'
			}
		},
		"ZOQ": {
			to: {
				search_regex: /\?/g,
				replace_string: '<ZOQ>'
			},
			from: {
				search_regex: /<ZOQ>/g,
				replace_string: '?'
			}
		},
		"ZMQ": {
			to: {
				search_regex: /\*/g,
				replace_string: '<ZMQ>'
			},
			from: {
				search_regex: /<ZMQ>/g,
				replace_string: '*'
			}
		},
		"MAC": {
			to: {
				search_regex: /\./g,
				replace_string: '<MAC>'
			},
			from: {
				search_regex: /<MAC>/g,
				replace_string: '.'
			}
		},
		"SL": {
			to: {
				search_regex: /\^/g,
				replace_string: '<SL>'
			},
			from: {
				search_regex: /<SL>/g,
				replace_string: '^'
			}
		},
		"EL": {
			to: {
				search_regex: /\$/g,
				replace_string: '<EL>'
			},
			from: {
				search_regex: /<EL>/g,
				replace_string: '$'
			}
		},
		"RS": {
			to: {
				search_regex: /\//g,
				replace_string: '<RS>'
			},
			from: {
				search_regex: /<RS>/g,
				replace_string: '/'
			}
		},
		"CC_DIGIT": {
			to: {
				search_regex: /(\[:digit:\])|(\\d)/g,
				replace_string: '<CC_DIGIT>'
			},
			from: {
				search_regex: /<CC_DIGIT>/g,
				replace_string: '[0-9]'
			}
		},
		"CC_NOTDIGIT": {
			to: {
				search_regex: /\\D/g,
				replace_string: '<CC_NOTDIGIT>'
			},
			from: {
				search_regex: /<CC_NOTDIGIT>/g,
				replace_string: '[^0-9]'
			}
		},
		"CC_WORD": {
			to: {
				search_regex: /\\w/g,
				replace_string: '<CC_WORD>'
			},
			from: {
				search_regex: /<CC_WORD>/g,
				replace_string: '[A-Za-z0-9_]'
			}
		},
		"CC_NOTWORD": {
			to: {
				search_regex: /\\W/g,
				replace_string: '<CC_NOTWORD>'
			},
			from: {
				search_regex: /<CC_NOTWORD>/g,
				replace_string: '[^A-Za-z0-9_]'
			}
		},
		"CC_alnum": {
			to: {
				search_regex: /\[:alnum:\]/g,
				replace_string: '<CC_alnum>'
			},
			from: {
				search_regex: /<CC_alnum>/g,
				replace_string: '[A-Za-z0-9]'
			}
		},
		"CC_alpha": {
			to: {
				search_regex: /\[:alpha:\]/g,
				replace_string: '<CC_alpha>'
			},
			from: {
				search_regex: /<CC_alpha>/g,
				replace_string: '[A-Za-z]'
			}
		},
		"CC_graph": {
			to: {
				search_regex: /\[:graph:\]/g,
				replace_string: '<CC_graph>'
			},
			from: {
				search_regex: /<CC_graph>/g,
				replace_string: '[!-~]'
			}
		},
		"CC_lower": {
			to: {
				search_regex: /\[:lower:\]/g,
				replace_string: '<CC_lower>'
			},
			from: {
				search_regex: /<CC_lower>/g,
				replace_string: '[a-z]'
			}
		},
		"CC_print": {
			to: {
				search_regex: /\[:print:\]/g,
				replace_string: '<CC_print>'
			},
			from: {
				search_regex: /<CC_print>/g,
				replace_string: '[ -~]'
			}
		},
		"CC_punct": {
			to: {
				search_regex: /\[:punct:\]/g,
				replace_string: '<CC_punct>'
			},
			from: {
				search_regex: /<CC_punct>/g,
				replace_string: '[!-\\/:-@[-`{-~]'
			}
		},
		"CC_upper": {
			to: {
				search_regex: /\[:upper:\]/g,
				replace_string: '<CC_upper>'
			},
			from: {
				search_regex: /<CC_upper>/g,
				replace_string: '[A-Z]'
			}
		},
		"CC_xdigit": {
			to: {
				search_regex: /\[:xdigit:\]/g,
				replace_string: '<CC_xdigit>'
			},
			from: {
				search_regex: /<CC_xdigit>/g,
				replace_string: '[0-9A-Fa-f]'
			}
		},
		"CC_NOTNEWLINE": {
			to: {
				search_regex: /\\N/g,
				replace_string: '<CC_NOTNEWLINE>'
			},
			from: {
				search_regex: /<CC_NOTNEWLINE>/g,
				replace_string: '[^\\r\\n]'
			}
		},
		"CC_HORIZONTALSPACE": {
			to: {
				search_regex: /(\[:blank:\])|(\\h)/g,
				replace_string: '<CC_HORIZONTALSPACE>'
			},
			from: {
				search_regex: /<CC_HORIZONTALSPACE>/g,
				replace_string: '[ \\t]'
			}
		},
		"CC_NOTHORIZONTALSPACE": {
			to: {
				search_regex: /\\H/g,
				replace_string: '<CC_NOTHORIZONTALSPACE>'
			},
			from: {
				search_regex: /<CC_NOTHORIZONTALSPACE>/g,
				replace_string: '[^ \\t]'
			}
		},
		"CC_VERTICALSPACE": {
			to: {
				search_regex: /(\[:space:\])|(\\s)|(\\v)/g,
				replace_string: '<CC_VERTICALSPACE>'
			},
			from: {
				search_regex: /<CC_VERTICALSPACE>/g,
				replace_string: '[\\f\\n\\r\\t\\v]'
			}
		},
		"CC_NOTVERTICALSPACE": {
			to: {
				search_regex: /(\\S)|(\\V)/g,
				replace_string: '<CC_NOTVERTICALSPACE>'
			},
			from: {
				search_regex: /<CC_NOTVERTICALSPACE>/g,
				replace_string: '[^\\f\\n\\r\\t\\v]'
			}
		},
		"CC_R": {
			to: {
				search_regex: /\[:R:\]/g,
				replace_string: '<CC_R>'
			},
			from: {
				search_regex: /<CC_R>/g,
				replace_string: '[\\r\\n\\f\\t\\v]'
			}
		}
	},
	"pcre": {
		"LLT": {
			to: {
				search_regex: /<([^%])/g,
				replace_string: '<%LLT%>$1'
			}, 
			from: {
				search_regex: /<%LLT%>/g,
				replace_string: '<' 
			}
		},
		"LGT": {
			to: {
				search_regex: /([^%])>/g,
				replace_string: '$1<%LGT%>'
			}, 
			from: {
				search_regex: /<%LGT%>/g,
				replace_string: '>' 
			}
		},
		"CHARACTER_CLASS": { 
			to: {
				search_regex: /([^\\])\[(([^\]]{1,2})|[^:]([^\]]*?)[^:])\]/g,
				replace_string: '$1<CHARACTER_CLASS_START:$2:CHARACTER_CLASS_END>'
			}, 
			from: {
				search_regex: /<CHARACTER_CLASS_START:(.*?):CHARACTER_CLASS_END>/g,
				replace_string: '[$1]' 
			}
		},
		"LVRQ": {
			to: {
				search_regex: /([^\\])\{(\d*),(\d*)\}\?/g,
				replace_string: '$1<LVRQ_START:$2:$3:LVRQ_END>'
			},
			from: {
				search_regex: /<LVRQ_START:(\d*):(\d*):LVRQ_END>/g,
				replace_string: '{$1,$2}?'
			}
		},
		"VRQ": {
			to: {
				search_regex: /([^\\])\{(\d*),(\d*)\}/g,
				replace_string: '$1<VRQ_START:$2:$3:VRQ_END>'
			},
			from: {
				search_regex: /<VRQ_START:(\d*):(\d*):VRQ_END>/g,
				replace_string: '{$1,$2}'
			}
		},
		"LOMQ": {
			to: {
				search_regex: /\+\?/g,
				replace_string: '<LOMQ>'
			},
			from: {
				search_regex: /<LOMQ>/g,
				replace_string: '+?'
			}
		},
		"LZMQ": {
			to: {
				search_regex: /\*\?/g,
				replace_string: '<LZMQ>'
			},
			from: {
				search_regex: /<LZMQ>/g,
				replace_string: '*?'
			}
		},
		"LOP": {
			to: {
				search_regex: /\\\(/g,
				replace_string: '<LOP>'
			},
			from: {
				search_regex: /<LOP>/g,
				replace_string: '\\('
			}
		},
		"LCP": {
			to: {
				search_regex: /\\\)/g,
				replace_string: '<LCP>'
			},
			from: {
				search_regex: /<LCP>/g,
				replace_string: '\\)'
			}
		},
		"LOB": {
			to: {
				search_regex: /\\\[/g,
				replace_string: '<%LOB%>'
			},
			from: {
				search_regex: /<%LOB%>/g,
				replace_string: '\\['
			}
		},
		"LCB": {
			to: {
				search_regex: /\\\]/g,
				replace_string: '<%LCB%>'
			},
			from: {
				search_regex: /<%LCB%>/g,
				replace_string: '\\]'
			}
		},
		"LOC": {
			to: {
				search_regex: /\\\{/g,
				replace_string: '<%LOC%>'
			},
			from: {
				search_regex: /<%LOC%>/g,
				replace_string: '\\{'
			}
		},
		"LCC": {
			to: {
				search_regex: /\\\}/g,
				replace_string: '<%LCC%>'
			},
			from: {
				search_regex: /<%LCC%>/g,
				replace_string: '\\}'
			}
		},
		"MOP": {
			to: {
				search_regex: /\(/g,
				replace_string: '<MOP>'
			},
			from: {
				search_regex: /<MOP>/g,
				replace_string: '('
			}
		},
		"MCP": {
			to: {
				search_regex: /\)/g,
				replace_string: '<MCP>'
			},
			from: {
				search_regex: /<MCP>/g,
				replace_string: ')'
			}
		},
		"LB": {
			to: {
				search_regex: /\n/g,
				replace_string: '<LB>'
			},
			from: {
				search_regex: /<LB>/g,
				replace_string: '\\n'
			}
		},
		"LBS": {
			to: {
				search_regex: /\\\\/g,
				replace_string: '<LBS>'
			},
			from: {
				search_regex: /<LBS>/g,
				replace_string: '\\\\'
			}
		},
		"LPS": {
			to: {
				search_regex: /\\\+/g,
				replace_string: '<LPS>'
			},
			from: {
				search_regex: /<LPS>/g,
				replace_string: '\\+'
			}
		},
		"LP": {
			to: {
				search_regex: /\\\./g,
				replace_string: '<LP>'
			},
			from: {
				search_regex: /<LP>/g,
				replace_string: '\\.'
			}
		},
		"LCS": {
			to: {
				search_regex: /\\\^/g,
				replace_string: '<LCS>'
			},
			from: {
				search_regex: /<LCS>/g,
				replace_string: '\\^'
			}
		},
		"LDS": {
			to: {
				search_regex: /\\\$/g,
				replace_string: '<LDS>'
			},
			from: {
				search_regex: /<LDS>/g,
				replace_string: '\\$'
			}
		},
		"LES": {
			to: {
				search_regex: /\=/g,
				replace_string: '<LES>'
			},
			from: {
				search_regex: /<LES>/g,
				replace_string: '\\='
			}
		},
		"LQM": {
			to: {
				search_regex: /\\\?/g,
				replace_string: '<LQM>'
			},
			from: {
				search_regex: /<LQM>/g,
				replace_string: '\\?'
			}
		},
		"LAS": {
			to: {
				search_regex: /\\\*/g,
				replace_string: '<LAS>'
			},
			from: {
				search_regex: /<LAS>/g,
				replace_string: '\\*'
			}
		},
		"LPIPE": {
			to: {
				search_regex: /\\\|/g,
				replace_string: '<LPIPE>'
			},
			from: {
				search_regex: /<LPIPE>/g,
				replace_string: '\\|'
			}
		},
		"ORA": {
			to: {
				search_regex: /\|/g,
				replace_string: '<ORA>'
			},
			from: {
				search_regex: /<ORA>/g,
				replace_string: '|'
			}
		},
		"LFS": {
			to: {
				search_regex: /\\\//g,
				replace_string: '<LFS>'
			},
			from: {
				search_regex: /<LFS>/g,
				replace_string: '\\/'
			}
		},
		"OMQ": {
			to: {
				search_regex: /\+/g,
				replace_string: '<OMQ>'
			},
			from: {
				search_regex: /<OMQ>/g,
				replace_string: '+'
			}
		},
		"ZOQ": {
			to: {
				search_regex: /\?/g,
				replace_string: '<ZOQ>'
			},
			from: {
				search_regex: /<ZOQ>/g,
				replace_string: '?'
			}
		},
		"ZMQ": {
			to: {
				search_regex: /\*/g,
				replace_string: '<ZMQ>'
			},
			from: {
				search_regex: /<ZMQ>/g,
				replace_string: '*'
			}
		},
		"MAC": {
			to: {
				search_regex: /\./g,
				replace_string: '<MAC>'
			},
			from: {
				search_regex: /<MAC>/g,
				replace_string: '.'
			}
		},
		"SL": {
			to: {
				search_regex: /\^/g,
				replace_string: '<SL>'
			},
			from: {
				search_regex: /<SL>/g,
				replace_string: '^'
			}
		},
		"EL": {
			to: {
				search_regex: /\$/g,
				replace_string: '<EL>'
			},
			from: {
				search_regex: /<EL>/g,
				replace_string: '$'
			}
		},
		"RS": {
			to: {
				search_regex: /\//g,
				replace_string: '<RS>'
			},
			from: {
				search_regex: /<RS>/g,
				replace_string: '/'
			}
		},
		"CC_DIGIT": {
			to: {
				search_regex: /(\[:digit:\])|(\\d)/g,
				replace_string: '<CC_DIGIT>'
			},
			from: {
				search_regex: /<CC_DIGIT>/g,
				replace_string: '[0-9]'
			}
		},
		"CC_NOTDIGIT": {
			to: {
				search_regex: /\\D/g,
				replace_string: '<CC_NOTDIGIT>'
			},
			from: {
				search_regex: /<CC_NOTDIGIT>/g,
				replace_string: '[^0-9]'
			}
		},
		"CC_WORD": {
			to: {
				search_regex: /\\w/g,
				replace_string: '<CC_WORD>'
			},
			from: {
				search_regex: /<CC_WORD>/g,
				replace_string: '[A-Za-z0-9_]'
			}
		},
		"CC_NOTWORD": {
			to: {
				search_regex: /\\W/g,
				replace_string: '<CC_NOTWORD>'
			},
			from: {
				search_regex: /<CC_NOTWORD>/g,
				replace_string: '[^A-Za-z0-9_]'
			}
		},
		"CC_alnum": {
			to: {
				search_regex: /\[:alnum:\]/g,
				replace_string: '<CC_alnum>'
			},
			from: {
				search_regex: /<CC_alnum>/g,
				replace_string: '[A-Za-z0-9]'
			}
		},
		"CC_alpha": {
			to: {
				search_regex: /\[:alpha:\]/g,
				replace_string: '<CC_alpha>'
			},
			from: {
				search_regex: /<CC_alpha>/g,
				replace_string: '[A-Za-z]'
			}
		},
		"CC_graph": {
			to: {
				search_regex: /\[:graph:\]/g,
				replace_string: '<CC_graph>'
			},
			from: {
				search_regex: /<CC_graph>/g,
				replace_string: '[!-~]'
			}
		},
		"CC_lower": {
			to: {
				search_regex: /\[:lower:\]/g,
				replace_string: '<CC_lower>'
			},
			from: {
				search_regex: /<CC_lower>/g,
				replace_string: '[a-z]'
			}
		},
		"CC_print": {
			to: {
				search_regex: /\[:print:\]/g,
				replace_string: '<CC_print>'
			},
			from: {
				search_regex: /<CC_print>/g,
				replace_string: '[ -~]'
			}
		},
		"CC_punct": {
			to: {
				search_regex: /\[:punct:\]/g,
				replace_string: '<CC_punct>'
			},
			from: {
				search_regex: /<CC_punct>/g,
				replace_string: '[!-\\/:-@[-`{-~]'
			}
		},
		"CC_upper": {
			to: {
				search_regex: /\[:upper:\]/g,
				replace_string: '<CC_upper>'
			},
			from: {
				search_regex: /<CC_upper>/g,
				replace_string: '[A-Z]'
			}
		},
		"CC_xdigit": {
			to: {
				search_regex: /\[:xdigit:\]/g,
				replace_string: '<CC_xdigit>'
			},
			from: {
				search_regex: /<CC_xdigit>/g,
				replace_string: '[0-9A-Fa-f]'
			}
		},
		"CC_NOTNEWLINE": {
			to: {
				search_regex: /\\N/g,
				replace_string: '<CC_NOTNEWLINE>'
			},
			from: {
				search_regex: /<CC_NOTNEWLINE>/g,
				replace_string: '[^\\r\\n]'
			}
		},
		"CC_HORIZONTALSPACE": {
			to: {
				search_regex: /(\[:blank:\])|(\\h)/g,
				replace_string: '<CC_HORIZONTALSPACE>'
			},
			from: {
				search_regex: /<CC_HORIZONTALSPACE>/g,
				replace_string: '[ \\t]'
			}
		},
		"CC_NOTHORIZONTALSPACE": {
			to: {
				search_regex: /\\H/g,
				replace_string: '<CC_NOTHORIZONTALSPACE>'
			},
			from: {
				search_regex: /<CC_NOTHORIZONTALSPACE>/g,
				replace_string: '[^ \\t]'
			}
		},
		"CC_VERTICALSPACE": {
			to: {
				search_regex: /(\[:space:\])|(\\s)|(\\v)/g,
				replace_string: '<CC_VERTICALSPACE>'
			},
			from: {
				search_regex: /<CC_VERTICALSPACE>/g,
				replace_string: '[\\f\\n\\r\\t\\v]'
			}
		},
		"CC_NOTVERTICALSPACE": {
			to: {
				search_regex: /(\\S)|(\\V)/g,
				replace_string: '<CC_NOTVERTICALSPACE>'
			},
			from: {
				search_regex: /<CC_NOTVERTICALSPACE>/g,
				replace_string: '[^\\f\\n\\r\\t\\v]'
			}
		},
		"CC_R": {
			to: {
				search_regex: /\[:R:\]/g,
				replace_string: '<CC_R>'
			},
			from: {
				search_regex: /<CC_R>/g,
				replace_string: '[\\r\\n\\f\\t\\v]'
			}
		}
	},
	"vim": {
		"LLT": {
			to: {
				search_regex: /<([^%])/g,
				replace_string: '<%LLT%>$1'
			}, 
			from: {
				search_regex: /<%LLT%>/g,
				replace_string: '<' 
			}
		},
		"LGT": {
			to: {
				search_regex: /([^%])>/g,
				replace_string: '$1<%LGT%>'
			}, 
			from: {
				search_regex: /<%LGT%>/g,
				replace_string: '>' 
			}
		},
		"CHARACTER_CLASS": { 
			to: {
				search_regex: /([^\\])\[(([^\]]{1,2})|[^:]([^\]]*?)[^:])\]/g,
				replace_string: '$1<CHARACTER_CLASS_START:$2:CHARACTER_CLASS_END>'
			}, 
			from: {
				search_regex: /<CHARACTER_CLASS_START:(.*?):CHARACTER_CLASS_END>/g,
				replace_string: '[$1]' 
			}
		},
		"LVRQ": {
			to: {
				search_regex: /([^\\])\\\{-?(\d*),(\d*)\}/g,
				replace_string: '$1<LVRQ_START:$2:$3:LVRQ_END>'
			},
			from: {
				search_regex: /<LVRQ_START:(\d*):(\d*):LVRQ_END>/g,
				replace_string: '\\{-$1,$2}'
			}
		},
		"VRQ": {
			to: {
				search_regex: /([^\\])\\\{(\d*),(\d*)\}/g,
				replace_string: '$1<VRQ_START:$2:$3:VRQ_END>'
			},
			from: {
				search_regex: /<VRQ_START:(\d*):(\d*):VRQ_END>/g,
				replace_string: '\\{$1,$2}'
			}
		},
		"LOMQ": {
			to: {
				search_regex: /\\\{-1,\}/g,
				replace_string: '<LOMQ>'
			},
			from: {
				search_regex: /<LOMQ>/g,
				replace_string: '\\{-1,}'
			}
		},
		"LZMQ": {
			to: {
				search_regex: /\\\{-\}/g,
				replace_string: '<LZMQ>'
			},
			from: {
				search_regex: /<LZMQ>/g,
				replace_string: '\\{-}'
			}
		},
		"MOP": {
			to: {
				search_regex: /\\\(/g,
				replace_string: '<MOP>'
			},
			from: {
				search_regex: /<MOP>/g,
				replace_string: '\\('
			}
		},
		"MCP": {
			to: {
				search_regex: /\\\)/g,
				replace_string: '<MCP>'
			},
			from: {
				search_regex: /<MCP>/g,
				replace_string: '\\)'
			}
		},
		"LOP": {
			to: {
				search_regex: /\(/g,
				replace_string: '<LOP>'
			},
			from: {
				search_regex: /<LOP>/g,
				replace_string: '('
			}
		},
		"LCP": {
			to: {
				search_regex: /\)/g,
				replace_string: '<LCP>'
			},
			from: {
				search_regex: /<LCP>/g,
				replace_string: ')'
			}
		},
		"LOB": {
			to: {
				search_regex: /\\\[/g,
				replace_string: '<%LOB%>'
			},
			from: {
				search_regex: /<%LOB%>/g,
				replace_string: '\\['
			}
		},
		"LCB": {
			to: {
				search_regex: /\\\]/g,
				replace_string: '<%LCB%>'
			},
			from: {
				search_regex: /<%LCB%>/g,
				replace_string: '\\]'
			}
		},
		"LOC": {
			to: {
				search_regex: /\{/g,
				replace_string: '<%LOC%>'
			},
			from: {
				search_regex: /<%LOC%>/g,
				replace_string: '{'
			}
		},
		"LCC": {
			to: {
				search_regex: /\}/g,
				replace_string: '<%LCC%>'
			},
			from: {
				search_regex: /<%LCC%>/g,
				replace_string: '}'
			}
		},
		"LB": {
			to: {
				search_regex: /\\r/g,
				replace_string: '<LB>'
			},
			from: {
				search_regex: /<LB>/g,
				replace_string: '\\r'
			}
		},
		"LBS": {
			to: {
				search_regex: /\\\\/g,
				replace_string: '<LBS>'
			},
			from: {
				search_regex: /<LBS>/g,
				replace_string: '\\\\'
			}
		},
		"OMQ": {
			to: {
				search_regex: /\\\+/g,
				replace_string: '<OMQ>'
			},
			from: {
				search_regex: /<OMQ>/g,
				replace_string: '\\+'
			}
		},
		"LPS": {
			to: {
				search_regex: /\+/g,
				replace_string: '<LPS>'
			},
			from: {
				search_regex: /<LPS>/g,
				replace_string: '+'
			}
		},
		"LP": {
			to: {
				search_regex: /\\\./g,
				replace_string: '<LP>'
			},
			from: {
				search_regex: /<LP>/g,
				replace_string: '\\.'
			}
		},
		"LCS": {
			to: {
				search_regex: /\\\^/g,
				replace_string: '<LCS>'
			},
			from: {
				search_regex: /<LCS>/g,
				replace_string: '\\^'
			}
		},
		"LDS": {
			to: {
				search_regex: /\\\$/g,
				replace_string: '<LDS>'
			},
			from: {
				search_regex: /<LDS>/g,
				replace_string: '\\$'
			}
		},
		"LES": {
			to: {
				search_regex: /=/g,
				replace_string: '<LES>'
			},
			from: {
				search_regex: /<LES>/g,
				replace_string: '='
			}
		},
		"LQM": {
			to: {
				search_regex: /\?/g,
				replace_string: '<LQM>'
			},
			from: {
				search_regex: /<LQM>/g,
				replace_string: '?'
			}
		},
		"LAS": {
			to: {
				search_regex: /\\\*/g,
				replace_string: '<LAS>'
			},
			from: {
				search_regex: /<LAS>/g,
				replace_string: '\\*'
			}
		},
		"LPIPE": {
			to: {
				search_regex: /\|/g,
				replace_string: '<LPIPE>'
			},
			from: {
				search_regex: /<LPIPE>/g,
				replace_string: '|'
			}
		},
		"ORA": {
			to: {
				search_regex: /\\\|/g,
				replace_string: '<ORA>'
			},
			from: {
				search_regex: /<ORA>/g,
				replace_string: '\\|'
			}
		},
		"LFS": {
			to: {
				search_regex: /\\\//g,
				replace_string: '<LFS>'
			},
			from: {
				search_regex: /<LFS>/g,
				replace_string: '\\/'
			}
		},
		"ZOQ": {
			to: {
				search_regex: /\\=/g,
				replace_string: '<ZOQ>'
			},
			from: {
				search_regex: /<ZOQ>/g,
				replace_string: '\\='
			}
		},
		"ZMQ": {
			to: {
				search_regex: /\*/g,
				replace_string: '<ZMQ>'
			},
			from: {
				search_regex: /<ZMQ>/g,
				replace_string: '*'
			}
		},
		"MAC": {
			to: {
				search_regex: /\./g,
				replace_string: '<MAC>'
			},
			from: {
				search_regex: /<MAC>/g,
				replace_string: '.'
			}
		},
		"SL": {
			to: {
				search_regex: /\^/g,
				replace_string: '<SL>'
			},
			from: {
				search_regex: /<SL>/g,
				replace_string: '^'
			}
		},
		"EL": {
			to: {
				search_regex: /\$/g,
				replace_string: '<EL>'
			},
			from: {
				search_regex: /<EL>/g,
				replace_string: '$'
			}
		},
		"RS": {
			to: {
				search_regex: /\//g,
				replace_string: '<RS>'
			},
			from: {
				search_regex: /<RS>/g,
				replace_string: '/'
			}
		},
		"CC_DIGIT": {
			to: {
				search_regex: /(\[:digit:\])|(\\d)/g,
				replace_string: '<CC_DIGIT>'
			},
			from: {
				search_regex: /<CC_DIGIT>/g,
				replace_string: '[0-9]'
			}
		},
		"CC_NOTDIGIT": {
			to: {
				search_regex: /\\D/g,
				replace_string: '<CC_NOTDIGIT>'
			},
			from: {
				search_regex: /<CC_NOTDIGIT>/g,
				replace_string: '[^0-9]'
			}
		},
		"CC_WORD": {
			to: {
				search_regex: /\\w/g,
				replace_string: '<CC_WORD>'
			},
			from: {
				search_regex: /<CC_WORD>/g,
				replace_string: '[A-Za-z0-9_]'
			}
		},
		"CC_NOTWORD": {
			to: {
				search_regex: /\\W/g,
				replace_string: '<CC_NOTWORD>'
			},
			from: {
				search_regex: /<CC_NOTWORD>/g,
				replace_string: '[^A-Za-z0-9_]'
			}
		},
		"CC_alnum": {
			to: {
				search_regex: /\[:alnum:\]/g,
				replace_string: '<CC_alnum>'
			},
			from: {
				search_regex: /<CC_alnum>/g,
				replace_string: '[A-Za-z0-9]'
			}
		},
		"CC_alpha": {
			to: {
				search_regex: /\[:alpha:\]/g,
				replace_string: '<CC_alpha>'
			},
			from: {
				search_regex: /<CC_alpha>/g,
				replace_string: '[A-Za-z]'
			}
		},
		"CC_graph": {
			to: {
				search_regex: /\[:graph:\]/g,
				replace_string: '<CC_graph>'
			},
			from: {
				search_regex: /<CC_graph>/g,
				replace_string: '[!-~]'
			}
		},
		"CC_lower": {
			to: {
				search_regex: /\[:lower:\]/g,
				replace_string: '<CC_lower>'
			},
			from: {
				search_regex: /<CC_lower>/g,
				replace_string: '[a-z]'
			}
		},
		"CC_print": {
			to: {
				search_regex: /\[:print:\]/g,
				replace_string: '<CC_print>'
			},
			from: {
				search_regex: /<CC_print>/g,
				replace_string: '[ -~]'
			}
		},
		"CC_punct": {
			to: {
				search_regex: /\[:punct:\]/g,
				replace_string: '<CC_punct>'
			},
			from: {
				search_regex: /<CC_punct>/g,
				replace_string: '[!-\\/:-@[-`{-~]'
			}
		},
		"CC_upper": {
			to: {
				search_regex: /\[:upper:\]/g,
				replace_string: '<CC_upper>'
			},
			from: {
				search_regex: /<CC_upper>/g,
				replace_string: '[A-Z]'
			}
		},
		"CC_xdigit": {
			to: {
				search_regex: /\[:xdigit:\]/g,
				replace_string: '<CC_xdigit>'
			},
			from: {
				search_regex: /<CC_xdigit>/g,
				replace_string: '[0-9A-Fa-f]'
			}
		},
		"CC_NOTNEWLINE": {
			to: {
				search_regex: /\\N/g,
				replace_string: '<CC_NOTNEWLINE>'
			},
			from: {
				search_regex: /<CC_NOTNEWLINE>/g,
				replace_string: '[^\\r\\n]'
			}
		},
		"CC_HORIZONTALSPACE": {
			to: {
				search_regex: /(\[:blank:\])|(\\h)/g,
				replace_string: '<CC_HORIZONTALSPACE>'
			},
			from: {
				search_regex: /<CC_HORIZONTALSPACE>/g,
				replace_string: '[ \\t]'
			}
		},
		"CC_NOTHORIZONTALSPACE": {
			to: {
				search_regex: /\\H/g,
				replace_string: '<CC_NOTHORIZONTALSPACE>'
			},
			from: {
				search_regex: /<CC_NOTHORIZONTALSPACE>/g,
				replace_string: '[^ \\t]'
			}
		},
		"CC_VERTICALSPACE": {
			to: {
				search_regex: /(\[:space:\])|(\\s)|(\\v)/g,
				replace_string: '<CC_VERTICALSPACE>'
			},
			from: {
				search_regex: /<CC_VERTICALSPACE>/g,
				replace_string: '[\\f\\n\\r\\t\\v]'
			}
		},
		"CC_NOTVERTICALSPACE": {
			to: {
				search_regex: /(\\S)|(\\V)/g,
				replace_string: '<CC_NOTVERTICALSPACE>'
			},
			from: {
				search_regex: /<CC_NOTVERTICALSPACE>/g,
				replace_string: '[^\\f\\n\\r\\t\\v]'
			}
		},
		"CC_R": {
			to: {
				search_regex: /\[:R:\]/g,
				replace_string: '<CC_R>'
			},
			from: {
				search_regex: /<CC_R>/g,
				replace_string: '[\\r\\n\\f\\t\\v]'
			}
		}
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
function getMultiPartObjectFromInputString( input_string, options = {},){
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
				super_string = super_string.replace( /^((default)|(posix)|(extended)|(pcre)|(vim)|(ecma)|(re2))\//, '' );
			}
			matches = super_string.match( /([^\\])\/((default)|(posix)|(extended)|(pcre)|(vim)|(ecma)|(re2))$/ );
			if( matches != null ){
				output_flavour = matches[2];
				super_string = super_string.replace( /([^\\])\/((default)|(posix)|(extended)|(pcre)|(vim)|(ecma)|(re2))$/, '$1' );
			}
			matches = super_string.match( /([^\/]+?)([^\\])\/(.*)/ );
			if( matches != null ){
				regex_string = matches[1] + matches[2];
				replace_string = matches[3];
			}
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
| 0.0.1 | Introduced |
*/
function getMediaryStringFromRegexString( regex_string, input_flavour_string = 'pcre', options = {},){
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error;
	const FUNCTION_NAME = 'getMediaryStringFromRegexString';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	var to_object = {};
	var to_values_array = [];
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
| 0.0.1 | Introduced |
*/
function getRegexStringFromMediaryString( mediary_string, flavour_string = 'pcre', options = {},){
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
	var input_object = {};
	var mediary_string = '';
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
	} else if( options['input-regex-string'] != null ){
		if( typeof(options['input-regex-string']) === 'string' ){
			input_string = options['input-regex-string'];
		} else{
			return_error = new TypeError('"input-regex-string" option is specified but is not a string.');
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		}
	} else{
		return_error = new Error('No input options specified.');
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
	}
	try{
		input_object = getMultiPartObjectFromInputString( input_string );
		if( options['input-flavour'] != null ){
			if( typeof(options['input-flavour']) === 'string' ){
				input_object.input_flavour = options['input-flavour'];
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: `Overriding input flavour to '${input_object.input_flavour}'`});
			} else{
				return_error = new TypeError('"input-flavour" option is specified but the value is not a string.');
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			}
		}
		if( options['output-flavour'] != null ){
			if( typeof(options['output-flavour']) === 'string' ){
				input_object.output_flavour = options['output-flavour'];
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: `Overriding output flavour to '${input_object.output_flavour}'`});
			} else{
				return_error = new TypeError('"output-flavour" option specified but the value is not a string.');
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			}
		}
	} catch(error){
		return_error = new Error(`getMultiPartObjectFromInputString threw an error: ${error}`);
	}
	///Transform
	if( return_error === null ){
		try{
			mediary_string = getMediaryStringFromRegexString( input_object.regex_string, input_object.input_flavour );
		} catch(error){
			return_error = new Error(`getMediaryStringFromInputString threw an error: ${error}`);
		}
		if( return_error === null ){
			try{
				output_string = getRegexStringFromMediaryString( mediary_string, input_object.output_flavour );
			} catch(error){
				return_error = new Error(`getRegexStringFromMediaryString threw an error: ${error}`);
			}
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

//#Exports and Execution
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
		{ name: 'help', alias: 'h', type: Boolean, description: 'Writes this help text to STDOUT.' },
		{ name: 'noop', alias: 'n', type: Boolean, description: '[Reserved] Show what would be done without actually doing it.' },
		{ name: 'verbose', alias: 'v', type: Boolean, description: 'Verbose output to STDERR.' },
		{ name: 'version', alias: 'V', type: Boolean, description: 'Writes version information to STDOUT.' },
		{ name: 'no-quick-exit', alias: 'x', type: Boolean, description: 'Don\'t immediately exit after printing help, version, and/or config information.' },
		//Input
		{ name: 'stdin', alias: 'i', type: Boolean, description: 'Read input from STDIN.' },
		{ name: 'input', alias: 'I', type: String, description: 'The path to the file to read input from.' },
		{ name: 'input-regex-string', alias: 'R', type: String, description: 'The input regular expression as a string.' },
		{ name: 'input-flavour', alias: 'F', type: String, description: 'The flavour of the input regex.' },
		//Output
		{ name: 'output-flavour', alias: 'T', type: String, description: 'The flavour to convert to input regex to.' },
		{ name: 'stdout', alias: 'o', type: Boolean, description: 'Write output to STDOUT.' },
		{ name: 'output', alias: 'O', type: String, description: 'The name of the file to write output to.' },
		{ name: 'pasteboard', alias: 'p', type: Boolean, description: '[Reserved] Copy output to pasteboard (clipboard).' },
		//Config
		{ name: 'config', alias: 'c', type: Boolean, description: 'Print search paths and configuration values to STDOUT.' },
		{ name: 'config-file', alias: 'C', type: String, description: '[Resevred] Use the given config file instead of the default.' },
	];
	//Variables
	var function_return = [1,null];
	var quick_exit = false;
	var source_dirname = '';
	var parent_dirname = '';
	var package_path = '';
	//Logger
	try{ 
		MakeDir.sync( EnvironmentPaths.log );
	} catch(error)/* istanbul ignore next */{
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
				header: 'regex-translator',
				content: 'Convert a Regular Expression from one flavour to another.',
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
		main_Async( Options );
	}
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: 'End of execution block.'});
} else{
	exports.setLogger = setLogger;
	exports.getMediaryStringFromRegexString = getMediaryStringFromRegexString;
	exports.getRegexStringFromMediaryString = getRegexStringFromMediaryString;
	exports.getMultiPartObjectFromInputString = getMultiPartObjectFromInputString;
}

