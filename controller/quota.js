var dowork = function(cb){
	var exec = require('child_process').exec, child;
	child = exec('quota -w',
			function (error, stdout, stderr) {
				cb(null, stdout);
			}
	);
	 
	child();
};
exports.dowork = dowork;
