import { PrismaClient, Piece } from '.prisma/client'

const prisma = new PrismaClient()

export async function createPiece({ x, y, colour, type }: Piece): Promise<Piece> {
    return await prisma.piece.create({
        data: {
            x: x,
            y: y,
            colour: colour,
            type: type
        }
    })
}