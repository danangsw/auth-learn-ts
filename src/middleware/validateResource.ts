import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { ErrorResponse } from '../helper/apiResponse';

const validateResource = (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });

            // console.log("validateResource", {body: req.body, query: req.query, params: req.params});
            next();
        } catch (e: any) {
            const Err: ErrorResponse = {
                code: 'E400',
                error: e.errors,
            };
            return res.status(400).send(Err);
        }
    };

export default validateResource;