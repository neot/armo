var fs = require('fs');
var path = require('path');

var dowork = function(cb){
  var file = path.join(process.env.HOME,'git/',process.env.OPENSHIFT_APP_NAME+'.git/refs/heads/master');
  fs.readFile(file, {encoding:'utf-8'}, function(err, data){
    if(err){
      return cb("Cannot access revision number, maybe your git repository is empty");
    }
    cb(null, JSON.stringify({master: data.toString().replace('\n', '')}));
  });
};

exports.dowork = dowork;
