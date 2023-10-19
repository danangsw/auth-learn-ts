import { object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email("Invalid email or password"),
         password: string({
            required_error: "Password is required"
        }).refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
            `Invalid email or password`),
    })
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"];