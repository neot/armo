var exec = require('child_process').exec,
    child;
var util = require('util');

var dowork = function(cb){
  var count=0;
  var nbexec=4;
  var quotaf='';
  var quotad='';
  var ps='';
  var oo='';

  function aggregate()
  {
    return util.format('{ "ram": %s, "disk": %s, "files": %s, "thread": %s }', oo, quotad, quotaf, ps);
  }

  exec("quota -w | sed -n 3p | cut -d ' ' -f 5",
      function(error, stdout, stderr){
        quotad = stdout.replace('\n', '');
        count++;
        if(count==nbexec){
          cb(aggregate());
        }
      });
  exec("quota -w | sed -n 3p | cut -d ' ' -f 26",
      function(error, stdout, stderr){
        quotaf = stdout.replace('\n', '');
        count++;
        if(count==nbexec){
          cb(aggregate());
        }
      });

  exec('ps -eLf | wc -l',
      function(error, stdout, stderr){
        ps = stdout.replace('\n', '');
        count++;
        if(count==nbexec){
          cb(aggregate());
        }
      });
  exec("expr `oo-cgroup-read memory.usage_in_bytes` / 1024",
    function(error, stdout, stderr){
      oo = stdout.replace('\n', '');
      count++;
      if(count==nbexec){
        cb(aggregate());
      }
    });
};
exports.dowork = dowork;
