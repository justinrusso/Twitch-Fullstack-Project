import { body } from "express-validator";

import { handleValidationErrors } from "./utils";

const friendValidatorMiddlewares = [
  body("id").isInt().toInt(),
  handleValidationErrors,
];

export default friendValidatorMiddlewares;
