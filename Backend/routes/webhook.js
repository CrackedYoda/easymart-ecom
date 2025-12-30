import express from 'express';
import { verifySignature, verifyTimeStamp } from '../services/eventService.js';
import { events } from '../shared/events';

const router = express.Router();

router.post('/webhook', (req, res) => {
   const receivedSignature = req.headers['x-webhook-signature'];
   const rawBody = req.rawBody;
   const timeStamp = req.headers['x-webhook-timestamp'];

   try{
if(!verifySignature(rawBody,receivedSignature))
    return res.status(401).send('Invalid signature');
if(!verifyTimeStamp(timeStamp))
    return res.status(401).send('Invalid timestamp');

const event = req.body.event;
const user = req.body.data;
switch(event){
    case events.USER_LOGGED_IN:
        // Handle logic here
        break;
   } 
   res.status(200).send({ received: true });
   }
   catch(err){
    console.log(err);
    res.status(500).send('Webhook Error');
} }
);

export default router;