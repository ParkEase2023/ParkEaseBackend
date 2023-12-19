// src/app.ts
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import { connectMongoDB } from './config/mongoDB';
import omiseRoute from './routes/omiseRoute';
import emailRoute from './routes/emailRoute';
import authRoute from './routes/authRoute';

const Omise = require('omise')
const QRCode = require('qrcode')
const app: Express = express()
const omise = new Omise({
  publicKey: "pkey_test_5xg1y8vhghfe2gisvjv",
  secretKey: "skey_test_5xg1au51hinusifooyb",
});
const port = process.env.PORT || 4000;
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env` });
connectMongoDB();


app.use('/auth', authRoute);
app.use('/omise', omiseRoute);
app.use('/emails', emailRoute);



app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
})






app.listen(port, () => console.log(`Application is running on port ${port}`))
