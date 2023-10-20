/**
 * Auth middleware
 */
import express from 'express';
import validateResource from '../middleware/validateResource';
import { createSessionHandler, refreshAccessTokenHandler } from '../controller/auth.controller';
import { createSessionSchema } from '../schema/auth.schema'

const router = express.Router();

router.post('/api/sessions/signtoken',
    validateResource(createSessionSchema),
    createSessionHandler);

router.post('/api/sessions/refreshtoken',
    refreshAccessTokenHandler)

export default router;