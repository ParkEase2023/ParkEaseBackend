import { Request, Response } from 'express';
import { createWriteStream } from 'fs';
import axios from 'axios';
import { uploadImage } from '../utils/cloudinary';
const Omise = require('omise');
const QRCode = require('qrcode');
const omise = new Omise({
    publicKey: 'pkey_test_5xg1y8vhghfe2gisvjv',
    secretKey: 'skey_test_5xg1au51hinusifooyb',
});
const sharp = require('sharp');
const fs = require('fs');

export const createdPromptPayQRCode = async (req: Request, res: Response) => {
    async function generatePromptPayQRCode(amount: number, phoneNumber: string): Promise<string> {
        try {
            const response = await omise.sources.create({
                type: 'promptpay',
                amount: amount * 100,
                currency: 'THB',
                phone_number: phoneNumber,
            });

            const response2 = await omise.charges.create({
                type: 'promptpay',
                amount: amount * 100,
                currency: 'THB',
                phone_number: phoneNumber,
                source: response.id,
            });

            console.log('Omise API Response2:', response2);

            if (
                response2.source &&
                response2.source.scannable_code &&
                response2.source.scannable_code.image &&
                response2.source.scannable_code.image.download_uri
            ) {
                const qrCodeUrl = response2.source.scannable_code.image.download_uri;
                downloadAndConvertToJpg(qrCodeUrl)

                return qrCodeUrl;
            } else {
                throw new Error('Invalid API response format');
            }
        } catch (error) {
            console.error('Error generating PromptPay QR Code:', error);
            res.status(400).json({ message: 'Error generating PromptPay QR Code' });
            throw error;
        }
    }

    const body = req.body;
    const amount: number = body.amount; 
    const phoneNumber: string = body.phonenumber; 

    generatePromptPayQRCode(amount, phoneNumber)
        .then((qrCodeUrl) => {
            console.log('PromptPay QR Code generated successfully!');
            console.log('QR Code Image URL:', qrCodeUrl);
        })
        .catch((error) => {
            console.error('Failed to generate PromptPay QR Code:', error);
        });

    async function downloadAndConvertToJpg(url: string) {
        try {

            const response = await axios.get(url, { responseType: 'arraybuffer' });

            
            const base64Data = Buffer.from(response.data, 'binary').toString('base64');

        
            const jpgBuffer = await sharp(Buffer.from(base64Data, 'base64'))
                .toFormat('jpg')
                .toBuffer();

            
            const jpgBase64Data = jpgBuffer.toString('base64');
            const dataUri = `data:image/jpeg;base64,${jpgBase64Data}`;
            const { secure_url } = await uploadImage(dataUri);
            console.log(secure_url);
            res.status(200).json({
                message: 'success',
                data: secure_url,
            });
            // Save the JPG base64 data to a file (optional)
            // fs.writeFileSync('output.jpg', jpgBase64Data, 'base64');

            return jpgBase64Data;
        } catch (error: any) {
            console.error('Error:', error.message);
            throw error;
        }
    }


};



export const CheckCharge = async (req: Request, res: Response) => {
    async function searchCharge(chargeId: string): Promise<string> {
        try {
            const charge = await omise.charges.retrieve(chargeId);
            if (charge.source.charge_status == 'successful') {
                console.log('จ่ายเงินสำเร็จ');
            }
            if (charge.source.charge_status == 'pending') {
                console.log('รอดำเนินการ');
            }
            return charge;
        } catch (error) {
            console.error(`Error searching for charge with ID ${chargeId}:`, error);
            throw error;
        }
    }

    // Example usage
    const chargeId: string = 'chrg_test_5y1siis9ptwqcgmvt09'; // Replace this with the actual charge ID you want to search for

    searchCharge(chargeId)
        .then((charge) => {
            console.log('Charge found:');
            console.log(charge);
        })
        .catch((error) => {
            console.error('Failed to search for charge:', error);
        });
};

export const Recipient = async (req: Request, res: Response) => {
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
        .then((recipient) => {
            console.log('Recipient found:');
            console.log(recipient);
        })
        .catch((error) => {
            console.error('Failed to search for recipient:', error);
        });
};

export const Transfers = async (req: Request, res: Response) => {
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
        .then((transfer) => {
            console.log('Money transferred successfully!');
            console.log('Transfer ID:', transfer);
        })
        .catch((error) => {
            console.error('Failed to transfer money:', error);
        });
};

// app.get('/checkAccountBalance', async (req, res) => {
//     async function checkAccountBalance(): Promise<string> {
//       try {
//         const account = await omise.balance.retrieve();
//         return account;
//       } catch (error) {
//         console.error('Error checking account balance:', error);
//         throw error;
//       }
//     }

//     // Example usage
//     checkAccountBalance()
//       .then(account => {
//         console.log('Account balance retrieved successfully!');
//         console.log('Account balance:', account);
//       })
//       .catch(error => {
//         console.error('Failed to check account balance:', error);
//       });
//   });
