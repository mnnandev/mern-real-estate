import expres from "express";
import { SignUp , SignIn} from "../controllers/auth.controller.js";
const router = expres.Router();
router.post("/SignUp", SignUp);
router.post("/SignIn", SignIn);
export default router;
