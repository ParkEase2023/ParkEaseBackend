import { Request, Response } from 'express';
import User from '../models/User';
import { uploadImage } from '../utils/cloudinary';

export const getProfile = async (req: Request, res: Response) => {
    const uid = req.session.uid;
    console.log(uid);
    const user = await User.findById(uid);
    res.status(200).json({
        message: 'success',
        data: user,
    });
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;
        const { secure_url } = await uploadImage(req.body.profile_picture);
        console.log(secure_url);


        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser && existingUser._id != uid) {
            return res.status(400).json({ 
                errors : [{
                    msg : "The user already exists",
                    param : "email"
                }]
            });
        }

        await User.findByIdAndUpdate(uid, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: req.body.password,
            profile_picture: secure_url,
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


