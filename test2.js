const ChildProcess = require('child_process');
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
			//var result = await Execa.command( 'which node && pwd && node --version && NODE_DEBUG=\'*\' && node source/main.js -I temp_in.txt --input-flavour pcre --output-flavour vim -O temp_out2.txt', { shell: '/bin/bash' } );
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
	//t.plan(2);
	var return_error = null;
	var process_object = ChildProcess.fork( 'source/main.js', ['-R', '\'pcre/(simple)? regex/replace/vim\'', '-O', 'temp_out3.txt'], { silent: true } );
	//var promisified_process_object = Pify( process_object, { multiArgs: true, errorFirst: false } );
	//console.log(promisified_process_object);
	//var promisified_stdio_object = Pify( promisified_process_object.stdio, { multiArgs: true, errorFirst: false } );
	//var promisified_stdout_object = Pify( promisified_stdio_object[1], { multiArgs: true, errorFirst: false } );
	//var promisified_stdout_on_function = Pify( process_object.stdout.on.bind( process_object.stdout ), { multiArgs: true, errorFirst: false } );
	/*var results = await promisified_process_object.on( 'exit' );
	console.log(results);*/
	//var stdout_data = await promisified_stdout_object.on( 'data' );
	var stdout_data = '';
	process_object.stdio[1].on( 'data', function( chunk ){
		console.log( 'received chunk: %o', chunk );
		stdout_data = chunk;
	});
	/*try{
		console.log(promisified_stdout_on_function);
		stdout_data = await promisified_stdout_on_function( 'data' );
	} catch(error){
		console.log(error);
	}*/
	//setTimeout( function(){
		var expected_stdout_string = '\\(simple\\)\\= regex';
		var stdout_string = stdout_data.toString( 'utf8' );
		console.log(stdout_string,expected_stdout_string);
	//}, 30000 );
	/*if( results[0] === 0 ){
		t.pass();
	} else{
		return_error = new Error(`Erroneous exit code: ${results[0]}, signal: ${results[1]}`);
		t.fail(return_error.message);
	}*/
};

test2(null);
