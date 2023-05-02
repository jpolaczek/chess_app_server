import { Game } from '.prisma/client'
import { Request, Response } from "express";
import { MyResponse, GameRequest } from '../api-response'
import { createGame, listJoinableGames, listUsersGames } from '../repositories/games.repository';

export async function create(req: Request<GameRequest>, res: Response<MyResponse<Game>>): Promise<Response> {
    const playerOneId: number | null = req.session.userId;
    const name: string = req.body.name;

    if(!playerOneId) {
        throw new Error, 'User not logged in!'
    }
    
    const game = await createGame({playerOneId, name});

    return res.json({
        object: game,
        dataType: 'games' 
    });
}

export async function index(req: Request, res: Response<MyResponse<Game[]>>): Promise<Response> {    
    const userId: number | null = req.session.userId;

    if(!userId) {
        throw new Error, 'User not logged in!'
    }

    return res.json({
        object: await listJoinableGames(userId),
        dataType: 'games' 
    });
}

export async function privateGames(req: Request, res: Response<MyResponse<Game>>): Promise<Response> {    
    const userId: number | null = req.session.userId;

    if(!userId) {
        throw new Error, 'User not logged in!'
    }

    return res.json({
        object: await listUsersGames({userId}),
        dataType: 'games' 
    });
}

