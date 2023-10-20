import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../helper/apiResponse";
import { findSessionById } from "../service/auth.service";

const authorizeUser = (req: Request, res: Response, next: NextFunction) => { 
    const user = res.locals.user;

    if (!user) { 
        const Err:ErrorResponse = { 
            code: 'E401',
            error: 'Invalid user access token'
        }
        return res.status(401).send(Err);
    }

    return next();
};

export default authorizeUser;