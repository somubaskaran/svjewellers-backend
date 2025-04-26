var express = require('express');
var router = express.Router();
var async = require('async');
var matchmodel = require('../models/matchmodel');

router.post('/add',function(req,res,next){
    async.waterfall([
       async.apply(matchmodel.addMatch,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Tournment Added Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/addTournment',function(req,res,next){
    async.waterfall([
       async.apply(matchmodel.addTournment,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Tournment Added Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/addCategory',function(req,res,next){
    async.waterfall([
       async.apply(matchmodel.addCategory,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Tournment Added Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/getMatchList',function(req,res,next){
    async.waterfall([
       async.apply(matchmodel.getMatchList,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Tournment List Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/getTournmentCategoryList',function(req,res,next){
    async.waterfall([
       async.apply(matchmodel.getTournmentCategoryList,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Tournment List Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/finishmatch',function(req,res,next){
    async.waterfall([
       async.apply(matchmodel.updateFinishMatch,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Match Updated Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/goToNextRound',function(req,res,next){
    async.waterfall([
       async.apply(matchmodel.goToNextRound,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Match Next Round Updated Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/readyToPlayMatch',function(req,res,next){
    async.waterfall([
       async.apply(matchmodel.readyToPlayMatch,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Match Next Round Updated Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/getRoundTripFirstRoundStatus',function(req,res,next){
    async.waterfall([
       async.apply(matchmodel.getRoundTripFirstRoundStatus,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"getRoundTripFirstRoundStatus","data":result,"statuscode":200};
        next();
    });
});
function getByeTeamcount(highestPowerOfTwo,TotalteamCount){
    byeVlaue = highestPowerOfTwo - TotalteamCount;
    return byeVlaue;
}
function getTotalmatches(){
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
router.post('/getMatchDetail',function(req,res,next){
    var data = req.body.data;
    if(data.matchType==1){
        async.waterfall([
            async.apply(matchmodel.getMatchDetail,req,res),
            async.apply(matchmodel.getRoundsMatches)
         ],function(err,result,res){
             if(result.length>0){
                 data = {
                     "data":result,
                     "tournmentDetails":res.matchDetailData.tournmentDetails,
                     "totalMatches":res.matchDetailData.totalMatches,
                     "mactchesCountList": res.matchDetailData.mactchesCountList,
                     "totalRounds": res.matchDetailData.totalRounds,
                     "byeCount": res.matchDetailData.byeCount,
                     "winnerLooserList": res.matchDetailData.winnerLooserList,
                 }
                 res.sendData = {'success':true,'msg':"Tournment Details Successfully","data":data,"statuscode":200};    
             }else{
                 res.sendData = {'success':false,'msg':"Match not Started","data":result,"statuscode":500};
             }
             next();
         });
    }else if(data.matchType==2) {
        async.waterfall([
            async.apply(matchmodel.getLeagueMatchDetail,req,res),
            async.apply(matchmodel.getRoundsMatches)
         ],function(err,result,res){
             if(result.length>0){
                 data = {
                     "data":result,
                     "tournmentDetails":res.matchDetailData.tournmentDetails,
                     "totalMatches":res.matchDetailData.totalMatches,
                     "mactchesCountList": res.matchDetailData.mactchesCountList,
                     "totalRounds": res.matchDetailData.totalRounds,
                     "byeCount": res.matchDetailData.byeCount,
                     "winnerLooserList": res.matchDetailData.winnerLooserList,
                 }
                 res.sendData = {'success':true,'msg':"Tournment Details Successfully","data":data,"statuscode":200};    
             }else{
                 res.sendData = {'success':false,'msg':"Match not Started","data":result,"statuscode":500};
             }
             next();
         });
    }
    
});

router.post('/getPointTable',function(req,res,next){
    async.waterfall([
      async.apply(matchmodel.getPointTable,req,res)
   ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Point Table Details Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/getMatchCategoryDetails',function(req,res,next){
    async.waterfall([
      async.apply(matchmodel.getMatchCategoryDetails,req,res)
   ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Category Match Details Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/getmatchInfo',function(req,res,next){
    async.waterfall([
  
      async.apply(matchmodel.getmatchInfo,req,res)
      
   ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Match Details Successfully","data":result,"statuscode":200};
        next();
    });
});
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
router.post('/start',function(req,res,next){
    var data = req.body.data;
    if(data.matchType=='1'){
        async.waterfall([
  
            async.apply(matchmodel.startmatch,req,res)
            
         ],function(err,result,teamsList){
            var team_list = [];
            teamsList.forEach(function(data){
              team_list.push(data.player_id);
            });
            shuffle(team_list);
            var TotalteamCount = team_list.length;
            if(!powerOfTwo(TotalteamCount)){
                highestPowerOfTwo = getTheHighestPowerOfTwo(TotalteamCount);
                byeCount = getByeTeamcount(highestPowerOfTwo,TotalteamCount);
            }else{
                highestPowerOfTwo = TotalteamCount;
                byeCount = 0;
            }
            outerArr = [];
            for(i=0;i<TotalteamCount;i++){
              innerArr = [];
              innerArr.push(data.tournmentId);
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
            //matchmodel.updateMatches(outerArr,req, res, function (opened, closed) {
              res.sendData = {'success':true,'msg':"Match started Successfully","data":result,"statuscode":200};
              next();
            //});
        
          });   
    } else if(data.matchType=='2'){
        console.log('this is type 2');
        async.waterfall([
  
            async.apply(matchmodel.startLeagueMatch,req,res)
            
         ],function(err,result,teamsList){
            res.sendData = {'success':true,'msg':"Match started Successfully","data":result,"statuscode":200};
              next();
         });
    }
});
router.post('/nextRound',function(req,res,next){
    async.waterfall([
  
      async.apply(matchmodel.nextRound,req,res),
      async.apply(matchmodel.UpdateRound)
      
   ],function(err,result,teamsList){
        res.sendData = {'success':true,'msg':"Next Round updated Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/matchDetails',function(req,res,next){
    async.waterfall([
  
      async.apply(matchmodel.matchDetails,req,res)
      
   ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Mactch Details Successfully","data":result,"statuscode":200};
        next();
    });
});

router.post('/updateMatchToMatch',function(req,res,next){
    async.waterfall([
  
      async.apply(matchmodel.updateMatchToMatch,req,res)
      
   ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Mactch Details Successfully","data":result,"statuscode":200};
        next();
    });
});

router.post('/updatedByeMatchNumber',function(req,res,next){
    async.waterfall([
  
      async.apply(matchmodel.updatedByeMatchNumber,req,res)
      
   ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Mactch Details Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/updateByeToMatch',function(req,res,next){
    async.waterfall([
  
      async.apply(matchmodel.updateByeToMatch,req,res)
      
   ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Mactch Details Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/updateMatchToBye',function(req,res,next){
    async.waterfall([
  
      async.apply(matchmodel.updateMatchToBye,req,res)
      
   ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Mactch Details Successfully","data":result,"statuscode":200};
        next();
    });
});
router.post('/goNextRoundForRoundRobbin',function(req,res,next){
    async.waterfall([
      async.apply(matchmodel.goNextRoundForRoundRobbin,req,res)
      
   ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Go To Next Round Added Successfully","data":result,"statuscode":200};
        next();
    });
});
module.exports = router;