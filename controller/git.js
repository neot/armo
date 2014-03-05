var fs = require('fs');
var exec = require('child_process').exec,
    child;
var util = require('util');
var dowork = function(cb){
  fs.readFile('~/git/'+process.env.OPENSHIFT_APP_NAME+'.git/refs/heads/master', function(err, data){
    if(err){
      cb(err.message);
    }
    else{
      cb(util.format('{ "master": "%s" }"', data.replace('\n', '')));
    }
  });
};
exports.dowork = dowork;
