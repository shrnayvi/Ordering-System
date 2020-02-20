const winston = require('winston');
const colors = require('colors');

const levels = {
  error: 'error',
  info: 'info',
  warn: 'warn',
  silly: 'silly',
  verbose: 'verbose',
  debug: 'debug',
};

const customColors = {
  error: 'red',
  info: 'blue',
  warn: 'yellow',
  silly: 'green',
  verbose: 'green',
  debug: 'green',
};

const formatter = winston.format.printf(({ level, message, timestamp, data }) => {
  return `${
    colors.bold(colors.magenta(timestamp))
  } ${level}: ${colors.magenta(message)} ${ 
    data ? `\n${colors.magenta(data)}` : ''
  }\n`;
});

const options = {
  level: 'silly',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    formatter,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: '.log/.error.log', level: 'error' }),
  ],
  exitOnError: false,
}

winston.addColors(customColors);

const logger = winston.createLogger(options);

module.exports = {
  error: (logData = { message, data }) => {
    logger.log({
      level: levels.error,
      ...logData,
    });
  },

  info: (logData = { message, data }) => {
    logger.log({
      level: levels.info,
      ...logData,
    });
  },

  warn: (logData = { message, data }) => {
    logger.log({
      level: 'warn',
      ...logData,
    });
  },
  
  silly: (logData = { message, data }) => {
    logger.log({
      level: levels.silly,
      ...logData,
    });
  },

  verbose: (logData = { message, data }) => {
    logger.log({
      level: levels.verbose,
      ...logData,
    });
  },

  debug: (logData = { message, data }) => {
    logger.log({
      level: levels.debug,
      ...logData,
    });
  },
}