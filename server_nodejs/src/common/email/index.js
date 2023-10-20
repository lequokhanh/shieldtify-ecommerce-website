require('dotenv').config();
const nodemailer = require('nodemailer');
const { AppError } = require('../errors/AppError');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});

sendMailForCreatePassword = async (recipient, token) => {
    try {
        const mainOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: recipient,
            subject: 'Shieldtify - Create Password',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
Please click on the following link, or paste this into your browser to complete the process:${
                process.env.REDIRECT_CREATE_PASSWORD_URL
                    ? process.env.REDIRECT_CREATE_PASSWORD_URL
                    : 'localhost:3000'
            }/${token}
If you did not request this, please ignore this email and your password will remain unchanged.
            `,
        };
        await transporter.sendMail(mainOptions);
    } catch (error) {
        throw new AppError(500, error.message);
    }
};

module.exports = {
    sendMailForCreatePassword,
};
