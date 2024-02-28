import { Document, model, ObjectId, Schema, SchemaOptions } from 'mongoose';

interface ITransferDocument extends Document {
    transferId: string;
    amount: number;
    email: string;
}

const options: SchemaOptions = {
    timestamps: true,
};


const TransferSchema = new Schema(
    {
        transferId: {
            type: String,
            require: true,
        },
        amount: {
            type: Number,
            require: true,
        },
        email: {
            type: String,
            require: true,
        }
    },
    options
);

const Transfer = model<ITransferDocument>('transfers', TransferSchema);

export default Transfer;