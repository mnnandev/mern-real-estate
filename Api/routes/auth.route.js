import expres from "express";
import { SignUp } from "../controllers/auth.controller.js";
const router = expres.Router();
router.post("/SignUp", SignUp);
export default router;
