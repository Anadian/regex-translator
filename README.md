# regex-translator
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Semantic Versioning 2.0.0](https://img.shields.io/badge/semver-2.0.0-brightgreen?style=flat-square)](https://semver.org/spec/v2.0.0.html)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![License](https://img.shields.io/github/license/Anadian/regex-translator)](https://github.com/Anadian/regex-translator/LICENSE)
[![npm](https://img.shields.io/npm/v/regex-translator)](https://www.npmjs.com/package/regex-translator)
[![Travis (.org)](https://img.shields.io/travis/Anadian/regex-translator)](https://travis-ci.org/Anadian/regex-translator)
[![Coveralls github](https://img.shields.io/coveralls/github/Anadian/regex-translator)](https://coveralls.io/github/Anadian/regex-translator?branch=master<Paste>)
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
