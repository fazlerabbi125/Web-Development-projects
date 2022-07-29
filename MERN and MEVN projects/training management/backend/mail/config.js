const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


const sendMail = async (mailOptions) => {
    try {
        const mail = await transport.sendMail(mailOptions);
        console.log("Email sent: ", mail.response);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMail;