const sql = require("./mysqlconnect.js");
var middleware = require('../middleware/reqresmiddleware.js');
var appconstant = require("../config/appconstant.js");
var moment = require('moment');
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
const mysql = require(`mysql-await`);
const mysqlconstants = require("../config/databaseconstant.js");

// constructor
const playermodel = function() {
    
};

playermodel.addPlayer = (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        var playerData = req.body.data;
            var playerName = playerData.playerName;
            var tour_id = playerData.tournmentId;
            var currentMatch = playerData.currentMatch;
            var categoryId = playerData.categoryId;
            var teamId = playerData.teamId;
            var email = playerData.playerEmail;
            var phone = playerData.playerPhone;
            var address = '';
            var pincode = '';
            var playerId = '';
            var responseMessage = '';
            var playerSelectQuery = 'select * from player where email="'+email+'" or phone="'+phone+'"';

                //var query = 'select * from matches where matches.tour_id = '+tournmentId+ ' and matches.round_id = '+temp;
                let playerSelectList = await connectionStaff.awaitQuery(
                    playerSelectQuery
                );
                
            // var getTournmentStatus = "select * from tournment where tour_id="+tour_id
            // let getTournmentData = await connectionStaff.awaitQuery(getTournmentStatus);

            // var getMatchDetailsQuery = "select * from matches where round_id=1 and tour_id="+tour_id;
            // let getMatchDetailsData = await connectionStaff.awaitQuery(getMatchDetailsQuery);
            // lengthOfCurrentMatch = getMatchDetailsData.length/2;
            if(playerSelectList.length>0){
                playerId = playerSelectList[0].id
            }else{
                var AddPlayerquery = "INSERT INTO player (`player_name`,`email`,`phone`,`address`,`pincode`) VALUES ('"+ playerName + "','"+email + "','"+phone+ "','"+address+ "','"+pincode+ "')" ;
            
                let AddPlayerData = await connectionStaff.awaitQuery(
                    AddPlayerquery
                );
                playerId = AddPlayerData.insertId;
            }
            var MapPlayerSelectQuery = 'select * from player_map where category_id="'+categoryId+'" and player_id="'+playerId+'" and tour_id="'+tour_id+'"';
            let MapPlayerSelectList = await connectionStaff.awaitQuery(
                MapPlayerSelectQuery
            );
            
            if(MapPlayerSelectList.length>0){
                responseMessage = '0';
            }else{
                responseMessage = '1';
                var AddPlayerMapDataQuery = "INSERT INTO player_map (`player_id`,`tour_id`,`category_id`,`team_id`) Values ('"+playerId+"','"+tour_id+"','"+categoryId+"','"+teamId+"')";
                let AddPlayerMapData = await connectionStaff.awaitQuery(
                    AddPlayerMapDataQuery
                );
            }    
            await connectionStaff.awaitCommit();
            /** End the connection */
            connectionStaff.awaitEnd();
            callback(null,responseMessage,res);
            
    })();
}

playermodel.getPlayersList = (req,res,callback) => {
    var data = req.body.data;
    //var tournmentId = req.body.data.tournmentId;
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var query = 'select player.* from player left join player_map on player.id=player_map.player_id where player_map.tour_id = "'+data.tournmentId+'" and player_map.category_id = "'+data.categoryId+'" and player_map.team_id = "'+data.teamId+'"';
            //var query = 'select * from player where tour_id = "'+data.tournmentId+'" and category_id = "'+data.categoryId+'" and team_id = "'+data.teamId+'"';
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
module.exports = playermodel;