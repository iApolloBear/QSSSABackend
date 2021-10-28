import { Router } from "express";
import { createQSSSA, joinQSSSA } from "../controllers/qsssa";
import { validateJWT } from "../middlewares/validateJWT";
const router = Router();

router.post("/", validateJWT, createQSSSA);
router.get("/join/:id", validateJWT, joinQSSSA);

export default router;
