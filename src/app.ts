import express from 'express';
import config from 'config';
import { connectToDB } from './utils/connection';
import { logInfo } from './utils/logger';
import router from './routes';

require('dotenv').config();

const app = express();
const port = config.get('port');

app.use(router);

export function appStart () { 
    app.listen(port, () => {
        logInfo.info(`App started at http://localhost:${port}`);
        connectToDB(); 
    });
};