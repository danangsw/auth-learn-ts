import { omit } from 'lodash';
import { User, privateFields } from "../model/user.model";
import { DocumentType } from '@typegoose/typegoose';
import { signJwt } from '../utils/jwt';
import SessionModel from '../model/session.model';

export function signAccessToken(user: DocumentType<User>) { 
    const payload = omit(user.toJSON(), privateFields);
    const accessToken = signJwt(payload, "accessTokenPrivateKey", {
        expiresIn: '15m'
    });
    return accessToken;
}

export async function signRefreshToken({ userId }: { userId: string; }) {
    const session = await createSession({ userId });
    const refreshToken = signJwt({
        session: session._id
    }, "refreshTokenPrivateKey", { expiresIn: "1y" });

    console.log({ userId }, { session }, { refreshToken });

    return refreshToken;
}

export async function createSession({ userId }: { userId: string; }) { 
    return SessionModel.create({ userId });
}