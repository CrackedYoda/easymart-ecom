import { Router } from "express";
import { getAllUsers, getAllOrders, deleteAnyProduct, suspendUser } from "../controllers/adminController.js";
import userAuth from "../middleware/userAuth.js";
import admin from "../middleware/admin.js";

const router = Router();

router.get("/users", [userAuth, admin], getAllUsers);
router.put("/users/:id/suspend", [userAuth, admin], suspendUser);
router.get("/orders", [userAuth, admin], getAllOrders);
router.delete("/products/:id", [userAuth, admin], deleteAnyProduct);

export default router;
