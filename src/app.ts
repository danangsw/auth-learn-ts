import express from 'express';
import config from 'config';
import { connectToMonggoDB } from './utils/connection';

require('dotenv').config();

const app = express();
const port = config.get('port');

app.get('/',async (req, res) => {
    res.send('<h1>Sugeh rawuh!</h1>')
});

export function appStart () { 
    app.listen(port, () => {
        console.log(`App started at http://localhost:${port}`);
        connectToMonggoDB(); 
    });
};