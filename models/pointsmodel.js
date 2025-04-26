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
const { match } = require("assert");
// constructor
const pointsmodel = function() {
    
};

pointsmodel.getPoints = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var matchId = req.body.data.matchId;
            var setNumber = req.body.data.setNumber;
            
            var query = "SELECT SUM(points) as point from points where match_id='"+matchId+"' and sets='"+setNumber+"'";
            
            connection.query(query, [], (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                    // var logdata = {
                    //     type: "error",
                    //     data: err,
                    //     customsg: "To do Query insertion error",
                    // };
                    // logconf.writelog(logdata);
                    res.sendData = {
                        msg: "Server under maintaince",
                        statuscode: 422,
                        success: false,
                    };
                    middleware.reqresmiddleware.beforeresponse(req, res);
                } else {
                    callback(err, result, res);
                }
            });
        }
    });
}
pointsmodel.addPoint = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var matchId = req.body.data.matchId;
            var teamId = req.body.data.teamId;
            var setNumber = req.body.data.setNumber;
            var query = "INSERT INTO points (`match_id`,`team_id`,`points`,`sets`) VALUES ('"+ matchId + "','"+teamId+"','1','"+setNumber+"')";
            connection.query(query, [], (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                    // var logdata = {
                    //     type: "error",
                    //     data: err,
                    //     customsg: "To do Query insertion error",
                    // };
                    // logconf.writelog(logdata);
                    res.sendData = {
                        msg: "Server under maintaince",
                        statuscode: 422,
                        success: false,
                    };
                    middleware.reqresmiddleware.beforeresponse(req, res);
                } else {
                    callback(err, result, res);
                }
            });
        }
    });
}
pointsmodel.removePoint = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var matchId = req.body.data.matchId;
            var teamId = req.body.data.teamId;
            var setNumber = req.body.data.setNumber;
            var query = "INSERT INTO points (`match_id`,`team_id`,`points`,`sets`) VALUES ('"+ matchId + "','"+teamId+"','-1','"+setNumber+"')";
            connection.query(query, [], (err, result) => {
                connection.release();
                if (err) {
                    console.log(err);
                    // var logdata = {
                    //     type: "error",
                    //     data: err,
                    //     customsg: "To do Query insertion error",
                    // };
                    // logconf.writelog(logdata);
                    res.sendData = {
                        msg: "Server under maintaince",
                        statuscode: 422,
                        success: false,
                    };
                    middleware.reqresmiddleware.beforeresponse(req, res);
                } else {
                    callback(err, result, res);
                }
            });
        }
    });
}
module.exports = pointsmodel;