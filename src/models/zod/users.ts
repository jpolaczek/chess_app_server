import * as z from "zod";

export const UsersModel = z.object({
  id: z.string().uuid(),
  name: z.string().min(7).max(20),
  password: z.string().min(7).max(20),
});
