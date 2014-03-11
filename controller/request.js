var require = require('require');

var dowork = function(site, cb){
  request(site, function (error, response, body) {
    if(error) {
      return cb(error.message();
    }
    cb(null, response.statusCode, body);
  });
};
exports.dowork = dowork;
