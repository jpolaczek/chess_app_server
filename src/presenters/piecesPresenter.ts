import { Piece } from ".prisma/client"

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
        presentedPieces[piece.x][piece.y] = { pieceType: piece.type, colour: piece.colour }
    }
    return presentedPieces
}

export default piecesPresenter