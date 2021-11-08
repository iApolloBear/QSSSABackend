import { Router } from "express";
import { getMyGroup, setReady } from "../controllers/student";
import { validateJWT } from "../middlewares/validateJWT";
const router = Router();

router.get("/my-group/:code", validateJWT, getMyGroup);
router.put("/ready", validateJWT, setReady);

export default router;
