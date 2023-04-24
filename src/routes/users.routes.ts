import { Router } from "express";
import { getSessionData, signIn, signOut, signUp } from "../controllers/users.controller";
import { validateRequest } from "zod-express";
import { UsersAuthBody } from "../models/users";

export const usersRouter = Router();

usersRouter.post("/sign_up", validateRequest({ body: UsersAuthBody }), signUp);
usersRouter.post("/sign_in", validateRequest({ body: UsersAuthBody }), signIn);
usersRouter.delete('/sign_out', signOut)
usersRouter.get("/session_data", getSessionData);


