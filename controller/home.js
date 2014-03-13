var fs = require('fs');
var request = require('request');
var async = require('async');

var getPage = function (cb){
  fs.readFile("./public/index.html", {encoding:'utf-8'}, function(err, data){
    if(err){
      return cb(err);
    }
    var appUrl= process.env.OPENSHIFT_APP_DNS || "127.0.0.1:8080";
    async.parallel([function(callb){
      request("http://"+appUrl+"/"+"quota", function (error, response, body) {//quota
        if(error) {
          return callb(error);
        }
        callb(null, body);
      });
    }, function(callb){
      request("http://"+appUrl+"/"+"git", function (error, response, body) {//git
        if(error) {
          callb(error);
        }
        callb(null, body);
      });
    }, function(callb){
      request("http://"+appUrl+"/"+"request", function (error, response, body) {//request
        if(error) {
          callb(error);
        }
        callb(body);
      });
    }], function(err, results){
      if(err){
        return cb(err);
      }
      var str=data;
      while(str.indexOf('$appUrl')!=-1){
        str = str.replace('$appUrl', appUrl);
      }
      while(str.indexOf("$quota")!=-1){
        str = str.replace("$quota", results[0]);
      }
      while(str.indexOf("$git")!=-1){
        str = str.replace("$git", results[1]);
      }
      console.log(results[1]);
      cb(null, str);
    });
  });
}

exports.getPage = getPage;
