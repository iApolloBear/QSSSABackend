import { Router } from "express";
import { createGroups } from "../controllers/group";

const router = Router();

router.post("/", createGroups);

export default router;
