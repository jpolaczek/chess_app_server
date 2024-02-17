import { Piece, BoardState } from '.prisma/client'
import { getPieces, createPiece } from '../repositories/pieces.repository';
import { getLatestBoardState, createBoardState } from '../repositories/boardState.repository';

interface Position {
    x: number,
    y: number
}

async function createPieceWithNewPosition(newBoardState: BoardState, prevPiece: Piece, start_x: number, start_y: number, end_x: number, end_y: number) {
    if (prevPiece.x === start_x && prevPiece.y === start_y) {
        await createPiece({
            x: end_x,
            y: end_y,
            boardStateId: newBoardState.id,
            colour: prevPiece.colour,
            type: prevPiece.type
        })
    } else {
        await createPiece({
            x: prevPiece.x,
            y: prevPiece.y,
            boardStateId: newBoardState.id,
            colour: prevPiece.colour,
            type: prevPiece.type
        })
    }
}

export default async function crateNewBoardState(gameId: number, startPosition: Position, endPosition: Position): Promise<BoardState> {
    const prevBoardState = await getLatestBoardState({ gameId: gameId });
    if (!prevBoardState) { throw new Error(`Couldn't find boardState`) };

    const pieces = await getPieces(prevBoardState.id) || [];
    const newBoardState = await createBoardState({ gameId: gameId });

    if (!newBoardState) { throw new Error(`boardState is invalid`) };

    pieces.map((piece: Piece, index) => {
        if (piece.x === endPosition.x && piece.y === endPosition.y) { return };

        createPieceWithNewPosition(newBoardState, piece, startPosition.x, startPosition.y, endPosition.x, endPosition.y)
    });

    return newBoardState
}