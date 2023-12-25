// utils/mailSender.js
import nodemailer from 'nodemailer';

export const mailSender = async (email: string, title: string, body: string) => {
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: title,
            text: body,
        });
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

module.exports = mailSender;