import createLogger from "./create-logger";

const loggerInitiator = () => {
  return {
    auth: createLogger("AUTH"),
    proxy: createLogger("MIDDLEWARE"),
    database: createLogger("DATABASE"),
    api: createLogger("API"),
    github: createLogger("GITHUB"),
    asyncHandLer: createLogger("ASYNC HANDLER"),
    searchParamsErrorListener: createLogger("SEARCH PARAMS ERROR LISTENER"),
    general: createLogger("GENERAL"),
  };
};

export const logger = loggerInitiator();
