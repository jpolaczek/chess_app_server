import * as z from "zod";

export const UsersModel = z.object({
  id: z.string().uuid(),
  name: z.string(),
  password: z.string(),
});