import express from 'express';
import config from 'config';
import { connectToDB } from './utils/connection';
import { logInfo } from './utils/logger';

require('dotenv').config();

const app = express();
const port = config.get('port');

app.get('/',async (req, res) => {
    res.send('<h1>Sugeh rawuh!</h1>')
});

export function appStart () { 
    app.listen(port, () => {
        logInfo.info(`App started at http://localhost:${port}`);
        connectToDB(); 
    });
};