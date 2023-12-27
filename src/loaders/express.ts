import { NextFunction, Request, Response, Application } from 'express';
import * as express from 'express';
import * as cors from 'cors';

import { APIError, APIResponse } from '../common';
import { eventRouter } from "../modules/events/events.route";



export default ({ app }: { app: Application }) => {
    app.use(express.json());
    app.use(cors());

    //routers
    app.use('/events', eventRouter)

    // For handling 404 errors.
    app.use((req, res, next) => {
        const err = new APIError({ message: 'That resource does not exist on this server.' });
        err.status_code = 404;
        next(err);
    });

    // For handling 500 errors.
    app.use((err: APIError, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status_code || 500);
        res.json(new APIResponse({
            status_code: err.status_code || 500,
            message: err.message,
        }));
    });

}