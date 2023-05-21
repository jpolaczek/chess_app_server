import { Router } from "express";
import { usersRouter } from "./users.routes";
import { gamesRouter } from "./games.routes";
import { piecesRouter } from "./pieces.routes";

export const router = Router();

const appRoutes = [
  {
    path: "/",
    router: usersRouter,
  },
  {
    path: "/games/",
    router: gamesRouter,
  },
  {
    path: "/",
    router: piecesRouter
  }
];

appRoutes.forEach((route) => router.use(route.path, route.router));