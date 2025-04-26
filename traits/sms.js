// let secureEnv = require('secure-env');
// global.env = secureEnv({secret:'2188ed5ad3ee7a9106b5c5a8d8533b3699285c48f758613d22408440d28fab24'});
// let accountSid;
// let authToken;
// let from;
// if(global.env.TWILIO_SECURE == 'sandbox'){
//     accountSid = global.env.TWILIO_SANDBOX_API_KEY;
//     authToken = global.env.TWILIO_SANDBOX_SECRET_KEY;
//     from = global.env.TWILIO_SANDBOX_FROM;
// }else{
//     accountSid = global.env.TWILIO_LIVE_API_KEY;
//     authToken = global.env.TWILIO_LIVE_SECRET_KEY;
//     from = global.env.TWILIO_LIVE_FROM;
// }
// /* const accountSid = 'AC46b59682df434c34297e44c0fe6b0bee';
// const authToken = '1f3db9d27f745d58e52cd087555759d8'; */
// const client = require('twilio')(accountSid, authToken);


// // constructor
// const twillio = function() {

// };


// twillio.sendsms = (data) => {

// console.log(data);
//     client.messages
//         .create({
//             body: data.message,
//             from: from,
//             to: data.mobile_number
//         })
//         .catch(
//             err => {
//                 console.log(err);
//             }
//         ).then(message => console.log(message));
// }


// module.exports = twillio;