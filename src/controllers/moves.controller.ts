import { Piece } from '.prisma/client'
import { Request, Response } from "express";
import { MyResponse, GameRequest } from '../api-response'
import { getPieces } from '../repositories/pieces.repository';
type MoveRequest = {
    startPosition: { x: number, y: number }
    endPosition: { x: number, y: number}
    gameId: number
}


export async function execute(req: Request<MoveRequest>, res: Response<MyResponse<Piece[]>>): Promise<Response> {
    
    const pieces = getPieces( { req.body.gameId } )

    return res.json({
        object: pieces,
        dataType: 'games' 
    });
}

