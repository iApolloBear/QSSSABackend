import { Router } from "express";
import { createGroups, getGroup, getQSSSAGroups } from "../controllers/group";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.get("/qsssa/:code", validateJWT, getQSSSAGroups);
router.get("/group/:id", validateJWT, getGroup);
router.post("/", validateJWT, createGroups);

export default router;
