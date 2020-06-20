#!/usr/local/bin/node
const ChildProcess = require('child_process');
var child_process_object = ChildProcess.spawnSync( 'ls' );
console.log('%o', child_process_object);
