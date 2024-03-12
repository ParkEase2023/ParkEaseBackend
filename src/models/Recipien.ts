import { Document, model, ObjectId, Schema, SchemaOptions } from 'mongoose';

interface IRecipienDocument extends Document {
    userId: ObjectId;
    recipienId: string;
    approve_status: boolean;
    firstname: string;
    lastname: string;
    email: string;
    taxId: string;
    bank: string;
    accountname: string;
    accountnumber:string;
}

const options: SchemaOptions = {
    timestamps: true,
};

const RecipienSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        recipienId: {
            type: String,
            require: true,
        },
        approve_status: {
            type: Boolean,
            require: true,
            default: false,
        },
        firstname: {
            type: String,
            require: true,
        },
        lastname:{
            type: String,
            require: true,
        },
        email:{
            type:String,
            require: true,
        },
        taxId: {
            type:String,
            require:true,
        },
        bank: {
            type:String,
            require:true,
        },
        accountname: {
            type:String,
            require:true,
        },
        accountnumber: {
            type:String,
            require:true,
        }
    },
    options
);

const Recipien = model<IRecipienDocument>('recipiens', RecipienSchema);

export default Recipien;