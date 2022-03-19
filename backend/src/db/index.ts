import { ConnectionOptions } from "typeorm";

import { BankTransfer } from "./entities/BankTransfer";
import Friend from "./entities/Friend";
import Transaction from "./entities/Transaction";
import User from "./entities/User";

const entities: ConnectionOptions["entities"] = [
  BankTransfer,
  Friend,
  Transaction,
  User,
];

export function createDatabaseConfig(initialConfig: ConnectionOptions) {
  return {
    ...initialConfig,
    entities,
  };
}
