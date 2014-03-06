var fs = require('fs');
var util = require('util');
var dowork = function(cb){
  fs.readFile(process.env.HOME+'git/'+process.env.OPENSHIFT_APP_NAME+'.git/refs/heads/master', function(err, data){
    if(err){
      cb(err.message);
    }
    else{
      cb(util.format('{ "master": "%s" }"', data.replace('\n', '')));
    }
  });
};
exports.dowork = dowork;
