import cron from 'node-cron';
import { Request, Response } from 'express';
import axios from 'axios';
import { cronJobApproveRecipien } from '../controllers/recipienController';
import { cronJobApproveTransfers } from '../controllers/transactionController';
import { cronJobMembership } from '../controllers/membershipController';

export const cronJobMiddleware = () => {
    cron.schedule('0 * * * *', async () => {
        try {
            const response = await axios.get('http://localhost:4000/recipien/getAllRecipien');
            const task = response.data.data
            console.log('HTTP request getAllRecipien successful');
            if(task.length > 0){
                cronJobApproveRecipien(task)
            }
        } catch (error) {
            console.error('Error making HTTP request getAllRecipien:', error);
        }
    });

    cron.schedule('* * * * *', async () => {
        try {
            const response = await axios.get('http://localhost:4000/transaction/getAllTransfersOnDB');
            const task = response.data.data
            console.log('HTTP request getAllTransfersOnDB successful');
            if(task.length > 0){
                cronJobApproveTransfers(task)
            }
        } catch (error) {
            console.error('Error making HTTP request getAllTransfersOnDB:', error);
        }
        
    });


    cron.schedule('0 0 * * *', async () => {
        try {
            const response = await axios.get('http://localhost:4000/user/getAllUser');
            const task = response.data.data
            console.log('HTTP request getAllUser successful');
            if(task.length > 0){
                cronJobMembership(task)
            }
        } catch (error) {
            console.error('Error making HTTP request getAllUser:', error);
        }
        
    });


};