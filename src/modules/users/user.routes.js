import { Router } from "express";
import { validate } from "express-validation";
import { authLocal, authFacebook } from "../../services/auth.services";
import * as userController from "./user.controllers";
import userValidation from "./user.validations";
import Joi from "joi";
const routes = new Router();

routes.post("/signup", validate(userValidation.signup), userController.signUp);
routes.post("/login", authLocal, userController.login);
routes.get("/auth/facebook", authFacebook);

export default routes;
 