import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const genrateSalt = async () => {
    return await bcrypt.genSalt();
};

const generatePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};

export const signup = async (req: Request, res: Response) => {
    console.log('create user working!');
    const body = req.body;
    console.log(body);

    try {
        const salt = await genrateSalt();
        const hash = await generatePassword(body.password, salt);

        body.hash = hash;
        body.salt = salt;

        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'The user already exists',
                        param: 'email',
                    },
                ],
            });
        }

        const user = await User.create(body);
        const tokenData = { uid: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });

        res.status(201).json({ message: 'created', token: token });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};