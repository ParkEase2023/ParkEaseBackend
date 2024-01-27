import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import {sendEmail} from './emailController'
import { redis } from '../config/redisInstant';

// Function to generate a random OTP
export const generateOTP = (): string => {
  const OTP = crypto.randomBytes(3).toString('hex').toUpperCase();
  // console.log(OTP);
  return OTP
  
};



export const setOTPtoRedis = async (OTP: string) => {

    const SetOTP = OTP
    await redis.setEx(SetOTP,180,"setOTPforVerification")
}


export const checkOTPinRedis = async (OTP: string) => {

  const checkOTP = OTP
  const res = await redis.get(checkOTP)
  return res
}