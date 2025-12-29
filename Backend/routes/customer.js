import express from "express";
import { validateCustomerMiddleware } from "../middleware/validationFactory.js";
import {getCustomers,addCustomer,changeCustomer,deleteCustomer} from "../controllers/customerController.js";


const router = express.Router();

router.get("/", getCustomers);

router.post("/", validateCustomerMiddleware, addCustomer);

router.put("/:id", validateCustomerMiddleware, changeCustomer);
 


router.delete("/:id", deleteCustomer);
  


export default router;
