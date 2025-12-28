import express from "express";
import { validateUserMiddleware, validateLoginMiddleware } from "../middleware/validationFactory.js";
import userAuth from "../middleware/userAuth.js";
import {
  signUp,
  getUsers,
  getUserById,
  updateUserPassword,
  deleteUser,
  login,
  refreshToken,
  logout
} from "../controllers/auth/userController.js";

const router = express.Router();

router.post("/", validateUserMiddleware, signUp);
router.get("/", userAuth, getUsers);
router.get("/:id", getUserById);
router.put("/:id", validateUserMiddleware, updateUserPassword);
router.delete("/:id", deleteUser);
router.post("/login", validateLoginMiddleware, login);
router.post("/refreshToken", refreshToken);
router.post("/logout", logout);

export default router;