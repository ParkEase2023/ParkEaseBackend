import cron from 'node-cron';
import { Request, Response } from 'express';
import axios from 'axios';
import { cronJobApproveRecipien } from '../controllers/recipienController';

export const cronJobMiddleware = () => {
    cron.schedule('0 * * * *', async () => {
        console.log('Running a task every minute');
        try {
            // Make an HTTP GET request to your controller route
            const response = await axios.get('http://localhost:4000/recipien/getAllRecipien');
            const task = response.data.data
            console.log('HTTP request successful');
            if(task.length > 0){
                cronJobApproveRecipien(task)
            }
        } catch (error) {
            console.error('Error making HTTP request:', error);
        }
    });

    // Schedule a task to run at 2:30 AM every day
    cron.schedule('30 2 * * *', () => {
        console.log('Running a task at 2:30 AM every day');
    });

};