var fs = require('fs');

var dowork = function(cb){
  var file = process.env.HOME+'git/'+process.env.OPENSHIFT_APP_NAME+'.git/refs/heads/master';
  fs.readFile(file, {encoding:'utf-8'}, function(err, data){
    if(err){
      return cb(err);
    }
    cb(null, JSON.stringify({master: data.replace('\n', '')}));
  });
};

exports.dowork = dowork;
