import mongoose from 'mongoose';
import config from 'config';
import { logInfo } from './logger';

async function connectToDB() { 
    const dbUri = config.get<string>('mongoDbUri');

    try {
        await mongoose.connect(dbUri);
        logInfo.info('Connected to DB');
    } catch (error) {
        logInfo.error(`Connection to DB failed: ${error}`);
        process.exit(1);
    }
}

export {
    connectToDB
};