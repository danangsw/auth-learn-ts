import logger from 'pino';
import dayjs from 'dayjs';
import config from 'config';

const levelInfo = config.get<string>('logLevel');
export const log = logger({
    transport: {
        target: 'pino-pretty'
    },
    levelInfo,
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});
