import { Router } from "express";
import { login, register, renewToken } from "../controllers/auth";
import { validateJWT } from "../middlewares/validateJWT";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/renew", validateJWT, renewToken);

export default router;
