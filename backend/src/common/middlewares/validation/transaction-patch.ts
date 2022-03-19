import { body } from "express-validator";

import { handleValidationErrors } from "./utils";

const transactionPatchValidatorMiddlewares = [
  body("paid").optional().isBoolean().toBoolean(),
  handleValidationErrors,
];

export default transactionPatchValidatorMiddlewares;
