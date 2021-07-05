import { createLogger, format, transports } from 'winston';
import { config } from '@Config';

export interface AdditionalLogContent {
  [key: string]: string;
}

export const GENERIC_METHOD = 0,
  SERVICE_METHOD = 1,
  ENDPOINT_HANDLER = 2,
  MAPPER_METHOD = 3;

const logLevels = { error: 0, warn: 1, info: 2, debug: 3 };
const { combine, json, timestamp, colorize, prettyPrint } = format;

export const isLogLevel = (level: string): boolean => {
  return ['error', 'warn', 'info', 'debug'].includes(level);
};

export const isEndpointLogLevel = (level: string): boolean => {
  return ['info', 'debug'].includes(level);
};

export const logger = createLogger({
  levels: logLevels,
  format: combine(
    colorize(), // colorize() must be the first param, per https://github.com/winstonjs/winston#colorizing-standard-logging-levels
    json(),
    timestamp(),
    prettyPrint()
  ),
  transports: [new transports.Console({ level: config.maxLogLevel })],
});
