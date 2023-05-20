import { createPiece } from "../repositories/pieces.repository"

const SetBoard = (gameId: number) => {
    for (let i = 0; i < 8; i++) {
        createPiece({
            x: i,
            y: 1,
            colour: Colours.Black,
            type: Pieces.Pawn,
            gameId: gameId
        })   
    }

    ////white pawns
    for (let i = 0; i < 8; i++) {
        createPiece({
            x: i,
            y: 6,
            colour: Colours.White,
            type: Pieces.Pawn,
            gameId: gameId
        })   
    }
}

export default SetBoard