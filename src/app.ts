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
import parkingRoute from './routes/parkingRoute';
import mylistRoute from './routes/mylistRoute';
import commentRoute from './routes/commentRoute';
import transactionRoute from './routes/transactionRoute';
import notificationRoute from './routes/notificationRoute';
import bodyParser from 'body-parser';

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

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(
    expressSession({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(
  expressSession({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
  })
);
app.use(cors());

app.use(express.json());

app.use('/parking',parkingRoute);
app.use('/user', userRoute);
app.use('/forget', forgetRoute);
app.use('/auth', authRoute);
app.use('/omise', omiseRoute);
app.use('/emails', emailRoute);
app.use('/mylist', mylistRoute);
app.use('/transaction', transactionRoute);
app.use('/comment', commentRoute);
app.use('/notification', notificationRoute);



app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
});

app.listen(port, () => console.log(`Application is running on port ${port}`))
