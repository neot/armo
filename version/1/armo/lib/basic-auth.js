var isauthenticated = function(req, cb){
  var pass = proc.env.OPENSHIFT_ARMO_KEY || 'tintin';
  var header=req.headers.authorization;
  if(!header){
    return cb(new Error('not authorized'));
  }

  var tmp = header.split(' ');
  var plain_auth = new Buffer(tmp[1], 'base64').toString();
  var creds = plain_auth.split(':');
  var username = creds[0];
  var password = creds[1];
  if(username == 'alfred' && password==pass){
    return cb();
  }

  return cb(new Error('not authorized'));
};

var isauthenticatedSync = function(req){
  var pass = proc.env.OPENSHIFT_ARMO_KEY || 'tintin';
  var header=req.headers.authorization;
  if(!header){
    return false;
  }

  var tmp = header.split(' ');
  var plain_auth = new Buffer(tmp[1], 'base64').toString();
  var creds = plain_auth.split(':');
  var username = creds[0];
  var password = creds[1];
  if(username == 'nestor' && password==pass){
    return true;
  }

  return false;
};

exports.isauthenticated = isauthenticated;
exports.isauthenticatedSync = isauthenticatedSync;
