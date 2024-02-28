import { Request, Response } from 'express';
import User from '../models/User';
import { Transfers } from './omiseController';
import Transfer from '../models/Transfer';


export const addCoins = async (req: Request, res: Response) => {
    try {
        const Email = req.params.email;
        const coins = req.body.coins;
        const addcoins = req.body.addcoins;
        let totalCoins = coins + addcoins;
        await User.findOneAndUpdate({ email: Email }, {
            coins : totalCoins,
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


export const withdrawMoney = async (req: Request, res: Response) => {
    try {
        const Email = req.params.email;
        const coins = req.body.coins;
        const withdrawmoney = req.body.withdrawmoney;
        let totalCoins = coins - withdrawmoney;
        await User.findOneAndUpdate({ email: Email }, {
            coins : totalCoins,
        })
            .then(async (data) => {
                const transfer = await Transfers(withdrawmoney,req.body.recipienId);
                console.log(data);
                res.status(200).json({ data: data ,dataTransfer:transfer});

            })
            .catch((err) => {
                console.log('error', err);
                res.status(500).json({ message: 'server error' });
            });
    } catch (error) {
        console.log('error', error);
    }
    
};

export const createTransfersOnDB = async (req: Request, res: Response) => {
    console.log('createRecipienOnDB work!');
    const body = req.body;
    try {
        await Transfer.create(body);
        res.status(201).json({
            message: 'created',
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};
