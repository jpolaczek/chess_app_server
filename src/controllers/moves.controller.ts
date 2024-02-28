import { Piece } from '.prisma/client'
import { Request, Response } from "express";
import { MyResponse } from '../api-response'
import createNewBoardState from '../services/createNewBoardState'
import { getPieces } from '../repositories/pieces.repository'

type MoveRequest = {
    startPosition: { x: number, y: number }
    endPosition: { x: number, y: number }
    gameId: number
}

export async function execute(req: Request<MoveRequest>, res: Response<MyResponse<Piece[]>>): Promise<Response> {
    const newBoardState = await createNewBoardState(req.body.gameId, req.body.startPosition, req.body.endPosition)

    return res.json({
        object: await getPieces(newBoardState.id),
        dataType: "pieces"
    });
}
