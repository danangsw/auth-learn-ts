/**
 * User middleware
 */
import express from 'express';
import { createUserSchema, verifyUserSchema } from '../schema/user.schema';
import validateResource from '../middleware/validateResource'
import { createUserHandler, verifyUserHandler } from '../controller/user.controller';

const router = express.Router();

router.post('/api/users',
    validateResource(createUserSchema),
    createUserHandler);

router.post('/api/users/verify/:id/:verificationCode',
    validateResource(verifyUserSchema),
    verifyUserHandler
);

export default router;