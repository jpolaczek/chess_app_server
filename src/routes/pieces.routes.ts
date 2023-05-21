import { Router } from "express";
import { index } from "../controllers/pieces.controller";

export const piecesRouter = Router();

piecesRouter.get("/games/:gameId/pieces", index);