import { createPiece } from "../repositories/pieces.repository"
import Colours from "../enums/colours"
import Pieces from "../enums/pieces"
import { createBoardState } from "../repositories/boardState.repository"

async function setBoard(gameId: number) {
    const boardState = await createBoardState({ gameId: gameId  })

    console.log("creating pieces")
    for (let i = 1; i < 9; i++) {
        console.log("about to create black piece no " + i)
        await createPiece({
            x: i,
            y: 2,
            colour: Colours.Black,
            type: Pieces.Pawn,
            boardStateId: boardState.id
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
            boardStateId: boardState.id
        })   
    }
}

export default setBoard