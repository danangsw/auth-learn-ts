import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import { sendEmail } from "../utils/mailer"
import { ErrorResponse, SuccessResponse } from '../helper/apiResponse';
import { AnyExpression } from "mongoose";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response
) { 
    // console.log("user.controller.createUserHandler:", {body: req.body, query: req.query, params: req.params});
    const body = req.body;

    try {
        const user = await createUser(body);

        await sendEmail({
            from: 'test@example.com',
            to: user.email,
            subject: 'Please verify your account',
            text: `Verification code ${user.verificationCode}. Id: ${user._id}`,
        });

        const Ok: SuccessResponse<any> = {
            data: {
                _id: user.id
            }
        }
        return res.status(200).send(Ok);
    } catch (e: any) {
        const Err: ErrorResponse = {
            code: 'CTR11000',
            error: "Account already exists"
        }

        if (e.code === 11000) { 
            return res.status(409).send(Err);
        }

        Err.code = 'CTR500';
        Err.error = e.errors;
        return res.status(500).send(Err);
    }
}