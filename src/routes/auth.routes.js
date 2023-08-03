import { Router } from "express";

import { signUp, signIn } from "../controllers/auth.controllers.js";
import authValidation from "../middlewares/authValidation.js"
import authSchema from "../schemas/auth.schemas.js";

const authRouter = Router();

authRouter.post("/signup", authValidation(authSchema, "signUp"), signUp);
authRouter.post("/signin", authValidation(authSchema, "signIn"), signIn);

export default authRouter;
