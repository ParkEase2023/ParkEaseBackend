import { Request, Response } from 'express';
import { checkOTPinRedis, generateOTP } from '../controllers/otpController';
import { sendEmail } from '../controllers/emailController';
import User from '../models/User';
import bcrypt from 'bcrypt';


const genrateSalt = async () => {
  return await bcrypt.genSalt();
};

const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const checkeOTP = async (req: Request, res: Response) => {
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

export const forgetpassword = async (req: Request, res: Response) => {
  try {
      const Email = req.params.email;
      const salt = await genrateSalt();
      const hash = await generatePassword(req.body.password, salt);
      await User.findOneAndUpdate({ email: Email }, {
          password: req.body.password,
          salt:salt,
          hash:hash
      })
          .then((data) => {
              console.log(data);
              res.status(200).json({ data: data });
          })
          .catch((err) => {
              console.log('error', err);
              res.status(500).json({ message: 'server error' });
          });
  } catch (error) {
      console.log('error', error);
  }
 
};

export const checkemail = async (req: Request, res: Response) => {
  // console.log('checkemail working!');
  // const query = req.query;
  // const email = query.email || ""
  // console.log('query: ', query.email);
  // try {
  //   const checkemail = await User.findOne({ email: email });
  //   if (checkemail) {
  //     res.status(200).json({
  //       message: "Email has users in the database.",
  //     });
  //   } else {
  //     res.status(400).json({
  //       errors: [{
  //         msg: "There is no email in the database.",
  //         param: "email"
  //       }]
  //     });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.status(500);
  // }
}