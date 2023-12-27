import { Request, Response } from 'express';
import axios from 'axios';

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