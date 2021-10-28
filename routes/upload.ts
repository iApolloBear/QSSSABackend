import { Router } from "express";
import { getFile } from "../controllers/upload";
const router = Router();

router.get("/:collection/:id", getFile);

export default router;
