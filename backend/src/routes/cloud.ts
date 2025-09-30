import { Router } from "express";
import multer from "multer";
import * as uploadController from "../controllers/uploadController";
import { authenticateToken } from "../middleware/auth";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/upload", authenticateToken, upload.single("image"), uploadController.upload);

export default router;
