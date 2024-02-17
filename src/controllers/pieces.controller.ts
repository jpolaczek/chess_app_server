import { Request, Response } from "express";
import { MyResponse } from '../api-response'
import { getPieces } from "../repositories/pieces.repository";
import piecesPresenter, { PresentedPieces } from "../presenters/piecesPresenter";
import { getLatestBoardState } from "../repositories/boardState.repository";


export async function index(req: Request, res: Response<MyResponse<PresentedPieces>>): Promise<Response> {    
    const gameId: string = req.params.gameId
    const boardState = await getLatestBoardState( { gameId: Number(gameId) } )
    const pieces = await getPieces(Number(boardState?.id))

    return res.json({
        object: piecesPresenter(pieces),
        dataType: 'games' 
    });
}
