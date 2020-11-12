import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.WINSTON_LOG_LEVEL,
  transports: [new winston.transports.Console()],
});

export default logger;
