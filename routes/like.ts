import { Router } from "express";
import { createLike } from "../controllers/like";
import { validateJWT } from "../middlewares/validateJWT";
const router = Router();

router.post("/", validateJWT, createLike);

export default router;
