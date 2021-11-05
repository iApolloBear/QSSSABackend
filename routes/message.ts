import { Router } from "express";
import {
  createMessage,
  getMessages,
  getUserMessages,
} from "../controllers/message";
import { validateJWT } from "../middlewares/validateJWT";
const router = Router();

router.post("/", validateJWT, createMessage);
router.get("/members/:id", validateJWT, getUserMessages);
router.get("/:id", validateJWT, getMessages);

export default router;
