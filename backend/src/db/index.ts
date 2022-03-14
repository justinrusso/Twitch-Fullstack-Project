import { ConnectionOptions } from "typeorm";

import { BankTransfer } from "./entities/BankTransfer";
import User from "./entities/User";

const entities: ConnectionOptions["entities"] = [BankTransfer, User];

export function createDatabaseConfig(initialConfig: ConnectionOptions) {
  return {
    ...initialConfig,
    entities,
  };
}
