import { Piece } from ".prisma/client"
import Pieces from "../enums/pieces"

export type PresentedPieces = {
    [y: number]: PresentedRow
}

type PresentedRow = {
    [x: number]: PresentedPiece
}

type PresentedPiece = {
    pieceType: Pieces,
    colour: boolean,
}

const piecesPresenter = (pieces: Piece[]): PresentedPieces => {
    let presentedPieces: PresentedPieces = {}

    for(var piece of pieces) {
        if(!presentedPieces[piece.y]) {
            presentedPieces[piece.y] = {} as PresentedRow
        }
        presentedPieces[piece.y][piece.x] = { pieceType: piece.type, colour: piece.colour } as PresentedPiece
    }
    return presentedPieces
}

export default piecesPresenter