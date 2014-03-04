var dowork = function(cb){
	var exec = require('child_process').exec;
	child = exec('quota -w',
			function(error, stdout, stderr){
				cb(null, 'out');
			}
	);
  //cb(null, 'out');
};
exports.dowork = dowork;
