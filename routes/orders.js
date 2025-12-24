import express from "express";
import { validateOrderMiddleware } from "../middleware/validationFactory.js";
import createOrder from "../controllers/orderController.js";
import Order from "../models/orders.js";
import userAuth from "../middleware/userAuth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

router.get("/", [userAuth, admin], async (req, res) => {
  try {
    const orders = await Order.find().populate('customer').populate('products.product');
    res.send(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", userAuth, createOrder);

export default router;
