const mysql = require("mysql2");
const mysqlconstants = require("../config/databaseconstant");

var pool = mysql.createPool({
    connectionLimit: 500,
    host: mysqlconstants.MYSQL_HOST,
    user: mysqlconstants.MYSQL_USERNAME,
    password: mysqlconstants.MYSQL_PASSWORD,
    database: mysqlconstants.MYSQL_DATABASE,
    multipleStatements: true
    //timezone: "utc",
});

module.exports = pool;
