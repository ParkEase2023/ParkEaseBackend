import { Request, Response } from 'express';
import User from '../models/User';
import { uploadImage } from '../utils/cloudinary';
import bcrypt from 'bcrypt';

const genrateSalt = async () => {
    return await bcrypt.genSalt();
};

const generatePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};

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
                errors: [
                    {
                        msg: 'The user already exists',
                        param: 'email',
                    },
                ],
            });
        }
        const salt = await genrateSalt();
        const hash = await generatePassword(req.body.password, salt);

        await User.findByIdAndUpdate(uid, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: req.body.password,
            profile_picture: secure_url,
            salt: salt,
            hash: hash,
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
export const verifyYourIdentity = async (req: Request, res: Response) => {
    try {
        const Email = req.params.email;
        await User.findOneAndUpdate(
            { email: Email },
            {
                verification_status: true,
            }
        )
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

export const accountLinked = async (req: Request, res: Response) => {
    try {
        const Email = req.params.email;
        await User.findOneAndUpdate({ email: Email },
            {
                account_linked: true,
            }
        ).then((data) => {
                console.log(data);
                res.status(200).json({ message:"created",data: data });
            })
            .catch((err) => {
                console.log('error', err);
                res.status(500).json({ message: 'server error' });
            });
    } catch (error) {
        console.log('error', error);
    }
};


export const destroyAccountLinked = async (UserId:string) => {
    try {
        await User.findOneAndUpdate({ _id: UserId },
            {
                account_linked: false,
            }
        )
        console.log('destroyAccountLinked success');
    } catch (error) {
        console.log('error', error);
    }
};


export const getAllUser = async (req: Request, res: Response) => {

    console.log('getAllUser working!');
  
  
    const data = await User.find();
    res.status(200).json({
      message: 'success',
      data: data,
    });
  
  };