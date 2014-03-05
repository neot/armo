var exec = require('child_process').exec,
    child;
var util = require('util');
var dowork = function(cb){
  exec("cat ~/git/*.git/refs/heads/master",
      function(error, stdout, stderr){
          cb(util.fprmat('{ "master": "%s" }"', stdout));
        });
};
exports.dowork = dowork;
