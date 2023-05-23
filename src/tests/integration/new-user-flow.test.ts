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
    });

    it('should return bad request status when name is too short', async function () {
        const signUpRequest = await request(app)
            .post('/sign_up')
            .send({
                name: 'short',
                password: 'password'
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(400);
        
        expect(signUpRequest.body[0].errors).toEqual(
            {
                issues: [
                    {
                        code: "too_small",
                        exact: false,
                        inclusive: true,
                        message: "String must contain at least 7 character(s)",
                        minimum: 7,
                        path: ["name"],
                        type: "string",
                    },
                ],
                name: "ZodError"
            }
        )
    });

    it('should return bad request status when password is too short', async function () {
        const signUpRequest = await request(app)
            .post('/sign_up')
            .send({
                name: 'username',
                password: 'pswd'
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(400);
        
        expect(signUpRequest.body[0].errors).toEqual(
            {
                issues: [
                    {
                        code: "too_small",
                        exact: false,
                        inclusive: true,
                        message: "String must contain at least 7 character(s)",
                        minimum: 7,
                        path: ["password"],
                        type: "string",
                    },
                ],
                name: "ZodError"
            }
        )
    });

    it('should return bad request status when params are empty', async function () {
        const signUpRequest = await request(app)
            .post('/sign_up')
            .send()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(400);
        
        expect(signUpRequest.body[0].errors).toEqual(
            {
                issues: [
                    {
                        code: "invalid_type",
                        expected: "string",
                        message: "Required",
                        path: ["name"],
                        received: "undefined"
                    },
                    {
                        code: "invalid_type",
                        expected: "string",
                        message: "Required",
                        path: ["password"],
                        received: "undefined"
                    },
                ],
                name: "ZodError"
            }
        )
    })

})
