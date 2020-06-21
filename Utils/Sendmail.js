var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '69bsdk@gmail.com',
        pass: 'fuckingpassword'
    }
});


const sendMailForOtp = (email) => {

    var mailOptions = {
        from: '69bsdk@gmail.com',
        to: email,
        subject: 'Read it out loud mother fuckers',
        text: `surprise mother fuckers`
    };
    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendMailForOtp;