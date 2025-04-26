
var crypto = require('crypto');
// var assert = require('assert');

var algorithm = 'aes-256-cbc';
const IV = "5183666c72eec9e4";
const IV_LENGTH = 16;
var key = 'TSOLRgdkyuyFYrKZvaNiXdwHwq7Vsw==';

// // var iv = key.substr(0,16);

// constructor
const crypt = function(cryptData) {
    this.algorithm = 'aes-256-cbc';
    this.key = 'TSOLRgdkyuyFYrKZvaNiXdwHwq7Vsw==';
};




crypt.encrypt = (data,callback) => {
    var cipher = crypto.createCipheriv(algorithm, key, IV );
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    callback(encrypted);

}

crypt.decrypt = (data,callback) => {

    let decipher = crypto.createDecipheriv(algorithm, key, IV);
    let decrypted = decipher.update(data, 'base64', 'utf8');
    callback(decrypted + decipher.final('utf8'));

}
// crypt.mysqlEncrypt = (data,callback) => {
//     console.log(data.mysqlKey);
//     var cipher = crypto.createCipheriv(algorithm, key, IV );
//     let encrypted = cipher.update(data.mysqlKey, 'utf8', 'base64');
//     encrypted += cipher.final('base64');
//     callback(encrypted);
// }

// crypt.encryptreturn = (data) => {
//     console.log(data);
//     var cipher = crypto.createCipheriv(algorithm, key, IV );
//     let encrypted = cipher.update(data, 'utf8', 'base64');
//     encrypted += cipher.final('base64');
//     return encrypted;

// }


// crypt.decryptreturn = (data) => {

//     let decipher = crypto.createDecipheriv(algorithm, key, IV);
//     let decrypted = decipher.update(data, 'base64', 'utf8');
//     return decrypted + decipher.final('utf8');

// }

// crypt.password = (pwd,callback) => {
//     console.log(pwd);
//     var hash = crypto.createHash('sha256').update(pwd).digest('base64');
//     console.log(hash);
//     callback(hash);
// }
// crypt.resetlink = (pwd,callback) => {
//     console.log(pwd);
//     var hash = crypto.createHash('sha1').update(pwd).digest('base64');
//     console.log(hash);
//     callback(hash);
// }

module.exports = crypt;