const env = process.env.NODE_ENV || "development";

/** @type {import('typeorm').ConnectionOptions} */
const config = {
  type: "postgres",
  cli: {
    entitiesDir: "src/db/entities",
    migrationsDir: "src/db/migrations",
    subscribersDir: "src/db/subscribers",
  },
};

if (env === "production") {
  config.url = process.env.DB_URL;
} else if (env === "development") {
  config.username = process.env.DB_USERNAME;
  config.password = process.env.DB_PASSWORD;
  config.database = process.env.DB_DATABASE;
  config.host = process.env.DB_HOST;
} else {
  throw new Error("Unsupported node environment type for application");
}

module.exports = config;
