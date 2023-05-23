import { PrismaClient } from '.prisma/client'
import SetUpApplication from "../../SetUpApplication";
import { findUserByNameAndPassword } from "../../repositories/users.repository";

const express = require('express');
const request = require('supertest')

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

describe("new user registering and signing in", () => {
    it("should just do the stuff, whateva", async function () {
        const password = 'password'
        const name = 'usernname'

        const signUpRequest = await request(app)
            .post("/sign_up")
            .send({
                name: name,
                password: password,
            })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(200);
    
        const user = await findUserByNameAndPassword({name, password})

        expect(signUpRequest.body).toStrictEqual({
            object: {
                id: user?.id,
                name: user?.name,
                password: user?.password
            },
            dataType: 'users'
        })
    })

})
