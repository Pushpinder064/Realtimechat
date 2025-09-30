import { Router } from "express";
import * as authController from "../controllers/authController";

import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/allusers/:id", authenticateToken, authController.allUsers);
router.post("/setavatar/:id", authenticateToken, authController.setAvatar);
router.get("/logout/:id", authenticateToken, authController.logout);

export default router;
