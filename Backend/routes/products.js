import { Router } from "express";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { validateProductMiddleware } from "../middleware/validationFactory.js";
import userAuth from "../middleware/userAuth.js";
import {role} from "../shared/roles.js";


const router = Router();

router.post("/newproduct", userAuth(role.MERCHANT), validateProductMiddleware, addProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", userAuth(role.MERCHANT), validateProductMiddleware, updateProduct);
router.delete("/:id", userAuth(role.MERCHANT, role.ADMIN), deleteProduct);

export default router;
