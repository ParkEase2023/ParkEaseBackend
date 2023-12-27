import { Request, Response } from 'express';
import User from '../models/User';

export const getProfile = async (req: Request, res: Response) => {
    const uid = req.session.uid;
    console.log(uid);
    const user = await User.findById(uid);
    res.status(200).json({
        message: 'success',
        data: user,
    });
};