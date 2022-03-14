import { check } from "express-validator";

import { handleValidationErrors } from "./utils";

const loginValidationMiddlewares = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Enter an email or username"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Enter a password"),
  handleValidationErrors,
];

export default loginValidationMiddlewares;
