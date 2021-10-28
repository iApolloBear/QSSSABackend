import { Router } from "express";
import { createGroups, getQSSSAGroups } from "../controllers/group";

const router = Router();

router.get("/:code", getQSSSAGroups);
router.post("/", createGroups);

export default router;
