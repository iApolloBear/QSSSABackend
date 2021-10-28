import { Router } from "express";
import { getMyQSSSAStudents } from "../controllers/teacher";
const router = Router();

router.get("/qsssa/students/:code", getMyQSSSAStudents);

export default router;
