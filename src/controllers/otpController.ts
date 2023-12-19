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

// // Function to send OTP via email
// export const sendOTPByEmail = async (email: string, otp: string): Promise<void> => {
//   // Create a nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'surawee.1399200001403@gmail.com', // Your Gmail email address
//       pass: 'surawee_1808'   // Your Gmail password
//     }
//   });

//   // Email options
//   const mailOptions: nodemailer.SendMailOptions = {
//     from: 'surawee.kraikruan@gmail.com',  // Sender email address
//     to: email,                     // Receiver email address
//     subject: 'Your OTP Code',      // Email subject
//     text: `Your OTP code is: ${otp}` // Email body
//   };

//   // Send email
//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ', info.response);
//   } catch (error) {
//     console.error('Error sending email: ', error);
//   }
// };

// // Example usage
// export const userEmail: string = 'surawee.kraikruan@gmail.com';
// export const generatedOTP: string = generateOTP();

// sendOTPByEmail(userEmail, generatedOTP);

// export default sendOTPByEmail;