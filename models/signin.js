const sql = require("./mysqlconnect.js");
var middleware = require('../middleware/reqresmiddleware');
var appconstant = require("../config/appconstant");
var moment = require('moment');
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
var mail = require('../traits/sendmail');
// constructor
const signin = function() {
    
};


signin.checkUserCredentials = (req,res,callback) => {
    console.log('check');
    sql.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var info =req.body.data;
            var query = "SELECT uuid,password,role_id,status,group_by,"+ 
            "CAST(AES_DECRYPT(`name`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as name,"+
            "CAST(AES_DECRYPT(`country_code`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as country_code,"+
            "CAST(AES_DECRYPT(`mobile_number`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as mobile_number,"+
            "CAST(AES_DECRYPT(`email_address`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as email_address, "+
            "CAST(AES_DECRYPT(`account_number`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as account_number "+
            "FROM users where CONVERT(AES_DECRYPT(`email_address`,'"+appconstant.MYSQLENCRYPTKEY+"') USING 'utf8' ) = '"+info.email_address+"'";
            connection.query(query,[], (err, userData) => {
                if(err) {
                    var logdata = {"type":'error',"data":err,"customsg":  "Query error" };
                    logconf.writelog(logdata);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
                    middleware.reqresmiddleware.beforeresponse(req,res);
                }else{
                    connection.release();
                    if(userData.length == 0){
                        // var logdata = {"type":'error',"data":"Invalid Login Credentials","customsg":  "Login API Response" };
                        // logconf.writelog(logdata);
                        res.sendData = {"msg":'Invalid Login Credentials',"statuscode":404,"success":false};
                        middleware.reqresmiddleware.beforeresponse(req,res);
                    }else{
                            if(userData[0].status == 1){
                                var userInfo = {
                                    "uuid":userData[0].uuid,
                                    "name":userData[0].name,
                                    "email_address":userData[0].email_address,
                                    "role_id":userData[0].role_id,
                                    "group_by":userData[0].group_by,
                                    "country_code":userData[0].country_code,
                                    "mobile_number":userData[0].mobile_number,
                                    "id":userData[0].uuid,
                                    "status":userData[0].status,
                                    "avatar":"admin.jpg"
                                };
                                if(userData[0].role_id == 2){
                                    userInfo.avatar = 'doctor.jpg';
                                }else if(userData[0].role_id == 1){
                                    userInfo.avatar = 'admin.jpg';
                                }
                                callback(null,userInfo,res);
                            }else if(userData[0].status == 2){
                                var userDetails = {
                                    'uuid':userData[0].uuid,
                                    'name':userData[0].name,
                                    'email_address':userData[0].email_address,
                                    'country_code':userData[0].country_code,
                                    'mobile_number':userData[0].mobile_number,
                                    'account_number':userData[0].account_number,
                                    'role_id':2,
                                    'status':2,
                                    'avatar':''
                                };
                                const token = jwt.sign(userDetails, appconstant.JWTTOKENUSER ,{ algorithm: "HS256" });
                                userDetails.token = token;
                                // console.log(userDetails);
                                /*var logdata = {"type":'access',"data":"Account is not verified","customsg":  "Login API Response" };
                                logconf.writelog(logdata);*/
                                res.sendData = {"msg":'User Account is not verified yet',"statuscode":404,"success":true,'data':userDetails};
                                middleware.reqresmiddleware.beforeresponse(req,res);
                            }else if(userData[0].status == 0){
                                var userDetails = {
                                    'uuid':userData[0].uuid,
                                    'name':userData[0].name,
                                    'email_address':userData[0].email_address,
                                    'country_code':userData[0].country_code,
                                    'mobile_number':userData[0].mobile_number,
                                    'account_number':userData[0].account_number,
                                    'role_id':2,
                                    'status':2,
                                    'avatar':''
                                };
                                const token = jwt.sign(userDetails, appconstant.JWTTOKENUSER ,{ algorithm: "HS256" });
                                userDetails.token = token;
                                // console.log(userDetails);
                                /*var logdata = {"type":'access',"data":"Account is not verified","customsg":  "Login API Response" };
                                logconf.writelog(logdata);*/
                                res.sendData = {"msg":'Your account is de-activated, Kindly contact administrator',"statuscode":404,"success":true,'data':userDetails};
                                middleware.reqresmiddleware.beforeresponse(req,res);
                            }
                    }
                }
            });    
        }
    });
}        

signin.OTPverfication = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            // console.log(req.body.data);
            var query = "SELECT uuid,"+
            "CAST(AES_DECRYPT(`name`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as name,"+
            "CAST(AES_DECRYPT(`country_code`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as country_code,"+
            "CAST(AES_DECRYPT(`mobile_number`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as mobile_number,"+
            "CAST(AES_DECRYPT(`email_address`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as email_address,role_id,sms_otp,email_otp,id,otp_expired_at,group_by from users where uuid = '"+req.body.data.uuid+"'";
            connection.query(query,[],(err,otpData) => {
                if(err){
                    var logdata = {"type":'error',"data":err,"customsg": "Doctor Query insertion error" };
                    logconf.writelog(logdata);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                    middleware.reqresmiddleware.beforeresponse(req,res);
                }else{
                    connection.release();
                    if(otpData.length  ==  0){
                        var logdata = {"type":'error',"data":err,"customsg": "Doctor OTP verification failure" };
                        logconf.writelog(logdata);
                        res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                        middleware.reqresmiddleware.beforeresponse(req,res);
                    }else{
                        // console.log(otpData);
                        if(otpData[0].sms_otp == req.body.data.sms_otp && otpData[0].email_otp == req.body.data.mail_otp){
                            var currentTime = new Date(moment.utc().format('YYYY-MM-DD[T]HH:mm[Z]'));
                            var expiryTime = new Date(moment(otpData[0].otp_expired_at).format('YYYY-MM-DD[T]HH:mm[Z]'));
                            // console.log(expiryTime,currentTime);
                            if(expiryTime < currentTime ){
                                // var logdata = {"type":'error',"data":req.body.data.uuid,"customsg":  "OTP has been expired" };
                                // logconf.writelog(logdata);
                                res.sendData = {"msg":'Otp has been expired',"success":false,"statuscode":422};
                                middleware.reqresmiddleware.beforeresponse(req,res);
                            }else{
                                //updateUser(req.body.data.uuid,1);
                                const token = jwt.sign({'name':otpData[0].name,'role_id':otpData[0].role_id,'group_by':otpData[0].group_by,'uuid':otpData[0].uuid,"email_address":otpData[0].email_address,"status":1,"avatar":"doctor.jpg"}, appconstant.JWTTOKENUSER ,{ algorithm: "HS256" });
                                var result = {
                                    'token':token,
                                    'role_id':otpData[0].role_id
                                }
                                callback(null,result,res);        
                            }
                        }else if(otpData[0].sms_otp != req.body.data.sms_otp){
                            // var logdata = {"type":'error',"data":req.body.data.uuid,"customsg":  "Invalid OTP" };
                            // logconf.writelog(logdata);
                            res.sendData = {"msg":'Invalid SMS OTP',"success":false,"statuscode":422};
                            middleware.reqresmiddleware.beforeresponse(req,res);
                        }else if(otpData[0].email_otp != req.body.data.mail_otp){
                            // var logdata = {"type":'error',"data":req.body.data.uuid,"customsg":  "Invalid OTP" };
                            // logconf.writelog(logdata);
                            res.sendData = {"msg":'Invalid Email OTP',"success":false,"statuscode":422};
                            middleware.reqresmiddleware.beforeresponse(req,res);
                        }else{
                            // var logdata = {"type":'error',"data":req.body.data.uuid,"customsg":  "Invalid OTP" };
                            // logconf.writelog(logdata);
                            res.sendData = {"msg":'Invalid OTP',"success":false,"statuscode":422};
                            middleware.reqresmiddleware.beforeresponse(req,res);
                        }
                    }
                }
            });        
        }
    });        
}

signin.checkOTPCount = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            // var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            // logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            
            var query = "Select otp_resend_count from users where uuid = '"+req.query.uuid+"'";
            connection.query(query,[],(err,otpCountData)=> {
                if(err){
                    // var logdata = {"type":'error',"data":err,"customsg": "Doctor Query insertion error" };
                    // logconf.writelog(logdata);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                    middleware.reqresmiddleware.beforeresponse(req,res);
                }else{
                    connection.release();
                    if(otpCountData[0].otp_resend_count == 3){
                        // var logdata = {"type":'error',"data":'Resend OTP Count',"customsg":  "Resend OTP Count" };
                        // logconf.writelog(logdata);
                        res.sendData = {"msg":'Please Contact administrator for resend otp',"success":false,"statuscode":422};
                        middleware.reqresmiddleware.beforeresponse(req,res);
                    }else{
                        req.query.count = otpCountData[0].otp_resend_count;
                        callback(null,req,res);
                    }
                }    
            });
        }
    });        
}

signin.resendOTP = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var email_otp = Math.floor(100000 + Math.random() * 900000);
            var sms_otp = Math.floor(100000 + Math.random() * 900000);
            var email_address = req.query.email_address;
            var name = req.query.name;
            var country_code = req.query.country_code;
            var mobile_number = req.query.mobile_number;
            var otp_resend_count = req.query.count+1;
            var expiry_time = moment.utc().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            var query = "UPDATE users set email_otp = '"+email_otp+"',sms_otp = '"+sms_otp+"',otp_expired_at = '"+expiry_time+"',otp_resend_count = '"+otp_resend_count+"' where uuid = '"+req.query.uuid+"'";
            connection.query(query,[],(err,resendOTPData)=> {
                // mail.sendOtp({'name':name,'email_address':email_address,'otp':email_otp,'message':'Your email verification code for Cardiac MD Connect '});
                // sms.sendsms({'name':name,'mobile_number':"+"+country_code+""+mobile_number,"otp":sms_otp,"message":"Your sms verification code for Cardiac MD Connect is "+sms_otp});
                const authHeader = req.headers['authorization'];
                const token = authHeader && authHeader.split(' ')[1];
                var result = {
                    token:token
                }
                callback(null,result,res);
            });
        }
    });        
}
signin.checkUserExists = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var email_address = req.body.data.email_address;
            var query = "SELECT uuid,CAST(AES_DECRYPT(`name`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as name,CAST(AES_DECRYPT(`email_address`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as email_address,CAST(AES_DECRYPT(`mobile_number`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as mobile_number from users where CONVERT(AES_DECRYPT(`email_address`,'"+appconstant.MYSQLENCRYPTKEY+"') USING 'utf8' ) = '"+email_address+"'";
            // console.log(query);
            connection.query(query,[],(err,checkUserExists)=> {
                if(err){
                    var logdata = {"type":'error',"data":err,"customsg": "Doctor Query insertion error" };
                    logconf.writelog(logdata);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                    middleware.reqresmiddleware.beforeresponse(req,res);
                }else{
                    connection.release();
                    if(checkUserExists.length == 0){
                        var logdata = {"type":'error',"data":'User does not exists',"customsg":  "User does not exists" };
                        //logconf.writelog(logdata);
                        res.sendData = {"msg":'User does not exists',"success":false,"statuscode":422};
                        middleware.reqresmiddleware.beforeresponse(req,res);
                    }else{
                        if(checkUserExists.length > 0 && checkUserExists[0].uuid != null){
                            var cryptLink = checkUserExists[0].uuid;
                            generateForgotPasswordLink(cryptLink,checkUserExists[0].uuid);
                            mail.sendResetLink({'name':checkUserExists[0].name,'link':cryptLink,'email_address':checkUserExists[0].email_address});
                            callback(null,checkUserExists,res);
                           /*  crypt.resetlink(checkUserExists[0].uuid,(cryptLink) => {
                                console.log(cryptLink);
                                var cryptLink = cryptLink.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                                generateForgotPasswordLink(cryptLink,checkUserExists[0].uuid);
                                mail.sendResetLink({'name':checkUserExists[0].name,'link':cryptLink,'email_address':checkUserExists[0].email_address});
                                callback(null,checkUserExists,res);
                            }); */
                                
                        }else{
                            var logdata = {"type":'error',"data":'Forgot password test User does not exists',"customsg":  "User does not exists" };
                            logconf.writelog(logdata);
                            res.sendData = {"msg":'User does not exists',"success":false,"statuscode":422};
                            middleware.reqresmiddleware.beforeresponse(req,res);
                        }
                    }
                }
            });        
        }
    });        
}

signin.checkResetLink = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var query = "Select uuid from users where reset_link = '"+req.body.data.key+"'";
            connection.query(query,[],(err,result)=> {
                if(err){
                    var logdata = {"type":'error',"data":err,"customsg": "Reset Link checking API" };
                    logconf.writelog(logdata);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                    middleware.reqresmiddleware.beforeresponse(req,res);
                }else{
                    console.log(result);
                    // console.log(result);
                    if(result.length == 0){
                        res.sendData = {"msg":'Password reset code is expired',"statuscode":422,"success":false};
                        middleware.reqresmiddleware.beforeresponse(req,res);
                    }else{
                        if(result[0].uuid != null){
                            req.body.data.uuid == result[0].uuid;
                            req.body.data.key = result[0].uuid;
                            // console.log(req.body.data);
                            callback(null,req,res);
                        }else{
                            res.sendData = {"msg":'Password reset code is expired',"statuscode":422,"success":false};
                            middleware.reqresmiddleware.beforeresponse(req,res);
                        }
                    }
                    
                }
            }); 
        }
    });    
}

function generateForgotPasswordLink(cryptLink,uuid){
    sql.getConnection(function(err,connection){
        connection.release();
        if (err) {
            var logdata = {"type":'error',"data":err,"customsg":  "User Status update error" };
            logconf.writelog(logdata);
            res.sendData = {"msg":'Update user connection error',"statuscode":500};
            middleware.beforeresponse(req,res);
        }else{
            var query = "Update users set reset_link = '"+cryptLink+"' where uuid = '"+uuid+"'";
            connection.query(query,[],(err,result) => {
                // connection.release();
                //callback(result);        
            });
        }    
    });
}
module.exports = signin;