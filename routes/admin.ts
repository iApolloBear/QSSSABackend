import { Router } from "express";
import { getTeachers, getStudents } from "../controllers/admin";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.get("/teachers", validateJWT, getTeachers);
router.get("/students", validateJWT, getStudents);

export default router;
