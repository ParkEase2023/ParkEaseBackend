import { Request, Response } from 'express';
import { generateOTP } from '../controllers/otpController';
import { sendEmail } from '../controllers/emailController';

// function compareOTP(OTP: string, OTPmail: string): boolean {
//     return OTP === OTPmail;
// }

export const forgetpassword = async (req: any) => {
    const OTP = req
    const OTPmail = req;
    if (OTP == OTPmail) {
      // res.status(200).json({
      //   message: "OTP is correct"
      // });
      console.log("OTP is correct");
    } else {
      // res.status(400).json({
      //   message: "OTP is incorrect"
      // });
      console.log("OTP is incorrect");
    }
}
