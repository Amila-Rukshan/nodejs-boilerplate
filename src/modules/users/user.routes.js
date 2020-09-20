import { Router } from "express";
import { validate } from "express-validation";

import * as userController from "./user.controllers";
import userValidation from "./user.validations";
import Joi from "joi";
const routes = new Router();

routes.post("/signup", validate(userValidation.signup), userController.signUp);

export default routes;
 