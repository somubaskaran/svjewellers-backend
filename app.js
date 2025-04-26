var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const helmet = require("helmet");
var cors = require("cors");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");

var app = express();
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("view engine", "ejs");
var http = require("http");
var server = http.createServer(app);
var middleware = require("./middleware/reqresmiddleware");
// Create Server start 
console.log('this is test');
server.listen(3000);
console.log('success'); 
server.on("listening", function () {
    console.log(
        "Server started on port %s at %s",
        server.address().port,
        server.address().address
    );
});
// Create Server end

// view engine setup start
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(helmet());
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/uploads"));
app.use("/uploads", express.static("uploads/"));
// view engine setup end

app.use(bodyParser.urlencoded());
// app.use("/test", function(req, res, next) {
//     console.log(req.body);
//     console.log('check');
// });


//router
var testRouter = require("./routes/test.js");
var signRouter = require("./routes/sign");
var matchRouter = require("./routes/match");
var teamRouter = require("./routes/team");
var playerRouter = require("./routes/player");
var pointsRouter = require("./routes/points");
var readytoplayRouter = require("./routes/readytoplay");
var orderRouter = require("./routes/order");
//routes - controller
app.use(
    "/admin/api/v1/match",
    middleware.reqresmiddleware.afterrequest,
    matchRouter,
    middleware.reqresmiddleware.beforeresponse
);
app.use(
    "/admin/api/v1/readytoplay",
    middleware.reqresmiddleware.afterrequest,
    readytoplayRouter,
    middleware.reqresmiddleware.beforeresponse
);
app.use(
    "/admin/api/v1/points",
    middleware.reqresmiddleware.afterrequest,
    pointsRouter,
    middleware.reqresmiddleware.beforeresponse
);
app.use(
    "/admin/api/v1/team",
    middleware.reqresmiddleware.afterrequest,
    teamRouter,
    middleware.reqresmiddleware.beforeresponse
);
app.use(
    "/admin/api/v1/player",
    middleware.reqresmiddleware.afterrequest,
    playerRouter,
    middleware.reqresmiddleware.beforeresponse
);
app.use(
    "/api/v1",
    middleware.reqresmiddleware.afterrequest,
    signRouter,
    middleware.reqresmiddleware.beforeresponse
);

app.use(
    "/admin/api/v1/order",
    //middleware.reqresmiddleware.afterrequest,
    orderRouter,
    middleware.reqresmiddleware.beforeresponse
);


TotalteamCount = 9;
byeCount = 0;
mactchesCountList = [];
function powerOfTwo(x) {
    return (Math.log(x)/Math.log(2)) % 1 === 0;
}
// console.log(powerOfTwo(TotalteamCount));
function nearestPoweroftwo(n)
{
    let res = 0;
    for (let i = n; i >= 1; i--){
        // If i is a power of 2
        if ((i & (i - 1)) == 0){
                res = i;
                break;
            }
    }
  return res;
}

function getTheHighestPowerOfTwo(TotalteamCount){
    var lowest2ndNumber = nearestPoweroftwo(TotalteamCount);
    var str = Math.log(lowest2ndNumber)/Math.log(2)+1;
    var getTheHighestPowerOfTwo = Math.pow(2, str);
    return getTheHighestPowerOfTwo;
}

function getByeTeamcount(highestPowerOfTwo,TotalteamCount){
    byeVlaue = highestPowerOfTwo - TotalteamCount;
    return byeVlaue;
}

if(!powerOfTwo(TotalteamCount)){
    highestPowerOfTwo = getTheHighestPowerOfTwo(TotalteamCount);
    byeCount = getByeTeamcount(highestPowerOfTwo,TotalteamCount);
}else{
    highestPowerOfTwo = TotalteamCount;
}
function getTotalmatches(){
    totalMatches = TotalteamCount - 1;
    return totalMatches;
}
totalRounds = Math.log(highestPowerOfTwo)/Math.log(2);

function getMatchCountOnRounds(TotalteamCount){
   var nearestPoweroftwoValue =  nearestPoweroftwo(TotalteamCount);
   firstRound = nearestPoweroftwoValue - byeCount;
   if(!powerOfTwo(TotalteamCount)){
      mactchesCountList.push(firstRound);
   }
   var temp = Math.log(nearestPoweroftwoValue)/Math.log(2)
   for(i=0;i<temp;i++){
    nearestPoweroftwoValue = nearestPoweroftwoValue/2;
    mactchesCountList.push(nearestPoweroftwoValue);
   }
}

// getMatchCountOnRounds(TotalteamCount);
// console.log("Total Matches");
// console.log(getTotalmatches());
// console.log("bye count");
// console.log(byeCount);
// console.log('total rounds');
// console.log(totalRounds);
// console.log('match list');
// console.log(mactchesCountList);

app.use(
    "/test",function(){
        console.log('asddasd');
    }
);
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//       user: 'somuchellam1995@gmail.com',
//       pass: 'gmgr oicn hpbo yqow'
//     }
//   });
  
//   // async..await is not allowed in global scope, must use a wrapper
//   async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"Fred Foo 👻" ', // sender address
//       to: "somubaskaran1995@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });
  
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
//     //
//     // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
//     //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
//     //       <https://github.com/forwardemail/preview-email>
//     //
//   }
  
  //main().catch(console.error);