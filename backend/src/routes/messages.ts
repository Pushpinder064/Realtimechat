import { Router } from "express";
import * as messageController from "../controllers/messageController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post("/addmsg", authenticateToken, messageController.addMessage);
router.post("/getmsg", authenticateToken, messageController.getMessages);

export default router;
