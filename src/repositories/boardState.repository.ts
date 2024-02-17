import { PrismaClient, BoardState } from '.prisma/client'

const prisma = new PrismaClient()

export async function createBoardState(params: { gameId: number }): Promise<BoardState> {

    return await prisma.boardState.create({
        data: { gameId: params.gameId }
    })
}

export async function getLatestBoardState(params: { gameId: number }): Promise<BoardState | null> {

    return await prisma.boardState.findFirst({
        where: { gameId: params.gameId },
        orderBy: [
            {
                id: 'desc'
            }
        ]
    })
}
