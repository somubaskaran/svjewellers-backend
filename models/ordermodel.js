const sql = require("./mysqlconnect.js");
var moment = require('moment');
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
const mysql = require(`mysql-await`);
const mysqlconstants = require("../config/databaseconstant.js");
const { json } = require("body-parser");

// constructor
const ordermodel = function() {
    
};

ordermodel.addOrder = (req,res,callback) => {
    console.log('this is model');
    (async () => { 
        try{
            const connectionStaff = await mysql.createConnection({
                connectionLimit: 500,
                host: mysqlconstants.MYSQL_HOST,
                user: mysqlconstants.MYSQL_USERNAME,
                password: mysqlconstants.MYSQL_PASSWORD,
                database: mysqlconstants.MYSQL_DATABASE,
            });
            var orderData = req.body.data;
                var createOrderQuery = "INSERT INTO `order`( `customer_name`, `customer_email`, `customer_number`) VALUES ('"+orderData.customerName+"','"+orderData.customerEmail+"','"+orderData.customerPhone+"')";
    
                    //var query = 'select * from matches where matches.tour_id = '+tournmentId+ ' and matches.round_id = '+temp;
                    
                    try {
                        console.log('this is try');
                        //await connectionStaff.query(createOrderQuery);
                        let  createOrderQueryData = await connectionStaff.awaitQuery(
                            createOrderQuery
                        );
                        console.log('aaa atest');
                        let responseMessage;
                        console.log(createOrderQueryData.affectedRows);
                        console.log(JSON.stringify(createOrderQueryData));
                        if(createOrderQueryData.affectedRows>0){
                            console
                            responseMessage = 'success';
                        }else {
                            responseMessage = 'error';
                        }
                        await connectionStaff.awaitCommit();
                        /** End the connection */
                        connectionStaff.awaitEnd();
                        callback(null,responseMessage,res);
                      } catch (error) {
                        if (error.code === 'ER_BAD_FIELD_ERROR') {
                            // Handle the specific error: log it, notify, or recover gracefully
                            console.warn('Warning: Unknown column in query:', error.message);
                            // Optionally, continue execution without throwing
                          } else {
                            // For other errors, rethrow or handle differently
                            throw error;
                          }
                      }
        } catch(err){
            console.log('this is error');
            console.log(err);
            callback(null,'error',res);
        }
        
            
    })();
}
ordermodel.getOrderList = (req,res,callback) => {
    console.log('this is model');
    (async () => { 
        try{
            const connectionStaff = await mysql.createConnection({
                connectionLimit: 500,
                host: mysqlconstants.MYSQL_HOST,
                user: mysqlconstants.MYSQL_USERNAME,
                password: mysqlconstants.MYSQL_PASSWORD,
                database: mysqlconstants.MYSQL_DATABASE,
            });
            var getOrderListData = req.body.data;
                var getOrderListQuery = "SELECT * from `order` order by id desc";
    console.log(getOrderListQuery);
                    //var query = 'select * from matches where matches.tour_id = '+tournmentId+ ' and matches.round_id = '+temp;
                    
                    try {
                        console.log('this is try');
                        //await connectionStaff.query(createOrderQuery);
                        let  getOrderListData = await connectionStaff.awaitQuery(
                            getOrderListQuery
                        );
                        await connectionStaff.awaitCommit();
        
                        /** End the connection */
                        connectionStaff.awaitEnd();
                        callback(null,getOrderListData,res);
                      } catch (error) {
                        if (error.code === 'ER_BAD_FIELD_ERROR') {
                            // Handle the specific error: log it, notify, or recover gracefully
                            console.warn('Warning: Unknown column in query:', error.message);
                            // Optionally, continue execution without throwing
                          } else {
                            // For other errors, rethrow or handle differently
                            throw error;
                          }
                      }
        } catch(err){
            console.log('this is error');
            console.log(err);
            callback(null,'error',res);
        }
        
            
    })();
}
module.exports = ordermodel;