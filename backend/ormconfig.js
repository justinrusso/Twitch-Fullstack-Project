const env = process.env.NODE_ENV || "development";

/**
 * Generates a file path using a base bath depending on the current NODE_ENV
 * @param {string} remainingPath the additional part of the path to add to the end
 * @returns {string} The generated path
 */
function generateEnvPath(remainingPath) {
  const basePath = env === "development" ? "src" : "dist";

  const cleanedRemainingPath =
    remainingPath[0] === "/" ? remainingPath.slice(1) : remainingPath;

  return `${basePath}/${cleanedRemainingPath}`;
}

/** @type {import('typeorm').ConnectionOptions} */
const config = {
  type: "postgres",
  cli: {
    entitiesDir: "src/db/entities",
    migrationsDir: "src/db/migrations",
    subscribersDir: "src/db/subscribers",
  },
  seeds: [generateEnvPath("db/seeds/**/*.{js,ts}")],
  factories: [generateEnvPath("db/factories/**/*.{js,ts}")],
  migrations: [generateEnvPath("db/migrations/**/*.{js,ts}")],
  entities: [generateEnvPath("db/entities/**/*.{js,ts}")],
};

if (env === "production") {
  config.url = process.env.DATABASE_URL;
  config.extra = {
    ssl: { rejectUnauthorized: false },
  };
} else if (env === "development") {
  config.username = process.env.DB_USERNAME;
  config.password = process.env.DB_PASSWORD;
  config.database = process.env.DB_DATABASE;
  config.host = process.env.DB_HOST;
} else {
  throw new Error("Unsupported node environment type for application");
}

module.exports = config;
