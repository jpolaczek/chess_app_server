import { Router } from "express";
import { validateRequest } from "zod-express";
import { GamesBody } from "../models/games";
import { create, index, privateGames } from "../controllers/games.controller";

export const gamesRouter = Router();

gamesRouter.post("/create", validateRequest({ body: GamesBody }), create);
gamesRouter.get("/", index);
gamesRouter.get("/private", privateGames);




