import createLogger from "./create-logger";

const loggerInitiator = () => {
  return {
    auth: createLogger("AUTH"),
    middleware: createLogger("MIDDLEWARE"),
    database: createLogger("DATABASE"),
    api: createLogger("API"),
    github: createLogger("GITHUB"),
    general: createLogger("GENERAL"),
  };
};

export const logger = loggerInitiator();
