import { GamesModel } from "./zod/games";

export const GamesBody = GamesModel.pick({
    name: true
});

