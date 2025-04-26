var path = require('path');
var secureEnv = require('secure-env');
global.env = secureEnv({secret:'2188ed5ad3ee7a9106b5c5a8d8533b3699285c48f758613d22408440d28fab24'});

module.exports = Object.freeze({
    JWTTOKENUSER: "CardiacMDConnect@2021",
    //MYSQLENCRYPTKEY: "mysqltoken",
    BASEURL : 'http://localhost:3000',
    ENVIRONMENT:global.env.ENVIRONMENT,
    HTTPS_SETUP:global.env.HTTPS_SETUP,
    DEV_PEM:global.env.DEV_PEM,
    MYSQLENCRYPTKEY:global.env.MYSQLENCRYPTKEY,
    UPLOADS : path.resolve()+'/uploads'
});