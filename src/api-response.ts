import { z } from "zod";

const ApiTypes = z.enum(["users", "games"]);

type AcceptedJsonApiTypes = z.infer<typeof ApiTypes>;

export type MyResponse<T> = {
    attributes: T
    dataType: AcceptedJsonApiTypes
}