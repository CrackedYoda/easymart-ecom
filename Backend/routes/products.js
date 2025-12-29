import { Router } from "express";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { validateProductMiddleware } from "../middleware/validationFactory.js";
import userAuth from "../middleware/userAuth.js";
import merchant from "../middleware/merchant.js";

const router = Router();

router.post("/newproduct", [userAuth, merchant, validateProductMiddleware], addProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", [userAuth, merchant, validateProductMiddleware], updateProduct);
router.delete("/:id", [userAuth, merchant], deleteProduct);

export default router;
