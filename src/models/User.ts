import { Document, model, Schema, SchemaOptions } from 'mongoose';

interface IUserDocument extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    hash: string;
    salt: string;
    profile_picture: string;
    phone_number: string;
    member_status: string;
    time:Date;
    coins:number;
    account_linked: boolean;
    bank_number: string;
    bank_name:string;
    history_booking: string;
    verification_status:boolean;
}

const options: SchemaOptions = {
    toJSON: {
        transform(doc, ret) {
            delete ret.hash;
            delete ret.salt;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
    timestamps: true,
};

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
        phone_number: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: '123456',
        },
        hash: {
            type: String,
            require: false,
        },
        salt: {
            type: String,
            require: true,
        },
        profile_picture: {
            type: String,
            default:
                'https://res.cloudinary.com/dqxh7vakw/image/upload/v1703510862/ParkEase/kwyvtkjl0vxwkqsgfhyf.png',
        },
        member_status: {
            type:String,
            default:'user',
        },
        coins: {
            type: Number,
            default:0,
        },
        account_linked: {
            type:Boolean,
            default:false,
        },
        bank_number: {
            type:String,
            require:false,
        },
        history_booking: {
            type:String,
            require:false,
        },
        verification_status:
        {
            type:String,
            default:false,
        }
    },
    options
);

const User = model<IUserDocument>('users', userSchema);

export default User;
