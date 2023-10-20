import { Request, Response } from "express";
import log from "../utils/logger";
import { CreateSessionInput } from "../schema/auth.schema";
import { ErrorResponse, SuccessResponse } from "../helper/apiResponse";
import { findUserByEmail, findUserById } from "../service/user.service";
import { signAccessToken, signRefreshToken, findSessionById } from "../service/auth.service";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";

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
        Ok.data.refreshToken = await signRefreshToken({ userId: String(user._id) });
        // Send access token
        return res.send(Ok);
    } catch (e) {
        Err.code = "E500";
        Err.error = "Internal server error";

        log.error(e, `${Err.code}: ${Err.error}`);
        return res.status(500).send(Err);
    }
}

export async function refreshAccessTokenHandler(req: Request, res: Response) { 
    const Ok: SuccessResponse<{accessToken:string}> = {
        data: {
            accessToken: "_"
        }
    }
    const Err = {
        code: 'E401',
        error: 'Could not refresh access token'
    } as ErrorResponse;

    // 'get' function from lodash
    // x-refresh contain refreshToken from user browser
    const refreshToken = get(req, 'headers.x-refresh');
    const decoded = verifyJwt<{session: string}>(
        String(refreshToken),
        'refreshTokenPublicKey');
    if (!decoded) { 
        return res.status(401).send(Err);
    }

    const session = await findSessionById(decoded.session);
    if (!session || !session?.valid) { 
        return res.status(401).send(Err);
    }

    const user = await findUserById(String(session.userId));
    if (!user) { 
        return res.status(401).send(Err);
    }

    Ok.data.accessToken =  signAccessToken(user);
    return res.send(Ok);
}