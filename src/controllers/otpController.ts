import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import {sendEmail} from './emailController'

// Function to generate a random OTP
export const generateOTP = (): string => {
  const OTP = crypto.randomBytes(3).toString('hex').toUpperCase();
  console.log(OTP);
  sendEmail(OTP)
  
  return crypto.randomBytes(3).toString('hex').toUpperCase();
  
};
