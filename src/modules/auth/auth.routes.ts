import { Router } from 'express';
import { AuthController } from './auth.controller';
import { RegisterValidator, LoginValidator } from './auth.validators';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/register', RegisterValidator, authController.register);
authRouter.post('/login', LoginValidator, authController.login);

export { authRouter };
