import { Document, model, ObjectId, Schema, SchemaOptions } from 'mongoose';

interface ICommentDocument extends Document {
    parkingId: ObjectId;
    createBy: ObjectId;
    comment: string;
    rate: number;
    report_count: number;
}

const options: SchemaOptions = {
    timestamps: true,
};

const CommentSchema = new Schema(
    {
        createBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        parkingId: {
            type: Schema.Types.ObjectId,
            ref: 'Parking',
            require: true,
        },
        comment: {
            type: String,
            require: true,
        },
        rate: {
            type: Number,
            require: true,
        },
        report_count:{
            type: Number,
            default: 0,
            require: false,
        }
    },
    options
);

const Comment = model<ICommentDocument>('comments', CommentSchema);

export default Comment;
