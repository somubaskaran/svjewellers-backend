var express = require('express');
var router = express.Router();
var async = require('async');
var pointsmodel = require('../models/pointsmodel');

router.post('/getpoints',function(req,res,next){
    async.waterfall([
       async.apply(pointsmodel.getPoints,req,res)
    ],function(err,points,res){
        let point = 0;
        if(points[0].point!=null){
            point = Number(points[0].point);
        }
        var result = {
            point: point
        }
        res.sendData = {'success':true,'msg':"Points Loaded Successfully","data":result,"statuscode":200};
        next();
    });
});

router.post('/addpoint',function(req,res,next){
    async.waterfall([
       async.apply(pointsmodel.addPoint,req,res)
    ],function(err,result,res){
        
        res.sendData = {'success':true,'msg':"Points Added Successfully","data":result,"statuscode":200};
        next();
    });
});

router.post('/removepoint',function(req,res,next){
    async.waterfall([
       async.apply(pointsmodel.removePoint,req,res)
    ],function(err,result,res){
        
        res.sendData = {'success':true,'msg':"Points Added Successfully","data":result,"statuscode":200};
        next();
    });
});
module.exports = router;