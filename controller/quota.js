var exec = require('child_process').exec,
    child;
var util = require('util');

var dowork = function(cb){
  var count=0;
  var quota='';
  var ps='';
  var oo='';

  function aggregate()
  {
    return util.format("%s:%s:%s", quota, ps, oo);
  }

  exec("quota -w | sed -n 3p | cut -d ' ' -f 3",
      function(error, stdout, stderr){
        quota = stdout;
        count++;
        if(count==3){
          cb(aggregate());
        }
      });
  exec('ps -eLf | wc -l',
      function(error, stdout, stderr){
        ps = stdout;
        count++;
        if(count==3){
          cb(aggregate());
        }
      });
  exec("expr 'oo-cgroup-read memory.usage_in_bytes' / 1024",
    function(error, stdout, stderr){
      oo = stdout;
      count++;
      if(count==3){
        cb(aggregate());
      }
    });
};
exports.dowork = dowork;
