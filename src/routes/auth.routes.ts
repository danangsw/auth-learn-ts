/**
 * Auth middleware
 */
import express from 'express';
import validateResource from '../middleware/validateResource';
import { createSessionHandler, refreshAccessTokenHandle } from '../controller/auth.controller';
import { createSessionSchema } from '../schema/auth.schema'

const router = express.Router();

router.post('/api/sessions',
    validateResource(createSessionSchema),
    createSessionHandler);

router.post('/api/sessions/refreshtoken',
    refreshAccessTokenHandle)

export default router;