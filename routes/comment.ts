import { Router } from "express";
import { createComment } from "../controllers/comment";
import { validateJWT } from "../middlewares/validateJWT";
const router = Router();

router.post("/", validateJWT, createComment);

export default router;
