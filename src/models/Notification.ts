import { Document, model, Schema, ObjectId, SchemaOptions } from 'mongoose';

interface INotificationDocument extends Document {
    userId: ObjectId;
    Parking_ownerId: ObjectId;
    Topic: string;
    Booking: boolean;
    From: string;
    To: string;
    Coins: number;
}

const options: SchemaOptions = {
    timestamps: true,
};

const NotificationSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            require: true,
        },
        Parking_ownerId: {
            type: Schema.Types.ObjectId,
            require: false,
        },
        Topic: {
            type: String,
            require: true,
        },
        Booking: {
            type: Boolean,
            require: true,
        },
        From: {
            type: String,
            require: false,
        },
        To: {
            type: String,
            require: false,
        },
        Parking_name: {
            type: String,
            require: false,
        },
        Coins: {
            type: Number,
            require: true,
        },
    },
    options
);



const Notification = model<INotificationDocument>('notification', NotificationSchema);

export default Notification;


