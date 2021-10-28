import { Router } from "express";
import {
  getQSSSAS,
  createQSSSA,
  getQSSSA,
  joinQSSSA,
} from "../controllers/qsssa";
import { validateJWT } from "../middlewares/validateJWT";
const router = Router();

router.get("/", validateJWT, getQSSSAS);
router.post("/", validateJWT, createQSSSA);
router.get("/:code", validateJWT, getQSSSA);
router.get("/join/:id", validateJWT, joinQSSSA);

export default router;
