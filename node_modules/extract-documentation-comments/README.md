# extract-documentation-comments
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Semantic Versioning 2.0.0](https://img.shields.io/badge/semver-2.0.0-brightgreen?style=flat-square)](https://semver.org/spec/v2.0.0.html)
[![License](https://img.shields.io/github/license/Anadian/extract-documentation-comments)](https://github.com/Anadian/extract-documentation-comments/LICENSE)
[![npm](https://img.shields.io/npm/v/extract-documentation-comments)](https://www.npmjs.com/package/extract-documentation-comments)
[![CI](https://github.com/Anadian/extract-documentation-comments/workflows/ci/badge.svg)](https://github.com/Anadian/extract-documentation-comments/actions?query=workflow%3Aci)
[![Coverage Status](https://coveralls.io/repos/github/Anadian/extract-documentation-comments/badge.svg?branch=main)](https://coveralls.io/github/Anadian/extract-documentation-comments?branch=main)
![David](https://img.shields.io/david/Anadian/extract-documentation-comments)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

> Simply extract documentation comments from a source file.
# Table of Contents
- [Background](#Background)
- [Install](#Install)
- [Usage](#Usage)
- [CLI](#CLI)
- [API](#API)
- [Contributing](#Contributing)
- [License](#License)
# Background
I created this project because I felt all of the other "parse source-code comments to generate documentation" solutions were unsatisfactory for what I needed.
- [Doxygen](http://www.doxygen.nl/index.html) Is dated, obtuse, and its assumptions make it difficult to extend to languages without very C-like syntax.
- [JavaDoc](https://docs.oracle.com/javase/1.5.0/docs/tooldocs/solaris/javadoc.html), [JSDoc](https://jsdoc.app/), or any other `<LANGUAGE NAME>Doc`-type solution are, obviously, limited to a single language; they can usually only produce opinionated HTML natively, relying on unmaintained third-party extensions to produce anything else; and they all have slightly unique syntaxes that are confusingly similar yet problematically different.
- [Natural Docs](https://www.naturaldocs.org/) Well definitely my favourite solution I've seen so far, its comment syntax is breezy and readable and it can easily be extended to any language, it still suffers from the issue of only natively producing HTML and its syntax can be pretty limited.

Plus, I found all of the documentation solutions above to be kind of poorly documented (with the possible exception of Natural Docs) which is kind of ironic ... so I decided to create my own ultra-minimalist solution to the "generate document from special source code comments" problem!

`extract-documentation-comments` does just that: it simply extracts any documentation between `/**` and `*/` lines in a source code file, or any input really. Why? Because:
- It's simple stupid: can easily be modified or extended to any specific use case.
- It makes zero assumptions about the text between the `/**` and `*/` so you're free to markup the text in any way you want; [Markdown](https://github.github.com/gfm/), [reStructuredText](https://docutils.sourceforge.io/rst.html), XML, whatever and convert it to what you need after the fact. I recommend [PanDoc](https://pandoc.org/index.html) for this.
- It can easily be finagled to be backwards compatible with any existing source-code documenting solution.
# Install
`npm install extract-documentation-comments`
to install it to a local package or
`npm install --global extract-documentation-comments`
to install it globally.
# Usage
To use the command-line interface `npx extract-documentation-comments` or just `extract-documentation-comments` if installed globally.
## CLI
```
extract-documentation-comments

  Simply extract documentation comments from a source file. 

Options

  -h, --help                 Writes this help text to STDOUT.                                              
  -n, --noop                 [Reserved] Show what would be done without actually doing it.                 
  -v, --verbose              Verbose output to STDERR.                                                     
  -V, --version              Writes version information to STDOUT.                                         
  -x, --no-quick-exit        Don't immediately exit after printing help, version, and/or config            
                             information.                                                                  
  -i, --stdin                Read input from STDIN.                                                        
  -I, --input string[]       The path to the file to read input from. Multiple paths can be specified with 
                             this option, doing so will activate multi-file mode: in this mode,            
                             `--output` must also be used and given the name of the directory place the    
                             extracted documentation for each input file.                                  
  -t, --test                 Run unit tests and exit.                                                      
  -o, --stdout               Write output to STDOUT.                                                       
  -O, --output string        The name of the file to write output to or, in the case of us passing         
                             multiple paths to `--input`, the name of the directory to place the generated 
                             documentation files.                                                          
  -p, --pasteboard           [Reserved] Copy output to pasteboard (clipboard).                             
  -c, --config               Print search paths and configuration values to STDOUT.                        
  -C, --config-file string   [Reserved] Use the given config file instead of the default.                  
```
# API
```js
const ExtractDocumentationComments = require('extract-documentation-comments');
```
See [API.md](API.md) for full API.
# Contributing
Changes are tracked in [CHANGELOG.md](CHANGELOG.md).
# License
MIT ©2020 Anadian

SEE LICENSE IN [LICENSE](LICENSE)

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)\
This project's documentation is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
