#!/usr/local/bin/node
const ChildProcess = require('child_process');
const Execa = require('execa');
const Pify = require('pify');
const FileSystem = require('fs');
async function test(t){
	var expected_stdout_string = '\\(simple\\)\\= regex';
	var stdout_string = '';
	var result = null;
	var process_object = null;
	try{
		FileSystem.writeFileSync( 'temp_in.txt', '(simple)? regex', 'utf8' );
		try{
			//process_object = ChildProcess.spawnSync( 'node', ['source/main.js', '-vx', '-I', 'temp_in.txt', '--input-flavour', 'pcre', '--output-flavour', 'vim', '-O', 'temp_out2.txt'], { shell: '/bin/bash' } );
			//process_object = ChildProcess.execSync( 'node source/main.js -vx -I temp_in.txt --input-flavour pcre --output-flavour vim -O temp_out2.txt', { shell: '/bin/bash' } );
			/*try{
				result = await Execa('./source/main.js', ['-vx', '-I', '\'temp_in.txt\'', '--input-flavour', '\'pcre\'', '--output-flavour', '\'vim\'', '-O', '\'temp_out2.txt\''], { shell: '/bin/bash' });
			} catch(error){
				return_error = new Error(`Execa.sync threw an error: ${error}`);
				console.error(return_error);
			}*/
			var result = await Execa.command( 'which node && pwd && node --version && NODE_DEBUG=\'*\' && node source/main.js -I temp_in.txt --input-flavour pcre --output-flavour vim -O temp_out2.txt', { shell: '/bin/bash' } );
			console.log('Result: %o',result);
			var process_object = ChildProcess.fork( './source/main.js', ['-I', 'temp_in.txt', '--input-flavour', 'pcre', '--output-flavour', 'vim', '-O', 'temp_out2.txt'], { silent: true } );
			console.log('process_object: %o', process_object);
			process_object.stdio[2].on('data', function(chunk){
				console.log('chunk received: ', chunk.toString('utf8'));
			});
			/*if( process_object.status === 0 ){
				try{
					stdout_string = FileSystem.readFileSync( 'temp_out2.txt', 'utf8' );
					try{
						FileSystem.unlinkSync( 'temp_out2.txt' );
						FileSystem.unlinkSync( 'temp_in.txt' );
						console.log(stdout_string,expected_stdout_string);
					} catch(error){
						return_error = new Error(`FileSystem.unlinkSync threw an error: ${error}`);
						console.log(return_error);
					}
				} catch(error){
					return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
					console.log(return_error);
				}
			} else{
				console.log('Received a failure status code.');
			}*/
		} catch(error){
			return_error = new Error(`ChildProcess.execSync threw an error: ${error}`);
			 console.log(return_error);
		}
	} catch(error){
		return_error = new Error(`FileSystem.writeFileSync threw an error: ${error}`);
		console.log(return_error);
	}
}
async function test2(t){
	var process_object = null;
	var exit_func = function( code, signal ){
		var expected_stdout_string = '\\(simple\\)\\= regex';
		var output_string = '';
		if( code === 0 ){
			try{
				output_string = FileSystem.readFileSync( 'temp_out2.txt', 'utf8' );
				try{
					FileSystem.unlinkSync( 'temp_out2.txt' );
					FileSystem.unlinkSync( 'temp_in.txt' );
					console.log('output_string: %o expected_output_string: %o', output_string,expected_stdout_string);
				} catch(error){
					return_error = new Error(`FileSystem.unlinkSync threw an error: ${error}`);
					console.log(return_error);
				}
			} catch(error){
				return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
				console.log(return_error);
			}
		} else{
			return_error = new Error(`Erroneous exit code: ${code} signal: ${signal}`);
			console.log(return_error);
		}
	};
	var true_exit_func = exit_func.bind( t );
	try{
		FileSystem.writeFileSync( 'temp_in.txt', '(simple)? regex', 'utf8' );
		process_object = ChildProcess.fork( 'source/main.js', ['-vx', '-I', 'temp_in.txt', '--input-flavour', 'pcre', '--output-flavour', 'vim', '-O', 'temp_out2.txt'], { silent: true } );
		console.log(process_object);
		exit_func.bind
		process_object.on('exit', true_exit_func);
	} catch(error){
		return_error = new Error(`FileSystem.writeFileSync threw an error: ${error}`);
		console.log(return_error);
	}
}
async function test3(t){
	/*var bash_spawn_sync_default = ChildProcess.spawnSync('bash', ['node', 'source/main.js', '-vVhc']);
	console.log('bash_spawn_sync_default: %o', bash_spawn_sync_default);
	var node_spawn_sync_default = ChildProcess.spawnSync('node', ['source/main.js', '-vVhc']);
	console.log('node_spawn_sync_default: %o', node_spawn_sync_default);
	try{ //execa
		//var bash_execa_sync_default = Execa.sync('bash', ['node', 'source/main.js', '-vVhc'], { shell: '/bin/bash' });
		//console.log('bash_execa_sync_default: %o', bash_execa_sync_default);
		//var bash_command_sync_default = Execa.commandSync('bash node source/main.js -vVhc');
		//console.log('bash_command_sync_default: %o', bash_command_sync_default);
		var node_execa_sync_default = Execa.sync('node', ['source/main.js', '-vVhc'], { shell: '/bin/bash' });
		console.log('node_execa_sync_default: %o', node_execa_sync_default);
		var node_command_sync_default = Execa.commandSync('node source/main.js -vVhc');
		console.log('node_command_sync_default: %o', node_command_sync_default);
	} catch(error){
		console.log(`An Execa call threw an error: ${error}`);
	}
	try{
		node_execa_async = await Execa('node', ['source/main.js', '-vVhc']);
		console.log('node_execa_async: %o');
	} catch(error){
		console.log(`Execa threw an error: ${error}`);
	}
	try{
		node_execa_command_async = await Execa.command('node source/main.js -vVhc');
		console.log('node_execa_command_async: %o');
	} catch(error){
		console.log(`Execa.command threw an error: ${error}`);
	}
	var node_fork_async_silent = ChildProcess.fork('source/main.js', ['-vVhc'], { silent: true });
	node_fork_async_silent.stdio[1].on('data', function(chunk){
		console.log('forked stdout: ', chunk.toString());
	});
	node_fork_async_silent.stdio[2].on('data', function(chunk){
		console.log('forked stderr: ', chunk.toString());
	});
	var node_spawn_async = ChildProcess.spawn('node', ['source/main.js', '-vVhc']);
	node_spawn_async.stdio[1].on('data', function(chunk){
		console.log('spawned stdout: ', chunk.toString());
	});
	node_spawn_async.stdio[2].on('data', function(chunk){
		console.log('spawned stderr: ', chunk.toString());
	});
	var bash_spawn_async = ChildProcess.spawn('bash', ['node', 'source/main.js', '-vVhc']);
	bash_spawn_async.stdio[1].on('data', function(chunk){
		console.log('bash spawn stdout: ', chunk.toString());
	});
	bash_spawn_async.stdio[2].on('data', function(chunk){
		console.log('bash spawn stderr: ', chunk.toString());
	});
	var bash_spawn_cli_async = ChildProcess.spawn('./cli_test.sh');
	bash_spawn_cli_async.stdio[1].on('data', function(chunk){
		console.log('bash spawn cli stdout: ', chunk.toString());
	});
	bash_spawn_cli_async.stdio[2].on('data',function(chunk){
		console.log('bash spawn cli stderr: ', chunk.toString());
	});*/
	var node_fork_irs_stdout_async = ChildProcess.fork('source/main.js', ['-v','--input-regex-string', 'pcre/(simple)? regex/replace/vim', '-o'], { silent: true });
	node_fork_irs_stdout_async.stdio[1].on('data', function(chunk){
		console.log('node fork irs-stdout stdio: ', chunk.toString());
	});
	node_fork_irs_stdout_async.stdio[2].on('data', function(chunk){
		console.log('node fork irs-stdout stderr: ', chunk.toString());
	});
	var cli_test = ChildProcess.execFile('./cli_test.sh', null, null, function(error, stdout, stderr){
		console.log('cli_test error: ', error);
		console.log('cli_test stdout: ', stdout);
		console.log('cli_test stderr: ', stderr);
	});
	//console.log('node_fork_async_silent: %o', node_fork_async_silent);
}
test3(null);
