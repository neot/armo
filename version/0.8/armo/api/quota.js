var exec = require('child_process').exec;
var async = require('async');

var dowork = function(callback){

  function aggregate(results){
    return JSON.stringify({
      ram: results[3],
      disk: results[0],
      files: results[1],
      thread: results[2]
    });
  }

  async.parallel([function(cb){
    exec("quota -w | sed -n 3p", function(error, stdout){// warning!, result depends on the field number
      if(error){
        return cb(error);
      }
      var regex1 = /^[^ ]*[ ]*/;
      var regex2 =  /^[^ ]*[ ]*[0-9]*/;
      var match1 = regex1.exec(stdout);
      var match2 = regex2.exec(stdout);
      
      var start = match1.index+match1[0].length;
      var end = match2.index+match2[0].length;
      console.log(end);
      cb(null, stdout.substr(start, end-start));
    });
  }, function(cb){
    exec("quota -w | sed -n 3p", function(error, stdout){// warning!, result depends on the field number
      if(error){
        return cb(error);
      }
      var regex1 =  /^[^ ]*[ ]*[0-9]*[ ]*[0-9]*[ ]*[0-9]*[ ]*/;
      var regex2 =  /^[^ ]*[ ]*[0-9]*[ ]*[0-9]*[ ]*[0-9]*[ ]*[0-9]*/;
      var match1 = regex1.exec(stdout);
      var match2 = regex2.exec(stdout);
      
      var start = match1.index+match1[0].length;
      var end = match2.index+match2[0].length;
      console.log(end);
      cb(null, stdout.substr(start, end-start));
    });
  }, function(cb){
    exec('ps -eLf | wc -l', function(error, stdout){
      if(error){
        return cb(error);
      }
      cb(null, stdout.replace('\n', ''));
    });
  }, function(cb){
    exec("expr `oo-cgroup-read memory.usage_in_bytes` / 1024", function(error, stdout){
      if(error){
        return cb(error);
      }
      cb(null, stdout.replace('\n', ''));
    });
  }], function(err, results){
    if(err){
      return callback(err);
    }
    callback(null, aggregate(results));
  });
};

exports.dowork = dowork;
