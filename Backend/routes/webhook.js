import express from 'express';

const router = express.Router();

router.post('/webhook', (req, res) => {
    const { event, payload, timeStamp } = req.body;
    switch (event) {
        case 'user_registered':
            ;
}}
);

export default router;