import { createLogger, format, transports } from 'winston';
import { config } from '@Config';

export interface AdditionalLogContent {
  [key: string]: string;
}

export interface Log {
  level?: string;
  message?: string;
  moreLogContent?: AdditionalLogContent;
}

interface FuncParams {
  [key: string]: any;
}

const { combine, json, timestamp, colorize, prettyPrint } = format;
const logLevels = { error: 0, warn: 1, info: 2, debug: 3 };

export const GENERIC_METHOD = 0,
  SERVICE_METHOD = 1,
  ENDPOINT_HANDLER = 2,
  MAPPER_METHOD = 3;

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

export const fillOptionalProperties = (log: Log) => {
  const { level, message, moreLogContent } = log;

  log.level = level === undefined ? 'info' : level;
  log.message = message === undefined ? '' : message;
  log.moreLogContent = moreLogContent === undefined ? {} : moreLogContent;
};

export const createNewLog = (): Log => {
  const newLog: Log = {
    level: 'info',
    message: '',
    moreLogContent: {},
  };

  return newLog;
};

export const logVar = (
  variableName: string,
  variableValue: any,
  message = '',
  moreLogContent = {},
  level = 'info'
) => {
  const additionalLogContent = {
    variableName,
    variableValue,
    ...moreLogContent,
  };

  logger.log(level, message, additionalLogContent);
};

export const logFunc = (
  funcName: string,
  funcParams?: FuncParams,
  fileName = '',
  message = '',
  moreLogContent = {},
  level = 'info'
) => {
  const params = funcParams === undefined ? [] : funcParams;

  const funcFile = fileName === '' ? '' : `in ${fileName}`;
  const logMsg = `Called ${funcName}() ${funcFile}\n${message}`;

  const additionalLogContent = {
    funcName,
    params,
    ...moreLogContent,
  };

  logger.log(level, logMsg, additionalLogContent);
};

export const logMany = (logs: Log[]) => {
  logs.forEach(log => {
    fillOptionalProperties(log);
    const { level, message, moreLogContent } = log;

    logger.log(level, message, moreLogContent);
  });
};
