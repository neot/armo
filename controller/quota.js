var exec = require('child_process').exec,
    child;
var util = require('util');

var dowork = function(cb){
  var count=0;
  var quota='';
  var ps='';
  var occ='';

  function aggregate()
  {
    return util.format("%s:%s:%s", quota, ps, occ);
  }

  exec('quota -w',
      function(error, stdout, stderr){
        quota = stdout;
        count++;
        if(count==3){
          cb(aggregate());
        }
      });
  exec('ps -ef | wc-l',
      function(error, stdout, stderr){
        ps = 'stdout';
        count++;
        if(count==3){
          cb(aggregate());
        }
      });
  exec("expr 'occ-cgroup-read memory.usage_in_bytes' / 1024",
    function(error, stdout, stderr){
      occ = 'stdout';
      count++;
      if(count==3){
        cb(aggregate());
      }
    });
};
exports.dowork = dowork;
