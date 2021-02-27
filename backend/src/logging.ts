import winston from 'winston';

const logLevels = { error: 0, warn: 1, info: 2, debug: 3 };

const logger = winston.createLogger({
  levels: logLevels,
  transports: [new winston.transports.Console({ level: process.env.MAX_LOG_LEVEL })],
});
export default logger;
