var isauthentified(req){
  var header=req.headers('authorization')||'';
  token=header.split(/\s+/).pop()||'';
  auth=new Buffer(token, 'base64').toString();
  parts=auth.split(/:/);
  username=parts[0];
  password=parts[1];
  if(username == 'alfred' && password=='tintin')
  {
    return true;
  }
  return false;
}
