import { Request, Response } from 'express';
import User from '../models/User';
import { addMonths, format } from 'date-fns';
import { sendEmailmembership } from './emailController';

export const applyMember = async (req: Request, res: Response) => {
    const today = new Date();
    const coins = req.body.coins;
    const price = req.body.price;
    const nextMonth = addMonths(today, 1);
    let totalCoins = coins - price;
    let Rols = req.body.roles
    Rols = ['user', 'member'];
    try {
        const Email = req.params.email;
        await User.findOneAndUpdate(
            { email: Email },
            {
                coins:totalCoins,
                roles: Rols,
                Exptime:nextMonth,
            }
        )
            .then((data) => {
                console.log(data);
                sendEmailmembership(req.params.email,"member");
                res.status(200).json({ message: 'created', data: data });
            })
            .catch((err) => {
                console.log('error', err);
                res.status(500).json({ message: 'server error' });
            });
    } catch (error) {
        console.log('error', error);
    }
};


export const applyPartner = async (req: Request, res: Response) => {
    const today = new Date();
    const coins = req.body.coins;
    const price = req.body.price;
    const nextMonth = addMonths(today, 1);
    let totalCoins = coins - price;
    let Rols = req.body.roles
    Rols = ['user', 'partner'];
    try {
        const Email = req.params.email;
        await User.findOneAndUpdate(
            { email: Email },
            {
                coins:totalCoins,
                roles: Rols,
                Exptime:nextMonth,
            }
        )
            .then((data) => {
                console.log(data);
                sendEmailmembership(req.params.email,"partner");
                res.status(200).json({ message: 'created', data: data });
            })
            .catch((err) => {
                console.log('error', err);
                res.status(500).json({ message: 'server error' });
            });
    } catch (error) {
        console.log('error', error);
    }
};