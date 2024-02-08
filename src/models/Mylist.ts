import { Document, model, Schema, ObjectId, SchemaOptions } from 'mongoose';

interface IMylistDocument extends Document {
    parkingId: ObjectId;
    userId: ObjectId;
}

const options: SchemaOptions = {
    toJSON: {
        transform(doc, ret) {
            // delete ret._id;
            // delete ret.password;
            // delete ret.salt;
            // delete ret.createAt;
            // delete ret.updateAt;
        },
    },
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