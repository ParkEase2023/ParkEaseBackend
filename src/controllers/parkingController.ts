import { Request, Response } from 'express';
import axios from 'axios';
import Parking from '../models/Parking';

const apiKey = 'AIzaSyDWq2S-Qh6vwRbYnuvHHEZ4KLG-TsJvDsg'; 
const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=AIzaSyDWq2S-Qh6vwRbYnuvHHEZ4KLG-TsJvDsg';

export const getFormattedAddress = async (req: Request, res: Response) => {
    async function getFormattedAddress(latitude: number, longitude: number): Promise<void> {
    try {
        const response = await axios.get(apiUrl, {
          params: {
            latlng: `${latitude},${longitude}`,
            key: apiKey,
            sensor:true
          },
        });
    
        if (response.data.status === 'OK') {
          const result = response.data.results[0];
          const formattedAddress = result.formatted_address;
          console.log('Formatted Address:', formattedAddress);
           res.status(200).json({
           message: 'Formatted Address:', formattedAddress
            });
        } else {
          console.error('Error fetching address:', response.data.status);
          res.status(400).json({
            message: 'Error fetching address:'
             });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    const latitude = 13.6512522; // Replace with your actual latitude
    const longitude = 100.4938679; // Replace with your actual longitude
    getFormattedAddress(latitude, longitude);
}

export const createParking = async (req: Request, res: Response) => {
  // const { secure_url } = await uploadImage(req.body.toiletpicture);
  // console.log(secure_url);
  console.log('create parking working!');
  const body = req.body;
  try {
      // await Parking.create({
      //     // title: req.body.title,
      //     // latitude: req.body.latitude,
      //     // longitude: req.body.longitude,
      //     // desc: req.body.desc,
      //     // contact: req.body.contact,
      //     // free: req.body.free,
      //     // cost: req.body.cost,
      //     // handicap: req.body.handicap,
      //     // createBy: req.body.createBy,
      //     // type: req.body.type,
      //     // timeOpen: req.body.timeOpen,
      //     // timeClose: req.body.timeClose,
      //     // toiletpicture: secure_url,
      // });
      await Parking.create(body);
      res.status(201).json({
          message: 'created parking By user',
      });
  } catch (error) {
      console.log(error);
      res.status(500);
  }
};

