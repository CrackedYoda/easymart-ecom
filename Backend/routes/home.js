import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => { // using router.get for all routes 
    res.send('hewlo world')
});

export default router;