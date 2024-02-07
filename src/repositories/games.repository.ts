import { PrismaClient, Game } from '.prisma/client'

const prisma = new PrismaClient()

export async function createGame(params: { playerOneId: number, name: string}): Promise<Game> {
    return await prisma.game.create({
        data: {
            playerOneId: params.playerOneId,
            name: params.name,
            playerOneColour: Math.random() >= 0.5
        }
    })
}

export async function listUsersGames(params: { userId: number }): Promise<Game[]> {
    return await prisma.game.findMany({
        where: {
            OR: [
                    { playerOneId: params.userId },
                    { playerTwoId: params.userId }
            ]
        }
    })
}

export async function listJoinableGames(userId: number): Promise<Game[]> {
    return await prisma.game.findMany({
        where: { playerTwoId: null, playerOneId: { notIn: [userId]} }
    })
}