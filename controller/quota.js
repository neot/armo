var exec = require('child_process').exec;
var async = require('async');

var dowork = function(callback){
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

  async.parallel([function(cb){
    exec("quota -w | sed -n 3p | cut -d ' ' -f 4", function(error, stdout){// warning!, result depends on the field number
      if(error){
        return cb(error);
      }
      quotad = stdout.replace('\n', '');
      cb(null, quotad);
    });
  }, function(cb){
    exec("quota -w | sed -n 3p | cut -d ' ' -f 24", function(error, stdout){// warning!, result depends on the field number
      if(error){
       return cb(error);
      }
      quotaf = stdout.replace('\n', '');
      cb(null, quotaf);
    });
  }, function(cb){
    exec('ps -eLf | wc -l', function(error, stdout){
      if(error){
        return cb(error);
      }
      ps = stdout.replace('\n', '');
      cb(null, ps);
    });
  }, function(cb){
    exec("expr `oo-cgroup-read memory.usage_in_bytes` / 1024", function(error, stdout){
      if(error){
        return cb(error);
      }
      oo = stdout.replace('\n', '');
      cb(null, oo);
    });
  }], function(err, results){
    if(err){
      return callback(err);
    }
    callback(null, aggregate());
  });
};

exports.dowork = dowork;
