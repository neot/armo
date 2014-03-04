var exec = require('child_process').exec;
var dowork = function(cb){
	exec('quota -w',
      function(error, stdout, stderr){
        cb(stdout);
			}
	);
};
exports.dowork = dowork;
