import "reflect-metadata"; // Required for TypeORM

import { createConnection } from "typeorm";

import app from "./app";
import config from "./config";
import ormConfig from "../ormconfig";
import { createDatabaseConfig } from "./db";

const { serverPort } = config;

// Test & set connection to database before starting the server
createConnection(createDatabaseConfig(ormConfig))
  .then(() => {
    app.listen(serverPort, () =>
      console.log(`Listening on port ${serverPort}...`)
    );
  })
  .catch((error) => {
    console.log("Database connection failure.");
    console.error(error);
  });
