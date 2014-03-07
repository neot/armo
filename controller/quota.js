var exec = require('child_process').exec;

var dowork = function(cb){
  var isError;
  var count=0;
  var nbexec=4;
  var quotaf='';
  var quotad='';
  var ps='';
  var oo='';

  function aggregate(){
    return JSON.stringify({
      ram: oo,
      disk: quotad,
      files: quotaf,
      thread: ps
    });
  }

  exec("quota -w | sed -n 3p | cut -d ' ' -f 5", function(error, stdout){
    if(error && !isError){
      isError = true;
      return cb(error);
    }
    quotad = stdout.replace('\n', '');
    count++;
    if(count===nbexec){
      cb(null, aggregate());
    }
  });

  exec("quota -w | sed -n 3p | cut -d ' ' -f 26", function(error, stdout){
    if(error && !isError){
      isError = true;
      return cb(error);
    }
    quotaf = stdout.replace('\n', '');
    count++;
    if(count===nbexec){
      cb(null, aggregate());
    }
  });

  exec('ps -eLf | wc -l', function(error, stdout){
    if(error && !isError){
      isError = true;
      return cb(error);
    }
    ps = stdout.replace('\n', '');
    count++;
    if(count===nbexec){
      cb(null, aggregate());
    }
  });

  exec("expr `oo-cgroup-read memory.usage_in_bytes` / 1024", function(error, stdout){
    if(error && !isError){
      isError = true;
      return cb(error);
    }
    oo = stdout.replace('\n', '');
    count++;
    if(count===nbexec){
      cb(null, aggregate());
    }
  });

};

exports.dowork = dowork;
