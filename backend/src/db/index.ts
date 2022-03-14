import { ConnectionOptions } from "typeorm";
import User from "./entities/User";

const entities: ConnectionOptions["entities"] = [User];

export function createDatabaseConfig(initialConfig: ConnectionOptions) {
  return {
    ...initialConfig,
    entities,
  };
}
