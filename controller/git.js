var fs = require('fs');
var util = require('util');
var dowork = function(cb){
  fs.readFile(process.env.HOME+'git/'+process.env.OPENSHIFT_APP_NAME+'.git/refs/heads/master', function(err, data){
    if(err){
      cb(err.message);
    }
    else{
      d=data;
      cb(util.format('{ "master": "%s" }"', d));
    }
  });
};
exports.dowork = dowork;
