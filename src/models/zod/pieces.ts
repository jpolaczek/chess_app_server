import * as z from "zod";

export const PiecesModel = z.object({
  id: z.number(),
  x: z.number(),
  y: z.number(),
  type: z.number(),
  colour: z.boolean()
});
