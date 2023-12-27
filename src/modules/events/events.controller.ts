import { EventService } from "./events.service";
import { Request, Response } from "express";
import { APIResponse, APIError } from "../../common";

const eventService = new EventService();

export class EventController {
    async create(req: Request, res: Response, next) {
        try {
            const event = await eventService.create(req.body);
            res.status(201).json(
                new APIResponse({
                    status_code: 201,
                    message: "Event created successfully.",
                    data: event
                })
            ); 
        } catch (error) {
            next(error)
        }
    }

    async list(req: Request, res: Response, next) {
        try {
            const query = req.query.query;
            if (!query) {
                const events = await eventService.list();
                res.status(200).json(
                    new APIResponse({
                        status_code: 200,
                        message: "Events fetched successfully.",
                        data: events
                    })
                );
            } else {
                const events = await eventService.search(query);
                res.status(200).json(
                    new APIResponse({
                        status_code: 200,
                        message: "Events fetched successfully.",
                        data: events
                    })
                );
            }
        } catch (error) {
            next(error)
        }
      
    }

    async retrieve(req: Request, res: Response) {
        try {
            let event = await eventService.retrieve(req.params.id)
            res.status(200).json(
                new APIResponse({
                    status_code: 200,
                    message: "Events retrieved successfully.",
                    data: event
                })
            )
        } catch (error) {
            res.status(404).json(
                new APIError({
                    status_code: 404,
                    message: error.message
                })
            )
        }
    }
}
   