// src/app.ts
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import { connectMongoDB } from '../config/mongoDB';
import nodemailer from 'nodemailer';
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






app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
})

app.get('/created', async (req, res) => {
  async function generatePromptPayQRCode(amount: number, phoneNumber: string): Promise<string> {
    try {
      const response = await omise.sources.create({
        type: 'promptpay',
        amount: amount * 100, // Amount in Satang (1 Thai Baht = 100 Satang)
        currency: "THB",
        phone_number: phoneNumber, // PromptPay phone number
      });

      const response2 = await omise.charges.create({
        type: 'promptpay',
        amount: amount * 100, // Amount in Satang (1 Thai Baht = 100 Satang)
        currency: "THB",
        phone_number: phoneNumber, // PromptPay phone number
        source:response.id
      });
  
      // Log the API response for debugging
      // console.log('Omise API Response:', response);
      console.log('Omise API Response2:', response2)
  
      if (response2.source && response2.source.scannable_code && response2.source.scannable_code.image && response2.source.scannable_code.image.download_uri) {
        const qrCodeUrl = response2.source.scannable_code.image.download_uri;
        console.log(response2.source.scannable_code.image.download_uri)
        // Generate QR Code image
        const qrCodeImage: string = await QRCode.toDataURL(qrCodeUrl);
        return qrCodeImage;
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error generating PromptPay QR Code:', error);
      throw error;
    }
  }
  
  // Example usage
  const amount: number = 100; // Amount in Thai Baht
  const phoneNumber: string = '0812345678'; // PromptPay phone number
  
  generatePromptPayQRCode(amount, phoneNumber)
    .then(qrCodeImage => {
      console.log('PromptPay QR Code generated successfully!');
      console.log('QR Code Image URL:', qrCodeImage);
    })
    .catch(error => {
      console.error('Failed to generate PromptPay QR Code:', error);
    });
});

app.get('/searchCharge', async (req, res) => {
  async function searchCharge(chargeId: string): Promise<string> {
    try {
      const charge = await omise.charges.retrieve(chargeId);
      if (charge.source.charge_status == 'successful'){
          console.log("จ่ายเงินสำเร็จ")
      }
      if (charge.source.charge_status == 'pending'){
        console.log("รอดำเนินการ")
      }
      return charge;
    } catch (error) {
      console.error(`Error searching for charge with ID ${chargeId}:`, error);
      throw error;
    }
  }
  
  // Example usage
  const chargeId: string = 'chrg_test_5xhku3dbjyv862khvl9'; // Replace this with the actual charge ID you want to search for
  
  searchCharge(chargeId)
    .then(charge => {
      console.log('Charge found:');
      console.log(charge);
    })
    .catch(error => {
      console.error('Failed to search for charge:', error);
    });
});

app.get('/recipients', async (req, res) => {
  async function searchRecipient(recipientId: string): Promise<string> {
    try {
      const recipient = await omise.recipients.retrieve(recipientId);
      return recipient;
    } catch (error) {
      console.error(`Error searching for recipient with ID ${recipientId}:`, error);
      throw error;
    }
  }
  
  // Example usage
  const recipientId: string = 'recp_test_5xhkxsbcymwv1vsrogx'; // Replace this with the actual recipient ID you want to search for
  
  searchRecipient(recipientId)
    .then(recipient => {
      console.log('Recipient found:');
      console.log(recipient);
    })
    .catch(error => {
      console.error('Failed to search for recipient:', error);
    });
});

app.get('/transfers', async (req, res) => {
  async function transferMoney(amount: number, recipientId: string): Promise<string> {
    try {
      const transfer = await omise.transfers.create({
        amount: amount * 100, // Amount in Satang (1 Thai Baht = 100 Satang)
        recipient: recipientId, // Recipient ID to transfer money to
      });
  
      return transfer;
    } catch (error) {
      console.error('Error transferring money:', error);
      throw error;
    }
  }
  
  // Example usage
  const amount: number = 59; // Amount in Thai Baht
  const recipientId: string = 'recp_test_5xhkxsbcymwv1vsrogx'; // Recipient ID to transfer money to
  
  transferMoney(amount, recipientId)
    .then(transfer => {
      console.log('Money transferred successfully!');
      console.log('Transfer ID:', transfer);
    })
    .catch(error => {
      console.error('Failed to transfer money:', error);
    });
  
});

app.get('/checkAccountBalance', async (req, res) => {
  async function checkAccountBalance(): Promise<string> {
    try {
      const account = await omise.balance.retrieve();
      return account;
    } catch (error) {
      console.error('Error checking account balance:', error);
      throw error;
    }
  }
  
  // Example usage
  checkAccountBalance()
    .then(account => {
      console.log('Account balance retrieved successfully!');
      console.log('Account balance:', account);
    })
    .catch(error => {
      console.error('Failed to check account balance:', error);
    });
});

app.get('/sendEmail', async (req, res) => {
  async function sendEmail() {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
          user: "aim5545123@gmail.com",
          pass: "pUwvgQm6YO9yHVkN",
        },
      });
  
      const mailOptions: nodemailer.SendMailOptions = {
        from: 'aim5545123@gmail.com',
        to: 'palita.sim@gmail.com',
        subject: 'ParkEase test send email',
        text: 'kuy pat 5555555',
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
  
  sendEmail();
  
  
  
  
  
  
});





app.listen(port, () => console.log(`Application is running on port ${port}`))
