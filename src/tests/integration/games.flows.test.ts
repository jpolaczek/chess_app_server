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
        prisma.game.deleteMany({})
    ]);
});

afterEach(async () => {
    await prisma.$transaction([
        prisma.user.deleteMany({}),
        prisma.piece.deleteMany({}),
        prisma.game.deleteMany({})
    ]);
});

describe("user signing in and creating a game", () => {
    it("should set user session and create game record", async function () {
        const password = 'password'
        const name = 'username'

        await prisma.user.create({data: {name: name, password: password}})

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
            .send({name: gameName})
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200);
        const game = await prisma.game.findFirst({where: { name: gameName}})  
        console.log(game?.playerOneColour)
        console.log(game?.playerTwoColour)
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
    });
});
