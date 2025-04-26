const sql = require("./mysqlconnect.js");
// constructor
const testmodel = function(doctor) {
    
};

testmodel.addPlayers = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
        }else{
            console.log(req.body.length);
            var playersData = [];
            for(i=0;i<req.body.length;i++){
                tempArr = []
                tempArr.push(req.body[i]);
                tempArr.push('1');
                playersData.push(tempArr);
            }
            var query = 'INSERT INTO teams (`player_name`,`tour_id`) VALUES ?';
            console.log(req.body);
            var values = [
                ['demian'],
                ['john'],
            ];
            connection.query(query,[playersData],(err,addPlayerResult) => {
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
testmodel.startmatch = (req,res,callback) => {
    
    sql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
        }else{
            var data = req.body;
            var query = 'select * from teams where tour_id='+req.body.tour_id;
            connection.query(query,[],(err,teamsList) => {
                if(err){
                    // var logdata = {"type":'error',"data":err,"customsg": "Doctor Query insertion error" };
                    // logconf.writelog(logdata);
                    console.log(err);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                }else{
                    callback(null,'result',teamsList);
                }
            });
        }   
    });
}         
testmodel.updateMatches = (outerArr,req,res,callback) => {
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
testmodel.nextRound = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
        }else{
            console.log(req.body);
            return false;
            tourId = req.body.tour_id;
            roundId = req.body.round_id-1;
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
                            callback(null,'result',res);
                        }
                    });    
                }
            });
        }
    });
}           
module.exports = testmodel;