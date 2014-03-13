var fs = require('fs');
var request = require('request');

var getPage = function (cb){
  fs.readFile("./public/index.html",  {encoding:'utf-8'}, function(err, data){
    if(err){
      return cb(err);
    }
    var appUrl= process.env.OPENSHIFT_APP_DNS || "127.0.0.1";
    var quotaRes = "";
    var gitRes ="";
    var requestRes="";
    request("http://"+appUrl+"/"+"quota", function (error, response, body) {//quota
      if(error) {
        quotaRes=error.message;
      }
      quotaRes=body;
    });
    request("http://"+appUrl+"/"+"git", function (error, response, body) {//git
      if(error) {
        gitRes=error.message;
      }
      gitRes=body;
    });
    request("http://"+appUrl+"/"+"request", function (error, response, body) {//request
      if(error) {
        requestRes=error.message;
      }
      requestRes=body;
    });
    
    var str = data.replace('$appUrl', appUrl);
    str = str.replace("$quota", quotaRes);
    str = str.replace("$git", gitRes);
    console.log(appUrl);
    cb(null, str);
  });
}

exports.getPage = getPage;
