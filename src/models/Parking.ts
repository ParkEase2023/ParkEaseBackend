import { Document, model, Schema, ObjectId, SchemaOptions } from 'mongoose';

interface ILocationDocument extends Document {
    latitude: number;
    longitude: number;
    title: string;
    phone_number: string;
    cost: number;
    booking: boolean;
    type: string;
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