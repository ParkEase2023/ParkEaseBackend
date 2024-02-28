import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { generateOTP, setOTPtoRedis } from './otpController';

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
          to: '191144zs456zs@gmail.com',
          subject: 'ParkEase test send email',
          // text: `Your OTP code is: ${OTP}`,
          text: ``,
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
      } catch (error) {
        console.error('Error occurred:', error);
      }
};

export const sendEmailforfogetpassword = async (req: Request, res: Response) => {
  const OTP = generateOTP();
  await setOTPtoRedis(OTP)
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

const getCurrentDateTime = () => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const currentDateTime = new Date().toLocaleString('en-GB', options);
  return currentDateTime;
};


export const sendEmailNoti = async (req: Request, res: Response) => {
  const email = req.body.email;
  const text = req.body.text;
  const Date = getCurrentDateTime();
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
      to: email,
      subject: 'ParkEase test send email',
      text: text+Date,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({
      message: "send  Email succeed",
    });
  } catch (error) {
    console.error('Error occurred:', error);
  }
};


export const sendEmailApproveRecipien = async (email: string) => {
  const Date = getCurrentDateTime();
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
      to: email,
      subject: 'ParkEase test send email',
      text: `Dear Parkease users, the bank account you have linked with the application has been approved at`+ Date,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

export const sendEmailApproveTransfers = async (email: string,amount:number) => {
  const Date = getCurrentDateTime();
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
      to: email,
      subject: 'ParkEase test send email',
      text: `Dear Parkease users, You have withdrawn an amount ${amount} THB has been approved at`+ Date,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};