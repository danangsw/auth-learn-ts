import { Request, Response } from "express";
import { CreateUserInput, ForgotPasswordInput, VerifyUserInput } from "../schema/user.schema";
import { createUser, findByEmail, findUserById } from "../service/user.service";
import { sendEmail } from "../utils/mailer"
import { ErrorResponse, SuccessResponse } from '../helper/apiResponse';
import log from "../utils/logger";
import { nanoid } from "nanoid";
import config from "config";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response) { 
    // console.log("user.controller.createUserHandler:", {body: req.body, query: req.query, params: req.params});
    const body = req.body;

    try {
        const user = await createUser(body);

        await sendEmail({
            from: config.get<string>('emailFrom'),
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
        log.error(e, 'Internal server error')
        
        Err.code = 'E500';
        Err.error = 'Internal server error';
        return res.status(500).send(Err);
    }
}

export async function verifyUserHandler(
    req: Request<VerifyUserInput>,
    res: Response) { 
    const id = req.params.id
    const verificationCode = req.params.verificationCode
    const Err: ErrorResponse = {
            code: 'E404',
            error: "Could not verify user."
        }
        
    try {
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
    } catch (e: any) {
        log.error(e, 'Internal server error')

        Err.code = 'E500'
        Err.error = 'Internal server error'

        return res.status(500).send(Err)
    }
}

export async function forgotPasswordHandler(
    req: Request<{}, {}, ForgotPasswordInput>,
    res: Response
) { 
    const { email } = req.body;
    const Err: ErrorResponse = {
        code: 'E404',
        error:  `User with email '${email}' could not found.`
    }
    const Ok: SuccessResponse<object> = {
        data: {
            message: "If user with that email is registered you will receive a password reset email."
        }
    }

    try {
        const user = await findByEmail(email);

        if (!user) { 
            // Log the error detail in log.debug.
            log.warn(Err.error);
            // Return OK, it is for security purpose to hide the registered email from attacker.
            return res.send(Ok);
        }

        if (!user.verified) { 
            Ok.data = {
                message: "User is not verified."
            }

            return res.send(Ok);
        }

        const passResetCode = nanoid();

        user.passwordResetCode = passResetCode;

        await user.save();

        await sendEmail({
            from: config.get<string>('emailFrom'),
            to: user.email,
            subject: 'Reset Password',
            text: `Password reset code ${passResetCode}. Id: ${user._id}`,
        });

        log.warn(`Sent password reset code to '${user.email}'`)
        return res.send(Ok);
    } catch (e) {
        log.error(e, 'Internal server error')

        Err.code = 'E500'
        Err.error = 'Internal server error'

        return res.status(500).send(Err)
    }
}