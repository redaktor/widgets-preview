import jwt from '../JSON/webtoken';
var jToken = jwt.encode({hello: 'world'},'secret','sha256');
var result = jwt.decode(jToken,'secret');
console.log('jToken',jToken);
console.log('result',result);
