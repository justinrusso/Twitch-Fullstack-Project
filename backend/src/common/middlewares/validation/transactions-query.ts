import { query } from "express-validator";

import { handleValidationErrors } from "./utils";

const transactionsQueryValidatorMiddlewares = [
  query("status")
    .optional()
    .isString()
    .matches(/^(paid|unpaid)$/),
  query("type")
    .optional()
    .isString()
    .matches(/^(payer|payee)$/),
  handleValidationErrors,
];

export default transactionsQueryValidatorMiddlewares;
