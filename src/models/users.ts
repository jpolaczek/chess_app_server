import { UsersModel } from "./zod/users";

export const UsersSignUpBody = UsersModel.pick({
  name: true,
  password: true
});

