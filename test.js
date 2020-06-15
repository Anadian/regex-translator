const ChildProcess = require('child_process');
const Execa = require('execa');
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
test2(null);
