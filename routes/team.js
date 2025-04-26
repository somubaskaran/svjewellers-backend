var express = require('express');
var router = express.Router();
var async = require('async');
var teammodel = require('../models/teammodel');

router.post('/add',function(req,res,next){
    async.waterfall([
       async.apply(teammodel.addTeam,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Tournment Added Successfully","data":result,"statuscode":200};
        next();
    });
}); 

router.post('/getTeamList',function(req,res,next){
    async.waterfall([
        async.apply(teammodel.getTeamList,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Player List Successfully","data":result,"statuscode":200};
        next();
    });
});  
module.exports = router;