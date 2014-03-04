var exec = require('child_process').exec;
var dowork = function(){
  var out='';
	exec('quota -w',
      function(error, stdout, stderr){
        out = stdout;
			}
	);
  return out;
};
exports.dowork = dowork;
