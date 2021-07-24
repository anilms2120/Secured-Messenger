var RSAKey=require('react-native-rsa');
const bits=1024;
const exponent ='10001';
var rsa=new RSAKey();

rsa.generate(bits,exponent);

var publicKey=rsa.getPublicString();
var privateKey=rsa.getPrivateString();

//rsa.setPrivateString(privateKey);
rsa.setPublicString(publicKey);


export {rsa,publicKey,privateKey};