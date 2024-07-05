const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_EMAIL_PASSWORD
    }
});

exports.sendOtpEmail = (email, otp) => {
    const mailOptions = {
        from: process.env.SERVER_EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };
    return transporter.sendMail(mailOptions);
};
