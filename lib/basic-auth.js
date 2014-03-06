var isauthenticated = function(req, auth, nauth){
  /*var header=req.headers('authorization')||'';
  token=header.split(/\s+/).pop()||'';
  auth=new Buffer(token, 'base64').toString();
  parts=auth.split(/:/);
  username=parts[0];
  password=parts[1];
  if(username == 'alfred' && password=='tintin')
  {
    auth();
  }*/
  auth();
  //nauth(401, 'WWW-Authenticate', 'Basic realm="Secure Area"');
};
exports.isauthenticated = isauthenticated;
