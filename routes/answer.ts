import { Router } from "express";
import { createAnswer } from "../controllers/answer";
import { validateJWT } from "../middlewares/validateJWT";
const router = Router();

router.post("/", validateJWT, createAnswer);

export default router;
