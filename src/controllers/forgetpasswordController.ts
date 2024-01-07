import { Request, Response } from 'express';
import { checkOTPinRedis, generateOTP } from '../controllers/otpController';
import { sendEmail } from '../controllers/emailController';
import User from '../models/User';


export const forgetpassword = async (req: Request, res: Response) => {
  const query = req.query
  const OTP = query.OTP as string;
  try {
    const verifyEmail = await checkOTPinRedis(OTP)
    if(verifyEmail === "setOTPforVerification")
    {
      res.status(200).json({
        message: "OTP correct",
      });
    }
    else
    {
      res.status(400).json({
        errors: [{
          message: "OTP incorrect",
          param: "OTP"
        }]
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

export const checkemail = async (req: Request, res: Response) => {
  console.log('checkemail working!');
  const query = req.query;
  console.log('query: ', query.email);
  try {
    const checkemail = await User.findOne({ email: query.email });
    if (checkemail) {
      res.status(200).json({
        message: "Email has users in the database.",
      });
    } else {
      res.status(400).json({
        errors: [{
          msg: "There is no email in the database.",
          param: "email"
        }]
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}