/**
 * API router middleware
 */

import express from 'express';
import auth from './auth.routes';
import user from './user.routes';

const router = express.Router();

router.use(user);
router.use(auth);

router.get('/healthcheck', async (_, res) => res.sendStatus(200));
router.get('/hello', async (_, res) => {
    res.send('<h1>Sugeh rawuh!</h1>');
    // res.sendStatus(200);
});

export default router;