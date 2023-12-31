import { object, string, TypeOf } from 'zod';

/**
 * This schema uses a regular expression (regex) to enforce the following rules:
 * At least one uppercase English letter ((?=.*[A-Z]))
 * At least one lowercase English letter ((?=.*[a-z]))
 * At least one digit ((?=.*\d))
 * At least one special character ((?=.*[@$!%*?&]))
 * Minimum eight in length without spaces ({8,}$)
 */
export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "First name is required"
        }),
        lastName: string({
            required_error: "Last name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
            `Password must contain at least one uppercase letter,
            one lowercase letter, one number, one special character,
            and be at least 8 characters long without spaces`),
        passwordConfirmation: string({
            required_error: "Password confirmation is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email")
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ["passwordConfirmation"]
    })
});

export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string()
    }),
});

export const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email")
    })
});

export const resetPasswordSchema = object({
    params: object({
        id: string(),
        passwordResetCode: string()
    }),
    body: object({
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email"),
        password: string({
            required_error: "Password is required"
        }).refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
            `Password must contain at least one uppercase letter,
            one lowercase letter, one number, one special character,
            and be at least 8 characters long without spaces`),
        passwordConfirmation: string({
            required_error: "Password confirmation is required"
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path: ["passwordConfirmation"]
    })
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;