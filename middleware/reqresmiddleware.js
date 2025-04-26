var crypt = require("../endecrypt/crypt");
// var logconf = require("../config/logconf");
 var jwt = require("jsonwebtoken");
 var appconstant = require("../config/appconstant");
// // constructor
 const reqresmiddleware = function () {};
 const jwtmiddleware = function () {};

// jwtmiddleware.jwtverify = (req, res, next) => {
//     if (!req.headers["authorization"]) {
//         res.status(401).json({
//             success: false,
//             message: "User Token Missing",
//             statuscode: 401,
//         });
//     }
//     //
//     const authHeader = req.headers["authorization"];
//     //
//     const token = authHeader && authHeader.split(" ")[1];
//     //console.log(token);
//     if (token == null) {
//         res.status(401).json({
//             success: false,
//             message: "Authorization Not present",
//             statuscode: 401,
//         });
//     }
//     jwt.verify(token, appconstant.JWTTOKENUSER, (err, tokenData) => {
//         if (err) {
//             res.status(403).json({
//                 success: false,
//                 message: "Invalid Token",
//                 statuscode: 403,
//             });
//         } else {
//             //console.log(tokenData);
//             if (
//                 tokenData.name == "eDevice" &&
//                 tokenData.secretkey == "EDEVInoppl"
//             ) {
//                 next();
//             } else {
//                 res.status(403).json({
//                     success: false,
//                     message: "Invalid Token",
//                     statuscode: 403,
//                 });
//             }
//         }
//     });
// };
jwtmiddleware.jwtverification = (req, res, callback) => {
    if (!req.headers["authorization"]) {
        res.status(401).json({
            success: false,
            message: "User Token Missing",
            statuscode: 401,
        });
    }
    //
    const authHeader = req.headers["authorization"];
    //
    const token = authHeader && authHeader.split(" ")[1];
    //console.log(token);
    if (token == null) {
        res.status(401).json({
            success: false,
            message: "Authorization Not present",
            statuscode: 401,
        });
    }
    jwt.verify(token, appconstant.JWTTOKENUSER, (err, tokenData) => {
        if (err) {
            res.status(403).json({
                success: false,
                message: "Invalid Token",
                statuscode: 403,
            });
        } else {
            //console.log(tokenData);
            if (req.method == "GET") {
                req.query.uuid = tokenData.uuid;
                req.query.country_code = tokenData.country_code;
                req.query.mobile_number = tokenData.mobile_number;
                req.query.name = tokenData.name;
                req.query.email_address = tokenData.email_address;
            } else {
                req.body.data.uuid = tokenData.uuid;
            }

            callback(null, req, res);
        }
    });
};
// jwtmiddleware.getuserInfo = (req, res, callback) => {
//     if (!req.headers["authorization"]) {
//         res.status(401).json({
//             success: false,
//             message: "User Token Missing",
//             statuscode: 401,
//         });
//     }
//     //
//     const authHeader = req.headers["authorization"];
//     //
//     const token = authHeader && authHeader.split(" ")[1];
//     //console.log(token);
//     if (token == null) {
//         res.status(401).json({
//             success: false,
//             message: "Authorization Not present",
//             statuscode: 401,
//         });
//     }
//     jwt.verify(token, appconstant.JWTTOKENUSER, (err, tokenData) => {
//         if (err) {
//             res.status(403).json({
//                 success: false,
//                 message: "Invalid Token",
//                 statuscode: 403,
//             });
//         } else {
//             if (req.method == "GET") {
//                 req.query.uuid = tokenData.uuid;
//                 req.query.role_id = tokenData.role_id;
//                 req.body.group_by = tokenData.group_by;
//             } else {
//                 req.body.uuid = tokenData.uuid;
//                 req.body.group_by = tokenData.group_by;
//                 req.body.role_id = tokenData.role_id;
//                 req.adminuuid = tokenData.uuid;
//                 req.adminroleid = tokenData.role_id;
//                 req.admingroup_by = tokenData.group_by;
//             }
//             callback(null, req, res);
//         }
//     });
// };
reqresmiddleware.afterrequest = (req, res, next) => {
    if (req.body.data) {
        var data = req.body.data;
        crypt.decrypt(data, function (decrypted) {
            req.body.data = JSON.parse(decrypted);
            next();
        });
    } else {
        next();
    }
};

reqresmiddleware.beforeresponse = (req, res) => {
    var data = res.sendData;
    res.sendData = "";
    var statuscode = data.statuscode;
    // crypt.encrypt(JSON.stringify(data), function (encryptData) {
    //     res.status(statuscode).json({ data: encryptData });
    // });

    res.status(statuscode).json({ data });
};

module.exports = {
    reqresmiddleware,
    jwtmiddleware,
};
