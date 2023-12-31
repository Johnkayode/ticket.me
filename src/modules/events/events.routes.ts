import { Router } from 'express';
import { EventController, EventCategoryController } from './events.controller';
import { IsAuthenticated } from '../auth/auth.middlewares';

const eventRouter = Router();
const eventController = new EventController();
const eventCategoryController = new EventCategoryController();

eventRouter.use(IsAuthenticated('*'));

eventRouter.post('/', eventController.create);
eventRouter.get('/', eventController.list);
eventRouter.post('/categories', eventCategoryController.create);
eventRouter.get('/categories', eventCategoryController.list);
eventRouter.get('/:id', eventController.retrieve);

export { eventRouter };
