var dowork = function(cb){
	var exec = require('child_process').exec;
	child = exec('quota -w',
			function(error, stdout, stderr){
				cb('out');
			}
	);
  //cb(null, 'out');
};
exports.dowork = dowork;
