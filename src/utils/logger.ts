import logger from 'pino';
import dayjs from 'dayjs';
import config from 'config';

const levelInfo = config.get<string>('logInfo');
const levelError = config.get<string>('logError');
const logInfo = logger({
    transport: {
        target: 'pino-pretty'
    },
    levelInfo,
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});
const logError = logger({
    transport: {
        target: 'pino-pretty'
    },
    levelError,
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});

export { 
    logInfo,
    logError
};
