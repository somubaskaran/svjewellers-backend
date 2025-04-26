var express = require('express');
var router = express.Router();
var async = require('async');

var testmodel = require('../models/testmodel');
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
TotalteamCount = 9;
byeCount = 0;
mactchesCountList = [];
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


function getTotalmatches(){
    totalMatches = TotalteamCount - 1;
    return totalMatches;
}
//totalRounds = Math.log(highestPowerOfTwo)/Math.log(2);

function getMatchCountOnRounds(TotalteamCount){
   var nearestPoweroftwoValue =  nearestPoweroftwo(TotalteamCount);
   firstRound = nearestPoweroftwoValue - byeCount;
   mactchesCountList.push(firstRound);
   var temp = Math.log(nearestPoweroftwoValue)/Math.log(2)
   for(i=0;i<temp;i++){
    nearestPoweroftwoValue = nearestPoweroftwoValue/2;
    mactchesCountList.push(nearestPoweroftwoValue);
   }
}

// getMatchCountOnRounds(TotalteamCount);
// console.log(getTotalmatches());
// console.log(byeCount);
// console.log(mactchesCountList);
router.post('/addplayers',function(req,res,next){
    var items = req.body;
//     shuffle(items);

// const n = 4
// const result = [[], [] ] //we create it, then we'll fill it

// const wordsPerLine = Math.ceil(items.length / 2)
// for (let line = 0; line < n; line++) {
//   for (let i = 0; i < wordsPerLine; i++) {
//     const value = items[i + line * wordsPerLine]
//     if (!value) continue //avoid adding "undefined" values
//     result[line].push(value)
//   }
// }

    async.waterfall([

       async.apply(testmodel.addPlayers,req,res)
       
    ],function(err,result,res){
        
        //console.log(result);
        // if(result.role_id == 1 || result.role_id == 6){
        //     // admin
        //     const token = jwt.sign({'name':result.name,'role_id':result.role_id,'uuid':result.uuid,"email_address":result.email_address,"status":result.status,"avatar":result.avatar}, appconstant.JWTTOKENUSER ,{ algorithm: "HS256" });
        //     var responseData = result;
        //     /*var logdata = {"type":'access',"data":JSON.stringify(result),"customsg":  "Logged in Response" };
        //     logconf.writelog(logdata);*/
        //     responseData.token = token;
            
        // //}else if(result.role_id == 2){
        //  }else {
        //     // doctor
        //     const token = jwt.sign({'name':result.name,'role_id':result.role_id,'uuid':result.uuid,'group_by':result.group_by,"email_address":result.email_address,"status":result.status,"avatar":result.avatar}, appconstant.JWTTOKENUSER ,{ algorithm: "HS256" });
        //     var responseData = result;
        //     /*var logdata = {"type":'access',"data":JSON.stringify(result),"customsg":  "Logged in Response" };
        //     logconf.writelog(logdata);*/
        //     responseData.token = token;
        // }
        // var responseData = {'success':true,'statuscode':200,'msg':'User logged Successfully',data:responseData};
        // //console.log(responseData);
        
        // res.sendData = responseData;
         next();
    });

});

router.post('/startmatch',function(req,res,next){
  async.waterfall([

    async.apply(testmodel.startmatch,req,res)
    
 ],function(err,result,teamsList){
    var team_list = [];
    teamsList.forEach(function(data){
      team_list.push(data.player_id);
    });
    shuffle(team_list);
    console.log(team_list);
    var TotalteamCount = team_list.length;
    if(!powerOfTwo(TotalteamCount)){
        highestPowerOfTwo = getTheHighestPowerOfTwo(TotalteamCount);
        byeCount = getByeTeamcount(highestPowerOfTwo,TotalteamCount);
    }else{
        highestPowerOfTwo = TotalteamCount;
    }
    outerArr = [];
    for(i=0;i<TotalteamCount;i++){
      innerArr = [];
      innerArr.push("1");
      innerArr.push(team_list[i]);
      innerArr.push("1");
      if(byeCount>0){
        innerArr.push("2");
      }else{
        innerArr.push("0");
      }
      byeCount--;
      outerArr.push(innerArr);
    }
    testmodel.updateMatches(outerArr,req, res, function (opened, closed) {

    });

  });
});
router.post('/nextRound',function(req,res,next){
  async.waterfall([

    async.apply(testmodel.nextRound,req,res)
    
 ],function(err,result,teamsList){

  });
});
    
module.exports = router;



