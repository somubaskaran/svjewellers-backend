var express = require('express');
var router = express.Router();
var async = require('async');
var playermodel = require('../models/playermodel');

router.post('/add',function(req,res,next){
    async.waterfall([
       async.apply(playermodel.addPlayer,req,res)
    ],function(err,result,res){
        if(result=='0'){
            res.sendData = {'success':false,'msg':"Player Already Added in this Team","data":result,"statuscode":201};
        } else {
            res.sendData = {'success':true,'msg':"Player Added Successfully","data":result,"statuscode":200};
        }
        next();
    });
}); 

router.post('/getPlayerList',function(req,res,next){
    async.waterfall([
        async.apply(playermodel.getPlayersList,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Player List Successfully","data":result,"statuscode":200};
        next();
    });
});  
module.exports = router;