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

   async login(req: Request, res: Response, next) {
    try {
        const user = await authService.login(req.body);

        res.status(200).json(
            new APIResponse({
                status_code: 200,
                message: "User logged in successfully.",
                data: user
            })
        ); 
    } catch (error) {
        next(error)
    }
}
}