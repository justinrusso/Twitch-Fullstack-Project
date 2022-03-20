import { query } from "express-validator";

import { handleValidationErrors } from "./utils";

const friendsQueryValidatorMiddlewares = [
  query("status")
    .optional()
    .matches(/^(accepted|pending)$/),
  query("direction")
    .optional()
    .custom((input, { req }) => {
      if (!input && req.query?.status) {
        throw new Error("Direction is required if status is pending");
      }
      return true;
    })
    .matches(/^(received|sent)$/)
    .withMessage('direction must be either "received" or "sent"'),
  handleValidationErrors,
];

export default friendsQueryValidatorMiddlewares;
