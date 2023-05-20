import { PrismaClient, Piece } from '.prisma/client'

const prisma = new PrismaClient()

type PieceAttributes = {
    x: number,
    y: number,
    colour: boolean,
    type: number,
    gameId: number
}

export async function createPiece({ x, y, colour, type, gameId }: PieceAttributes): Promise<Piece> {
    return await prisma.piece.create({
        data: {
            x: x,
            y: y,
            colour: colour,
            type: type,
            gameId: gameId
        }
    })
}

export async function getPieces(gameId: number): Promise<Piece[]> {
    return await prisma.piece.findMany({
        where: { gameId: gameId }
    })
}