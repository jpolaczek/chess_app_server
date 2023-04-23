import { z } from "zod";
import { UsersAuthBody } from "./models/users";

const ApiTypes = z.enum(["users", "games"]);

type AcceptedJsonApiTypes = z.infer<typeof ApiTypes>;

export type MyResponse<T> = {
    attributes: T
    dataType: AcceptedJsonApiTypes
}

export type SessionObject = {
    signed_in: boolean,
    username: string | undefined
}

export type AuthRequest = z.infer<typeof UsersAuthBody>;