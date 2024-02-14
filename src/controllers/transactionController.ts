import { Request, Response } from 'express';
import User from '../models/User';


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