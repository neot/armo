var fs = require('fs');
var exec = require('child_process').exec,
    child;
var util = require('util');
var dowork = function(cb){
  fs.readFile('/var/lib/openshift/5315a46d5973ca221c0002b1/git/'+process.env.OPENSHIFT_APP_NAME+'.git/refs/heads/master', function(err, data){
    if(err){
      cb(err.message);
    }
    else{
      cb(util.format('{ "master": "%s" }"', data.replace('\n', '')));
    }
  });
};
exports.dowork = dowork;
