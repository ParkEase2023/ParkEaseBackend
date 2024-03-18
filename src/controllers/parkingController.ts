import { Request, Response } from 'express';
import axios from 'axios';
import Parking from '../models/Parking';
import { uploadImage } from '../utils/cloudinary';
import mongoose from 'mongoose';

const apiKey = 'AIzaSyDWq2S-Qh6vwRbYnuvHHEZ4KLG-TsJvDsg';
const apiUrl =
    'https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=AIzaSyDWq2S-Qh6vwRbYnuvHHEZ4KLG-TsJvDsg';

export const getFormattedAddress = async (req: Request, res: Response) => {
    async function getFormattedAddress(latitude: number, longitude: number): Promise<void> {
        try {
            const response = await axios.get(apiUrl, {
                params: {
                    latlng: `${latitude},${longitude}`,
                    key: apiKey,
                    sensor: true,
                },
            });

            if (response.data.status === 'OK') {
                const result = response.data.results[0];
                const formattedAddress = result.formatted_address;
                console.log('Formatted Address:', formattedAddress);
                res.status(200).json({
                    message: 'Formatted Address:',
                    formattedAddress,
                });
            } else {
                console.error('Error fetching address:', response.data.status);
                res.status(400).json({
                    message: 'Error fetching address:',
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const latitude = 13.6512522; // Replace with your actual latitude
    const longitude = 100.4938679; // Replace with your actual longitude
    getFormattedAddress(latitude, longitude);
};

export const createParking = async (req: Request, res: Response) => {
    let picture = [req.body.parking_picture1, req.body.parking_picture2, req.body.parking_picture3];
    let parking_picture: string[] = [];
    for (let i = 0; i < 3; i++) {
        const { secure_url } = await uploadImage(picture[i]);
        parking_picture.push(secure_url);
    }
    console.log('create parking working!');
    const body = req.body;
    try {
        await Parking.create({
            createBy: req.body.id,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            title: req.body.title,
            phone_number: req.body.phone,
            price: req.body.price,
            booking: req.body.booking,
            type: req.body.type,
            opening_status: req.body.opening_status,
            timeOpen: req.body.timeOpen,
            timeClose: req.body.timeClose,
            providerBy: req.body.providerBy,
            location_address: req.body.location_address,
            parking_picture1: parking_picture[0],
            parking_picture2: parking_picture[1],
            parking_picture3: parking_picture[2],
            opening_mo: req.body.opening_mo,
            opening_tu: req.body.opening_tu,
            opening_we: req.body.opening_we,
            opening_th: req.body.opening_th,
            opening_fr: req.body.opening_fr,
            opening_sa: req.body.opening_sa,
            opening_su: req.body.opening_su,
        });
        res.status(201).json({
            message: 'created parking By user',
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

export const getAllParking = async (req: Request, res: Response) => {
    console.log('getAllParking working!');

    const data = await Parking.find();
    res.status(200).json({
        message: 'success',
        data: data,
    });
};

export const getMyparking = async (req: Request, res: Response) => {
    console.log('getMyparking work!');
    const query = req.query;
    console.log('getMyparking: ', query.createBy);
    const regexQuery = query.createBy;
    console.log(regexQuery);
    try {
        if (query.createBy !== '') {
            const regexQuery = query.createBy;
            if (regexQuery) {
                console.log(regexQuery);
                const dataMyparking: any = await Parking.aggregate([
                    { $match: { createBy: new mongoose.Types.ObjectId(regexQuery.toString()) } },
                    { $sort: { createdAt: -1 } },
                ]);
                if (dataMyparking.length > 0) {
                    res.status(200).json({
                        message: 'success',
                        Myparking: dataMyparking,
                    });
                    console.log(dataMyparking);
                } else {
                    console.log('No data');
                    res.status(400).json({ message: 'No results found' });
                }
            } else {
                console.log('regexQuery is undefined');
                res.status(400).json({ message: 'Invalid query' });
            }
        } else {
            console.log('No search');
            res.status(400).json({ message: 'Please enter place name' });
        }
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};

export const deleteMyParking = async (req: Request, res: Response) => {
    console.log(req.query._id);
    await Parking.findByIdAndDelete(req.query._id)
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((err) => {
            console.log('error', err);
        });
};

export const updateParking = async (req: Request, res: Response) => {
    console.log('updateParking work!');

    try {
        let picture = [
            req.body.parking_picture1,
            req.body.parking_picture2,
            req.body.parking_picture3,
        ];
        let parking_picture: string[] = [];
        for (let i = 0; i < 3; i++) {
            const { secure_url } = await uploadImage(picture[i]);
            parking_picture.push(secure_url);
        }

        await Parking.findByIdAndUpdate(req.body._id, {
            title: req.body.title,
            contact: req.body.contact,
            cost: req.body.cost,
            handicap: req.body.handicap,
            type: req.body.type,
            timeOpen: req.body.timeOpen,
            timeClose: req.body.timeClose,
            // toiletpicture: secure_url,
        })

            .then((data) => {
                console.log(data);
                res.status(200).json({ data: data });
            })
            .catch((err) => {
                console.log('error', err);
                res.status(500).json({ message: 'server error' });
            });
    } catch (error) {
        console.log('error', error);
    }
};
