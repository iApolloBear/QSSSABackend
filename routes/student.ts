import { Router } from "express";
import { getMyGroup } from "../controllers/student";
const router = Router();

router.get("/my-group/:code", getMyGroup);

export default router;
