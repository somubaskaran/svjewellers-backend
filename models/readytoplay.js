const sql = require("./mysqlconnect.js");
var middleware = require('../middleware/reqresmiddleware');
var appconstant = require("../config/appconstant");
var moment = require('moment');
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
var async = require('async');
var forEach = require('async-foreach').forEach;
const fs = require(`fs`);
const mysql = require(`mysql-await`);
const mysqlconstants = require("../config/databaseconstant");
const jsonFile = require("./mysql-config.json");
// constructor
const readytoplay = function() {
    
};

readytoplay.getReadyToPlayList = (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        var data = req.body.data;
        console.log(data);
        var getReadytoplayQuery = "select ready_to_play.*,tournment_category.category_name as category_name from ready_to_play left join tournment_category on ready_to_play.category_id = tournment_category.id where ready_to_play.tour_id='"+data.tournmentId+"'";
        if(data.categoryId && data.categoryId!=0){
            getReadytoplayQuery += " and ready_to_play.category_id = '"+data.categoryId+"'";
        }
        if(data.matchesSelected==0 || data.matchesSelected==1){
            getReadytoplayQuery += " and ready_to_play.status = '"+data.matchesSelected+"'";
        }
        getReadytoplayQuery += " order by ready_to_play.id desc";
        // var getReadytoplayQuery = "SELECT * from ready_to_play where tour_id = '"+data.tournmentId+"'";
        // if(data.categoryId){
        //     getReadytoplayQuery += " and category_id = '"+data.categoryId+"'";
        // }
        // getReadytoplayQuery += " order by id desc";
        let getReadytoplaydata = await connectionStaff.awaitQuery(
            getReadytoplayQuery
        );
        await connectionStaff.awaitCommit();
        
        /** End the connection */
        connectionStaff.awaitEnd();
        callback(null,getReadytoplaydata,res);
    })();
}

readytoplay.getTournmentList = (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        
        var getTournmentListQuery = "SELECT tour_id,tour_name from tournment order by tour_id desc";    
        let getTournmentListdata = await connectionStaff.awaitQuery(
            getTournmentListQuery
        );
            
        await connectionStaff.awaitCommit();
        
        /** End the connection */
        connectionStaff.awaitEnd();
        callback(null,getTournmentListdata,res);
    })();
}

readytoplay.getCategoryList = (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        
        var data = req.body.data;
        var getCategoryListQuery = "SELECT id,category_name from tournment_category where tour_id ='"+data.tournmentId+"' order by id desc";    
        let getCategoryListdata = await connectionStaff.awaitQuery(
            getCategoryListQuery
        );
            
        await connectionStaff.awaitCommit();
        
        /** End the connection */
        connectionStaff.awaitEnd();
        callback(null,getCategoryListdata,res);
    })();
}

module.exports = readytoplay;