import winston from 'winston';

import { config } from '@Config';

const logLevels = { error: 0, warn: 1, info: 2, debug: 3 };

const logger = winston.createLogger({
  levels: logLevels,
  transports: [new winston.transports.Console({ level: config.maxLogLevel })],
});
export default logger;
