import { body } from "express-validator";

import { handleValidationErrors } from "./utils";

const transferValidatorMiddlewares = [
  body("amount")
    .isInt({ min: 50 })
    .withMessage("Provide an amount greater than $0.50"),
  body("deposit")
    .isBoolean({ strict: true })
    .withMessage("Deposit must be true or false"),
  handleValidationErrors,
];

export default transferValidatorMiddlewares;
