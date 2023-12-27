import { Request, Response } from 'express';
import { generateOTP } from '../controllers/otpController';
import { sendEmail } from '../controllers/emailController';


export const forgetpassword = async (req: any) => {
    const OTP = req
    const OTPmail = req;
    if (OTP == OTPmail) {
      console.log("OTP is correct");
    } else {
      console.log("OTP is incorrect");
    }
}
