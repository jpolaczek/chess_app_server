import * as z from "zod";

export const GamesModel = z.object({
  id: z.number(),
  playerOneId: z.number(),
  playerTwoId: z.number(),
  name: z.string()
});
