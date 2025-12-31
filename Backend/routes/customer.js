import express from "express";
import { validateCustomerMiddleware } from "../middleware/validationFactory.js";
import {getCustomers,addCustomer,changeCustomer,deleteCustomer} from "../controllers/customerController.js";
import userAuth from "../middleware/userAuth.js";
import { role } from "../shared/roles.js";

const router = express.Router();

router.get("/", getCustomers);

router.post("/", validateCustomerMiddleware, addCustomer);

router.put("/:id", validateCustomerMiddleware, changeCustomer);
 


router.delete("/:id", userAuth(role.ADMIN), deleteCustomer);
  


export default router;
