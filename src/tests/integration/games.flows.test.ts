import { PrismaClient } from '.prisma/client'
import SetUpApplication from "../../SetUpApplication";

const express = require('express');
const supertestSession = require('supertest-session')

const app = SetUpApplication(express())
const sessionApp = supertestSession(app)

const prisma = new PrismaClient

beforeEach(async () => {
    await prisma.$transaction([
        prisma.user.deleteMany({}),
        prisma.piece.deleteMany({}),
        prisma.game.deleteMany({}),
        prisma.boardState.deleteMany({})
    ]);
});

afterEach(async () => {
    await prisma.$transaction([
        prisma.user.deleteMany({}),
        prisma.piece.deleteMany({}),
        prisma.game.deleteMany({}),
        prisma.boardState.deleteMany({})
    ]);
});

describe("user signing in and creating a game", () => {
    it("should set user session and create game record", async function () {
        const password = 'password'
        const name = 'username'

        await prisma.user.create({ data: { name: name, password: password } })

        const res = await sessionApp
            .post("/sign_in")
            .send({
                name: name,
                password: password,
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200);
        const gameName = "gameName"

        const createGameRequest = await sessionApp
            .post("/games/create")
            .send({ name: gameName })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200);
        const game = await prisma.game.findFirst({ where: { name: gameName } })

        expect(createGameRequest.body).toEqual({
            object: {
                id: game?.id,
                name: gameName,
                playerOneId: game?.playerOneId,
                playerTwoId: game?.playerTwoId,
                playerOneColour: game?.playerOneColour,
                playerTwoColour: game?.playerTwoColour
            },
            dataType: 'games'
        })
        const initialBoardState = await prisma.boardState.findFirst({ where: { gameId: game?.id } });
        const piece = await prisma.piece.findFirst({ where: { type: 0, colour: true, boardStateId: initialBoardState?.id } });

        expect(await prisma.piece.findFirst({ where: { x: 1, y: 3, boardStateId: initialBoardState?.id } })).toBeUndefined
        const makeMoveRequest = await sessionApp
            .post(`/games/${game?.id}/move`)
            .send({ gameId: game?.id, startPosition: { x: piece?.x, y: piece?.y }, endPosition: { x: 1, y: 3 } })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200);

        const newBoardState = await prisma.boardState.findFirst({
            where: { gameId: game?.id },
            orderBy: { id: 'desc' }
        })
        console.log(makeMoveRequest.body.object)
        expect(makeMoveRequest.body.object).toEqual(
            expect.arrayContaining([     
                expect.objectContaining({
                    x: 1,
                    y: 3,
                    boardStateId: newBoardState?.id,
                    colour: true,
                    type: 0          
                })
            ])
        )
        });
});