import mongoose from 'mongoose';
import config from 'config';

async function connectToMonggoDB() { 
    const dbUri = config.get<string>('mongoDbUri');

    try {
        const response = await mongoose.connect(dbUri);
        if (response) {
            console.log(`Connected to DB successfully!`);
        }
        else { 
            console.log(`...`);
        }
    } catch (error) {
        console.log(`Connection to DB is failed!`);
        console.log({error})
        process.exit(1);
    }
}

export {
    connectToMonggoDB
};