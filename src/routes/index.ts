/**
 * API router middleware
 */

import express from 'express';
import auth from './auth.routes';
import user from './user.routes';
import ApiResponse from '../helper/apiResponse';

const router = express.Router();
const response: ApiResponse<string> = {
    data: 'OK'
};

router.use(user);
router.use(auth);

router.get('/healthcheck', async (_, res) => res.status(200).send(response));
router.get('/hello', async (_, res) => {
    res.status(200).send('<h1>Sugeh rawuh!</h1>');
});

export default router;