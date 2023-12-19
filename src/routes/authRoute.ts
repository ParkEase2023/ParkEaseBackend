import express from 'express';
import { generateOTP } from '../controllers/otpController';

const app = express();

// app.post('/sendOTP', (req, res) => {
//   sendOTPByEmail(req.body.email, req.body.otp);
//   res.send('OTP sent');
// });

const router = express.Router();

router.get('/generateOTP', generateOTP);
// router.get('/sendOPT', async (req, res) => {
//     const email = "surawee.1399200001403@gmail.com";
//     const otp = '123446';
//     await sendOTPByEmail(email, otp);
//     res.send(otp);

// }).post('/sendOPT', async (req, res) => {
//     const email ="surawee.1399200001403@gmail.com";
//     const otp = '123446';
//     await sendOTPByEmail(email, otp);
//     res.send(otp);


// }).delete('/sendOPT', async (req,
//     res) => {
//     const email = "surawee.1399200001403@gmail.com";
//     const otp = '123446';
//     await sendOTPByEmail(email, otp);
//     res.send(otp);
// });

export default router;