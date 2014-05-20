var fs = require('fs');

var getFile = function (file, cb){
  fs.readFile("./public/file", {encoding:'utf-8'}, function(err, data){
    if(err){
      return cb(err);
    }
    return cb(null, data);
  });
}

exports.getFile = getFile;
