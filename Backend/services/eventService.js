import axios from 'axios';
import crypto from 'crypto';
import config from 'config';

export const generateSignature = (data) => {
    return crypto.createHmac('sha256', config.get('WEBHOOK_SECRET')).update(data).digest('hex');
}

export const verifySignature = (rawBody, receivedSignature) => {
       const expectedSignature = generateSignature(rawBody);
         return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(receivedSignature));          
}

export const verifyTimeStamp = (timeStamp) => {
    const currentTimestamp = new Date().getTime();
    const receivedTimestamp = new Date(timeStamp).getTime();
    const timeDifference = Math.abs(currentTimestamp - receivedTimestamp);
    return  timeDifference < config.get('WEBHOOK_TIMEOUT');
        
}

export const eventEmitter = (event, data) => {

const body  = {
    event,
    data,
    timeStamp: new Date().toISOString()
}
const timeStamp = new Date().toISOString();

const raw = JSON.stringify(body);
const signature = generateSignature(raw);

try{
    axios.post('http://localhost:4000/api/webhook', body, {
        headers: {
            'Content-Type': 'application/json',
            'x-webhook-signature': signature,
            'x-webhook-timestamp': timeStamp,
            
        }   
    });
}catch(err){
    console.log(err);

}
}

//WEB HOOK WITH SIGNATURE VERIFICATION
