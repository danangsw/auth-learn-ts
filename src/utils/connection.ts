import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

async function connectToDB() { 
    const dbUri = config.get<string>('mongoDbUri');

    try {
        await mongoose.connect(dbUri);
        log.info('Connected to DB successfully');
    } catch (error) {
        log.error(`Connection to DB failed: ${error}`);
        process.exit(1);
    }
}

export default connectToDB;