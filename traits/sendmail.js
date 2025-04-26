var nodemailer = require('nodemailer');
var path = require('path');
var handlebars = require('handlebars');
var fs = require('fs');




// constructor
const sendmail = function() {

};


var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

sendmail.sendresetpassword = (data) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: '@gmail.com', // generated ethereal user
            pass: '908661273217' // generated ethereal password
        }
    });

    readHTMLFile(path.resolve()+'/template/resetpassword/resetpassword.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            tempassword: data.password
        };

        console.log(replacements);
        var htmlToSend = template(replacements);

        let info = transporter.sendMail({
                    from: '@gmail.com', // sender address
                    to: data.mail, // list of receivers
                    subject: data.subject, // Subject line
                    // text: "Hello world?", // plain text body
                    html: htmlToSend // html body
                });

                return info;

    });

}

sendmail.sendOtp = (data) => {

    let transporter = nodemailer.createTransport({
        host: global.env.MAIL_HOST,
        port: global.env.MAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: global.env.MAIL_USERNAME, // generated ethereal user
            pass: global.env.MAIL_PASSWORD // generated ethereal password
        }
    });

    readHTMLFile(path.resolve()+'/template/otp.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            otp: data.otp,
            name:data.name,
            message:data.message,
            logo:global.env.ENVIRONMENT_URL+'/images/cardiac-logo.png',
            year:new Date().getFullYear()

        };

        console.log(replacements);
        var htmlToSend = template(replacements);

        let info = transporter.sendMail({
                    from: 'No-Reply',//global.env.MAIL_FROM, // sender address
                    to: data.email_address, // list of receivers
                    subject: 'CardiacMD Connect - One Time Password', // Subject line
                    // text: "Hello world?", // plain text body
                    html: htmlToSend // html body
                });

                return info;

    });

}
sendmail.invitemail = (data) => {
    let transporter = nodemailer.createTransport({
        host: global.env.MAIL_HOST,
        port: global.env.MAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: global.env.MAIL_USERNAME, // generated ethereal user
            pass: global.env.MAIL_PASSWORD // generated ethereal password
        }
    });
    readHTMLFile(path.resolve()+'/template/invite.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            link: global.env.WEB_URL+"reset-password?code="+data.link+'&set=0',
            message:'Please click the below link to reset the password',
            logo:global.env.ENVIRONMENT_URL+'/images/cardiac-logo.png',
            banner:global.env.ENVIRONMENT_URL+'/images/bg.png',
            name:data.name,
            year:new Date().getFullYear()
        };
        var htmlToSend = template(replacements);

        let info = transporter.sendMail({
                    from: 'No-Reply',//global.env.MAIL_FROM, // sender address
                    to: data.email_address, // list of receivers
                    subject: 'CardiacMD Connect - Invite Link', // Subject line
                    // text: "Hello world?", // plain text body
                    html: htmlToSend // html body
                });

                return info;

    });    
}
sendmail.sendResetLink = (data) => {
console.log('aaaaaa');
console.log(global.env.MAIL_USERNAME);
console.log(global.env.MAIL_PASSWORD);
    let transporter = nodemailer.createTransport({
        host: global.env.MAIL_HOST,
        port: global.env.MAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: global.env.MAIL_USERNAME, // generated ethereal user
            pass: global.env.MAIL_PASSWORD // generated ethereal password
        }
    });
    readHTMLFile(path.resolve()+'/template/resetpassword/resetpassword.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            link: global.env.WEB_URL+"reset-password?code="+data.link+'&set=1',
            message:'Please click the below link to reset the password',
            logo:global.env.ENVIRONMENT_URL+'/images/cardiac-logo.png',
            name:data.name,
            year:new Date().getFullYear()
        };

        console.log(replacements);
        var htmlToSend = template(replacements);

        let info = transporter.sendMail({
                    from: 'No-Reply',//global.env.MAIL_FROM, // sender address
                    to: data.email_address, // list of receivers
                    subject: 'CardiacMD Connect - Reset password Link', // Subject line
                    // text: "Hello world?", // plain text body
                    html: htmlToSend // html body
                });

                return info;

    });

}


module.exports = sendmail;