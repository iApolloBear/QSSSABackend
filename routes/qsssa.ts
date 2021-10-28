import { Router } from "express";
import { createQSSSA, getQSSSA, joinQSSSA } from "../controllers/qsssa";
import { validateJWT } from "../middlewares/validateJWT";
const router = Router();

router.post("/", validateJWT, createQSSSA);
router.get("/:code", validateJWT, getQSSSA);
router.get("/join/:id", validateJWT, joinQSSSA);

export default router;
