import { Router } from 'express'
import { EventController } from "./events.controller";

const eventRouter = Router();
const eventController = new EventController();


eventRouter.post('/', eventController.create)
eventRouter.get('/', eventController.list)
eventRouter.get('/:id', eventController.retrieve)

export { eventRouter };