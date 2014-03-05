var exec = require('child_process').exec,
    child;
var util = require('util');

var dowork = function(cb){
  exec("quota -w | sed -n 3p | cut -d ' ' -f 5",
      function(error, stdout, stderr){
          cb(stdout);
      });
};
exports.dowork = dowork;
