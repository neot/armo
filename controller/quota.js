var dowork = function(cb){
	var exec = require('child_process').exec;
	exec('quota -w',
      function(error, stdout, stderr){
        cb(stdout);
			}
	);
};
exports.dowork = dowork;
