import { query } from "express-validator";

import { handleValidationErrors } from "./utils";

const usersQueryValidatorMiddlewares = [
  query("key").exists({ checkFalsy: true }).isString().isLength({ min: 1 }),
  handleValidationErrors,
];

export default usersQueryValidatorMiddlewares;
