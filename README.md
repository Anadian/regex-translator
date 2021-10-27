# regex-translator
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Semantic Versioning 2.0.0](https://img.shields.io/badge/semver-2.0.0-brightgreen?style=flat-square)](https://semver.org/spec/v2.0.0.html)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![License](https://img.shields.io/github/license/Anadian/regex-translator)](https://github.com/Anadian/regex-translator/LICENSE)
[![npm](https://img.shields.io/npm/v/regex-translator)](https://www.npmjs.com/package/regex-translator)
[![Coverage Status](https://coveralls.io/repos/github/Anadian/regex-translator/badge.svg?branch=main)](https://coveralls.io/github/Anadian/regex-translator?branch=main)
![David](https://img.shields.io/david/Anadian/regex-translator)

> Convert a Regular Expression from one flavour to another.
# Table of Contents
- [Background](#Background)
- [Install](#Install)
- [Usage](#Usage)
- [CLI](#CLI)
- [API](#API)
- [Contributing](#Contributing)
- [License](#License)
# Background
I love [regex](https://en.wikipedia.org/wiki/Regular_expression)! It's extremely useful and I practice it nigh religiously but there's a catch: regular expressions have never had a singular, definitive standard that has really taken off and, as a result, each regex engine has its own slightly different variation on the core syntax. For example: PCRE has the most features and is the flavour most commonly used in user-facing applications but I primarily program in Javascript nowadays which has its own standard for regex (ECMA) and I use Vim as my text editor which uses its own hyper-idiomatic version of regular expressions! Eventually, I got tired of the headaches from manually converting between regex flavours so I created this, a NodeJS package and CLI application for converting between regex flavours with relative ease. `regex-translator` lays a simple, data-driven foundation which can be expanded upon to one day be able to perfectly interpolate between all regex flavours. In its current state, it's not perfect but it has proved to be effective for my needs, converting between some of the more major regex flavours.
## Supported Regex Flavours
ID | "Standard" | Uses
--- | --- | ---
`basic` | [Posix.2 "Basic Regular Expression" (BRE)](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_03) | `grep`, `ed` and C (`<regex.h>`)
`extended` | [Posix.2 "Extended Regular Expressions" (ERE)](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_04) | `egrep`, BASH and C (`<regex.h>`)
`pcre` | [Perl Compatible Regular Expressions (PCRE)](https://www.pcre.org/) | PCRE library, Perl, PHP, and many others.
`vim` | [Vim Pattern](https://vimhelp.org/pattern.txt.html) | Vim
`ecma` | [ECMAscript RegExp](https://262.ecma-international.org/12.0/#sec-regexp-regular-expression-objects) | Javascript, Web Browsers, ~Java
`re2` | [RE2](https://github.com/google/re2) | GoLang, ~Python

'Standard' is in quotes there because regular expressions are quite tenuously specified in the best of cases: POSIX's regular expression standard is quite vague and largely obsolete and much of the format specification for other regex flavours comes from high-level end-user-targeted documentation.

`regex-translator` in no way purports to be fast or memory efficient but it does strive to be useful, simple, and transparent in its operation.
# Install
`npm install regex-translator`
to install it to a local package or
`npm install --global regex-translator`
to install it globally.
# Usage
To use the command-line interface `npx regex-translator` or just `regex-translator` if installed globally.
## CLI
```
regex-translator

  Convert a Regular Expression from one flavour to another. 

Options

  -h, --help                        Writes this help text to STDOUT.                                              
  -n, --noop                        [Reserved] Show what would be done without actually doing it.                 
  -v, --verbose                     Verbose output to STDERR.                                                     
  -V, --version                     Writes version information to STDOUT.                                         
  -x, --no-quick-exit               Don't immediately exit after printing help, version, and/or config            
                                    information.                                                                  
  -i, --stdin                       Read input from STDIN.                                                        
  -I, --input string                The path to the file to read input from.                                      
  -R, --input-regex-string string   The input regular expression as a string.                                     
  -F, --input-flavour string        The flavour of the input regex.                                               
  -T, --output-flavour string       The flavour to convert to input regex to.                                     
  -o, --stdout                      Write output to STDOUT.                                                       
  -O, --output string               The name of the file to write output to.                                      
  -p, --pasteboard                  Copy output to pasteboard (clipboard).                                        
  -c, --config                      Print search paths and configuration values to STDOUT.                        
  -C, --config-file string          [Resevred] Use the given config file instead of the default.                  
```
# API
```js
const RegexTranslator = require('regex-translator');
```
See [API.md](API.md) for full API.
# Contributing
Changes are tracked in [CHANGELOG.md](CHANGELOG.md).
# License
MIT ©2020 Anadian

SEE LICENSE IN [LICENSE](LICENSE)

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)This project's documentation is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
