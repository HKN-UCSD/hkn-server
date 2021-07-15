import { createLogger, format, transports } from 'winston';
import { config } from '@Config';

export interface AdditionalLogContent {
  [key: string]: string;
}

// Function parameters are represented as an object with keys as
// parameter names and values as parameter values
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

/**
 * Logs information regarding a variable, i.e. its name, value and anything else one would
 * like to log (in moreLogContent).
 *
 * @param {string} variableName Name of the variable being logged
 * @param {any} variableValue Value of the variable being logged
 * @param {string} message Default message field of log
 * @param {Object} moreLogContent Other contents of the log, in JS object format
 * @param {string} level Severity of log (error, warn, info or debug), default is info
 */
export const logVar = (
  variableName: string,
  variableValue: any,
  message = '',
  moreLogContent = {},
  level = 'info'
) => {
  let logLevel = level;

  if (!isLogLevel(level)) {
    // Either throw an error or this, opted with this because it is not as disruptive
    logLevel = 'info';
  }

  const additionalLogContent = {
    variableName,
    variableValue,
    ...moreLogContent,
  };

  logger.log(logLevel, message, additionalLogContent);
};

/**
 * Logs information regarding a function/method, i.e. its name, value, the file it belongs to, etc.
 * and anything else one would like to log (in moreLogContent).
 *
 * @param {string} funcName Name of the function being logged
 * @param {FuncParams} funcParams Parameters of the function being logged
 * @param {string} fileName The file at which the function resides
 * @param {string} message Default message field of log
 * @param {Object} moreLogContent Other contents of the log, in JS object format
 * @param {string} level Severity of log (error, warn, info or debug), default is info
 */
export const logFunc = (
  funcName: string,
  funcParams?: FuncParams,
  fileName = '',
  message = '',
  moreLogContent = {},
  level = 'info'
) => {
  let logLevel = level;

  if (!isLogLevel(level)) {
    logLevel = 'info';
  }

  const params = funcParams === undefined ? [] : funcParams;
  const funcFile = fileName === '' ? '' : `in ${fileName}`;
  const logMsg = `Called ${funcName}() ${funcFile}\n${message}`;

  const additionalLogContent = {
    funcName,
    params,
    ...moreLogContent,
  };

  logger.log(logLevel, logMsg, additionalLogContent);
};
