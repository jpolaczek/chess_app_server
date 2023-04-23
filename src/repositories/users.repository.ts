import { PrismaClient, User } from '.prisma/client'

const prisma = new PrismaClient()

interface UserSessionParams {
    name: string
    password: string
}

export async function createUser(params: UserSessionParams): Promise<User> {
    return await prisma.user.create({
        data: {
            name: params.name,
            password: params.password
        }
    })
}

export async function findUserByNameAndPassword(params: UserSessionParams): Promise<User | null> {
    return await prisma.user.findFirst({
        where: {
            name: params.name,
            password: params.password
        }
    })
}

export async function findUserById(id: User["id"]): Promise<User | null> {
    return await prisma.user.findFirst({ where: { id: id }});
}