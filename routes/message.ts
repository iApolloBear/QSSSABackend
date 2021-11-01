import { Router } from "express";
import { createMessage } from "../controllers/message";
import { validateJWT } from "../middlewares/validateJWT";
const router = Router();

router.post("/", validateJWT, createMessage);

export default router;
