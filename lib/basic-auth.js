var isauthenticated = function(req, auth, nauth){
  var header=req.headers['authorization'];
  if(header){
    var tmp = header.split(' ');
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
    var creds = plain_auth.split(':');
    var username = creds[0];
    var password = creds[1];
    if(username == 'alfred' && password=='tintin'){
      auth();
    }
    else{
      nauth(401, 'WWW-Authenticate', 'Basic realm="Secure Area"');
    }
  }
  else{
    nauth(401, 'WWW-Authenticate', 'Basic realm="Secure Area"');
  }
};
exports.isauthenticated = isauthenticated;
