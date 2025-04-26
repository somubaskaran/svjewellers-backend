let secureEnv = require("secure-env");
global.env = secureEnv({
    secret: "2188ed5ad3ee7a9106b5c5a8d8533b3699285c48f758613d22408440d28fab24",
});
module.exports = Object.freeze({
    MYSQL_HOST: global.env.MYSQL_HOST,
    MYSQL_USERNAME: global.env.MYSQL_USERNAME,
    MYSQL_PASSWORD: global.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: global.env.MYSQL_DATABASE,
    MYSQLENCRYPTKEY: global.env.MYSQLENCRYPTKEY,
});
