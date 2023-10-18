/**
 * User middleware
 */
import express from 'express';
import { createUserSchema, forgotPasswordSchema, verifyUserSchema } from '../schema/user.schema';
import validateResource from '../middleware/validateResource'
import { createUserHandler, forgotPasswordHandler, verifyUserHandler } from '../controller/user.controller';

const router = express.Router();

router.post('/api/users',
    validateResource(createUserSchema),
    createUserHandler);

router.post('/api/users/verify/:id/:verificationCode',
    validateResource(verifyUserSchema),
    verifyUserHandler
);

router.post(`/api/users/forgotpassword`,
    validateResource(forgotPasswordSchema),
    forgotPasswordHandler
);

export default router;