var exec = require('child_process').exec;
var dowork = function(cb, res){
	exec("quota -w",
      function(error, stdout, stderr){
        cb('stdout', res);
			}
	);
};
exports.dowork = dowork;
