const ChildProcess = require('child_process');
function test(t){
	var expected_stdout_string = '\\(simple\\)\\= regex';
	var stdout_string = '';
	var something = 'something';
	var process_object = ChildProcess.spawnSync( 'node', ['source/main.js', '--input-regex-string', 'pcre/(simple)? regex/replace/vim', '-o'], { stdio: ['pipe', 'pipe', 'pipe'] } );
	console.log(process_object);
	if( process_object.status === 0 ){
		try{
			console.log(process_object.output[1]);
			stdout_string = process_object.output[1].toString('utf8');
			console.log(stdout_string, something);
			console.log('stdout_string: %s %s', stdout_string, something);
			//t.is(stdout_string,expected_stdout_string);
		} catch(error){
			return_error = new Error(`process_object.toString threw an error: ${error}`);
			throw return_error;
		}
	} else{
		//t.fail();
	}
}

test(null);
