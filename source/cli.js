#!/usr/bin/env node
/**
# [cli.js](source/cli.js)
> The CLI of regex-translator.

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
	import RegexTranslator from './lib.js';
	//## Standard
	import * as FSNS from 'node:fs';
	//## External
	import getPackageMeta from 'simple-package-meta';
	import * as ALWI from 'application-log-winston-interface';
	import ConfigManager from 'cno-config-manager';
	import CommandLineArgs from 'command-line-args';
	import CommandLineUsage from 'command-line-usage';
//# Constants
const FILENAME = 'cli.js';
//## Errors

//# Global Variables
/**## Functions*/
/**
### CLI
> The CLI of regex-translator.
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
export default function CLI( options = {} ){
	if( !( this instanceof CLI ) ){
		return new CLI( options );
	}
	const FUNCTION_NAME = 'CLI';
	this.packageMeta = ( this.packageMeta || options.packageMeta ) ?? ( null );
	this.logger = ( this.logger || options.logger ) ?? ( ALWI.nullLogger );
	this.config = ( this.config || options.config ) ?? ( null );
	this.optionDefinitions = [
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
		{ name: 'pasteboard', alias: 'p', type: Boolean, description: 'Copy output to pasteboard (clipboard).' },
		//Config
		{ name: 'config', alias: 'c', type: Boolean, description: 'Print search paths and configuration values to STDOUT.' },
		{ name: 'config-file', alias: 'C', type: String, description: '[Resevred] Use the given config file instead of the default.' },
	];
	return this;
}

CLI.run = function( options = {} ){
	var return_error = null;
	var cli = new CLI( options );
	var quick_exit = false;
	var run_promise = getPackageMeta( import.meta ).then(
		//Init
		( package_meta ) => {
			cli.packageMeta = package_meta;
			var logger_promise = FSNS.promises.mkdir( cli.packageMeta.paths.log, { recursive: true } ).then(
				() => {
					try{
						cli.logger = ALWI.initWinstonLogger( 'debug.log', cli.packageMeta.paths.log );
					} catch(error){
						return_error = new Error(`ALWI.initWinstonLogger threw an error: ${error}`);
						throw return_error;
					}
					return Promise.resolve();
				},
				( error ) => {
					return_error = new Error(`FSNS.promises.mkdir threw an error: ${error}`);
					throw error;
				}
			);
			try{
				cli.options = CommandLineArgs( cli.optionDefinitions );
			} catch(error){
				return_error = new Error(`CommandLineArgs threw an error: ${error}`);
				throw return_error;
			}
			await logger_promise;
			if( cli.options.verbose === true ){
				cli.logger.real_transports.console_stderr.level = 'debug';
				cli.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'note', message: `Logger: console_stderr transport log level set to: ${Logger.real_transports.console_stderr.level}`});
			}
			var config_promise = ConfigManager.prepare(
				{
					packageMeta: cli.packageMeta,
					logger: cli.logger,
					defaultConstructor: function(){
						//Default constructor

					}
				}
			).then(
				( config_manager ) => {
					cli.config = config_manager;
					return Promise.resolve();
				},
				( error ) => {
					return_error = new Error(`ConfigManager.prepare threw an error: ${error}`);
					throw return_error;
				}
			);
			//Options
			if( cli.options.version === true ){
				console.log(cli.packageMeta.version);
				quick_exit = true;
			}
			if( cli.options.help === true ){
				const help_sections_array = [
					{
						header: 'regex-translator',
						content: 'Convert a Regular Expression from one flavour to another.',
					},
					{
						header: 'Options',
						optionList: cli.optionDefinitions
					}
				]
				const help_message = CommandLineUsage(help_sections_array);
				console.log(help_message);
				quick_exit = true;
			}
			if( cli.options.config === true ){
				console.log('Paths: ', cli.packageMeta.paths);
				quick_exit = true;
			}
			if( quick_exit === false || cli.options['no-quick-exit'] === true ){
				var regexTranslator = new RegexTranslator( { packageMeta: cli.packageMeta, logger: cli.logger, config: cli.config } );
				//Input
				if( cli.options.stdin === true ){
					cli.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'info', message: 'Reading input from STDIN.'});
					input_promise = GetStream( process.stdin, 'utf8' ).catch( 
						( error ) => {
							return_error = new Error(`GetStream threw an error: ${error}`);
							cli.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
							throw return_error;
						}
					);
				} else if( cli.options.input != null ){
					input_promise = FSNS.promises.readFile( cli.options.input, 'utf8' ).catch(
						( error ) => {
							return_error = new Error(`FSNS.promises.readFile threw an error: ${error}`);
							throw return_error;
						}
					);
				} else if( cli.options['input-regex-string'] != null ){
					if( typeof(cli.options['input-regex-string']) === 'string' ){
						input_promise = Promise.resolve( cli.options['input-regex-string'] );
					} else{
						return_error = new TypeError('"input-regex-string" option is specified but is not a string.');
						cli.logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
					}
				} else{
					return_error = new Error('No input options specified.');
					cli.logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
				}
				input_promise.then(
					( input_string ) => {
						var input_object = {};
						try{
							input_object = cli.regexTranslator.getMultiPartObjectFromInputString( input_string );
						} catch(error){
							return_error = new Error(`getMultiPartObjectFromInputString threw an error: ${error}`);
							throw return_error;
						}
						if( cli.options['input-flavour'] != null ){
							if( typeof(cli.options['input-flavour']) === 'string' ){
								input_object.input_flavour = cli.options['input-flavour'];
								cli.logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: `Overriding input flavour to '${input_object.input_flavour}'`});
							} else{
								return_error = new TypeError('"input-flavour" option is specified but the value is not a string.');
								cli.logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
							}
						}
						if( cli.options['output-flavour'] != null ){
							if( typeof(cli.options['output-flavour']) === 'string' ){
								input_object.output_flavour = cli.options['output-flavour'];
								cli.logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: `Overriding output flavour to '${input_object.output_flavour}'`});
							} else{
								return_error = new TypeError('"output-flavour" option specified but the value is not a string.');
								cli.logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
							}
						}
						return input_object;
					},
					( error ) => {
						return_error = new Error(`An error occurred resolving the input promise: ${error}`);
						throw return_error;
					}
				);
				//Transform
				//Output
			}
			
		},
		( error ) => {
			return_error = new Error(`getPackageMeta threw an error: ${error}`);
			throw return_error;
		}
		//quit
	);

