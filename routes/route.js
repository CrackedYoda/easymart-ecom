import {Router} from "express";
import customer from "./customer.js";
import home from "./home.js";
import products from "./products.js";
import orders from "./orders.js";
import user from "./user.js";
import cart from "./cart.js";

const router = Router(); //initializing express.Router()


//using the routes
router.use('/api/customer',customer) 
router.use('/',home)
router.use('/api/products',products)
router.use('/api/orders', orders)
router.use('/api/user',user)
router.use('/api/cart', cart)

export default router;