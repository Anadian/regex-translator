#!/usr/local/bin/node

/**
* @file application-log-standard.js
* @brief Standardised level names and console formatting.
* @author Anadian
* @copyright 	Copyright 2019 Canosw
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
*/

//Dependencies
	//Internal
	//Standard
	const FileSystem = require('fs');
	const Path = require('path');
	//External
	const LogForm = require('logform');
	const Winston = require('winston');

//Constants
const FILENAME = 'application-log-standard.js';
const MODULE_NAME = 'ApplicationLogStandard';
var PROCESS_NAME = '';
if(require.main === module){
	PROCESS_NAME = 'application-log-standard';
} else{
	PROCESS_NAME = process.argv0;
}

//Constants
const ApplicationLogStandard = { //RFC 5424
	levels: {
		emerg: 0,
		alert: 1,
		crit: 2,
		error: 3,
		warn: 4,
		note: 5,
		info: 6,
		debug: 7
	},
	colors: {
		emerg: 'bold underline red',
		alert: 'bold underline red',
		crit: 'bold red',
		error: 'red',
		warn: 'yellow',
		note: 'magenta',
		info: 'blue',
		debug: 'green'
	}
};
const WinstonLogFormFormats = {
	file: LogForm.format.combine(
		LogForm.format.timestamp(),
		LogForm.format.splat(),
		LogForm.format.printf((info) => {
			return `${info.timestamp} ${info.process?info.process+':':''}${info.module?info.module+':':''}${info.file?info.file+':':""}${info.function?info.function+':':''}${info.level}: ${info.message}${(info.meta)?' '+info.meta:''}`;
		}),
	),
	console: LogForm.format.combine(
		LogForm.format.colorize({
			all: true,
			colors: ApplicationLogStandard.colors
		}),
		LogForm.format.splat(),
		LogForm.format.printf((info) => {
			return `${info.level}: ${info.function?info.function+':':''} ${info.message}`;
		})
	)
};
//Variables
var WinstonLogger_Transports = {
	file_debug: new Winston.transports.File({
		level: 'debug',
		format:	WinstonLogFormFormats.file,
		eol: '\n',
		filename: 'log_debug.log',
		maxsize: 1048576,
		maxFiles: 4
	}),
	console_stderr: new Winston.transports.Console({
		level: 'info',
		format: WinstonLogFormFormats.console,
		stderrLevels: ['emerg','alert','crit','error','warn','note','info','debug'],
		warnLevels: ['warn','note']
	})
};	
/*const WinstonLoggerLiteral = {
	level: 'debug',
	levels: ApplicationLogStandard.levels,
	transports: [
		WinstonLogger_Transports.file_debug,
		WinstonLogger_Transports.console_stderr
	]
};*/
//Functions
function WinstonLogger_Init( basename, directory, console_level, max_size, max_files ){
	var _return = [1,null];
	const FUNCTION_NAME = 'Logger_Init';
	//Variables
	var filename = '';
	//Parametre checks
	if( basename != null && typeof(basename) === 'string' ){
		WinstonLogger_Transports.file_debug.filename = basename;
		WinstonLogger_Transports.file_debug._basename = basename;
	}
	if( directory != null && typeof(directory) === 'string' ){
		WinstonLogger_Transports.file_debug.dirname = directory;
	}
	if( console_level != null && typeof(console_level) === 'string' ){
		WinstonLogger_Transports.console_stderr.level = console_level;
	}
	if( max_size != null && typeof(max_size) === 'number' ){
		WinstonLogger_Transports.file_debug.maxsize = max_size;
	}
	if( max_files != null && typeof(max_files) === 'number' ){
		WinstonLogger_Transports.file_debug.maxFiles = max_files;
	}
	//Function
	var logger = Winston.createLogger({
		level: 'debug',
		levels: ApplicationLogStandard.levels,
		transports: [
			WinstonLogger_Transports.file_debug,
			WinstonLogger_Transports.console_stderr
		]
	});
	logger.real_transports = WinstonLogger_Transports;
	_return = [0, logger];
	//Return
	return _return;
}

//Exports and Execution
if(require.main === module){
	const FUNCTION_NAME = 'MainExecutionFunction';
	//console.log('WinstonLoggerLiteral: %o', WinstonLoggerLiteral);	
	console.log('WinstonLogger_Transports: %o', WinstonLogger_Transports);
	var function_return = WinstonLogger_Init( 'debug.log', './test_log_dir' );
	if( function_return[0] === 0 ){
		var Logger = function_return[1];
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: 'Test.'});
	}
} else{
	exports.levels = ApplicationLogStandard.levels;
	exports.colors = ApplicationLogStandard.colors;
	exports.formats = WinstonLogFormFormats;
	exports.transports = WinstonLogger_Transports;
	exports.InitLogger = WinstonLogger_Init;
	//exports.winstonLoggerLiteral = WinstonLoggerLiteral;
	//exports.DefaultPropertiesFormat = DefaultPropertiesFormat;
}
/*
const Logger = Winston.createLogger({
	level: 'debug',
	levels: ApplicationLogStandard.levels,
	transports: [
		new Winston.transports.Console({
			level: 'debug',
			format: LogForm.format.combine(
				LogForm.format.colorize({
					all: true,
					colors: ApplicationLogStandard.colors
				}),
				LogForm.format.splat(),
				LogForm.format.printf((info) => {
					return `${info.level}: ${info.function?info.function+':':''} ${info.message}`;
				})
			),
			stderrLevels: ['emerg','alert','crit','error','warn','note','info','debug'],
			warnLevels: ['warn','note']
		}),
		new Winston.transports.File({
			level: 'debug',
			format: LogForm.format.combine(
				LogForm.format.timestamp(),
				LogForm.format.splat(),
				LogForm.format.printf((info) => {
					return `${info.timestamp} ${info.process?info.process+':':''}${info.module?info.module+':':''}${info.file?info.file+':':""}${info.function?info.function+':':''}${info.level}: ${info.message}${(info.meta)?' '+info.meta:''}`;
				})
			),
			eol: '\n',
			filename: 'log_debug.log',
			maxsize: 1048576,
			maxFiles: 4
		})
	]
});
*/
