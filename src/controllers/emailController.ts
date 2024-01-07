import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { forgetpassword } from './forgetpasswordController'
import { generateOTP } from './otpController';

export const sendEmail = async (req: string) => {
      const OTP = req;
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp-relay.brevo.com',
          port: 587,
          auth: {
            user: "aim5545123@gmail.com",
            pass: "pUwvgQm6YO9yHVkN",
          },
        });
    
        const mailOptions: nodemailer.SendMailOptions = {
          from: 'aim5545123@gmail.com',
          to: 'surawee.kraikruan@gmail.com',
          subject: 'ParkEase test send email',
          text: `Your OTP code is: ${OTP}`,
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
      } catch (error) {
        console.error('Error occurred:', error);
      }
      forgetpassword(OTP);
};

export const sendEmailforfogetpassword = async (req: Request, res: Response) => {
  const OTP = generateOTP();
  const query = req.query
  const email = query.email as string;
  console.log('Email sent:', email);
  try {
    const transporter = nodemailer.createTransport({
      host:'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: "aim5545123@gmail.com",
        pass: "pUwvgQm6YO9yHVkN",
      },
    });
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'aim5545123@gmail.com',
      to: email,
      subject: 'ParkEase test send email',
      text: `Your OTP code for forgot password is: ${OTP}`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({
      message: "send otp to Email succeed",
    });
  }catch (error) {
  console.error('Error occurred:', error);
  }
}  