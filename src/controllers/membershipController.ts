import { Request, Response } from 'express';
import User from '../models/User';
import { addMonths, format } from 'date-fns';
import { sendEmailCancelmembership, sendEmaildestroymembership, sendEmailmembership } from './emailController';

export const applyMember = async (req: Request, res: Response) => {
    const today = new Date();
    const coins = req.body.coins;
    const price = req.body.price;
    const nextMonth = addMonths(today, 1);
    let totalCoins = coins - price;
    let Rols = req.body.roles;
    Rols = ['user', 'member'];
    try {
        const Email = req.params.email;
        await User.findOneAndUpdate(
            { email: Email },
            {
                coins: totalCoins,
                roles: Rols,
                Exptime: nextMonth,
            }
        )
            .then((data) => {
                console.log(data);
                sendEmailmembership(req.params.email, 'member');
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
    let Rols = req.body.roles;
    Rols = ['user', 'partner'];
    try {
        const Email = req.params.email;
        await User.findOneAndUpdate(
            { email: Email },
            {
                coins: totalCoins,
                roles: Rols,
                Exptime: nextMonth,
            }
        )
            .then((data) => {
                console.log(data);
                sendEmailmembership(req.params.email, 'partner');
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

export const cancelMembership = async (req: Request, res: Response) => {
    const today = new Date();
    let Rols = ['user'];
    try {
        const Email = req.params.email;
        await User.findOneAndUpdate(
            { email: Email },
            {
                roles: Rols,
                Exptime: today,
            }
        )
            .then((data) => {
                console.log(data);
                sendEmailCancelmembership(req.params.email);
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

export const cronJobMembership = async (req: any) => {
    const today = new Date();
    console.log('cronJobMembership working!');
    const body = req;
    body.map((item: any) => {
        const date = new Date(item.Exptime);
        if (date < today) {
            cronJobapplyMembership(item.coins, item.roles, item.email);
        }
    });
};

export const cronJobapplyMembership = async (coins: number, Rols: any, email: string) => {
    if (Rols[1] === 'partner') {
        applyPartnerCronjob(coins,email);
    } else if (Rols[1] === 'member') {
        applyMemberCronjob(coins,email);
    }
};

export const applyPartnerCronjob = async (coins: number, email: string) => {
    const today = new Date();
    const nextMonth = addMonths(today, 1);
    let Rols = ['user', 'partner'];

    if (coins >= 99) {
        let totalCoins = coins - 99;
        try {
            const Email = email;
            await User.findOneAndUpdate(
                { email: Email },
                {
                    coins: totalCoins,
                    roles: Rols,
                    Exptime: nextMonth,
                }
            )
                .then((data) => {
                    console.log(data);
                    sendEmailmembership(email, 'partner');
                })
                .catch((err) => {
                    console.log('error', err);
                });
        } catch (error) {
            console.log('error', error);
        }
    } else {
        destroyMemberCronjob(email);
    }
};

export const applyMemberCronjob = async (coins: number, email: string) => {
    const today = new Date();
    const nextMonth = addMonths(today, 1);
    let Rols = ['user', 'member'];

    if (coins >= 49) {
        let totalCoins = coins - 49;
        try {
            const Email = email;
            await User.findOneAndUpdate(
                { email: Email },
                {
                    coins: totalCoins,
                    roles: Rols,
                    Exptime: nextMonth,
                }
            )
                .then((data) => {
                    console.log(data);
                    sendEmailmembership(email, 'member');
                })
                .catch((err) => {
                    console.log('error', err);
                });
        } catch (error) {
            console.log('error', error);
        }
    } else {
        destroyMemberCronjob(email);
    }
};


export const destroyMemberCronjob = async (email: string) => {
    let Rols = ['user'];
    try {
        const Email = email;
        await User.findOneAndUpdate(
            { email: Email },
            {
                roles: Rols,
            }
        )
            .then((data) => {
                console.log(data);
                sendEmaildestroymembership(email);
            })
            .catch((err) => {
                console.log('error', err);
            });
    } catch (error) {
        console.log('error', error);
    }
};
