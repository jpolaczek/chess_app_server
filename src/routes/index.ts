import { Router } from "express";
import { usersRouter } from "./users.routes";

export const router = Router();

const appRoutes = [
  {
    path: "/",
    router: usersRouter,
  },
];

appRoutes.forEach((route) => router.use(route.path, route.router));