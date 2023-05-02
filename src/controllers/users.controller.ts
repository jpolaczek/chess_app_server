import { createUser, findUserById, findUserByNameAndPassword } from "../repositories/users.repository";
import { User } from '.prisma/client'
import { Request, Response } from "express";
import { MyResponse, SessionObject, AuthRequest } from '../api-response'

export async function signUp(req: Request<AuthRequest>, res: Response<MyResponse<User>>): Promise<Response> {
    const name: string = req.body.name;
    const password: string = req.body.password;
    
    const user = await createUser({name, password}); ///prisma used here

    return res.json({
        object: user,
        dataType: 'users' 
    });
}

export async function signIn(req: Request<AuthRequest>, res: Response<SessionObject>): Promise<Response> {
    const name: string = req.body.name;
    const password: string = req.body.password;
    let result: boolean
    const user = await findUserByNameAndPassword({name, password}); ///prisma used here

    if(!user) {
        result = false
    } else {
        req.session.userId = user.id
        result = true
    }

    return res.json({
        signed_in: result,
        username: name,
        userId: user?.id
    });
}

export async function signOut(req: Request, res: Response<SessionObject>): Promise<Response> {
    req.session.userId = null

    return res.json({
        signed_in: false,
        username: '',
        userId: undefined
    });
}

export async function getSessionData(req: Request, res: Response<SessionObject>): Promise<Response> {
    let result: boolean;
    const id = Number(req.session.userId)
    let user: User | null = null

    if(req.session.userId) {
        user = await findUserById(id); ///prisma used here
        result = !!user
    } else {
        result = false
    }

    return res.json({
        signed_in: result,
        username: user?.name,
        userId: user?.id
    });
}

