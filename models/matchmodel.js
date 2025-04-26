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
const matchmodel = function() {
    
};
matchmodel.addMatch = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var matchName = req.body.data.matchName;
            var query = "INSERT INTO tournment (`tour_name`,`tour_type`) VALUES ('"+ matchName + "','0')";
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
matchmodel.addTournment = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var tournmentName = req.body.data.tournmentName;
            var query = "INSERT INTO tournment (`tour_name`,`tour_type`) VALUES ('"+ tournmentName + "','0')"; 
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
matchmodel.addCategory = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var resData = req.body.data;
            var query = "INSERT INTO tournment_category (`category_name`,`tour_id`,`age_from`,`age_to`,`tour_category_status`,`tour_category_type`) VALUES ('"+ resData.categoryName + "','"+resData.tour_id+"','"+resData.ageFrom+"','"+resData.ageTo+"','0','"+resData.matchType+"')";
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
matchmodel.getMatchList = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var query = 'select * from tournment order by tour_id desc';
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

matchmodel.getTournmentCategoryList = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            console.log(req.body.data);
            var tournmentId = req.body.data.tournmentId;
            var query = 'select * from tournment_category where tour_id = "'+tournmentId+'" order by id desc';
            connection.query(query, [], async (err, tournmentCategoryList) => {
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
                        tournmentCategoryList,
                        res
                    );
                }
            });    
        }
    });
}

matchmodel.getLeagueMatchDetail = (req,res,callback) => {
    var data = req.body.data;
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var query = 'select * from teams where tour_id="'+data.tournmentId+'" and category_id="'+data.categoryId+'" ';
            connection.query(query, [], async (err, matchDetailData) => {
                if (err) {
                    console.log(err);
                    res.sendData = {
                        msg: "Server under maintaince",
                        statuscode: 503,
                    };
                    middleware.reqresmiddleware.beforeresponse(req, res);
                } else {
                    var TotalteamCount = matchDetailData.length;
                    var byeCount = 0;
                    // if(!powerOfTwo(TotalteamCount)){
                    //     highestPowerOfTwo = getTheHighestPowerOfTwo(TotalteamCount);
                    //     byeCount = getByeTeamcount(highestPowerOfTwo,TotalteamCount);
                    // }else{
                    //     highestPowerOfTwo = TotalteamCount;
                    // }
                    var totalRounds = 3;
                    var temp = ((TotalteamCount * (TotalteamCount-1)/2));
                    var mactchesCountList = [temp,2,2];
                    var totalMatches = ((TotalteamCount * (TotalteamCount-1)/2)+3);
                    //var getTournmentQuery = 'select * from tournment where tour_id="'+data.tournmentId+'"';
                    //var getCategoryTournmentQuery = 'select * from tournment_category where tour_id="'+data.tournmentId+'" and id="'+data.categoryId+'"';
                    var getWinnersLooserListData = await getWinnersList(totalRounds,data);
                    var getTournmentQuery = 'select tournment.*,tournment_category.tour_category_status, tournment_category.tour_category_type,tournment_category.category_name from tournment left join tournment_category on tournment.tour_id = tournment_category.tour_id where tournment.tour_id="'+data.tournmentId+'" and tournment_category.id = "'+data.categoryId+'"';
                    connection.query(getTournmentQuery, [], async (err, tournmentDetails) => {
                        if (err) {
                            console.log(err);
                            res.sendData = {
                                msg: "Server under maintaince",
                                statuscode: 503,
                            };
                            middleware.reqresmiddleware.beforeresponse(req, res);
                        } else {
                            var matchDetailData = {
                                "tournmentDetails":tournmentDetails[0],
                                "totalMatches":totalMatches,
                                "mactchesCountList": mactchesCountList,
                                "totalRounds": totalRounds,
                                "byeCount": byeCount,
                                "tournmentId":data.tournmentId,
                                "categoryId":data.categoryId,
                                "winnerLooserList":getWinnersLooserListData,
                            }
                            res.matchDetailData = matchDetailData;
                            callback(
                                err,
                                matchDetailData,
                                res
                            );
                        }
                    });    
                }
            });    
        }
    });
}
 
matchmodel.getMatchDetail = (req,res,callback) => {
    var data = req.body.data;
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var query = 'select * from teams where tour_id="'+data.tournmentId+'" and category_id="'+data.categoryId+'" ';
            connection.query(query, [], async (err, matchDetailData) => {
                if (err) {
                    console.log(err);
                    res.sendData = {
                        msg: "Server under maintaince",
                        statuscode: 503,
                    };
                    middleware.reqresmiddleware.beforeresponse(req, res);
                } else {
                    var TotalteamCount = matchDetailData.length;
                    var byeCount = 0;
                    if(!powerOfTwo(TotalteamCount)){
                        highestPowerOfTwo = getTheHighestPowerOfTwo(TotalteamCount);
                        byeCount = getByeTeamcount(highestPowerOfTwo,TotalteamCount);
                    }else{
                        highestPowerOfTwo = TotalteamCount;
                    }
                    var totalRounds = Math.log(highestPowerOfTwo)/Math.log(2);
                    var mactchesCountList = getMatchCountOnRounds(TotalteamCount,byeCount);
                    mactchesCountList.splice(-1);
                    mactchesCountList.push(2);// add more round for third or fouth 
                    var totalMatches = getTotalmatches(TotalteamCount);
                    //var getTournmentQuery = 'select * from tournment where tour_id="'+data.tournmentId+'"';
                    //var getCategoryTournmentQuery = 'select * from tournment_category where tour_id="'+data.tournmentId+'" and id="'+data.categoryId+'"';
                    var getWinnersLooserListData = await getWinnersList(totalRounds,data);
                    var getTournmentQuery = 'select tournment.*,tournment_category.tour_category_status, tournment_category.tour_category_type,tournment_category.category_name from tournment left join tournment_category on tournment.tour_id = tournment_category.tour_id where tournment.tour_id="'+data.tournmentId+'" and tournment_category.id = "'+data.categoryId+'"';
                    connection.query(getTournmentQuery, [], async (err, tournmentDetails) => {
                        if (err) {
                            console.log(err);
                            res.sendData = {
                                msg: "Server under maintaince",
                                statuscode: 503,
                            };
                            middleware.reqresmiddleware.beforeresponse(req, res);
                        } else {
                            var matchDetailData = {
                                "tournmentDetails":tournmentDetails[0],
                                "totalMatches":totalMatches,
                                "mactchesCountList": mactchesCountList,
                                "totalRounds": totalRounds,
                                "byeCount": byeCount,
                                "tournmentId":data.tournmentId,
                                "categoryId":data.categoryId,
                                "winnerLooserList":getWinnersLooserListData,
                            }
                            res.matchDetailData = matchDetailData;
                            callback(
                                err,
                                matchDetailData,
                                res
                            );
                        }
                    });    
                }
            });    
        }
    });
}

matchmodel.getMatchCategoryDetails = async (req,res,callback) => {
    (async () => {
    var data = req.body.data;
    const connectionStaff = await mysql.createConnection({
        connectionLimit: 500,
        host: mysqlconstants.MYSQL_HOST,
        user: mysqlconstants.MYSQL_USERNAME,
        password: mysqlconstants.MYSQL_PASSWORD,
        database: mysqlconstants.MYSQL_DATABASE,
    });
    
    var getMatchCategoryDataQuery = "SELECT * from tournment_category where tour_id='"+data.tournmentId+"' and id='"+data.categoryId+"'";

    let getMatchCategoryData = await connectionStaff.awaitQuery(
        getMatchCategoryDataQuery
    );
    await connectionStaff.awaitCommit();
    
    /** End the connection */
    connectionStaff.awaitEnd();
    callback(null,getMatchCategoryData,res);
})();   
}
matchmodel.getPointTable = async (req,res,callback) => {
    (async () => {
    var data = req.body.data;
    const connectionStaff = await mysql.createConnection({
        connectionLimit: 500,
        host: mysqlconstants.MYSQL_HOST,
        user: mysqlconstants.MYSQL_USERNAME,
        password: mysqlconstants.MYSQL_PASSWORD,
        database: mysqlconstants.MYSQL_DATABASE,
    });
    
    var getPointTableQuery = "SELECT COUNT(team_id) as value, teams.* FROM `ready_to_play` left JOIN teams on ready_to_play.winner_team_id = teams.team_id WHERE ready_to_play.category_id='"+data.categoryId+"' GROUP BY ready_to_play.winner_team_id order by value DESC";

    let getPointTableQueryData = await connectionStaff.awaitQuery(
        getPointTableQuery
    );
    await connectionStaff.awaitCommit();
    
    /** End the connection */
    connectionStaff.awaitEnd();
    callback(null,getPointTableQueryData,res);
})();   
}
matchmodel.getmatchInfo = async (req,res,callback) => {
    (async () => {
    var readyToPlayId = req.body.data.readyToPlayId;
    const connectionStaff = await mysql.createConnection({
        connectionLimit: 500,
        host: mysqlconstants.MYSQL_HOST,
        user: mysqlconstants.MYSQL_USERNAME,
        password: mysqlconstants.MYSQL_PASSWORD,
        database: mysqlconstants.MYSQL_DATABASE,
    });
    
    var getReadyToPlayDataQuery = "SELECT * from ready_to_play where id='"+readyToPlayId+"'";

    let getReadyToPlayDataData = await connectionStaff.awaitQuery(
        getReadyToPlayDataQuery
    );
    // var query = 'select matches.*,teams.player_name from matches left join teams on matches.team_id=teams.player_id where matches.tour_id = '+tournmentId+ ' and matches.round_id = '+temp;
    var getMatchDetailQuery = "select matches.*,teams.player_name from matches left join teams on matches.team_id=teams.team_id where matches.tour_id='"+getReadyToPlayDataData[0].tour_id+"' and matches.category_id='"+getReadyToPlayDataData[0].category_id+"' and matches.round_id='"+getReadyToPlayDataData[0].round_id+"' and matches.match_number='"+getReadyToPlayDataData[0].match_number+"'";

    let getMatchDetailData = await connectionStaff.awaitQuery(
        getMatchDetailQuery
    );
    // console.log(getMatchDetailData);
    // return false;
        //connectionStaff.release();
                    /** Commit transaction */
                    var getReadyToPlayMatchInfo = {
                        getReadyToPlayData : getReadyToPlayDataData,
                        getMatchDetailData : getMatchDetailData
                    }
    await connectionStaff.awaitCommit();
    
    /** End the connection */
    connectionStaff.awaitEnd();
    callback(null,getReadyToPlayMatchInfo,res);
})();   
}
matchmodel.getRoundsMatches= async (req,res,callback) => {
            (async () => {
            var totalRounds = res.matchDetailData.totalRounds;
            var tournmentId = res.matchDetailData.tournmentId;
            var categoryId = res.matchDetailData.categoryId;
            var ArrData = [];
            const connectionStaff = await mysql.createConnection({
                connectionLimit: 500,
                host: mysqlconstants.MYSQL_HOST,
                user: mysqlconstants.MYSQL_USERNAME,
                password: mysqlconstants.MYSQL_PASSWORD,
                database: mysqlconstants.MYSQL_DATABASE,
            });
            res.matchDetailData.mactchesCountList.forEach(async (num,index) => {
                var temp = index+1;
                var query = 'select matches.*,teams.player_name from matches left join teams on matches.team_id=teams.team_id where matches.tour_id = '+tournmentId+' and matches.category_id = '+categoryId+' and matches.round_id = '+temp;
                //var query = 'select * from matches where matches.tour_id = '+tournmentId+ ' and matches.round_id = '+temp;
                let staffList = await connectionStaff.awaitQuery(
                    query
                );
                var tempArr = [];
                var byeTeam = [];
                var normalteam = [];
                var splitedItems = [];
                var byeTeamItems = [];
                // console.log(staffList);
                // return false;
                staffList.forEach((match) => {
                    if(match.status==='3'){
                        // checkArr = []
                        // checkArr.push(match);
                        byeTeam.push(match);
                    }else{
                        normalteam.push(match);
                    }
                });
                for(z=0;z<num;z++){
                    tempNumber = z+1;
                    let result = normalteam.filter(function(x) { if(x.match_number==tempNumber){
                        return x;
                    } });
                    splitedItems.push(result);
                }
                var tempLoopValue = res.matchDetailData.byeCount+num;
                if(index ==0){
                    for(z=num;z<tempLoopValue;z++){
                        tempNumber = z+1;
                        let result1 = byeTeam.filter(function(x) {  if(x.match_number==tempNumber){
                            return x;
                        } });
                        byeTeamItems.push(result1);
                    }
                }
                tempArr = splitedItems.concat(byeTeamItems);
                ArrData.push(tempArr);
            });
                //connectionStaff.release();
                            /** Commit transaction */
            await connectionStaff.awaitCommit();
            
            /** End the connection */
            connectionStaff.awaitEnd();
            callback(null,ArrData,res);
    })();   
}
matchmodel.startLeagueMatch = async (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        var data = req.body.data;
        var queryLeague = 'select * from teams where tour_id="'+data.tournmentId+'" and category_id="'+data.categoryId+'"';
        let teamsListLeague = await connectionStaff.awaitQuery(
            queryLeague
        );
        //var TotalteamCountLeague = teamsListLeague.length;
        // for (let index = 0; index < teamsListLeague.length; index++) {
        //     const element = array[index];
            
        // }
        var leagueTeamListArr = [];
        totalMatchArr = [];
        teamsListLeague.forEach(async function(data){
            //console.log(data.team_id);
            leagueTeamListArr.push(data.team_id);
        });
        for (let index = 0; index < leagueTeamListArr.length; index++) {
            //const element = array[index];
            for (let j = index+1; j < leagueTeamListArr.length; j++) {
                totalMatchInnerArr = [];
                totalMatchInnerArr.push(leagueTeamListArr[index]);
                totalMatchInnerArr.push(leagueTeamListArr[j]);
                totalMatchArr.push(totalMatchInnerArr);
            }
        }
        shuffle(totalMatchArr);
        outerArr = [];
        totalMatchArr.forEach(async function(team,i){
            innerArrA = [];
            innerArrB = [];
            innerArrA.push(data.tournmentId); // tour_id
            innerArrA.push(data.categoryId); // categoryId
            //if(index==0){
                innerArrA.push(team[0]); // team_id
            // }else{
            //     innerArrA.push(0); // team_id
            // }
            
            innerArrA.push(1); //round_id
            innerArrA.push(i+1); // match_number
            innerArrA.push("A"); // match_number_type
            innerArrA.push(0); // status
            innerArrA.push(0); // played_status

            innerArrB.push(data.tournmentId); // tour_id
            innerArrB.push(data.categoryId); // categoryId
            //if(index==0){
                innerArrB.push(team[1]); // team_id
            // }else{
            //     innerArrB.push(0); // team_id
            // }
            innerArrB.push(1); //round_id
            innerArrB.push(i+1); // match_number
            innerArrB.push("B"); // match_number_type
            innerArrB.push(0); // status
            innerArrB.push(0); // played_status
            outerArr.push(innerArrA);
            outerArr.push(innerArrB);
        });
        
        var insertDefaultTeamQuery = 'INSERT INTO matches (`tour_id`,`category_id`,`team_id`,`round_id`,`match_number`,`match_number_type`,`status`,`played_status`) VALUES ?';
            let insertDefaultTeamData = await connectionStaff.awaitQuery(
                insertDefaultTeamQuery, [outerArr]
            );   
            //var updateTourStatusQuery = "UPDATE tournment set tour_status='1' where tour_id="+data.tournmentId;
            var updateTourCategoryStatusQuery = "UPDATE tournment_category set tour_category_status='1' where id="+data.categoryId;
            let updateTourStatusData = await connectionStaff.awaitQuery(updateTourCategoryStatusQuery);

            await connectionStaff.awaitCommit();
            
            /** End the connection */
            connectionStaff.awaitEnd();
            callback(null,'result',teamsListLeague);
    })();
}        
matchmodel.startmatch = async (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        var data = req.body.data;
            //var updateTourRound = req.body.data.round_id+1; 
            var query = 'select * from teams where tour_id="'+data.tournmentId+'" and category_id="'+data.categoryId+'"';
                let teamsList = await connectionStaff.awaitQuery(
                    query
                );
                var TotalteamCount = teamsList.length;
                if(!powerOfTwo(TotalteamCount)){
                    highestPowerOfTwo = getTheHighestPowerOfTwo(TotalteamCount);
                    byeCount = getByeTeamcount(highestPowerOfTwo,TotalteamCount);
                }else{
                    highestPowerOfTwo = TotalteamCount;
                    byeCount = 0;
                }
                var totalRounds = Math.log(highestPowerOfTwo)/Math.log(2);
                var mactchesCountList = getMatchCountOnRounds(TotalteamCount,byeCount);
                mactchesCountList.splice(-1);
        mactchesCountList.push(2);// add more round for third or fouth 
                var totalMatches = getTotalmatches(TotalteamCount);
                var team_list = [];
                teamsList.forEach(async function(data){
                    team_list.push(data.team_id);
                });
                shuffle(team_list);
                outerArr = [];
                j=0;
                mactchesCountList.forEach(async (num,index) => {
                    for(i=0;i<num;i++){
                        innerArrA = [];
                        innerArrB = [];
                        innerArrA.push(data.tournmentId); // tour_id
                        innerArrA.push(data.categoryId); // categoryId
                        if(index==0){
                            innerArrA.push(team_list[j]); // team_id
                        }else{
                            innerArrA.push(0); // team_id
                        }
                        
                        innerArrA.push(index+1); //round_id
                        innerArrA.push(i+1); // match_number
                        innerArrA.push("A"); // match_number_type
                        innerArrA.push(0); // status
                        innerArrA.push(0); // played_status
                        
                        j++;

                        innerArrB.push(data.tournmentId); // tour_id
                        innerArrB.push(data.categoryId); // categoryId
                        if(index==0){
                            innerArrB.push(team_list[j]); // team_id
                        }else{
                            innerArrB.push(0); // team_id
                        }
                        innerArrB.push(index+1); //round_id
                        innerArrB.push(i+1); // match_number
                        innerArrB.push("B"); // match_number_type
                        innerArrB.push(0); // status
                        innerArrB.push(0); // played_status
                        j++;
                        outerArr.push(innerArrA);
                        outerArr.push(innerArrB);
                    }
                    if(index==0){
                        tempNum = (num*2);
                        tempbyeCount = byeCount+tempNum;
                        for(i=tempNum;i<tempbyeCount;i++){
                            num++
                            innerArrC = [];
                            innerArrC.push(data.tournmentId); // tour_id
                            innerArrC.push(data.categoryId); // categoryId
                            innerArrC.push(team_list[i]); // team_id
                            innerArrC.push(index+1); //round_id
                            innerArrC.push(num); // match_number
                            innerArrC.push("A"); // match_number_type
                            innerArrC.push(3); // status
                            innerArrC.push(0); // played_status
                            outerArr.push(innerArrC);
                        }
                    }
                });
            var insertDefaultTeamQuery = 'INSERT INTO matches (`tour_id`,`category_id`,`team_id`,`round_id`,`match_number`,`match_number_type`,`status`,`played_status`) VALUES ?';
            let insertDefaultTeamData = await connectionStaff.awaitQuery(
                insertDefaultTeamQuery, [outerArr]
            );   
            //var updateTourStatusQuery = "UPDATE tournment set tour_status='1' where tour_id="+data.tournmentId;
            var updateTourCategoryStatusQuery = "UPDATE tournment_category set tour_category_status='1' where id="+data.categoryId;
            let updateTourStatusData = await connectionStaff.awaitQuery(updateTourCategoryStatusQuery);

            await connectionStaff.awaitCommit();
            
            /** End the connection */
            connectionStaff.awaitEnd();
            callback(null,'result',teamsList);
    })();
}         
matchmodel.updateMatches = (outerArr,req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
        }else{
            var query = 'INSERT INTO matches (`tour_id`,`team_id`,`round_id`,`status`) VALUES ?';
            connection.query(query,[outerArr],(err,addPlayerResult) => {
                if(err){
                    // var logdata = {"type":'error',"data":err,"customsg": "Doctor Query insertion error" };
                    // logconf.writelog(logdata);
                    console.log(err);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                }else{
                    callback(null,'result',res);
                }
            });
        }
    });
}     
matchmodel.UpdateRound = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
        }else{
            var data = res.body.data;
            var updateTourRound = res.body.data.round_id+1; 
            var updateRoundQuery = "UPDATE tournment set tour_round="+updateTourRound+" where tour_id="+data.tournmentId;
            connection.query(updateRoundQuery,[],(err,updatedRoundResult) => {
                if(err){
                    // var logdata = {"type":'error',"data":err,"customsg": "Doctor Query insertion error" };
                    // logconf.writelog(logdata);
                    console.log(err);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                }else{
                    callback(err,'result',res);
                }
            });
        }   
    });

}
matchmodel.nextRound = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
        }else{
            tourId = req.body.data.tournmentId;
            roundId = req.body.data.round_id;
            var query = 'select * from matches where tour_id='+tourId+' and round_id='+roundId+' and status IN (1,2)';
            connection.query(query,[],(err,winnersList) => {
                if(err){
                    // var logdata = {"type":'error',"data":err,"customsg": "Doctor Query insertion error" };
                    // logconf.writelog(logdata);
                    console.log(err);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                }else{
                    var winner_list = [];
                    winnersList.forEach(function(data){
                        tempArr = []
                        tempArr.push(data.tour_id);
                        tempArr.push(data.team_id);
                        data.round_id++;
                        tempArr.push(data.round_id);
                        tempArr.push(0);
                        winner_list.push(tempArr);
                    });
                    var nextRoundQuery = 'INSERT INTO matches (`tour_id`,`team_id`,`round_id`,`status`) VALUES ?';
                    connection.query(nextRoundQuery,[winner_list],(err,resultdata) => {
                        if(err){
                            console.log(err);
                            res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                        }else{
                            callback(null,'result',req);
                        }
                    });    
                }
            });
        }
    });
}           

matchmodel.matchDetails = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
        }else{
            var matchId = req.body.data.matchId;
            var query = 'select matches.*,teams.* from matches inner join teams on matches.team_id=teams.player_id where matches.match_id='+matchId;
            connection.query(query,[],(err,matchDetail) => {
                if(err){
                    // var logdata = {"type":'error',"data":err,"customsg": "Doctor Query insertion error" };
                    // logconf.writelog(logdata);
                    console.log(err);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                }else{
                    callback(null,matchDetail,res);
                }
            });    
        }
    });
}
matchmodel.getRoundTripFirstRoundStatus = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
        }else{
            var tournmentId = req.body.data.tournmentId;
            var categoryId = req.body.data.categoryId;
            
            var query = 'select * from matches where round_id="1" and tour_id="'+tournmentId+'" and category_id="'+categoryId+'" and played_status="0"';
            connection.query(query,[],(err,getRoundTripFirstRoundStatus) => {
                if(err){
                    // var logdata = {"type":'error',"data":err,"customsg": "Doctor Query insertion error" };
                    // logconf.writelog(logdata);
                    console.log(err);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                }else{
                    callback(null,getRoundTripFirstRoundStatus,res);
                }
            });    
        }
    });
}  
function isEven(n) {
    return n % 2 == 0;
 }      
matchmodel.updateFinishMatch = async (req,res,callback) => {

    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        
        var winnerId = req.body.data.winnerId;
        var looserId = req.body.data.looserId;
        var readyToPlayId = req.body.data.readyToPlayId;
        var category_id = req.body.data.category_id;

         var getMatchDetailQuery = 'select * from matches where match_id ='+winnerId;
         let matchDetail = await connectionStaff.awaitQuery(
             getMatchDetailQuery
         );
        roundId = Number(matchDetail[0].round_id)+1;
        if(isEven(matchDetail[0].match_number)){
            matchNumber = Number(matchDetail[0].match_number)/2;
            matchNumberType = 'B';
        }else {
            matchNumber = (Number(matchDetail[0].match_number)+1)/2;
            matchNumberType = 'A';
        }
        
        var matchUpdateQuery = "UPDATE matches set status=1 where match_id="+winnerId;
        let updateFirstRounResult = await connectionStaff.awaitQuery(
            matchUpdateQuery
        );
        
        var updateReadyToPlayQuery = "UPDATE ready_to_play set status=1,winner_team_id='"+matchDetail[0].team_id+"' where id="+readyToPlayId;
        let updateReadyToPlaydata = await connectionStaff.awaitQuery(
            updateReadyToPlayQuery
        );

        var playedStatusUpdateQuery1 = "UPDATE matches set played_status=2 where match_id="+winnerId;
        var playedStatusUpdateQuery2 = "UPDATE matches set played_status=2 where match_id="+looserId;

        let playedStatusUpdateData = await connectionStaff.awaitQuery(
            playedStatusUpdateQuery1,playedStatusUpdateQuery1
        );
        var updateSecondRounQuery = "UPDATE matches set team_id="+matchDetail[0].team_id+" where tour_id="+matchDetail[0].tour_id+" and round_id="+roundId+" and category_id ="+category_id+" and match_number="+matchNumber+" and match_number_type='"+matchNumberType+"'";    
        let updateSecondRounResult = await connectionStaff.awaitQuery(
            updateSecondRounQuery
        );
        var roundNumber = Number(matchDetail[0].round_id) + 2;
        var getCheckThirdOrFouthQuery = 'select * from matches where tour_id ='+matchDetail[0].tour_id+' and category_id ='+matchDetail[0].category_id+ ' and round_id ='+roundNumber;
        let getCheckThirdOrFouthDetails = await connectionStaff.awaitQuery(
            getCheckThirdOrFouthQuery
        );        
        if(!getCheckThirdOrFouthDetails.length>0){
            var getLooserTeamIdQuery = 'select * from matches where match_id ='+looserId;
            let getLooserTeamIdDetails = await connectionStaff.awaitQuery(
                getLooserTeamIdQuery
            );
            var updatethirdOrFouthQuery = "UPDATE matches set team_id="+getLooserTeamIdDetails[0].team_id+" where tour_id="+matchDetail[0].tour_id+" and round_id="+roundId+" and category_id ="+category_id+" and match_number='2' and match_number_type='"+matchNumberType+"'";   

            let updatethirdOrFouthQueryResult = await connectionStaff.awaitQuery(
                updatethirdOrFouthQuery
            );
        }
        await connectionStaff.awaitCommit();
        
        /** End the connection */
        connectionStaff.awaitEnd();
        callback(null,updateSecondRounResult,res);
    })();
}
matchmodel.updateMatchToMatch = (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        var matchOldData = req.body.data.matchOldData;
        var matchNewId = req.body.data.matchNewId;
        
        
        var updateNewMatchNumberQuery = "UPDATE matches set match_number="+matchNewId+" where match_id='"+matchOldData.match_id+"'";

        let updateNewMatchNumberData = await connectionStaff.awaitQuery(
            updateNewMatchNumberQuery
        );

        // var removeOldmatchNumberQuery = 'delete * from matches where match_id ='+matchOldData.match_id;
        // let removeOldmatchNumberData = await connectionStaff.awaitQuery(
        //     removeOldmatchNumberQuery
        // );
        //checkMatchExists(connectionStaff,matchOldData);
        await connectionStaff.awaitCommit();
        
        /** End the connection */
        connectionStaff.awaitEnd();
        callback(null,updateNewMatchNumberData,res);
    })();
}  
matchmodel.readyToPlayMatch = (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        var matcheInfo = req.body.data.matchesList;
        var courtNumber = req.body.data.courtNumber;
        var numberOfSets = req.body.data.numberOfSets;
        
        var insertQueryReadyToPlay = "INSERT INTO ready_to_play (`match_number`,`round_id`,`tour_id`,`category_id`,`court_number`,`sets`,`winner_team_id`,`status`) VALUES ('"+ matcheInfo.match_number + "','"+matcheInfo.round_id+"','"+matcheInfo.tour_id+"','"+matcheInfo.category_id+"','"+courtNumber+"','"+numberOfSets+"','0','0')";
        

        let insertDataReadyToPlay = await connectionStaff.awaitQuery(
            insertQueryReadyToPlay
        );
        
        var updatePlayedStatusQuery = "UPDATE matches set played_status='1' where tour_id='"+matcheInfo.tour_id+"' and round_id='"+matcheInfo.round_id+"' and match_number='"+matcheInfo.match_number+"' and category_id='"+matcheInfo.category_id+"'";

        let updatePlayedStatusData = await connectionStaff.awaitQuery(
            updatePlayedStatusQuery
        );

        // var removeOldmatchNumberQuery = 'delete * from matches where match_id ='+matchOldData.match_id;
        // let removeOldmatchNumberData = await connectionStaff.awaitQuery(
        //     removeOldmatchNumberQuery
        // );
        //checkMatchExists(connectionStaff,matchOldData);
        await connectionStaff.awaitCommit();
        
        /** End the connection */
        connectionStaff.awaitEnd();
        callback(null,insertDataReadyToPlay,res);
    })();
}
async function checkMatchExists (connectionStaff,matchOldData){
    var getMatchCountQuery = "select * from matches where match_number="+matchOldData.match_number+" and round_id="+matchOldData.round_id;
    let getMatchCountQueryData = await connectionStaff.awaitQuery(
        getMatchCountQuery
        );
    console.log(getMatchCountQueryData);
    return false;
}
// matchmodel.updatedByeMatchNumber = (req,res,callback) => {
//     (async () => { 
//         const connectionStaff = await mysql.createConnection({
//             connectionLimit: 500,
//             host: mysqlconstants.MYSQL_HOST,
//             user: mysqlconstants.MYSQL_USERNAME,
//             password: mysqlconstants.MYSQL_PASSWORD,
//             database: mysqlconstants.MYSQL_DATABASE,
//         });
//         var matchOldData = req.body.data.matchOldData;
//         var matchUpdatedData = req.body.data.matchUpdatedData;
        

//         var selectByeTeamValue = "select * from matches where match_number="+matchUpdatedData;
//         let selectByeTeamValueData = await connectionStaff.awaitQuery(
//                 selectByeTeamValue
//             );
//             var SelectMatchId = selectByeTeamValueData[0].match_id;
//         var updateByeMatchQuery = "UPDATE matches set match_number="+matchOldData.match_number+", status='0' where match_id='"+SelectMatchId+"'";
//         let updateByeMatchQueryData = await connectionStaff.awaitQuery(
//             updateByeMatchQuery
//         );

//         var updateNewMatchNumberQuery = "UPDATE matches set match_number="+matchUpdatedData+", status='3' where match_id='"+matchOldData.match_id+"'";
//         let updateNewMatchNumberData = await connectionStaff.awaitQuery(
//             updateNewMatchNumberQuery
//         );

//         await connectionStaff.awaitCommit();
        
//         /** End the connection */
//         connectionStaff.awaitEnd();
//         callback(null,updateNewMatchNumberData,res);
//     })();
// }
matchmodel.updateByeToMatch = (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        var matchOldData = req.body.data.matchOldData;
        var matchNewId = req.body.data.matchNewId;
        
        
        var updateNewMatchNumberQuery = "UPDATE matches set match_number="+matchNewId+", status='0' where match_id='"+matchOldData.match_id+"'";

        let updateNewMatchNumberData = await connectionStaff.awaitQuery(
            updateNewMatchNumberQuery
        );
        //checkMatchExists(connectionStaff,matchOldData);
        await connectionStaff.awaitCommit();
        
        /** End the connection */
        connectionStaff.awaitEnd();
        callback(null,updateNewMatchNumberData,res);
    })();
}
matchmodel.goNextRoundForRoundRobbin = (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        var secondRoundDataList = req.body.data.data;   
        var mactchesCountList = getMatchCountOnRounds(4,0);
        mactchesCountList.splice(-1);
        mactchesCountList.push(2);
        var team_list = [];
        secondRoundDataList.forEach(async function(data){
                    team_list.push(data.team_id);
                });
                shuffle(team_list);
                outerArr = [];
                j=0;
                mactchesCountList.forEach(async (num,index) => {
                    for(i=0;i<num;i++){
                        console.log(num);
                        innerArrA = [];
                        innerArrB = [];
                        innerArrA.push(secondRoundDataList[0].tour_id); // tour_id
                        innerArrA.push(secondRoundDataList[0].category_id); // categoryId
                        if(index==0){
                            innerArrA.push(team_list[j]); // team_id
                        }else{
                            innerArrA.push(0); // team_id
                        }
                        
                        innerArrA.push(index+2); //round_id
                        innerArrA.push(i+1); // match_number
                        innerArrA.push("A"); // match_number_type
                        innerArrA.push(0); // status
                        innerArrA.push(0); // played_status
                        
                        j++;

                        innerArrB.push(secondRoundDataList[0].tour_id); // tour_id
                        innerArrB.push(secondRoundDataList[0].category_id); // categoryId
                        if(index==0){
                            innerArrB.push(team_list[j]); // team_id
                        }else{
                            innerArrB.push(0); // team_id
                        }
                        innerArrB.push(index+2); //round_id
                        innerArrB.push(i+1); // match_number
                        innerArrB.push("B"); // match_number_type
                        innerArrB.push(0); // status
                        innerArrB.push(0); // played_status
                        j++;
                        outerArr.push(innerArrA);
                        outerArr.push(innerArrB);
                    }
                });
        var insertDefaultTeamQuery = 'INSERT INTO matches (`tour_id`,`category_id`,`team_id`,`round_id`,`match_number`,`match_number_type`,`status`,`played_status`) VALUES ?';

        let insertDefaultTeamData = await connectionStaff.awaitQuery(
            insertDefaultTeamQuery, [outerArr]
        ); 

        //checkMatchExists(connectionStaff,matchOldData);
        await connectionStaff.awaitCommit();
        
        /** End the connection */
        connectionStaff.awaitEnd();
        callback(null,insertDefaultTeamData,res);
    })();
}
matchmodel.updateMatchToBye = (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        var matchOldData = req.body.data.matchOldData;
        var matchNewId = req.body.data.matchNewId;
        
        
        var updateNewMatchNumberQuery = "UPDATE matches set match_number="+matchNewId+", status='3' where match_id='"+matchOldData.match_id+"'";

        let updateNewMatchNumberData = await connectionStaff.awaitQuery(
            updateNewMatchNumberQuery
        );
        //checkMatchExists(connectionStaff,matchOldData);
        await connectionStaff.awaitCommit();
        
        /** End the connection */
        connectionStaff.awaitEnd();
        callback(null,updateNewMatchNumberData,res);
    })();
}
matchmodel.goToNextRound = (req,res,callback) => {
    (async () => { 
        const connectionStaff = await mysql.createConnection({
            connectionLimit: 500,
            host: mysqlconstants.MYSQL_HOST,
            user: mysqlconstants.MYSQL_USERNAME,
            password: mysqlconstants.MYSQL_PASSWORD,
            database: mysqlconstants.MYSQL_DATABASE,
        });
        var data = req.body.data.item;
        if(isEven(data.match_number)){
            byeMatchNumber = Number(data.match_number)/2;
            byeMatchNumberType = 'B';
        }else {
            byeMatchNumber = (Number(data.match_number)+1)/2;
            byeMatchNumberType = 'A';
        }
        
        var updateGoToNextMatchQuery = "UPDATE matches set team_id="+data.team_id+" where tour_id="+data.tour_id+" and round_id='2' and match_number="+byeMatchNumber+" and match_number_type='"+byeMatchNumberType+"'";    
        let updateGoToNextMatchData = await connectionStaff.awaitQuery(
            updateGoToNextMatchQuery
        );
        
        var updatePlayedStatusQuery = "UPDATE matches set played_status='1' where tour_id='"+data.tour_id+"' and round_id='"+data.round_id+"' and match_number='"+data.match_number+"' ";

        let updatePlayedStatusData = await connectionStaff.awaitQuery(
            updatePlayedStatusQuery
        );

        await connectionStaff.awaitCommit();
        
        /** End the connection */
        connectionStaff.awaitEnd();
        callback(null,updateGoToNextMatchData,res);
    })();
}
async function getWinnersList(totalRounds,data){

    const connectionStaff = await mysql.createConnection({
        connectionLimit: 500,
        host: mysqlconstants.MYSQL_HOST,
        user: mysqlconstants.MYSQL_USERNAME,
        password: mysqlconstants.MYSQL_PASSWORD,
        database: mysqlconstants.MYSQL_DATABASE,
    });
    var finalRound  = totalRounds;
    var getFinalResultQuery = "select matches.*,teams.player_name from matches left join teams on matches.team_id=teams.team_id where matches.round_id='"+finalRound+"' and matches.tour_id='"+data.tournmentId+"' and matches.category_id='"+data.categoryId+"'";

        let getFinalResultQueryData = await connectionStaff.awaitQuery(
            getFinalResultQuery
        );
        await connectionStaff.awaitCommit();
        if(getFinalResultQueryData.length>0){
            if(getFinalResultQueryData[0].team_id==0 || (getFinalResultQueryData[0].status==0 && getFinalResultQueryData[1].status==0)){
                return '';
            }else{
                return getFinalResultQueryData;
            }
        }
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
function getTheHighestPowerOfTwo(TotalteamCount){
    var lowest2ndNumber = nearestPoweroftwo(TotalteamCount);
    var str = Math.log(lowest2ndNumber)/Math.log(2)+1;
    var getTheHighestPowerOfTwo = Math.pow(2, str);
    return getTheHighestPowerOfTwo;
}
function getByeTeamcount(highestPowerOfTwo,TotalteamCount){
    byeVlaue = highestPowerOfTwo - TotalteamCount;
    return byeVlaue;
}
function powerOfTwo(x) {
    return (Math.log(x)/Math.log(2)) % 1 === 0;
}
function nearestPoweroftwo(n)
{
    let res = 0;
    for (let i = n; i >= 1; i--){
        // If i is a power of 2
        if ((i & (i - 1)) == 0){
                res = i;
                break;
            }
    }
  return res;
}
function getByeTeamcount(highestPowerOfTwo,TotalteamCount){
    byeVlaue = highestPowerOfTwo - TotalteamCount;
    return byeVlaue;
}
function getTotalmatches(TotalteamCount){
    totalMatches = TotalteamCount - 1;
    return totalMatches;
}
function getMatchCountOnRounds(TotalteamCount,byeCount){
    var mactchesCountListArr = [];
    var nearestPoweroftwoValue =  nearestPoweroftwo(TotalteamCount);
    firstRound = nearestPoweroftwoValue - byeCount;
    if(!powerOfTwo(TotalteamCount)){
        mactchesCountListArr.push(firstRound);
    }
    var temp = Math.log(nearestPoweroftwoValue)/Math.log(2)
    for(i=0;i<temp;i++){
        nearestPoweroftwoValue = nearestPoweroftwoValue/2;
        mactchesCountListArr.push(nearestPoweroftwoValue);
    }
    return mactchesCountListArr;
}
module.exports = matchmodel;
