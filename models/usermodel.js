const sql = require("./mysqlconnect.js");
var middleware = require('../middleware/reqresmiddleware');
var appconstant = require("../config/appconstant");
var moment = require('moment');
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
// constructor
const usermodel = function() {
    
};

usermodel.checkDoctorExists = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            //var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            //logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var email_address = req.body.data.email_address;
            var country_code = req.body.data.country_code;
            var mobile_number = req.body.data.mobile_number;
            var sql = "SELECT uuid as doctor ,CAST(AES_DECRYPT(`email_address`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as email_address,CAST(AES_DECRYPT(`mobile_number`,'"+appconstant.MYSQLENCRYPTKEY+"') as CHAR) as mobile_number from users where CONVERT(AES_DECRYPT(`email_address`,'"+appconstant.MYSQLENCRYPTKEY+"') USING 'utf8' ) = '"+email_address+"' OR (CONVERT(AES_DECRYPT(`country_code`,'"+appconstant.MYSQLENCRYPTKEY+"') USING 'utf8' ) = '"+country_code+"' AND CONVERT(AES_DECRYPT(`mobile_number`,'"+appconstant.MYSQLENCRYPTKEY+"') USING 'utf8' ) = '"+mobile_number+"')";
            //console.log(sql);
            connection.query(sql,[], (err, userData) => {
                connection.release();
                if(err) {
                    //var logdata = {"type":'error',"data":err,"customsg":  "Doctor Exists Query error" };
                    //logconf.writelog(logdata);
                    res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
                    middleware.reqresmiddleware.beforeresponse(req,res);
                }else{
                    if(userData.length == 0){
                        callback(null,req,res);
                    }else{
                        //var logdata = {"type":'error',"data":err,"customsg":  "Doctor registered users already exists" };
                        //logconf.writelog(logdata);
                        if(userData[0].email_address == email_address && userData[0].mobile_number == mobile_number){
                            res.sendData = {"msg":'Doctor details are already exists',"statuscode":422,"success":false,"data":{'email_address':"Email address already exists",'mobile_number':'Mobile number already exists'}};
                            middleware.reqresmiddleware.beforeresponse(req,res);
                        }else if(userData[0].email_address == email_address){
                            res.sendData = {"msg":'Doctor details are already exists',"statuscode":422,"success":false,"data":{'email_address':"Email address already exists"}};
                            middleware.reqresmiddleware.beforeresponse(req,res);
                        }else if(userData[0].mobile_number == mobile_number){
                            res.sendData = {"msg":'Doctor details are already exists',"statuscode":422,"success":false,"data":{'mobile_number':'Mobile number already exists'}};
                            middleware.reqresmiddleware.beforeresponse(req,res);
                        }   
                    }
                }

            });        
        }
    });        
}

usermodel.register = (req,res,callback) => {
    sql.getConnection(function(err, connection) {
        if (err) {
            var logdata = {"type":'error',"data":err,"customsg":  "database connection error" };
            logconf.writelog(logdata);
            res.sendData = {"msg":'Server under maintaince',"statuscode":503,"success":false};
            middleware.reqresmiddleware.beforeresponse(req,res);
        }else{
            var name = req.body.data.name;
            var email_address = req.body.data.email_address;
            var country_code = req.body.data.country_code;
            var mobile_number = req.body.data.mobile_number;
            var password = req.body.data.mobile_number;
            var account_number = req.body.data.account_number;
            var email_otp = Math.floor(100000 + Math.random() * 900000);
            var sms_otp = Math.floor(100000 + Math.random() * 900000);
            var staff_id = "ST"+Math.floor(100000 + Math.random() * 900000);
            var expiry_time = moment.utc().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            var doctorId= uuidv4();
            //crypt.password(req.body.data.password,function(password){
            
                var query = 'INSERT INTO users (`uuid`,`staff_id`,`name`,`email_address`,`country_code`,`mobile_number`,`password`,`account_number`,`role_id`,`email_otp`,`sms_otp`,`otp_resend_count`,`otp_expired_at`,`group_by`,`status`,`created_at`,`updated_at`) VALUES '+
                    "('"+doctorId+"','"+staff_id+"',"+
                    "AES_ENCRYPT('"+name+"','"+appconstant.MYSQLENCRYPTKEY+"'),"+
                    "AES_ENCRYPT('"+email_address+"','"+appconstant.MYSQLENCRYPTKEY+"'),"+
                    "AES_ENCRYPT('"+country_code+"','"+appconstant.MYSQLENCRYPTKEY+"'),"+
                    "AES_ENCRYPT('"+mobile_number+"','"+appconstant.MYSQLENCRYPTKEY+"'),"+
                    "AES_ENCRYPT('"+password+"','"+appconstant.MYSQLENCRYPTKEY+"'),"+
                    "AES_ENCRYPT('"+account_number+"','"+appconstant.MYSQLENCRYPTKEY+"'),"+
                    "2,"+
                    "'"+email_otp+"',"+
                    "'"+sms_otp+"',"+
                    "1,"+
                    "'"+expiry_time+"',"+
                    "'"+doctorId+"',"+
                    "1,"+
                    "'"+moment.utc().format('YYYY-MM-DD HH:mm:ss')+"',"+
                    "'"+moment.utc().format('YYYY-MM-DD HH:mm:ss')+"')";
                    //console.log(query);
                connection.query(query,[],(err,doctorRegister) => {
                    if(err){
                        var logdata = {"type":'error',"data":err,"customsg": "Doctor Query insertion error" };
                        logconf.writelog(logdata);
                        res.sendData = {"msg":'Server under maintaince',"statuscode":422,"success":false};
                        middleware.reqresmiddleware.beforeresponse(req,res);
                    }else{
                        // mail.sendOtp({'name':name,'email_address':email_address,'otp':email_otp,'message':'Your email verification code for Cardiac MD Connect '});
                        // sms.sendsms({'name':name,'mobile_number':"+"+country_code+""+mobile_number,"otp":sms_otp,"message":"Your sms verification code for Cardiac MD Connect is "+sms_otp});
                        var userDetails = {
                            'uuid':doctorId,
                            'name':name,
                            'email_address':email_address,
                            'country_code':country_code,
                            'mobile_number':mobile_number,
                            'account_number':account_number,
                            'role_id':2,
                            'group_by':doctorId,
                            'status':2
                        };
                        const token = jwt.sign(userDetails, appconstant.JWTTOKENUSER ,{ algorithm: "HS256" });
                        userDetails.token = token;
                        callback(null,userDetails,res);
                    }
                });
            //});
        }
    });        
}

module.exports = usermodel;