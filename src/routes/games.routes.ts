import { Router } from "express";
import { validateRequest } from "zod-express";
import { GamesBody } from "../models/games";
import { create, index, privateGames, makeMove } from "../controllers/games.controller";

export const gamesRouter = Router();

gamesRouter.post("/create", validateRequest({ body: GamesBody }), create);
gamesRouter.get("/", index);
gamesRouter.put("/:gameId/move", makeMove);
gamesRouter.get("/private", privateGames);





