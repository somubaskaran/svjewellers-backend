var express = require('express');
var router = express.Router();
var async = require('async');
var signin = require('../models/signin');
var usermodel = require('../models/usermodel');
var middleware = require('../middleware/reqresmiddleware');
var jwt = require('jsonwebtoken');
var appconstant = require("../config/appconstant");

router.post('/login',function(req,res,next){
    async.waterfall([
       async.apply(signin.checkUserCredentials,req,res)
    ],function(err,result,res){
        //console.log(result);
        if(result.role_id == 1 || result.role_id == 6){
            // admin
            const token = jwt.sign({'name':result.name,'role_id':result.role_id,'uuid':result.uuid,"email_address":result.email_address,"status":result.status,"avatar":result.avatar}, appconstant.JWTTOKENUSER ,{ algorithm: "HS256" });
            var responseData = result;
            /*var logdata = {"type":'access',"data":JSON.stringify(result),"customsg":  "Logged in Response" };
            logconf.writelog(logdata);*/
            responseData.token = token;
            
        //}else if(result.role_id == 2){
         }else {
            // doctor
            const token = jwt.sign({'name':result.name,'role_id':result.role_id,'uuid':result.uuid,'group_by':result.group_by,"email_address":result.email_address,"status":result.status,"avatar":result.avatar}, appconstant.JWTTOKENUSER ,{ algorithm: "HS256" });
            var responseData = result;
            /*var logdata = {"type":'access',"data":JSON.stringify(result),"customsg":  "Logged in Response" };
            logconf.writelog(logdata);*/
            responseData.token = token;
        }
        var responseData = {'success':true,'statuscode':200,'msg':'User logged Successfully',data:responseData};
        //console.log(responseData);
        
        res.sendData = responseData;
        next();
    });

});

router.post('/register',function(req,res,next){
    async.waterfall([
       async.apply(usermodel.checkDoctorExists,req,res),
       usermodel.register
       
    ],function(err,result,res){
        //console.log(result);
        res.sendData = {'success':true,'msg':"Doctor details are registered successfully and verification code is sent it to your email and sms","data":result,"statuscode":200};
        next();
    });
});

router.post('/verify-otp',function(req,res,next){
    /*var logdata = {"type":'access',"data":JSON.stringify(req.body.data),"customsg":  "Doctor Verification API Request" };
    logconf.writelog(logdata);*/
    async.waterfall([
       async.apply(middleware.jwtmiddleware.jwtverification,req,res),
       signin.OTPverfication
    ],function(err,result,res){
        // console.log(result);
        res.sendData = {'success':true,'msg':"Doctor details are verified successfully","data":result,"statuscode":200};
        next();
    });
});

router.get('/resend-otp',function(req,res,next){
    /*var logdata = {"type":'access',"data":JSON.stringify(req.body.data),"customsg":  "Doctor verification resend otp API Request" };
    logconf.writelog(logdata);*/
    async.waterfall([
       async.apply(middleware.jwtmiddleware.jwtverification,req,res),
       signin.checkOTPCount,
       signin.resendOTP
    ],function(err,result,res){
        // console.log(result);
        res.sendData = {'success':true,'msg':"Verification code has been sent to your email address and mobile number","data":result,"statuscode":200};
        next();
    });
});

router.post('/forgot-password',function(req,res,next){
    /*var logdata = {"type":'access',"data":JSON.stringify(req.body.data),"customsg":  "Doctor forgot password API Request" };
    logconf.writelog(logdata);*/
    async.waterfall([
       async.apply(signin.checkUserExists,req,res),
    ],function(err,result,res){
        // console.log(result);
        res.sendData = {'success':true,'msg':"Reset password link is sent it to your email address","data":[],"statuscode":200};
        next();
    });
});

router.post('/check-reset-exists',function(req,res,next){
    /*var logdata = {"type":'access',"data":JSON.stringify(req.body.data),"customsg":  "Doctor Reset password API Request" };
    logconf.writelog(logdata);
    console.log(req.body.data);*/
    async.waterfall([
       async.apply(signin.checkResetLink,req,res),
    ],function(err,result,res){
        // console.log(result);
        res.sendData = {'success':true,'msg':"Reset link exists","data":[],"statuscode":200};
        next();
    });
});
module.exports = router;