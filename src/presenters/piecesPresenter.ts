import { Piece } from ".prisma/client"
import Pieces from "../enums/pieces"

export type PresentedPieces = {
    [y: number]: PresentedRow
}

type PresentedRow = {
    [x: number]: PresentedField
}

type PresentedField = {
    piece: { 
        pieceType: Pieces,
        colour: boolean
    },
    highlighted: boolean
   
}

const piecesPresenter = (pieces: Piece[]): PresentedPieces => {
    const presentedPieces: PresentedPieces = {};

    for (let row = 1; row < 9; row++) {
        presentedPieces[row] = {};

        for (let col = 1; col < 9; col++) {
            presentedPieces[row][col] = {} as PresentedField;
        }
    }

    for(var piece of pieces) {
        presentedPieces[piece.y][piece.x] = {highlighted: false, piece: { pieceType: piece.type, colour: piece.colour }} as PresentedField
    }
    return presentedPieces
}

export default piecesPresenter