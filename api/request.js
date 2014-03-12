var request = require('request');

var dowork = function(site, cb){
  request("http://"+site, function (error, response, body) {
    if(error) {
      return cb(error);
    }
    cb(null, response.statusCode, body);
  });
};
exports.dowork = dowork;
