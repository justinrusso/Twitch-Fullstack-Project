import { body } from "express-validator";
import { getRepository } from "typeorm";
import User from "../../../db/entities/User";

import { handleValidationErrors } from "./utils";

const signupValidatorMiddlewares = [
  body("username")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("Enter an email or username")
    .isLength({ min: 6 })
    .withMessage("Provide a username with at least 6 characters")
    .custom(async (value: string) => {
      const user = await getRepository(User).findOne({
        where: { username: value },
      });
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Enter a first name"),
  body("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Enter a last name"),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Enter a password")
    .isLength({ min: 6 })
    .withMessage("Use 6 characters or more for your password"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  handleValidationErrors,
];

export default signupValidatorMiddlewares;
