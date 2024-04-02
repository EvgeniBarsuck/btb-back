import * as path from 'path';
import { format, transports } from 'winston';

export const winstonConfig = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  format: format.combine(
    format.label({
      label: path.basename(require.main.filename),
    }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata({
      fillExcept: ['message', 'level', 'timestamp', 'label'],
    }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) =>
            `${info.level} ${info.timestamp} [${info.label}]: ${info.message}`,
        ),
      ),
    }),
    new transports.File({
      filename: 'logs/info.log',
      format: format.combine(format.json()),
    }),
    new transports.File({
      level: 'error',
      filename: 'logs/error.log',
      format: format.combine(
        format.ms(),
        format.json(),
        format.errors({ stack: true }),
      ),
    }),
  ],
};
