import { Router } from "express";
import { execute } from "../controllers/moves.controller";

export const movesRouter = Router();

movesRouter.post("/games/:gameId/move", execute);