import { Request, Response } from 'express';
import { generateOTP } from '../controllers/otpController';
import { sendEmail } from '../controllers/emailController';

function compareOTP(OTP: string, OTPmail: string): boolean {
    return OTP === OTPmail;
}

export const forgetpassword = (req: Request, res: Response) => {
    const OTP = generateOTP();
    const OTPmail = req.body.OTP;
    sendEmail(OTP);
    if (compareOTP(OTP, OTPmail)) {
      res.status(200).json({
        message: "OTP is correct"
      });
    } else {
      res.status(400).json({
        message: "OTP is incorrect"
      });
    }
}
