import { Router } from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";
import { validateCartMiddleware } from "../middleware/validationFactory.js";
import userAuth from "../middleware/userAuth.js";

const router = Router();

router.get("/", userAuth, getCart);
router.post("/", [userAuth, validateCartMiddleware], addToCart);
router.delete("/", userAuth, removeFromCart);

export default router;
