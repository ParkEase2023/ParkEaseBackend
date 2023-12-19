import { Request, Response } from 'express';

export const forgetpassword = async (req: Request, res: Response) => {

    res.json({ message: 'forgetpassword' });

};