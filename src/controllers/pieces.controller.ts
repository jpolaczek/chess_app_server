import { Request, Response } from "express";
import { MyResponse } from '../api-response'
import { getPieces } from "../repositories/pieces.repository";
import piecesPresenter, { PresentedPieces } from "../presenters/piecesPresenter";

export async function index(req: Request, res: Response<MyResponse<PresentedPieces>>): Promise<Response> {    
    const gameId: string = req.params.gameId
    const pieces = await getPieces(Number(gameId))

    return res.json({
        object: piecesPresenter(pieces),
        dataType: 'games' 
    });
}
