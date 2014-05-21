var fs = require('fs');
var request = require('../api/request');
var quota = require('../api/quota');
var git = require('../api/git');
var async = require('async');

var getPage = function (cb){
  fs.readFile("./public/index.html", {encoding:'utf-8'}, function(err, data){
    if(err){
      return cb(err);
    }
    var appUrl= process.env.OPENSHIFT_APP_DNS || "127.0.0.1:8080";
    async.parallel([function(callb){
      quota.dowork(function(err, out){
        if(err){
          return callb(null, "cat not get quota: "+err);
        }
        callb(null, out);
      });
    }, function(callb){
      git.dowork(function(err, out){
        if(err){
          return callb(null, "can not get git revision: "+err);
        }
        callb(null, out);
      });
    }], function(err, results){
      if(err){
        return cb(err);
      }
      var str= new String(data);
      var i=0;
      while(str.indexOf('$appUrl')!=-1){
        str = str.replace('$appUrl', appUrl);
        i++;
      }
      while(str.indexOf("$quota")!=-1){
        str = str.replace("$quota", results[0]);
      }
      while(str.indexOf("$git")!=-1){
        str = str.replace("$git", results[1]);
      }
      cb(null, str);
    });
  });
}

exports.getPage = getPage;
