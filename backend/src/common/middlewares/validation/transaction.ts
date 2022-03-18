import { body } from "express-validator";

import { handleValidationErrors } from "./utils";

const transactionValidatorMiddlewares = [
  body("to").isInt().withMessage("Provide a valid user id"),
  body("amount")
    .isInt({ min: 50 })
    .withMessage("Provide an amount greater than $0.50"),
  body("memo").exists({ checkFalsy: true }),
  body("type")
    .exists({ checkFalsy: true })
    .isString()
    .matches(/^(payment|request)$/),
  handleValidationErrors,
];

export default transactionValidatorMiddlewares;
