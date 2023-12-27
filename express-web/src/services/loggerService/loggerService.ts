/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from "typedi";
import { Logger, createLogger, format, transports } from "winston";

@Service()
export class LoggerService {
  private logger: Logger;

  constructor() {
    const { combine, timestamp, printf, colorize } = format;
    this.logger = createLogger({
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        printf(
          ({ level, timestamp, message, correlationId = "", ...metadata }) => {
            const data =
              metadata[Symbol.for("splat")][0]
                .map((item: any) => JSON.stringify(item, null, 2))
                .join("\n") || "";

            if (!correlationId) {
              return `[${timestamp}] [${level.toUpperCase()}] ${message} ${data}`;
            }

            return `[${timestamp}] [${level.toUpperCase()}] [${correlationId}] ${message} ${data}`;
          },
        ),
      ),
      transports: [
        new transports.Console({
          level: "debug",
          format: colorize({ all: true }),
        }),
      ],
    });
  }

  set setCorrelation(correlationId: string) {
    this.logger.defaultMeta = {
      ...this.logger.defaultMeta,
      correlationId,
    };
  }

  get getCorrelation(): string {
    return this.logger.defaultMeta.correlationId;
  }

  log(message: string, ...meta: any[]) {
    this.logger.info(message, meta);
  }

  warn(message: string, ...meta: any[]) {
    this.logger.warn(message, meta);
  }

  debug(message: string, ...meta: any[]) {
    this.logger.debug(message, meta);
  }

  error(message: string, ...meta: any[]) {
    this.logger.error(message, meta);
  }
}
