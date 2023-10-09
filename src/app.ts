import express from 'express';
import config from 'config';
import connectToDB from './utils/connection';
import log from './utils/logger';
import router from './routes';

require('dotenv').config();

const app = express();
const port = config.get('port');

// Middleware express
app.use(express.json());

// Router express
app.use(router);

export function appStart () { 
    app.listen(port, () => {
        log.info(`App started at http://localhost:${port}`);
        connectToDB(); 
    });
};