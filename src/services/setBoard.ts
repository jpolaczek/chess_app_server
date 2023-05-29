import { createPiece } from "../repositories/pieces.repository"
import Colours from "../enums/colours"
import Pieces from "../enums/pieces"

async function setBoard(gameId: number) {
    console.log("creating pieces")
    for (let i = 1; i < 9; i++) {
        console.log("about to create black piece no " + i)
        await createPiece({
            x: i,
            y: 2,
            colour: Colours.Black,
            type: Pieces.Pawn,
            gameId: gameId
        })   
    }

    ////white pawns
    for (let i = 1; i < 9; i++) {
        console.log("about to create white piece no " + i)
        await createPiece({
            x: i,
            y: 7,
            colour: Colours.White,
            type: Pieces.Pawn,
            gameId: gameId
        })   
    }
}

export default setBoard