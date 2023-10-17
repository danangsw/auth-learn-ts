import { Request, Response } from "express";
import { CreateUserInput, VerifyUserInput } from "../schema/user.schema";
import { createUser, findUserById } from "../service/user.service";
import { sendEmail } from "../utils/mailer"
import { ErrorResponse, SuccessResponse } from '../helper/apiResponse';

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

        const Ok: SuccessResponse<{}> = {
            data: {
                id: user.id
            }
        }
        return res.status(200).send(Ok);
    } catch (e: any) {
        const Err: ErrorResponse = {
            code: 'E11000',
            error: "Account already exists"
        }
        // The error code 11000 is a duplicate key error that occurs in MongoDB.
        if (e.code === 11000) { 
            return res.status(409).send(Err);
        }
        Err.code = 'E500';
        Err.error = e.errors;
        return res.status(500).send(Err);
    }
}

export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) { 
    const id = req.params.id
    const verificationCode = req.params.verificationCode
    const Err: ErrorResponse = {
            code: 'E404',
            error: "Could not verify user."
        }
        
    // find the user by id
    const user = await findUserById(id)
    if (!user) { 
        return res.status(404).send(Err)
    }
    // check to see if they are already verified
    if (user.verified) { 
        Err.code = 'E401'
        Err.error = "User has verified already."

        return res.status(401).send(Err)
    }
    // check to see if the verification is valid
    if (user.verificationCode === verificationCode) {
        user.verified = true;

        await user.save();

        const Ok: SuccessResponse<{}> = {
            data: {
                id: user.id
            }
        }
        return res.status(200).send(Ok)
    }

    return res.status(404).send(Err)
}