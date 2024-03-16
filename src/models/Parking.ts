import { Document, model, Schema, ObjectId, SchemaOptions } from 'mongoose';

interface IParkingDocument extends Document {
    latitude: number;
    longitude: number;
    title: string;
    phone_number: string;
    price: number;
    booking: boolean;
    type: string;
    opening_status:boolean
    timeOpen: string;
    timeClose: string;
    createBy: ObjectId;
    providerBy: string;
    location_address: string;
    parking_picture1: string;
    parking_picture2: string;
    parking_picture3: string;
    opening_mo: boolean;
    opening_tu: boolean;
    opening_we: boolean;
    opening_th: boolean;
    opening_fr: boolean;
    opening_sa: boolean;
    opening_su: boolean;
}

const options: SchemaOptions = {
    timestamps: true,
};

const ParkingSchema = new Schema(
    {
        latitude: {
            type: Number,
            require: true,
        },
        longitude: {
            type: Number,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        phone_number: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        booking: {
            type: Boolean,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        opening_status: {
            type: Boolean,
            require: true,
        },
        timeOpen: {
            type: String,
            require: true,
        },
        timeClose: {
            type:String,
            require: true,
        },
        createBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        providerBy: {
            type:String,
            require: true,
        },
        location_address: {
            type:String,
            require:false,
        },
        parking_picture1: {
            type:String,
            require:false,
        },
        parking_picture2: {
            type:String,
            require:false,
        },
        parking_picture3: {
            type:String,
            require:false,
        },
        opening_mo: {
            type:Boolean,
            require:false,
        },
        opening_tu: {
            type:Boolean,
            require:false,
        },
        opening_we: {
            type:Boolean,
            require:false,
        },
        opening_th: {
            type:Boolean,
            require:false,
        },
        opening_fr: {
            type:Boolean,
            require:false,
        },
        opening_sa: {
            type:Boolean,
            require:false,
        },
        opening_su: {
            type:Boolean,
            require:false,
        },
    },
    options
);

const Parking = model<IParkingDocument>('parkings', ParkingSchema);

export default Parking;