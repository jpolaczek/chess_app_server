import { Router } from "express";
import { sign_up } from "../controllers/users.controller";
import { validateRequest } from "zod-express";
import { UsersSignUpBody } from "../models/users";

export const usersRouter = Router();

usersRouter.post("/sign_up", validateRequest({ body: UsersSignUpBody }), sign_up);
