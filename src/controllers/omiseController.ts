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

export const createdPromptPayQRCode = async (req: Request, res: Response) => {
    // async function generatePromptPayQRCode(amount: number, phoneNumber: string): Promise<string> {
    //     try {
    //         const response = await omise.sources.create({
    //             type: 'promptpay',
    //             amount: amount * 100, // Amount in Satang (1 Thai Baht = 100 Satang)
    //             currency: 'THB',
    //             phone_number: phoneNumber, // PromptPay phone number
    //         });

    //         const response2 = await omise.charges.create({
    //             type: 'promptpay',
    //             amount: amount * 100, // Amount in Satang (1 Thai Baht = 100 Satang)
    //             currency: 'THB',
    //             phone_number: phoneNumber, // PromptPay phone number
    //             source: response.id,
    //         });

    //         // Log the API response for debugging
    //         // console.log('Omise API Response:', response);
    //         console.log('Omise API Response2:', response2);

    //         if (
    //             response2.source &&
    //             response2.source.scannable_code &&
    //             response2.source.scannable_code.image &&
    //             response2.source.scannable_code.image.download_uri
    //         ) {
    //             const qrCodeUrl = response2.source.scannable_code.image.download_uri;
    //             console.log(response2.source.scannable_code.image.download_uri);
    //             // Generate QR Code image
    //             const qrCodeImage: string = await QRCode.toDataURL(qrCodeUrl);
    //             res.status(200).json({
    //                 message: 'success',
    //                 data: qrCodeImage,
    //             });
    //             return qrCodeImage;
    //         } else {
    //             throw new Error('Invalid API response format');
    //         }
    //     } catch (error) {
    //         console.error('Error generating PromptPay QR Code:', error);
    //         res.status(400).json({ message: 'Error generating PromptPay QR Code' });
    //         throw error;
    //     }
    // }

    // // Example usage
    // const body = req.body;
    // const amount: number = body.amount; // Amount in Thai Baht
    // const phoneNumber: string = body.phonenumber; // PromptPay phone number

    // generatePromptPayQRCode(amount, phoneNumber)
    //     .then((qrCodeImage) => {
    //         console.log('PromptPay QR Code generated successfully!');
    //         console.log('QR Code Image URL:', qrCodeImage);
    //     })
    //     .catch((error) => {
    //         console.error('Failed to generate PromptPay QR Code:', error);
    //     });

    const axios = require('axios');
    const sharp = require('sharp');
    const fs = require('fs');

    async function downloadAndConvertToJpg(url:string) {
        try {
            // Download the SVG file
            const response = await axios.get(url, { responseType: 'arraybuffer' });

            // Convert the SVG file to base64
            const base64Data = Buffer.from(response.data, 'binary').toString('base64');

            // Convert the base64 SVG data to JPG
            const jpgBuffer = await sharp(Buffer.from(base64Data, 'base64'))
                .toFormat('jpg')
                .toBuffer();

            // Convert the JPG buffer to base64
            const jpgBase64Data = jpgBuffer.toString('base64');
            const dataUri = `data:image/jpeg;base64,${jpgBase64Data}`;
            const  {secure_url}  =  await uploadImage(dataUri);
            console.log(secure_url); 
            res.status(200).json({
                message: 'success',
                data: secure_url,
            });
            // Save the JPG base64 data to a file (optional)
            fs.writeFileSync('output.jpg', jpgBase64Data, 'base64');

            return jpgBase64Data;
        } catch (error:any) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    // Example usage
    const url =
        'https://api.omise.co/charges/chrg_test_5yo48yeud2kbp3ze500/documents/docu_test_5yo48ygmypagffsatjo/downloads/5A1FB23047E8EE1E'; // Replace with your desired file URL

    downloadAndConvertToJpg(url)
        .then( (jpgBase64Data) => {
            // Use the jpgBase64Data as needed here
            // console.log(jpgBase64Data);
            
            // const  secure_url  =  uploadImage(jpgBase64Data);
            // console.log(secure_url);
        })
        .catch((error) => {
            // Handle errors
        });
};

// export const createdPromptPayQRCode = async (req: Request, res: Response) => {
//     async function generatePromptPayQRCode(amount: number, phoneNumber: string): Promise<void> {
//         try {
//             const response = await omise.sources.create({
//                 type: 'promptpay',
//                 amount: amount * 100, // Amount in Satang (1 Thai Baht = 100 Satang)
//                 currency: 'THB',
//                 phone_number: phoneNumber, // PromptPay phone number
//             });

//             const response2 = await omise.charges.create({
//                 type: 'promptpay',
//                 amount: amount * 100, // Amount in Satang (1 Thai Baht = 100 Satang)
//                 currency: 'THB',
//                 phone_number: phoneNumber, // PromptPay phone number
//                 source: response.id,
//             });

//             // Log the API response for debugging
//             // console.log('Omise API Response:', response);
//             console.log('Omise API Response2:', response2);

//             if (
//                 response2.source &&
//                 response2.source.scannable_code &&
//                 response2.source.scannable_code.image &&
//                 response2.source.scannable_code.image.download_uri
//             ) {
//                 const qrCodeUrl = response2.source.scannable_code.image.download_uri;

//                 // Download QR Code image
//                 const response = await axios.get(qrCodeUrl, { responseType: 'stream' });
//                 const qrCodeImagePath = 'path/to/save/qr-code.png'; // Change this path as per your requirement
//                 response.data.pipe(createWriteStream(qrCodeImagePath));

//                 res.status(200).sendFile(qrCodeImagePath); // Send the image file as a response
//             } else {
//                 throw new Error('Invalid API response format');
//             }
//         } catch (error) {
//             console.error('Error generating PromptPay QR Code:', error);
//             res.status(400).json({ message: 'Error generating PromptPay QR Code' });
//         }
//     }

//     // Example usage
//     const body = req.body;
//     const amount: number = body.amount; // Amount in Thai Baht
//     const phoneNumber: string = body.phonenumber; // PromptPay phone number

//     generatePromptPayQRCode(amount, phoneNumber)
//         .then(() => {
//             console.log('PromptPay QR Code generated successfully!');
//         })
//         .catch((error) => {
//             console.error('Failed to generate PromptPay QR Code:', error);
//         });
// };

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
