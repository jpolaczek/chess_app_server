import { PrismaClient, Piece } from '.prisma/client'

const prisma = new PrismaClient()

type PieceAttributes = {
    x: number,
    y: number,
    colour: boolean,
    type: number,
    boardStateId: number
}

export async function createPiece({ x, y, colour, type, boardStateId }: PieceAttributes): Promise<Piece> {
    return await prisma.piece.create({
        data: {
            x: x,
            y: y,
            colour: colour,
            type: type,
            boardStateId: boardStateId
        }
    })
}

export async function getPieces(boardStateId: number): Promise<Piece[]> {
    return await prisma.piece.findMany({
        where: { boardStateId: boardStateId }
    })
}