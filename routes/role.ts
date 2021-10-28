import { Router } from "express";
import { createRole } from "../controllers/role";

const router = Router();

router.post("/", createRole);

export default router;
