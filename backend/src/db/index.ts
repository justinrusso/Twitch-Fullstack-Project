import { ConnectionOptions } from "typeorm";

import { BankTransfer } from "./entities/BankTransfer";
import Transaction from "./entities/Transaction";
import User from "./entities/User";

const entities: ConnectionOptions["entities"] = [
  BankTransfer,
  Transaction,
  User,
];

export function createDatabaseConfig(initialConfig: ConnectionOptions) {
  return {
    ...initialConfig,
    entities,
  };
}
