import { Document, model, Schema, ObjectId, SchemaOptions } from 'mongoose';

interface IMylistDocument extends Document {
    parkingId: ObjectId;
    userId: ObjectId;
}

const options: SchemaOptions = {
    timestamps: true,
};

const MylistSchema = new Schema(
    {
        parkingId: {
            type: Schema.Types.ObjectId,
            ref: 'Parking',
            require: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        }
    },
    options
);

const Mylist = model<IMylistDocument>('mylist', MylistSchema);

export default Mylist;