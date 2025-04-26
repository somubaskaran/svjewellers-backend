var express = require('express');
var router = express.Router();
var async = require('async');
var readytoplay = require('../models/readytoplay');

router.post('/getList',function(req,res,next){
    async.waterfall([
       async.apply(readytoplay.getReadyToPlayList,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Ready to Play List Successfully","data":result,"statuscode":200};
        next();
    });
});

router.post('/getTournmentList',function(req,res,next){
    async.waterfall([
       async.apply(readytoplay.getTournmentList,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Get Tournment List Successfully","data":result,"statuscode":200};
        next();
    });
});

router.post('/getCategoryList',function(req,res,next){
    async.waterfall([
       async.apply(readytoplay.getCategoryList,req,res)
    ],function(err,result,res){
        res.sendData = {'success':true,'msg':"Get Category List Successfully","data":result,"statuscode":200};
        next();
    });
});
module.exports = router;