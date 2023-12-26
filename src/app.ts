// src/app.ts
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import expressSession from 'express-session';
import { connectMongoDB } from './config/mongoDB';
import omiseRoute from './routes/omiseRoute';
import emailRoute from './routes/emailRoute';
import authRoute from './routes/authRoute';
import forgetRoute from './routes/forgetRoute';
import userRoute from './routes/userRoute';



const Omise = require('omise')
const QRCode = require('qrcode')
const app = express()
const omise = new Omise({
  publicKey: "pkey_test_5xg1y8vhghfe2gisvjv",
  secretKey: "skey_test_5xg1au51hinusifooyb",
});
const port = process.env.PORT || 4000;
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env` });
connectMongoDB();

declare module 'express-session' {
  interface SessionData {
      [key: string]: any;
  }
}

app.use(
  expressSession({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
  })
);
app.use(cors());

app.use(express.json());


app.use('/user', userRoute);
app.use('/forget', forgetRoute);
app.use('/auth', authRoute);
app.use('/omise', omiseRoute);
app.use('/emails', emailRoute);



app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
});

app.listen(port, () => console.log(`Application is running on port ${port}`))
