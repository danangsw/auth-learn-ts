import { Request, Response } from "express";
import log from "../utils/logger";
import { CreateSessionInput } from "../schema/auth.schema";
import { ErrorResponse, SuccessResponse } from "../helper/apiResponse";
import { findUserByEmail } from "../service/user.service";
import { signAccessToken, signRefreshToken } from "../service/auth.service";

export async function createSessionHandler(
    req: Request<{}, {}, CreateSessionInput>,
    res: Response
) { 
    const { email, password } = req.body;
    const Ok: SuccessResponse<{accessToken:string, refreshToken: string}> = {
            data: {
                accessToken: "_",
                refreshToken: "_"
            }
    }
    const Err = {} as ErrorResponse;

    try {
        const user = await findUserByEmail(email);
        Err.code = "E401";
        Err.error = "Invalid Email or Password";

        if (!user || !user?.verified) { 
            log.error(`${Err.code}: ${Err.error}`);
            return res.status(401).send(Err);
        }

        const isvalid = await user.validatePassword(password);
        if (isvalid) { 
            log.error(`${Err.code}: ${Err.error}`);
            return res.status(401).send(Err);
        }

        // Sign access token
        Ok.data.accessToken = signAccessToken(user);
        // Sign refresh token
        Ok.data.refreshToken = await signRefreshToken({ userId: user._id });
        // Send access token
        return res.send(Ok);
    } catch (e) {
        Err.code = "E500";
        Err.error = "Internal server error";

        log.error(e, `${Err.code}: ${Err.error}`);
        return res.status(500).send(Err);
    }
}