import { Router } from 'express'
import { AuthController } from "./auth.controller";
import { RegisterValidator } from './auth.validators';

const authRouter = Router();
const authController = new AuthController();



authRouter.post('/register', RegisterValidator, authController.register)

export { authRouter };