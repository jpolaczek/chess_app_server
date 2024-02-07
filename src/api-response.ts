import { z } from "zod";
import { UsersAuthBody } from "./models/users";
import { GamesBody } from "./models/games";
import { PresentedPieces } from "./presenters/piecesPresenter";

const ApiTypes = z.enum(["users", "games"]);

type AcceptedJsonApiTypes = z.infer<typeof ApiTypes>;

export type MyResponse<T> = {
    object: T | Array<T>
    dataType: AcceptedJsonApiTypes
}

export type SessionObject = {
    signed_in: boolean,
    username: string | undefined,
    userId: number | undefined
}

export type PiecesResponse = {
    move_performed: boolean,
    current_position: PresentedPieces
}

export type AuthRequest = z.infer<typeof UsersAuthBody>;
export type GameRequest = z.infer<typeof GamesBody>;