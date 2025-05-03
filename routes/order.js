var express = require('express');
var router = express.Router();
var async = require('async');
var orderModel = require('../models/ordermodel');

router.post('/add',function(req,res,next){
    console.log('this is add router');
    async.waterfall([
       async.apply(orderModel.addOrder,req,res)
    ],function(err,result,res){
        console.log(result);
        if(result=='success'){
            res.sendData = {'success':true,'msg':"Order Added Successfully","data":result,"statuscode":200};
        } else {
            res.sendData = {'success':false,'msg':"Order Not Added","data":result,"statuscode":201};
        }
        next();
    });
});

router.post('/update',function(req,res,next){
    console.log('this is update router');
    async.waterfall([
       async.apply(orderModel.updateOrder,req,res)
    ],function(err,result,res){
        console.log(result);
        if(result=='success'){
            res.sendData = {'success':true,'msg':"Order updated Successfully","data":result,"statuscode":200};
        } else {
            res.sendData = {'success':false,'msg':"Order updated Added in this Team","data":result,"statuscode":201};
        }
        next();
    });
});

router.post('/deleteOrder',function(req,res,next){
    console.log('this is delete router');
    async.waterfall([
       async.apply(orderModel.deleteOrder,req,res)
    ],function(err,result,res){
        console.log(result);
        if(result=='success'){
            res.sendData = {'success':true,'msg':"Order Deleted Successfully","data":result,"statuscode":200};
        } else {
            res.sendData = {'success':false,'msg':"Order Delete Error","data":result,"statuscode":201};
        }
        next();
    });
});

router.post('/list',function(req,res,next){
    console.log('this is router');
    async.waterfall([
       async.apply(orderModel.getOrderList,req,res)
    ],function(err,result,res){
        console.log(result);
        if(result){
            res.sendData = {'success':true,'msg':"Order List Successfully","data":result,"statuscode":200};
        } else {
            res.sendData = {'success':false,'msg':"Order List Error","data":result,"statuscode":201};
        }
        next();
    });
});

router.post('/getOrder',function(req,res,next){
    console.log('this is router');
    async.waterfall([
       async.apply(orderModel.getOrder,req,res)
    ],function(err,result,res){
        console.log(result);
        if(result){
            res.sendData = {'success':true,'msg':"Order data Successfully","data":result,"statuscode":200};
        } else {
            res.sendData = {'success':false,'msg':"Order Data Error","data":result,"statuscode":201};
        }
        next();
    });
});
module.exports = router;