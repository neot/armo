var dowork = function(){
	var exec = require('child_process').exec, child;
	child = exec('quota -w',
			function (error, stdout, stderr) {
				exports.mesage = stdout;
			}
	);
	 
	child();
}
exports.dowork = dowork;
