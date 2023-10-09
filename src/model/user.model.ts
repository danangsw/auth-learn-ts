import {
    getModelForClass,
    prop,
    modelOptions,
    Severity,
    pre,
    DocumentType
} from "@typegoose/typegoose";
import argon2 from "argon2";
import { nanoid } from "nanoid";
import { log } from "../utils/logger";

@pre<User>("save", async function(next) {
    if (!this.isModified("password")) { 
        return next();
    }
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
})
@modelOptions({
    schemaOptions: {
        timestamps: true
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class User {
    @prop({ lowercase: true, required: true, unique: true })
    email: string

    @prop({ required: true })
    firstname: string
    
    @prop({ required: true })
    lastname: string

    @prop({ required: true })
    password: string

    @prop({ required: true, default: () => nanoid() })
    verificationCode: string

    @prop()
    passwordResetCode: string | null

    @prop({ default: false })
    verified: boolean

    async validatePassword(this: DocumentType<User>, candidatePassword: string) {
        try {
            return await argon2.verify(this.password, candidatePassword);
        } catch (error) {
            log.error(error, 'Could not validate password');
            return false;
        }
    }
}

const UserModel = getModelForClass(User)