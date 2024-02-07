import { PrismaClient } from '.prisma/client'
import SetUpApplication from "../../SetUpApplication";
import { before } from 'node:test';

const express = require('express');
const request = require('supertest')
var login = require('./login');

const app = SetUpApplication(express())
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

describe("nuser signing in and creating a game", () => {
    it("should just do the stuff, whateva", async function () {
        const password = 'password'
        const name = 'usernname'

        await prisma.user.create({data: {name: name, password: password}})

        const req = await request(app)
            .post("/sign_in")
            .send({
                name: name,
                password: password,
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200);
        const gameName = "gameName"
        
        const createGameRequest = await request(app)
            .post("/games/create")
            .send({name: gameName})
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200);
        const game = await prisma.game.findFirst({where: { name: gameName}})  

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
