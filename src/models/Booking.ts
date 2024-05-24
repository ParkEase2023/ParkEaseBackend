import { Document, model, ObjectId, Schema, SchemaOptions } from 'mongoose';

interface IBookingDocument extends Document {
    customerId: ObjectId;
    parking_name: string;
    timestart: string;
    timestop: string;
    ReservedBy: string;
    phoneNumber: string;
    carModel: string;
    carColor: string;
    carRegistration: string;
    totalPrice: number;
    dateStart:Date;
    dateEnd:Date;
}

const options: SchemaOptions = {
    timestamps: true,
};

const BookingSchema = new Schema(
    {
        parking_name: {
            type: String,
            require: true,
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        timestart: {
            type: String,
            require: true,
        },
        timestop: {
            type: String,
            require: true,
        },
        ReservedBy:{
            type: String,
            require: true,
        },
        phoneNumber:{
            type: String,
            require: true,
        },
        carModel:{
            type: String,
            require: true,
        },
        carColor:{
            type: String,
            require: true,
        },
        carRegistration:{
            type: String,
            require: true,
        },
        totalPrice:{
            type: Number,
            require: true,
        },
        dateStart:
        {
            type:Date,
            require:true,
        },
        dateEnd:
        {
            type:Date,
            require:true,
        },




    },
    options
);

const Booking = model<IBookingDocument>('bookings', BookingSchema);

export default Booking;