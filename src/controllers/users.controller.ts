import { TypedRequestBody } from "zod-express";
import { UsersSignUpBody } from "../models/users";
import { createUser } from "../repositories/users.repository";
import { User } from '.prisma/client'
import { Response } from "express";
import { MyResponse } from '../api-response'

export async function sign_up(req: TypedRequestBody<typeof UsersSignUpBody>, res: Response<MyResponse<User>>): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;

    const user = await createUser({name, password}); ///prisma used here

    return res.json({
        attributes: user,
        dataType: 'users'
    });
}