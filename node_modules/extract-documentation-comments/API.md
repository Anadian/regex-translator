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
## Functions
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
