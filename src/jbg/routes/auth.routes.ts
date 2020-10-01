import { Router } from "express";
import { signIn, signUp } from '../controllers/user.controller';
import { signInVerification, signUpVerification } from "../middlewares/auth.middleware"

const router = Router();

router.post('/signup', signUpVerification, signUp);
router.post('/signin', signInVerification,signIn);

export default router;