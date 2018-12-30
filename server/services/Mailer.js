const nodemailer = require('nodemailer');
const keys = require('../../config/keys');

async function sendMail(recipients, subject, content) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: keys.smtpEmail,
            pass: keys.smtpPassword
        }
    });

    let mailArray = recipients.split(',');
    for(let i=0; i<mailArray.length; i++) {
        const mailOptions = {
            from: keys.smtpSender, // sender address
            to: mailArray[i],
            subject: subject,
            html: content
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(`Mail Can't Send: `, err.message);
            } else {
                console.log('Message sent successfully!', info.accepted);
                transporter.close();
            }
        });
    }
}

 module.exports = sendMail;

 // just for test
// const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
// let recipients = 'test@test.com, test2@test.com'; 
// let subject = 'my subject';
// let content = surveyTemplate({
//     body: 'this is body message...'
// })
// sendMail(recipients, subject, content); 