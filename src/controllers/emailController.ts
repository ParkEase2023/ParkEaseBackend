import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendEmail = async (req: Request, res: Response) => {
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
          to: 'palita.sim@gmail.com',
          subject: 'ParkEase test send email',
          text: 'kuy pat 5555555',
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
      } catch (error) {
        console.error('Error occurred:', error);
      }
    
    
}
    
    
    
    
  