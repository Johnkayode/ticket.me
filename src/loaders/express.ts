import { NextFunction, Request, Response, Application } from 'express';
import { isCelebrateError } from 'celebrate';
import * as express from 'express';
import * as cors from 'cors';

import { APIError, APIResponse, logger } from '../common';
import { authRouter } from '../modules/auth/auth.routes';
import { eventRouter } from '../modules/events/events.routes';

export default ({ app }: { app: Application }) => {
  app.use(express.json());
  app.use(cors());

  //routers
  app.use('/auth', authRouter);
  app.use('/events', eventRouter);

  // For handling 404 errors.
  app.use((req, res, next) => {
    const err = new APIError({ message: 'That resource does not exist on this server.' });
    err.status_code = 404;
    next(err);
  });

  // For handling validation errors.
  app.use((err: APIError, req: Request, res: Response, next: NextFunction) => {
    // logger.error(err);
    if (isCelebrateError(err)) {
      let errors: any = err.details.get('body') || err.details.get('query') || err.details.get('params');
      errors = errors.details.map((x: any) => x.message);
      return res.status(400).json(
        new APIResponse({
          status_code: 400,
          message: errors.join(' | '),
        })
      );
    }
    return next(err);
  });

  // For handling 500 errors.
  app.use((err: APIError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status_code || 500);
    res.json(
      new APIResponse({
        status_code: err.status_code || 500,
        message: err.message,
      })
    );
  });
};
