/**
 * Access Token and Refresh Token
 * The main reason for having both is that it allows the system to revoke access at any time while keeping the system scalable. 
 * If the access token is self-contained, authorization can be revoked by not issuing new access tokens. 
 * This simplifies access token validation and makes it easier to scale and support multiple authorization servers.
 */
import { omit } from 'lodash';
import { User, privateFields } from "../model/user.model";
import { DocumentType } from '@typegoose/typegoose';
import { signJwt } from '../utils/jwt';
import SessionModel from '../model/session.model';

/**
 * Access Token: This token carries the necessary information to access a resource directly. 
 * When a client passes an access token to a server managing a resource, 
 * that server can use the information contained in the token to decide whether the client is authorized or not. 
 * Access tokens usually have an expiration date and are short-lived
 * @param user 
 * @returns 
 */
export function signAccessToken(user: DocumentType<User>) { 
    const payload = omit(user.toJSON(), privateFields);
    const accessToken = signJwt(payload, "accessTokenPrivateKey", {
        expiresIn: '5m'
    });
    return accessToken;
}

/**
 * Refresh Token: This token carries the information necessary to get a new access token.
 * In other words, whenever an access token is required to access a specific resource, 
 * a client may use a refresh token to get a new access token issued by the authentication server.
 * Refresh tokens can also expire but are rather long-lived. 
 * They are usually subject to strict storage requirements to ensure they are not leaked
 * @param param0 
 * @returns 
 */
export async function signRefreshToken({ userId }: { userId: string; }) {
    const session = await createSession({ userId });
    const refreshToken = signJwt({
        session: session._id
    }, "refreshTokenPrivateKey", { expiresIn: "30d" });

    // console.log({ userId }, { session }, { refreshToken });
    return refreshToken;
}

export async function createSession({ userId }: { userId: string; }) { 
    return SessionModel.create({ userId });
}

export async function findSessionById(id: string) { 
    return SessionModel.findById(id);
}