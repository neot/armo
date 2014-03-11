var request = require('request');

var dowork = function("http://"+site, cb){
  request(site, function (error, response, body) {
    if(error) {
      return cb(error);
    }
    cb(null, response.statusCode, body);
  });
};
exports.dowork = dowork;
