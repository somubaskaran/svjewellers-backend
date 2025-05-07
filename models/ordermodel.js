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
                var createOrderQuery = "INSERT INTO `order`( `customer_name`, `customer_email`, `customer_number`, `customer_city`, `item_name`, `item_weight`, `item_purity`, `metal_type`, `due_date`, `description`, `status`) VALUES ('"+orderData.customerName+"','"+orderData.customerEmail+"','"+orderData.customerPhone+"','"+orderData.customerCity+"','"+orderData.itemName+"','"+orderData.itemWeight+"','"+orderData.itemPurity+"','"+orderData.metalType+"','"+orderData.dueDate+"','"+orderData.description+"',0)";

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

ordermodel.getOrder = (req,res,callback) => {
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
            var getOrderId = req.body.data.orderId;
            console.log(getOrderId);
                var getOrderListQuery = "SELECT * from `order` where id ="+getOrderId;
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

ordermodel.updateOrder = (req,res,callback) => {
    console.log('this is update model');
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
                var updateOrderQuery = "UPDATE `order` SET `customer_name`='"+orderData.customerName+"',`customer_email`='"+orderData.customerEmail+"',`customer_number`='"+orderData.customerPhone+"',`customer_city`='"+orderData.customerCity+"',`item_name`='"+orderData.itemName+"',`item_weight`='"+orderData.itemWeight+"',`item_purity`='"+orderData.itemPurity+"',`metal_type`='"+orderData.metalType+"',`due_date`='"+orderData.dueDate+"',`description`='"+orderData.description+"' WHERE id='"+orderData.updateId+"'";

                console.log(updateOrderQuery);
                    //var query = 'select * from matches where matches.tour_id = '+tournmentId+ ' and matches.round_id = '+temp;
                    
                    try {
                        console.log('this is try');
                        //await connectionStaff.query(createOrderQuery);
                        let  updateOrderQueryData = await connectionStaff.awaitQuery(
                            updateOrderQuery
                        );
                        console.log('aaa atest');
                        let responseMessage;
                        console.log(updateOrderQueryData.affectedRows);
                        console.log(JSON.stringify(updateOrderQueryData));
                        if(updateOrderQueryData.affectedRows>0){
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

ordermodel.deleteOrder = (req,res,callback) => {
    console.log('this is update model');
    (async () => { 
        try{
            const connectionStaff = await mysql.createConnection({
                connectionLimit: 500,
                host: mysqlconstants.MYSQL_HOST,
                user: mysqlconstants.MYSQL_USERNAME,
                password: mysqlconstants.MYSQL_PASSWORD,
                database: mysqlconstants.MYSQL_DATABASE,
            });
            var orderData = req.body;
            console.log(orderData);
                var deleteOrderQuery = "DELETE FROM `order` where id='"+orderData.deleteId+"'";

                console.log(deleteOrderQuery);
                    //var query = 'select * from matches where matches.tour_id = '+tournmentId+ ' and matches.round_id = '+temp;
                    
                    try {
                        console.log('this is try');
                        //await connectionStaff.query(createOrderQuery);
                        let  deleteOrderQueryData = await connectionStaff.awaitQuery(
                            deleteOrderQuery
                        );
                        console.log('aaa atest');
                        let responseMessage;
                        console.log(deleteOrderQueryData.affectedRows);
                        if(deleteOrderQueryData.affectedRows>0){
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
module.exports = ordermodel;