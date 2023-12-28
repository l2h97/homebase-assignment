import { DotenvParseOutput, configDotenv } from "dotenv";
import { IConfig } from "./config";
import { Service } from "typedi";

@Service()
export class ConfigService implements IConfig {
  private config: DotenvParseOutput;
  constructor() {
    const loadEnv = configDotenv();

    if (loadEnv.error || !loadEnv.parsed) {
      console.error("Load environment variables fail!!");
      process.exit(1);
    }
    this.config = loadEnv.parsed;
  }

  get nodeEnv(): string {
    return this.config.NODE_ENV || "dev";
  }

  get port(): number {
    return Number(this.config.PORT) || 3001;
  }

  get mysqlHost(): string {
    return this.config.SQL_HOST || "localhost";
  }

  get mysqlPort(): number {
    return Number(this.config.SQL_PORT) || 3306;
  }

  get mysqlUser(): string {
    return this.config.SQL_USER || "admin";
  }

  get mysqlPassword(): string {
    return this.config.SQL_PASSWORD || "password";
  }

  get mysqlDatabase(): string {
    return this.config.SQL_DATABASE || "evcore22";
  }
}
