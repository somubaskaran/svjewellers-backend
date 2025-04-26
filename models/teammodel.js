const sql = require("./mysqlconnect.js");
var middleware = require('../middleware/reqresmiddleware.js');
var appconstant = require("../config/appconstant.js");
var moment = require('moment');
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
const mysql = require(`mysql-await`);
const mysqlconstants = require("../config/databaseconstant.js");

// constructor
const teammodel = function() {
    
};
teammodel.addTeam = (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
            var playername = req.body.data.playername;
            var tour_id = req.body.data.tournmentId;
            var currentMatch = req.body.data.currentMatch;
            var categoryId = req.body.data.categoryId;
            
            var getTournmentStatus = "select * from tournment where tour_id="+tour_id
            let getTournmentData = await connectionStaff.awaitQuery(getTournmentStatus);

            var getMatchDetailsQuery = "select * from matches where round_id=1 and tour_id="+tour_id;
            let getMatchDetailsData = await connectionStaff.awaitQuery(getMatchDetailsQuery);
            lengthOfCurrentMatch = getMatchDetailsData.length/2;

            var AddPlayerquery = "INSERT INTO teams (`player_name`,`tour_id`,`category_id`) VALUES ('"+ playername + "','"+tour_id+"','"+categoryId+"')" ;
            let AddPlayerData = await connectionStaff.awaitQuery(
                AddPlayerquery
            );

            currentMatchTemp = currentMatch+1;    
            if(getTournmentData[0].tour_status===1 && currentMatch !== lengthOfCurrentMatch){
                var updateOldMatchQuery = "UPDATE matches set status='0' where match_number="+currentMatchTemp+" and tour_id="+tour_id;
                var updateOldMatchData = await connectionStaff.awaitQuery(updateOldMatchQuery);

                var updateNewMatchQuery = "INSERT INTO matches (`tour_id`,`team_id`,`round_id`,`match_number`,`match_number_type`,`status`) VALUES ('"+tour_id+"','"+AddPlayerData.insertId+"','1','"+currentMatchTemp+"','B','0')";
                var updateNewMatchData = await connectionStaff.awaitQuery(updateNewMatchQuery);
            }

            if(lengthOfCurrentMatch===currentMatch){
                var updateNewMatchQuery = "INSERT INTO matches (`tour_id`,`team_id`,`round_id`,`match_number`,`status`) VALUES ('"+tour_id+"','"+AddPlayerData.insertId+"','1','"+currentMatch+"','3')";
            }
                
                await connectionStaff.awaitCommit();
                /** End the connection */
                connectionStaff.awaitEnd();
                callback(null,AddPlayerData,res);
            
    })();
    // sql.getConnection(function(err, connection) {
    //     if (err) {
    //         //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
    //         //logconf.writelog(logdata);
    //         res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
    //         middleware.reqresmiddleware.beforeresponse(req,res);
    //     }else{
    //         var playername = req.body.data.playername;
    //         var tour_id = req.body.data.tournmentId;
    //         var query = "INSERT INTO teams (`player_name`,`tour_id`) VALUES ('"+ playername + "','"+tour_id+"')" ;
    //         connection.query(query, [], (err, result) => {
    //             connection.release();
    //             if (err) {
    //                 console.log(err);
    //                 res.sendData = {
    //                     msg: "Server under maintaince",
    //                     statuscode: 422,
    //                     success: false,
    //                 };
    //                 middleware.reqresmiddleware.beforeresponse(req, res);
    //             } else {
    //                 callback(err, result, res);
    //             }
    //         });
    //     }
    // });
}  

teammodel.getTeamList = (req,res,callback) => {
    var data = req.body.data;
    //var tournmentId = req.body.data.tournmentId;
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var query = 'select * from teams where tour_id = "'+data.tournmentId+'" and category_id = "'+data.categoryId+'"';
            connection.query(query, [], async (err, matchDetailList) => {
                if (err) {
                    console.log(err);
                    res.sendData = {
                        msg: "Server under maintaince",
                        statuscode: 503,
                    };
                    middleware.reqresmiddleware.beforeresponse(req, res);
                } else {
                    callback(
                        err,
                        matchDetailList,
                        res
                    );
                }
            });    
        }
    });
}        
 
// matchmodel.getMatchDetail = (req,res,callback) => {
//     var tournmentId = req.body.data.tournmentId;
//     sql.getConnection(function(err, connection) {
//         if (err) {
//             //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
//             //logconf.writelog(logdata);
//             res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
//             middleware.reqresmiddleware.beforeresponse(req,res);
//         }else{
//             var query = 'select * from tournment where tour_id="'+tournmentId+'"';
//             connection.query(query, [], async (err, matchDetailData) => {
//                 if (err) {
//                     console.log(err);
//                     res.sendData = {
//                         msg: "Server under maintaince",
//                         statuscode: 503,
//                     };
//                     middleware.reqresmiddleware.beforeresponse(req, res);
//                 } else {
//                     callback(
//                         err,
//                         matchDetailData[0],
//                         res
//                     );
//                 }
//             });    
//         }
//     });
// }     
module.exports = teammodel;