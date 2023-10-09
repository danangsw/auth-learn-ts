import logger from 'pino';
import dayjs from 'dayjs';
import config from 'config';

const levelInfo = config.get<string>('logLevel');

const log = logger({
    transport: {
        target: 'pino-pretty'
    },
    levelInfo,
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;