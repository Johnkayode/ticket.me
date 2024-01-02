import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { APIResponse, APIError } from "../../common";

const authService = new AuthService();



export class AuthController {
   async register(req: Request, res: Response, next) {
        try {
            const user = await authService.register(req.body);

            res.status(201).json(
                new APIResponse({
                    status_code: 201,
                    message: "User created successfully.",
                    data: user
                })
            ); 
        } catch (error) {
            next(error)
        }
   }
}