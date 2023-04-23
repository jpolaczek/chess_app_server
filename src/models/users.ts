import { UsersModel } from "./zod/users";

export const UsersAuthBody = UsersModel.pick({
  name: true,
  password: true
});

