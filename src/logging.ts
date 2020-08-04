import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const logger = winston.createLogger({
  level: process.env.WINSTON_LOG_LEVEL,
  transports: [new winston.transports.Console()],
});

export default logger;
