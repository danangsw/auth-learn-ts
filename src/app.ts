require('dotenv').config();

import express from 'express';
import config from 'config';
import connectToDB from './utils/connection';
import log from './utils/logger';
import router from './routes';
import deserializeUser from './middleware/deserializeUser'

const app = express();
const port = config.get('port');

// Middleware express
app.use(express.json());
app.use(deserializeUser);
// Router express
app.use(router);

export function appStart () { 
    app.listen(port, () => {
        log.info(`App started at http://localhost:${port}`);
        connectToDB(); 
    });
};