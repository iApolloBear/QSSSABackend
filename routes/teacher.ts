import { Router } from "express";
import { getMyQSSSAStudents, getMyStudents } from "../controllers/teacher";
import { validateJWT } from "../middlewares/validateJWT";
const router = Router();

router.get("/qsssa/students/:code", validateJWT, getMyQSSSAStudents);
router.get("/students", validateJWT, getMyStudents);

export default router;
