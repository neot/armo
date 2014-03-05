var exec = require('child_process').exec,
    child;

var dowork = function(cb){
  exec('quota -w',function(error, stdout, stderr){cb('stdout');});
  //cb('stdout');
};
exports.dowork = dowork;
